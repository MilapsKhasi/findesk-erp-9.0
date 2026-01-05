
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gimpwjfnuqzvfblvdbdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbXB3amZudXF6dmZibHZkYmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MDkzNTcsImV4cCI6MjA4MzE4NTM1N30.0fs5zNbgTgQkY5dp7KeWIA4hb60S_QIvlXzJ1EdoUBs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
