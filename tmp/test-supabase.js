const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dnlfieprgmdfsbiwqgkx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRubGZpZXByZ21kZnNiaXdxZ2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDc4OTgsImV4cCI6MjA5MDE4Mzg5OH0.BXmb7ltbfXnILWSfbcOk_J343VbMNfXUK6UMhlQzAf8';

console.log('Testing connection to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Connection Error:', error.message);
      process.exit(1);
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('Auth service is reachable.');
    
    // Check if we can at least reach the DB (schema check)
    const { data: dbData, error: dbError } = await supabase.from('profiles').select('*').limit(1);
    
    if (dbError && dbError.code === 'PGRST116') {
      // This is usually fine, means table exists but no rows or RLS
      console.log('Database is reachable (Table "profiles" exists or is restricted).');
    } else if (dbError) {
        console.log('Database reachable but "profiles" table not found or restricted:', dbError.message);
    } else {
        console.log('Database is fully reachable and responsive.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Unexpected Error:', err.message);
    process.exit(1);
  }
}

testConnection();
