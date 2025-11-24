// src/hooks/useWorkLightbox.js

import { useState } from "react";

export default function useWorkLightbox() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const openModal = (media) => {
    setItem(media);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setItem(null), 300);
  };

  return {
    open,
    item,
    openModal,
    closeModal,
  };
}
