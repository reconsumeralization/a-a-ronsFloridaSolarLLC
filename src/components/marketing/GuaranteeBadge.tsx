import Image from "next/image";

import { IMAGES } from "@/constants/images";

export function GuaranteeBadge() {
  return (
    <Image
      src={IMAGES.marketing.guarantee}
      alt="Our Guarantee"
      width={200}
      height={200}
      className="rounded-full shadow-lg"
    />
  );
}
