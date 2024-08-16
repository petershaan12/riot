"use client";

import Image from "next/image";
import { useState } from "react";

function EventImage({
  imageUrl,
  title,
  className,
  size,
}: {
  imageUrl: string;
  title: string;
  className?: string;
  size?: number;
}) {
  const [imageSrc, setImageSrc] = useState(
    imageUrl || "/assets/images/no-picture.png"
  );

  const handleError = () => {
    setImageSrc("/assets/images/no-picture.png");
  };

  return (
    <Image
      src={imageSrc}
      width={size}
      height={size}
      alt={`Gambar ${title}`}
      className={className}
      onError={handleError}
    />
  );
}

export default EventImage;
