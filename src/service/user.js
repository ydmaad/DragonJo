import { supabase } from './supabase';

export async function registerUser([email, password, _, user_name]) {
  const response = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        user_name: user_name.value,
        avatar_url: ''
      }
    }
  });

  return response;
}

export async function logInUser([email, password]) {
  const response = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  return response;
}

export async function logOutUser() {
  const response = await supabase.auth.signOut();

  return response;
}
