import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/integrations/supabase/types';

type RideRequest = Database['public']['Tables']['ride_requests']['Row'];
type RideStatus = Database['public']['Enums']['ride_status'];

export const useRealTimeRides = () => {
  const { user, hasRole } = useAuth();
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial rides
  const fetchRides = async () => {
    if (!user) return;

    let query = supabase.from('ride_requests').select('*');

    // Riders only see their own rides
    if (hasRole('rider') && !hasRole('driver') && !hasRole('employer') && !hasRole('admin')) {
      query = query.eq('rider_id', user.id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching rides:', error);
    } else {
      setRides(data || []);
    }
    setLoading(false);
  };

  // Request a new ride (Rider)
  const requestRide = async (pickup: string, destination: string, passengers: number = 1) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('ride_requests')
      .insert({
        rider_id: user.id,
        pickup_location: pickup,
        destination: destination,
        passenger_count: passengers,
        status: 'requested' as RideStatus
      })
      .select()
      .single();

    if (error) {
      console.error('Error requesting ride:', error);
      return { error, data: null };
    }

    return { error: null, data };
  };

  // Accept a ride (Driver)
  const acceptRide = async (rideId: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
      .from('ride_requests')
      .update({ 
        driver_id: user.id, 
        status: 'accepted' as RideStatus,
        accepted_at: new Date().toISOString()
      })
      .eq('id', rideId)
      .eq('status', 'requested');

    if (error) {
      console.error('Error accepting ride:', error);
    }

    return { error };
  };

  // Start a ride (Driver)
  const startRide = async (rideId: string) => {
    const { error } = await supabase
      .from('ride_requests')
      .update({ status: 'in_progress' as RideStatus })
      .eq('id', rideId);

    return { error };
  };

  // Complete a ride (Driver)
  const completeRide = async (rideId: string) => {
    const { error } = await supabase
      .from('ride_requests')
      .update({ 
        status: 'completed' as RideStatus,
        completed_at: new Date().toISOString()
      })
      .eq('id', rideId);

    return { error };
  };

  // Cancel a ride
  const cancelRide = async (rideId: string) => {
    const { error } = await supabase
      .from('ride_requests')
      .update({ status: 'cancelled' as RideStatus })
      .eq('id', rideId);

    return { error };
  };

  useEffect(() => {
    fetchRides();
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('ride-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ride_requests'
        },
        (payload) => {
          console.log('Real-time ride update:', payload);

          if (payload.eventType === 'INSERT') {
            const newRide = payload.new as RideRequest;
            // Add if driver/employer/admin or if it's the rider's own ride
            if (hasRole('driver') || hasRole('employer') || hasRole('admin') || newRide.rider_id === user.id) {
              setRides(prev => [newRide, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedRide = payload.new as RideRequest;
            setRides(prev => prev.map(r => r.id === updatedRide.id ? updatedRide : r));
          } else if (payload.eventType === 'DELETE') {
            const deletedRide = payload.old as RideRequest;
            setRides(prev => prev.filter(r => r.id !== deletedRide.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, hasRole]);

  return {
    rides,
    loading,
    requestRide,
    acceptRide,
    startRide,
    completeRide,
    cancelRide,
    refetch: fetchRides
  };
};
