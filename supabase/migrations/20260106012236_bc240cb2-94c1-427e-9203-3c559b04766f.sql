-- Create role enum
CREATE TYPE public.app_role AS ENUM ('rider', 'driver', 'employer', 'admin');

-- Create ride status enum
CREATE TYPE public.ride_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ride_requests table
CREATE TABLE public.ride_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  driver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  pickup_location TEXT NOT NULL,
  pickup_lat DECIMAL(10, 7),
  pickup_lng DECIMAL(10, 7),
  destination TEXT NOT NULL,
  destination_lat DECIMAL(10, 7),
  destination_lng DECIMAL(10, 7),
  status ride_status NOT NULL DEFAULT 'requested',
  passenger_count INTEGER DEFAULT 1,
  estimated_fare DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create activity_logs table for employer/admin monitoring
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  action_description TEXT NOT NULL,
  ride_request_id UUID REFERENCES public.ride_requests(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins and employers can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'employer'));

-- RLS Policies for ride_requests
CREATE POLICY "Riders can view their own ride requests"
ON public.ride_requests FOR SELECT
USING (auth.uid() = rider_id);

CREATE POLICY "Riders can create ride requests"
ON public.ride_requests FOR INSERT
WITH CHECK (auth.uid() = rider_id);

CREATE POLICY "Drivers can view all requested rides"
ON public.ride_requests FOR SELECT
USING (public.has_role(auth.uid(), 'driver'));

CREATE POLICY "Drivers can update rides they accept"
ON public.ride_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'driver') AND (driver_id IS NULL OR driver_id = auth.uid()));

CREATE POLICY "Employers can view all ride requests"
ON public.ride_requests FOR SELECT
USING (public.has_role(auth.uid(), 'employer'));

CREATE POLICY "Admins have full access to ride requests"
ON public.ride_requests FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for activity_logs
CREATE POLICY "Employers can view activity logs"
ON public.activity_logs FOR SELECT
USING (public.has_role(auth.uid(), 'employer'));

CREATE POLICY "Admins have full access to activity logs"
ON public.activity_logs FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own activity"
ON public.activity_logs FOR SELECT
USING (auth.uid() = user_id);

-- Enable realtime for ride_requests and activity_logs
ALTER TABLE public.ride_requests REPLICA IDENTITY FULL;
ALTER TABLE public.activity_logs REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.ride_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- Create function to log activity
CREATE OR REPLACE FUNCTION public.log_ride_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_logs (user_id, action_type, action_description, ride_request_id, metadata)
    VALUES (NEW.rider_id, 'RIDE_REQUESTED', 'New ride request from ' || NEW.pickup_location || ' to ' || NEW.destination, NEW.id, jsonb_build_object('status', NEW.status));
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != NEW.status THEN
      INSERT INTO public.activity_logs (user_id, action_type, action_description, ride_request_id, metadata)
      VALUES (
        COALESCE(NEW.driver_id, NEW.rider_id),
        CASE 
          WHEN NEW.status = 'accepted' THEN 'RIDE_ACCEPTED'
          WHEN NEW.status = 'in_progress' THEN 'RIDE_STARTED'
          WHEN NEW.status = 'completed' THEN 'RIDE_COMPLETED'
          WHEN NEW.status = 'cancelled' THEN 'RIDE_CANCELLED'
          ELSE 'RIDE_UPDATED'
        END,
        CASE 
          WHEN NEW.status = 'accepted' THEN 'Ride accepted by driver'
          WHEN NEW.status = 'in_progress' THEN 'Ride in progress'
          WHEN NEW.status = 'completed' THEN 'Ride completed'
          WHEN NEW.status = 'cancelled' THEN 'Ride cancelled'
          ELSE 'Ride status updated'
        END,
        NEW.id,
        jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status)
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for activity logging
CREATE TRIGGER ride_activity_trigger
AFTER INSERT OR UPDATE ON public.ride_requests
FOR EACH ROW
EXECUTE FUNCTION public.log_ride_activity();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ride_requests_updated_at
BEFORE UPDATE ON public.ride_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();