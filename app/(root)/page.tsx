import { getGuestByCode } from "@/lib/actions/guest.actions";
import HomeClient from "./home-client";
import { defaultGuest } from "@/lib/constants";
import { listGuestMessages } from "@/lib/actions/guestComment.actions";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ codeRSVP: string }>;
}) {
  const params = await searchParams;
  const guest = params.codeRSVP
    ? await getGuestByCode({ rsvpCode: params.codeRSVP })
    : null;

  if (guest && typeof guest !== "object") {
    throw new Error("Invalid guest data received");
  }

  const messages = await listGuestMessages();
  const listMessages = messages.filter((message) => message.message !== null);

  return <HomeClient guest={guest || defaultGuest} messages={listMessages} />;
}
