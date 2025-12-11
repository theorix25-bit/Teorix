type VimeoUrl =
  | `https://vimeo.com/${string}`
  | `https://player.vimeo.com/video/${string}`;
  
type Video = {
  uri: string;
  name: string;
  description: string;
  type: string;
  link: string;
  player_embed_url: VimeoUrl;
  duration: number;
  width: number;
  language: string;
  height: number;
  embed: {};
};
