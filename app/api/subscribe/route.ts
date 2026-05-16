import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "No API key" }, { status: 500 });
  }

  const body: Record<string, unknown> = {
    email,
    fields: { name },
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
