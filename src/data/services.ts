export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceRange: string;
  benefits: {
    title: string;
    description: string;
  }[];
}

export const services: Service[] = [
  {
    id: "installation",
    title: "Solar Installation",
    description:
      "Professional solar panel installation for residential and commercial properties",
    icon: "solar-panel",
    features: [
      "Free site assessment",
      "Custom system design",
      "Professional installation",
      "Permit handling",
      "Utility coordination",
      "System monitoring setup",
    ],
    priceRange: "Starting at $15,000",
    benefits: [
      {
        title: "Energy Independence",
        description:
          "Generate your own clean energy and reduce dependence on the grid",
      },
      {
        title: "Increased Home Value",
        description:
          "Solar installations can increase property value by 4-6% on average",
      },
      {
        title: "Tax Incentives",
        description:
          "Take advantage of federal and state tax credits for solar installation",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Cleaning",
    description:
      "Regular maintenance and cleaning services to keep your solar system performing at its best",
    icon: "wrench",
    features: [
      "Bi-annual cleaning",
      "System inspection",
      "Performance monitoring",
      "Repair services",
      "Emergency support",
      "Warranty service",
    ],
    priceRange: "$199/year",
    benefits: [
      {
        title: "Optimal Performance",
        description:
          "Regular maintenance ensures maximum energy production efficiency",
      },
      {
        title: "Extended Lifespan",
        description:
          "Proper care can extend the life of your solar installation by years",
      },
      {
        title: "Peace of Mind",
        description:
          "24/7 monitoring and support for any issues that may arise",
      },
    ],
  },
  {
    id: "consultation",
    title: "Solar Consultation",
    description:
      "Expert consultation to help you make informed decisions about solar energy",
    icon: "clipboard",
    features: [
      "Energy usage analysis",
      "ROI calculation",
      "System recommendations",
      "Financial options review",
      "Incentive guidance",
      "Timeline planning",
    ],
    priceRange: "Free",
    benefits: [
      {
        title: "Expert Guidance",
        description:
          "Get professional advice tailored to your specific needs and situation",
      },
      {
        title: "Cost Savings",
        description:
          "Understand potential savings and choose the most cost-effective solution",
      },
      {
        title: "Clear Planning",
        description: "Receive a detailed roadmap for your solar energy journey",
      },
    ],
  },
];
