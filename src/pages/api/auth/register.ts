import type { APIRoute } from 'astro';
import { supabase } from '@lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  // Get User Info
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  // User Info Validation
  if (!email || !password) {
    return new Response('Email and Password are required', {
      status: 400,
    });
  }

  // Register User in Databse
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect('/signin');
};
