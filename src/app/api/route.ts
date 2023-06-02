import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "OK" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ data: "OK" }, { status: 200 });
}
