'use client'

import { XIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

interface IProps {
  onClose: () => void;
  image: {
    src: string;
    alt: string;
  } | null;
}

function ImageZoom({ image, onClose }: IProps) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 max-w-sm mx-auto overflow-y-auto z-50 bg-background/90 flex flex-col gap-3 animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <p className="text-sm font-medium truncate pr-4">{image.alt}</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
        >
          <XIcon weight="bold" className="size-5" />
        </Button>
      </div>

      {/* Zoomable image area — prevent propagation so tap on image doesn't close */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-xl select-none"
          style={{ touchAction: "pinch-zoom" }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <p className="text-muted-foreground text-[11px] text-center pb-4 shrink-0">
        Ketuk di luar gambar untuk tutup
      </p>
    </div>
  )
}

export default ImageZoom