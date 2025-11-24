import React from "react";
import WorkShowcaseTemplate from "@/templates/WorkShowcaseTemplate";
import useWorkLightbox from "@/hooks/useWorkLightbox";
import WorkLightboxModal from "@/components/work/WorkLightboxModal";
import { youtubeItems } from "@/data/work/youtubeData";

export default function YouTubeWorkPage() {
  const { open, item, openModal, closeModal } = useWorkLightbox();

  return (
    <>
      <WorkShowcaseTemplate
        title="YouTube Production"
        description="Thumbnails, long-form edits, storytelling visuals."
        samples={youtubeItems}
        tags={["All", "Thumbnails", "Edits"]}
        theme="emerald"
        onItemClick={openModal}
      />

      <WorkLightboxModal
        open={open}
        item={item}
        onClose={closeModal}
      />
    </>
  );
}
