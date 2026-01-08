import { Vimeo } from "@vimeo/vimeo";
import "server-only";

const VIMEO_CLIENT_ID = process.env.VIMEO_CLIENT_ID;
const VIMEO_CLIENT_SECRET = process.env.VIMEO_CLIENT_SECRET!;
const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

if (!VIMEO_CLIENT_ID) throw new Error("Missing VIMEO_CLIENT_ID");
if (!VIMEO_CLIENT_SECRET) throw new Error("Missing VIMEO_CLIENT_SECRET");
if (!VIMEO_ACCESS_TOKEN) throw new Error("Missing VIMEO_ACCESS_TOKEN");

export const vimeoClient = new Vimeo(
  VIMEO_CLIENT_ID!,
  VIMEO_CLIENT_SECRET!,
  VIMEO_ACCESS_TOKEN!
);
