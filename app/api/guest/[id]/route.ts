import { NextResponse } from "next/server";
import { getGuest } from "@/lib/actions/guest.actions";
// import { updateGuest } from "@/lib/validators";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const guest = await getGuest({ id: params.id });

  if (!guest) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(guest);
}

// export async function POST(req: Request) {
//   const formData: updateGuest = await req.json();
//   const guest = await editGuest(formData);

//   if (!guest) {
//     return NextResponse.json({ error: "update error" }, { status: 500 });
//   }

//   return NextResponse.json({ message: "Guest updated successfully", guest });
// }
