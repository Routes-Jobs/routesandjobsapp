-- Add RLS policy for employees to view activity assigned to them
CREATE POLICY "Employees can view activity logs related to their rides"
ON public.activity_logs FOR SELECT
USING (
  public.has_role(auth.uid(), 'employee') AND 
  (user_id = auth.uid() OR ride_request_id IN (
    SELECT id FROM public.ride_requests WHERE rider_id = auth.uid()
  ))
);

-- Add policy for employees to create ride requests (they are also riders)
CREATE POLICY "Employees can create ride requests"
ON public.ride_requests FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'employee') AND auth.uid() = rider_id);

-- Add policy for employees to view their own ride requests
CREATE POLICY "Employees can view their own ride requests"
ON public.ride_requests FOR SELECT
USING (public.has_role(auth.uid(), 'employee') AND auth.uid() = rider_id);