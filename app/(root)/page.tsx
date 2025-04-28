import { getGuestByCode, listGuestMessages } from "@/lib/actions/guest.actions";
import HomeClient from "./home-client";
import { defaultGuest } from "@/lib/constants";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;
  const guest = params.codeRSVP
    ? await getGuestByCode({ rsvpCode: params.codeRSVP })
    : null;

  if (guest && typeof guest !== "object") {
    throw new Error("Invalid guest data received");
  }

  const messages = await listGuestMessages();
  const listMessages = messages.filter(
    (message) => message.greetingMessage !== null
  );
  console.log(listMessages);

  return <HomeClient guest={guest || defaultGuest} messages={listMessages} />;
}
