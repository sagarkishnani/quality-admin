// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "authorization, x-client-info, apikey, content-type",
            },
        });
    }
    try {
        if (req.method === "POST") {
            const data = await req.json();
            const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

            const res = await fetch(
                "https://api.resend.com/emails",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await res.json(); // Devuelve el Id de la transacción { id: "f1f3107f-c863-4b5a-8da6-675719e73987"}
            console.log("result", result);

            return new Response("ok");
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "authorization, x-client-info, apikey, content-type",
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }
});