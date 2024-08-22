import { supabase } from '@lib/supabase';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({
  request,
  cookies,
  redirect,
}) => {
  // Get User Info from form
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  // Server Side form Validation
  if (!email || !password) {
    return new Response('Email and Password are required', {
      status: 400,
    });
  }

  // Sign the User in using email and password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(error);
  console.log(data);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // Get the JWT token from the session
  const { access_token, refresh_token } = data.session;
  cookies.set('sb-access-token', access_token, {
    path: '/',
  });
  cookies.set('sb-refresh-token', refresh_token, {
    path: '/',
  });

  return redirect('/dashboard');
};
