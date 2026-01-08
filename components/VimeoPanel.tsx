"use client";

import { useEffect, useState } from "react";
import { getVideos, searchVideo } from "@/lib/Vimeo";

interface Video {
  uri: string;
  name: string;
  duration: number;
  pictures?: { sizes: { link: string }[] };
}

export default function VimeoPanel() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    setLoading(true);
    const res: any = await getVideos();
    setVideos(res);
    setLoading(false);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (query.trim() === "") {
      await loadVideos();
      return;
    }

    const res: any = await searchVideo(query);
    setVideos(res);
    setLoading(false);
  }

  function getThumbnail(v: Video) {
    return v.pictures?.sizes?.[3]?.link || "/placeholder.jpg";
  }

  function getVideoId(uri: string) {
    return uri.split("/").pop();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Panel de Videos Vimeo</h2>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar video por título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Buscar
        </button>
      </form>

      {loading && <p>Cargando videos...</p>}

      {!loading && (
        <div className="row">
          {videos.map((v: Video) => (
            <div key={v.uri} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={getThumbnail(v)}
                  className="card-img-top"
                  alt={v.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{v.name}</h5>

                  <p className="card-text">
                    Duración: {Math.round(v.duration / 60)} min
                  </p>

                  <div className="d-flex gap-2">
                    <a
                      href={`/videos/${getVideoId(v.uri)}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver Video
                    </a>

                    <a
                      href={`/videos/stats/${getVideoId(v.uri)}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Stats
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {videos.length === 0 && (
            <p className="text-center mt-4">No se encontraron videos.</p>
          )}
        </div>
      )}
    </div>
  );
}
