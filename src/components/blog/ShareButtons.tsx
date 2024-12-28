"use client";

import { usePathname } from "next/navigation";

import { ClientButton } from "@/components/shared/ClientButton";

import { FacebookIcon, LinkedInIcon, TwitterIcon } from "../Icons";

interface ShareButtonsProps {
  title: string;
  description: string;
}

export function ShareButtons({ title, description }: ShareButtonsProps) {
  const pathname = usePathname();
  const url = `https://aaronsolar.com${pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      url:
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#4267B2]",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url:
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: "bg-[#0077B5]",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600">Share:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <ClientButton
            key={link.name}
            onClick={() => window.open(link.url, "_blank")}
            className={`${link.color} p-2 rounded-full text-white hover:opacity-90 transition-opacity`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </ClientButton>
        ))}
      </div>
    </div>
  );
}
