import { Metadata } from "next";

import { CompanyHistory } from "@/components/about/CompanyHistory";
import { CompanyValues } from "@/components/about/CompanyValues";
import { TeamGrid } from "@/components/team/TeamGrid";
import { companyHistory, companyValues, teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us | A-A-RON Florida Solar",
  description: "Learn about Florida's trusted solar installation company",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-600">
            Leading Florida&apos;s transition to sustainable energy with expert
            solar solutions and exceptional service
          </p>
        </div>

        {/* Company Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <CompanyValues values={companyValues} />
        </section>

        {/* Team Members */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <TeamGrid members={teamMembers} />
        </section>

        {/* Company History */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <CompanyHistory history={companyHistory} />
        </section>
      </div>
    </div>
  );
}
