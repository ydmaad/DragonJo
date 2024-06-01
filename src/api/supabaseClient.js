import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzkoayeawivyvwgpnzvu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6a29heWVhd2l2eXZ3Z3BuenZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNTczMjEsImV4cCI6MjAzMjczMzMyMX0.v7vxRW7a8xOhF0n2c9dcwr6pTu7PZp9x748xcpdbdZA';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
