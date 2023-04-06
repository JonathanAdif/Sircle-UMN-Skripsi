import { supabase } from "@/lib/supabase";

// fungsi untuk login dengan email dan password via firebase
export const SignIn = async (email, password) => {
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// fungsi untuk logout via firebase
export const SignOut = async () => {
  await supabase.auth.signOut();
};

