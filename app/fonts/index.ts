  import localFont from "next/font/local";

export const luckiest = localFont({
  src: [{ path: "./LuckiestGuy-Regular.ttf", style: "italic", weight: " 900" }],
  variable: "--font-luckiest",
});

export const made_tommy = localFont({
  src: [{ path: "./made_tommy/MADE TOMMY Medium_PERSONAL USE.otf" }],
  variable: "--font-made_tommy",
});

export const BOOMSTER = localFont({
  src: [{ path: "./boomster_graffiti/BOOMSTER.otf" }],
  variable: "--font-BOOMSTER",
});
export const umberto = localFont({
  src: [{ path: "./umberto/umberto.ttf" }],
  variable: "--font-umberto",
});
export const tangosans = localFont({
  src: [{ path: "./tangosans/TangoSans.ttf" }],
  variable: "--font-tangosans",
});
export const unageo = localFont({
  src: [{ path: "./unageo/ttf/Unageo-Black.ttf" }],
  variable: "--font-unageo",
});
export const monkeyboy = localFont({
  src: [{ path: "./monkeyboy/Monkeyboy.ttf" }],
  variable: "--font-monkeyboy",
});

export const adumu = localFont({
  src: [{path:"./adumu.ttf"}],
  variable: "--font-adumu"
})

export const fruity = localFont({
  src:[{path:"./Fruity Smoothie Font/Fruity Smoothie Font.otf"}],
  variable:"--font-fruity"
})
export const kinder = localFont({
  src:[{path:"./Kindergarten Krayon Font/KindergartenKrayon.otf"}],
  variable:"--font-kinder"
})
export const fuentes = {
  tangosans,
  made_tommy,
  luckiest,
  BOOMSTER,
  umberto,
  unageo,
  monkeyboy,
  adumu,
  fruity,
  kinder
};

export const fontvars = Object.values(fuentes)
  .map((f) => f.variable)
  .join(" ");
