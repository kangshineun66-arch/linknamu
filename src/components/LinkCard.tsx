"use client";

import type { LinkItem } from "@/lib/links";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const handleClick = () => {
    navigator.sendBeacon?.(`/api/click/${link.id}`);
  };

  const isMailto = link.url.startsWith("mailto:");

  return (
    <a
      href={link.url}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-center font-medium text-[#3a2f28] shadow-[0_4px_20px_-6px_rgba(180,110,60,0.25)] backdrop-blur-md transition-colors duration-200 hover:bg-white/55 active:bg-white/50"
    >
      {link.label}
    </a>
  );
}
