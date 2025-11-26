import { Vimeo } from "@vimeo/vimeo";
export function createClientVimeo() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_VIMEO_CLIENT_ID!;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_VIMEO_CLIENT_SECRET!;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN!;

  let client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

  return client;
}
