import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import { links } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = await getMongoClient();
  const db = client.db();

  const docs = await db
    .collection("linkClicks")
    .find({ linkId: { $in: links.map((link) => link.id) } })
    .toArray();

  const counts: Record<string, number> = {};
  for (const link of links) {
    counts[link.id] = 0;
  }
  for (const doc of docs) {
    counts[doc.linkId] = doc.count ?? 0;
  }

  return NextResponse.json(counts);
}
