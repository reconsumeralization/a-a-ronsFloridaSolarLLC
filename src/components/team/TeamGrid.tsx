"use client";

import type { TeamMember } from "@/types/team";

import { TeamMember as TeamMemberComponent } from "./TeamMember";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member) => (
        <TeamMemberComponent key={member.name} member={member} />
      ))}
    </div>
  );
}
