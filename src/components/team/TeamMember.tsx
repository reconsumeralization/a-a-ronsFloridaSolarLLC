"use client";

import Image from "next/image";

import type { TeamMember } from "@/types/team";

interface TeamMemberProps {
  member: TeamMember;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="font-medium text-lg">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
    </div>
  );
}
