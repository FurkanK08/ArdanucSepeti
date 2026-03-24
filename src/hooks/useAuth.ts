import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../api/supabaseClient';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
  }, []);

  const signInWithOtp = async (phone: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });
    setLoading(false);
    if (error) {
      console.error('OTP Error:', error.message);
      return { error };
    }
    return { success: true };
  };

  const verifyOtp = async (phone: string, token: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
    setLoading(false);
    if (error) {
      console.error('Verify OTP Error:', error.message);
      return { error };
    }
    return { success: true, user: data.user };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    user,
    loading,
    signInWithOtp,
    verifyOtp,
    signOut,
  };
}
