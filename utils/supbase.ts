import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://yecocbjioleasmoczqvc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllY29jYmppb2xlYXNtb2N6cXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NjY5MTMsImV4cCI6MjA2NzA0MjkxM30.qGkU4GrivgMcEP7ncRe26krvAaAAXCJP36P3_ruqKlo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
