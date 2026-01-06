import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/integrations/supabase/types';

type ActivityLog = Database['public']['Tables']['activity_logs']['Row'];

export const useRealTimeActivity = () => {
  const { user, hasRole } = useAuth();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching activities:', error);
    } else {
      setActivities(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (hasRole('employer') || hasRole('admin')) {
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, [user, hasRole]);

  // Set up real-time subscription for activity logs
  useEffect(() => {
    if (!user || (!hasRole('employer') && !hasRole('admin'))) return;

    const channel = supabase
      .channel('activity-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_logs'
        },
        (payload) => {
          console.log('Real-time activity update:', payload);
          const newActivity = payload.new as ActivityLog;
          setActivities(prev => [newActivity, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, hasRole]);

  return {
    activities,
    loading,
    refetch: fetchActivities
  };
};
