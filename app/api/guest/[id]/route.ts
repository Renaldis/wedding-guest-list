import { NextResponse } from "next/server";
import { getGuest } from "@/lib/actions/guest.actions";
// import { updateGuest } from "@/lib/validators";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const guest = await getGuest({ id });

  if (!guest) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(guest);
}
