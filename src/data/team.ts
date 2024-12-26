import { IMAGES } from "@/constants/images";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "john-smith",
    name: "John Smith",
    role: "Solar Installation Expert",
    bio: "With over 15 years in solar energy, John founded A-A-RON Florida Solar with a mission to make sustainable energy accessible to all Florida residents.",
    image: IMAGES.team.avatars[0],
    socialLinks: {
      linkedin: "https://linkedin.com/in/john-smith",
      twitter: "https://twitter.com/johnsmith",
      email: "john@aaronsolar.com",
    },
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Customer Success Manager",
    bio: "Sarah brings 10 years of engineering expertise, ensuring our installations meet the highest standards of quality and efficiency.",
    image: IMAGES.team.avatars[1],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarah-johnson",
      email: "sarah@aaronsolar.com",
    },
  },
  {
    id: "mike-wilson",
    name: "Mike Wilson",
    role: "Operations Manager",
    bio: "Mike oversees our installation teams and ensures every project is completed on time and to our exacting standards.",
    image: IMAGES.team.avatars[2],
    socialLinks: {
      linkedin: "https://linkedin.com/in/mike-wilson",
      email: "mike@aaronsolar.com",
    },
  },
];

export const companyValues = [
  {
    title: "Sustainability",
    description:
      "We're committed to promoting clean, renewable energy solutions that protect our environment for future generations.",
    icon: "leaf",
  },
  {
    title: "Excellence",
    description:
      "We maintain the highest standards in every installation, using top-quality materials and proven techniques.",
    icon: "star",
  },
  {
    title: "Innovation",
    description:
      "We stay at the forefront of solar technology, continuously adapting to provide the best solutions.",
    icon: "lightbulb",
  },
  {
    title: "Integrity",
    description:
      "We operate with complete transparency, providing honest advice and fair pricing to all our customers.",
    icon: "shield",
  },
];

export const companyHistory = [
  {
    year: 2015,
    title: "Company Founded",
    description:
      "A-A-RON Florida Solar was established with a mission to bring sustainable energy to Florida homes.",
  },
  {
    year: 2017,
    title: "Expansion",
    description:
      "Opened our second office and expanded our service area to cover all of Central Florida.",
  },
  {
    year: 2019,
    title: "Innovation Award",
    description:
      "Received the Florida Clean Energy Innovation Award for our community solar initiatives.",
  },
  {
    year: 2022,
    title: "Milestone Achievement",
    description:
      "Completed our 1,000th solar installation and launched our maintenance program.",
  },
];
