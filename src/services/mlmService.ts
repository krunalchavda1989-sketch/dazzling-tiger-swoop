import { supabase } from '@/lib/supabase';

const REFERRAL_COMMISSIONS = [0.05, 0.045, 0.04, 0.035, 0.03, 0.025, 0.02, 0.015, 0.01];
const REPURCHASE_COMMISSIONS = [0.03, 0.02, 0.01];

export const mlmService = {
  /**
   * Calculates and distributes referral commissions up to 9 levels.
   * Subscription fee is ₹2800.
   */
  async distributeReferralCommission(newUserId: string, referrerId: string) {
    const subscriptionFee = 2800;
    let currentReferrerId = referrerId;

    for (let level = 1; level <= 9; level++) {
      if (!currentReferrerId) break;

      // 1. Check if referrer is qualified for this level
      const isQualified = await this.checkLevelQualification(currentReferrerId, level);
      
      if (isQualified) {
        const commissionRate = REFERRAL_COMMISSIONS[level - 1];
        const amount = subscriptionFee * commissionRate;

        // 2. Record commission
        await supabase.from('commissions').insert({
          user_id: currentReferrerId,
          from_user_id: newUserId,
          amount,
          level,
          type: 'referral',
          status: 'pending'
        });

        // 3. Update wallet (simplified)
        await supabase.rpc('increment_wallet_balance', { 
          user_id: currentReferrerId, 
          amount 
        });
      }

      // Move up the tree
      const { data: parent } = await supabase
        .from('profiles')
        .select('referrer_id')
        .eq('id', currentReferrerId)
        .single();
      
      currentReferrerId = parent?.referrer_id;
    }
  },

  /**
   * Checks if a user meets the criteria for a specific level.
   */
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

  /**
   * Distributes repurchase commissions up to 3 levels.
   */
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
  }
};