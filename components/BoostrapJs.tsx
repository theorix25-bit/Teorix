'use client';
import { useEffect } from "react";

export default function BoostrapJs() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");

  }, []);

  return <></>;
}