import { supabase } from './supabase';

export async function registerUser([email, password, _, username]) {
  const response = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
        avatar_url: ''
      }
    }
  });

  return response;
}

export async function loginUser([email, password]) {
  const response = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  return response;
}
