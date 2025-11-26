import VimeoPlayer from "@/components/VimeoPlayer";
import { searchVideo } from "@/lib/Vimeo";
async function page() {
  const data = await searchVideo("Viedeo_1_Viemo");
  const url = data[0].player_embed_url
  return (
    <div className="container mx-auto">
      <VimeoPlayer id={url} />
    </div>
  );
}

export default page;
