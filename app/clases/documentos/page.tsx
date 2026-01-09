"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// export async function getBuckets() {
//   const res = await fetch("/api/buckets");
//   return res.json();
// }

export default function page() {
  useEffect(() => {
    async function fetch() {
      
      const expireIn = 60;
      
      // if (error) console.error(error);
      // console.log(data?.signedUrl);
    }
    fetch();
  }, []);

  return (
    <>
      <div className="">
        hola
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
