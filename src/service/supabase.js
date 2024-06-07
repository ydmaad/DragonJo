import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL || 'https://dkodekduyiphnphkezzv.supabase.co';
const supabaseKey =
  process.env.SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb2Rla2R1eWlwaG5waGtlenp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTE2NDAsImV4cCI6MjAzMjk4NzY0MH0.n3mW_dm-FXii0JTixShDnM7eRRzKhJcZBGyjc357iHI';
export const supabase = createClient(supabaseUrl, supabaseKey);
