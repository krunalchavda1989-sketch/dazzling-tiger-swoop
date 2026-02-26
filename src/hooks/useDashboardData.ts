import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useDashboardData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch Wallet
      const { data: wallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch Team Count
      const { count: directCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);

      // Fetch Recent Commissions
      const { data: commissions } = await supabase
        .from('commissions')
        .select('*, from_user:profiles!from_user_id(first_name, last_name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setData({
        wallet: wallet || { balance: 0, total_earned: 0 },
        directCount: directCount || 0,
        commissions: commissions || []
      });
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading };
}