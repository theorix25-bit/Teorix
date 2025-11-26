"use client";

export default function UploadVideoForm() {
  const upload = async (e:any) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const res = await fetch("/api/vimeo/upload", {
      method: "POST",
      body: form
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <form onSubmit={upload} className="border rounded-4 px-4 py-3">
      <input className="w-100 mb-2 rounded p-1" type="file" name="file" accept="video/*" required />
      <input className="w-100 mb-2 rounded p-1" type="text" name="title" placeholder="Título" />
      <button className="btn btn-theorix w-100" type="submit">Subir video</button>
    </form>
  );
}
