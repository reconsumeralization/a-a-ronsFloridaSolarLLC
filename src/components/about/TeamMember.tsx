import Image from "next/image";
import Link from "next/link";

import { LinkedInIcon, TwitterIcon } from "@/components/Icons";
import type { TeamMember } from "@/data/team";

interface TeamMemberProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-4">{member.role}</p>
        <p className="text-gray-600 mb-6">{member.bio}</p>
        {member.socialLinks && (
          <div className="flex gap-4">
            {member.socialLinks.linkedin && (
              <Link
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
              </Link>
            )}
            {member.socialLinks.twitter && (
              <Link
                href={member.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
            )}
            {member.socialLinks.email && (
              <Link
                href={`mailto:${member.socialLinks.email}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
