import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, answers } = await req.json();

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://first-six-months.vercel.app";

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "No API key" }, { status: 500 });
  }

  // Build the personal results URL so it can be included in the email
  const params = new URLSearchParams();
  params.set("name", name);
  if (answers) {
    params.set("answers", JSON.stringify(answers));
  }
  const resultsUrl = `${appUrl}/results?${params.toString()}`;

  const body: Record<string, unknown> = {
    email,
    fields: {
      name,
      results_url: resultsUrl,
    },
    status: "active",
  };
  if (groupId) {
    body.groups = [groupId];
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("MailerLite error:", text);
    return NextResponse.json({ ok: false }, { status: 200 }); // Don't block user
  }

  return NextResponse.json({ ok: true });
}
