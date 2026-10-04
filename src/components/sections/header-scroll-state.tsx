"use client";

import { useEffect } from "react";

// Único estado de cliente do header: marca `data-scrolled` quando a página sai do topo.
// O header continua Server Component; o visual de cada estado fica nas classes dele.
export function HeaderScrollState({ threshold = 8 }: { threshold?: number }) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      header.toggleAttribute("data-scrolled", window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Estado inicial: reload no meio da página ou entrada direta por #âncora.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return null;
}
