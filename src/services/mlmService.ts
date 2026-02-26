import { supabase } from '@/lib/supabase';

const REFERRAL_COMMISSIONS = [0.05, 0.045, 0.04, 0.035, 0.03, 0.025, 0.02, 0.015, 0.01];
const REPURCHASE_COMMISSIONS = [0.03, 0.02, 0.01];

export const mlmService = {
  /**
   * Calculates and distributes referral commissions up to 9 levels.
   */
  async distributeReferralCommission(newUserId: string, referrerId: string) {
    const subscriptionFee = 2800;
    let currentReferrerId = referrerId;

    for (let level = 1; level <= 9; level++) {
      if (!currentReferrerId) break;

      const isQualified = await this.checkLevelQualification(currentReferrerId, level);
      
      if (isQualified) {
        const commissionRate = REFERRAL_COMMISSIONS[level - 1];
        const amount = subscriptionFee * commissionRate;

        await supabase.from('commissions').insert({
          user_id: currentReferrerId,
          from_user_id: newUserId,
          amount,
          level,
          type: 'referral',
          status: 'pending'
        });

        await supabase.rpc('increment_wallet_balance', { 
          user_id: currentReferrerId, 
          amount 
        });
      }

      const { data: parent } = await supabase
        .from('profiles')
        .select('referrer_id')
        .eq('id', currentReferrerId)
        .single();
      
      currentReferrerId = parent?.referrer_id;
    }
  },

  async checkLevelQualification(userId: string, level: number): Promise<boolean> {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', userId);

    const directReferrals = count || 0;

    if (level === 1) return directReferrals >= 1;
    if (level >= 2 && level <= 5) return directReferrals >= 3;
    if (level >= 6 && level <= 9) return directReferrals >= 6;
    
    return false;
  },

  async distributeRepurchaseCommission(orderId: string, userId: string, orderTotal: number) {
    let currentReferrerId = await this.getReferrerId(userId);

    for (let level = 1; level <= 3; level++) {
      if (!currentReferrerId) break;

      const commissionRate = REPURCHASE_COMMISSIONS[level - 1];
      const amount = orderTotal * commissionRate;

      await supabase.from('commissions').insert({
        user_id: currentReferrerId,
        from_user_id: userId,
        amount,
        level,
        type: 'repurchase',
        status: 'pending'
      });

      currentReferrerId = await this.getReferrerId(currentReferrerId);
    }
  },

  async getReferrerId(userId: string): Promise<string | null> {
    const { data } = await supabase
      .from('profiles')
      .select('referrer_id')
      .eq('id', userId)
      .single();
    return data?.referrer_id || null;
  },

  /**
   * Fetches the downline for a specific user.
   */
  async getDownline(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, role, referrer_id, subscription_status')
      .eq('referrer_id', userId);
    
    if (error) throw error;
    return data;
  }
};