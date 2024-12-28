import Image from "next/image";

import { IMAGES } from "@/constants/images";

export function Certifications() {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Image
        src={IMAGES.logos.nabcep}
        alt="NABCEP Certified"
        width={200}
        height={100}
      />
      <Image
        src={IMAGES.logos.fseia}
        alt="FSEIA Member"
        width={200}
        height={100}
      />
      <Image
        src={IMAGES.logos.bbb}
        alt="BBB Accredited"
        width={200}
        height={100}
      />
    </div>
  );
}
