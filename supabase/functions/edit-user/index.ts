import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://vauxeythnbsssxnhvntg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdXhleXRobmJzc3N4bmh2bnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1MTA4MTUsImV4cCI6MjAwNjA4NjgxNX0.9oBLviXj_kDW8vKRD095V28VT8dlgOa_VM_KGBDE1Kg';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  if (req.method === 'PUT') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      }
    })
  }
  try {
    if (req.method === 'PUT') {
      const { email, Name, PhoneNumber, IdRole, IdCompany, Dni, ImageUrl, Position } = await req.json();

      const { data: user, error } = await supabase.auth.admin.updateUser({
        email
      });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            'Content-Type': 'application/json',
          },
          status: 500,
        });
      }

      const { data: userData, error: userError } = await supabase
        .from('User')
        .update([
          {
            email: email,
            Name: Name,
            PhoneNumber: PhoneNumber,
            IdRole: IdRole,
            IdCompany: IdCompany,
            Dni: Dni,
            ImageUrl: ImageUrl,
            Position: Position
          }
        ])
        .eq('email', email)

      if (userError) {
        return new Response(JSON.stringify({ error: userError.message }), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            'Content-Type': 'application/json',
          },
          status: 500,
        });
      }

      return new Response(
        JSON.stringify({ message: 'El usuario se actualizó exitosamente', userData }),
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            'Content-Type': 'application/json',
          },
          status: 200,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});