"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically load bootstrap's bundle only on the client-side
    (import("bootstrap/dist/js/bootstrap.bundle.min.js") as Promise<unknown>);
  }, []);

  return null;
}