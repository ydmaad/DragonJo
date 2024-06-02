import { supabase } from './supabase';

export async function registerUser({ email, password, username }) {
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar_url: ''
      }
    }
  });

  return response;
}

export async function loginUser({ email, password }) {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}
