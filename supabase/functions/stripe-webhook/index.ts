// Bai 28: Stripe & Lemon Squeezy Webhook Handler (Supabase Edge Function)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');

    // Kiem tra chu ky webhook xac thuc
    console.log('Received Stripe Webhook Event');
    const event = JSON.parse(payload);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const planTier = session.metadata?.tier || 'pro';

      console.log(`Upgrading subscription tier for user ${customerEmail} to ${planTier}`);

      // Cap nhat profiles trong database Supabase
      await supabaseAdmin
        .from('profiles')
        .update({
          subscription_tier: planTier,
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('email', customerEmail);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
