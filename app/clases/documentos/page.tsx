"use client";

import { getBucket, getSignedUrl } from "@/lib/supabase";
import { useEffect, useState } from "react";

export async function getBuckets() {
  const res = await fetch("/api/buckets");
  return res.json();
}

export default function page() {
  const [data, setData] = useState<string>("#");
  useEffect(() => {
    async function fetch() {
      const res = await getSignedUrl(
        "documents",
        // "private/1763742307493-Manual de Buenas Practicas GTC.pdf"
        "private/1763733877939-DGT_imagen.jpg"
      );
      console.log(res.data?.signedUrl);
      setData(res.data?.signedUrl!);
    }
    fetch();
  }, []);

  return (
    <>
      <div className="">
        {/* <img style={{ width: "250px" }} src={data} alt="" /> */}
        {/* <iframe src={data} width="100%" height="690px"></iframe> */}

        {/* <iframe
          src="https://gamma.app/embed/j51hma66vuvskt3"
          style={{ width: "100vw", maxWidth: "100%", height: "450px" }}
          allow="fullscreen"
          title="El Algoritmo"
          className="px-4"
        ></iframe> */}
      </div>
    </>
  );
}
