import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db();

  await db
    .collection("linkClicks")
    .updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });

  return NextResponse.json({ ok: true });
}
