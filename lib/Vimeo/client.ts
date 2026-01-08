import { Vimeo } from "@vimeo/vimeo";
export function createClientVimeo() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_VIMEO_CLIENT_ID!;
  const CLIENT_SECRET = process.env.VIMEO_CLIENT_SECRET!;
  const ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN!;

  if (!CLIENT_ID) throw new Error("Missing CLIENT_ID");
  if (!CLIENT_SECRET) throw new Error("Missing CLIENT_SECRET");
  if (!ACCESS_TOKEN) throw new Error("Missing ACCESS_TOKEN");

  let client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

  return client;
}
