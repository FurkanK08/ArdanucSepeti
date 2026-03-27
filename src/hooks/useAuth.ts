import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../api/supabaseClient';

export function useAuth() {
  const context = useContext(AuthContext);
  const [actionLoading, setActionLoading] = useState(false);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const signInWithOtp = async (phone: string): Promise<{ success: boolean, error?: any }> => {
    setActionLoading(true);
    // Geliştirme/Test aşaması için SMS gönderimini simüle ediyoruz (Supabase SMS ayarlarını baypas etmek için)
    await new Promise(resolve => setTimeout(resolve, 600));
    setActionLoading(false);
    return { success: true };
  };

  const verifyOtp = async (phone: string, token: string) => {
    setActionLoading(true);
    // Sadece Telefon Numarası
    const { error, data } = await supabase.auth.signInWithPassword({
      email: `${phone}@test.com`,
      password: token,
    });
    setActionLoading(false);
    if (error) {
      console.error('Verify OTP Error:', error.message);
      return { error };
    }
    return { success: true, user: data.user };
  };

  const signOut = async () => {
    setActionLoading(true);
    await supabase.auth.signOut();
    setActionLoading(false);
  };

  return {
    ...context,
    actionLoading,
    signInWithOtp,
    verifyOtp,
    signOut,
  };
}
