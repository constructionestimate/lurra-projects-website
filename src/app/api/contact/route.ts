import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 200);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const details = String(body.details || "").trim().slice(0, 4000);
    const preferredContact = String(body.preferred_contact || "either").slice(0, 20);

    if (!name || !email || !details) {
      return NextResponse.json({ error: "Name, email, and project details are required." }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Contact form is not configured yet. Please call 0400 810 107 or email Lachie@lurraprojects.com.au." },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("lurra_contacts").insert({
      name,
      email,
      phone: phone || null,
      project_details: details,
      preferred_contact: preferredContact,
      source: "website",
    });

    if (error) {
      console.error("lurra_contacts insert error", error);
      return NextResponse.json({ error: "Could not save your enquiry. Please call 0400 810 107." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}