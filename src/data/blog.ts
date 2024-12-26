import { IMAGES } from "@/constants/images";
import { formatBlogContent } from "@/utils/blog";

export type Category =
  | "All"
  | "Maintenance"
  | "Tips"
  | "News"
  | "Technology"
  | "Education"
  | "Financial"
  | "Local"
  | "Environmental"
  | "Seasonal"
  | "Commercial";

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  author: Author;
  image: string;
  readTime: string;
  content: string;
}

export const categories: Category[] = [
  "All",
  "Education",
  "Financial",
  "Maintenance",
  "Technology",
  "Local",
  "Environmental",
  "Seasonal",
  "Commercial",
  "Tips",
  "News",
];

export const featuredPosts: BlogPost[] = [
  {
    id: "1",
    slug: "solar-basics-florida-guide",
    title: "Solar Power 101: A Florida Homeowner's Complete Guide",
    excerpt:
      "Everything you need to know about solar power in Florida - from basic concepts to installation and ROI.",
    category: "Education",
    date: "2024-03-20",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/team/sarah-johnson.jpg",
      role: "Solar Education Specialist",
    },
    image: IMAGES.blog.solarBasics,
    readTime: "8 min",
    content: formatBlogContent(`
      Understanding solar power doesn't have to be complicated. In this comprehensive guide, we'll walk through:

      - How solar panels work in Florida's climate
      - Key components of a solar power system
      - Net metering and Florida's solar policies
      - Typical installation process and timeline
      - Maintenance requirements and best practices

      Whether you're just starting your solar journey or ready to make the switch, this guide provides the foundation you need to make informed decisions about solar power in the Sunshine State.
    `),
  },
  {
    id: "2",
    slug: "solar-roi-florida",
    title: "The Real Cost of Solar in Florida: 2024 Analysis",
    excerpt:
      "A detailed breakdown of solar costs, savings, and ROI for Florida homeowners, including tax incentives and financing options.",
    category: "Financial",
    date: "2024-03-15",
    author: {
      name: "David Anderson",
      avatar: "/images/team/david-anderson.jpg",
      role: "Financial Analyst",
    },
    image: "/images/blog/solar-costs.jpg",
    readTime: "10 min",
    content: `
      Let's break down the real numbers behind solar installation in Florida:

      - Current installation costs per watt
      - Available federal and state incentives
      - Utility company rebates and programs
      - Financing options and terms
      - Expected payback period and ROI

      Including real case studies from Florida homeowners who made the switch to solar.
    `,
  },
  {
    id: "3",
    slug: "solar-maintenance-guide",
    title: "Essential Solar Panel Maintenance in Florida's Climate",
    excerpt:
      "Learn how to maintain your solar system's peak performance in Florida's unique weather conditions.",
    category: "Maintenance",
    date: "2024-03-10",
    author: {
      name: "Mike Rodriguez",
      avatar: "/images/team/mike-rodriguez.jpg",
      role: "Service Manager",
    },
    image: "/images/blog/maintenance.jpg",
    readTime: "6 min",
    content: `
      Maximize your solar investment with proper maintenance:

      - Cleaning schedules for Florida's conditions
      - Hurricane season preparation
      - Monitoring system performance
      - When to schedule professional inspections
      - Common issues and troubleshooting
    `,
  },
  {
    id: "4",
    slug: "solar-tech-advances",
    title: "Latest Solar Technology Innovations for 2024",
    excerpt:
      "Discover the newest solar technologies and how they're improving efficiency and savings.",
    category: "Technology",
    date: "2024-03-05",
    author: {
      name: "Aaron Martinez",
      avatar: "/images/team/aaron-martinez.jpg",
      role: "Technical Director",
    },
    image: "/images/blog/solar-tech.jpg",
    readTime: "7 min",
    content: `
      Stay ahead with the latest solar innovations:

      - New panel technologies and efficiency ratings
      - Smart monitoring systems
      - Battery storage advancements
      - Integration with smart homes
      - Future technology trends
    `,
  },
  {
    id: "5",
    slug: "florida-solar-regulations",
    title: "Florida's Solar Regulations: What You Need to Know",
    excerpt:
      "Navigate Florida's solar regulations, permits, and HOA rules with our comprehensive guide.",
    category: "Local",
    date: "2024-02-28",
    author: {
      name: "Lisa Thompson",
      avatar: "/images/team/lisa-thompson.jpg",
      role: "Legal Consultant",
    },
    image: "/images/blog/regulations.jpg",
    readTime: "9 min",
    content: `
      Understanding local regulations is crucial:

      - Current Florida solar laws
      - HOA rights and restrictions
      - Permit requirements by county
      - Net metering policies
      - Insurance considerations
    `,
  },
  {
    id: "6",
    slug: "environmental-impact",
    title: "Solar's Environmental Impact in Florida",
    excerpt:
      "How switching to solar helps protect Florida's unique ecosystem and reduces carbon footprint.",
    category: "Environmental",
    date: "2024-02-20",
    author: {
      name: "Dr. Emily Green",
      avatar: "/images/team/emily-green.jpg",
      role: "Environmental Specialist",
    },
    image: "/images/blog/environmental.jpg",
    readTime: "5 min",
    content: `
      Discover the environmental benefits:

      - Carbon footprint reduction
      - Impact on local wildlife
      - Water conservation benefits
      - Sustainable energy future
      - Local environmental success stories
    `,
  },
  {
    id: "7",
    slug: "seasonal-solar-guide",
    title: "Maximizing Solar Output Through Florida's Seasons",
    excerpt:
      "Optimize your solar system's performance during different Florida weather patterns.",
    category: "Seasonal",
    date: "2024-02-15",
    author: {
      name: "Tom Wilson",
      avatar: "/images/team/tom-wilson.jpg",
      role: "Performance Specialist",
    },
    image: "/images/blog/seasonal.jpg",
    readTime: "6 min",
    content: `
      Season-specific optimization strategies:

      - Summer performance tips
      - Hurricane season preparation
      - Winter optimization
      - Rainy season considerations
      - Seasonal maintenance schedule
    `,
  },
  {
    id: "8",
    slug: "installation-process",
    title: "What to Expect: Solar Installation Process",
    excerpt:
      "A step-by-step guide to the solar installation process, from consultation to final inspection.",
    category: "Installation",
    date: "2024-02-10",
    author: {
      name: "Chris Baker",
      avatar: "/images/team/chris-baker.jpg",
      role: "Installation Manager",
    },
    image: "/images/blog/installation.jpg",
    readTime: "7 min",
    content: `
      Understanding the installation journey:

      - Initial site assessment
      - System design process
      - Installation timeline
      - Inspection and approval
      - System activation and monitoring
    `,
  },
  {
    id: "9",
    slug: "solar-panel-comparison",
    title: "Comparing Solar Panel Options for Florida Homes",
    excerpt:
      "An in-depth comparison of solar panel types, brands, and warranties available in Florida.",
    category: "Technology",
    date: "2024-02-05",
    author: {
      name: "Rachel Chen",
      avatar: "/images/team/rachel-chen.jpg",
      role: "Product Specialist",
    },
    image: "/images/blog/comparison.jpg",
    readTime: "8 min",
    content: `
      Make an informed choice:

      - Panel type comparison
      - Top brands analysis
      - Warranty comparisons
      - Performance ratings
      - Cost-benefit analysis
    `,
  },
  {
    id: "10",
    slug: "future-of-solar",
    title: "The Future of Solar in Florida: 2025 and Beyond",
    excerpt:
      "Explore upcoming trends and innovations in Florida's solar industry.",
    category: "Technology",
    date: "2024-02-01",
    author: {
      name: "Dr. James Wright",
      avatar: "/images/team/james-wright.jpg",
      role: "Research Director",
    },
    image: "/images/blog/future.jpg",
    readTime: "9 min",
    content: `
      Looking ahead to solar's future:

      - Emerging technologies
      - Policy changes and incentives
      - Market trends and predictions
      - New storage solutions
      - Integration with smart cities
    `,
  },
  {
    id: "11",
    slug: "hurricane-protection",
    title: "Solar Panels & Hurricane Season: Complete Protection Guide",
    excerpt:
      "Essential guide to protecting your solar investment during Florida's hurricane season, including preparation and recovery tips.",
    category: "Maintenance",
    date: "2024-01-25",
    author: {
      name: "Mark Stevens",
      avatar: "/images/team/mark-stevens.jpg",
      role: "Safety Specialist",
    },
    image: "/images/blog/hurricane-protection.jpg",
    readTime: "7 min",
    content: `
      Protect your solar investment during severe weather:

      - Hurricane preparation checklist
      - Storm-resistant mounting systems
      - Emergency shutdown procedures
      - Post-storm inspection guide
      - Insurance considerations
    `,
  },
  {
    id: "12",
    slug: "pool-solar-guide",
    title: "Solar Pool Heating: The Complete Florida Guide",
    excerpt:
      "Everything you need to know about solar pool heating systems, from selection to maintenance.",
    category: "Technology",
    date: "2024-01-20",
    author: {
      name: "Jennifer Lopez",
      avatar: "/images/team/jennifer-lopez.jpg",
      role: "Pool Solar Specialist",
    },
    image: "/images/blog/pool-solar.jpg",
    readTime: "8 min",
    content: `
      Maximize your pool's comfort and efficiency:

      - Solar pool heating basics
      - System sizing guidelines
      - Cost comparison vs traditional heating
      - Maintenance requirements
      - Year-round performance tips
    `,
  },
  {
    id: "13",
    slug: "smart-home-integration",
    title: "Integrating Solar with Smart Home Technology",
    excerpt:
      "Learn how to connect your solar system with smart home devices for optimal energy management.",
    category: "Technology",
    date: "2024-01-15",
    author: {
      name: "Alex Kim",
      avatar: "/images/team/alex-kim.jpg",
      role: "Smart Home Integration Expert",
    },
    image: "/images/blog/smart-integration.jpg",
    readTime: "6 min",
    content: `
      Create a truly connected home:

      - Compatible smart home systems
      - Energy monitoring apps
      - Automated optimization
      - Voice control integration
      - Future-proofing your setup
    `,
  },
  {
    id: "14",
    slug: "solar-myths-facts",
    title: "Common Solar Myths in Florida: Fact vs. Fiction",
    excerpt:
      "Debunking common misconceptions about solar power in Florida's unique climate.",
    category: "Education",
    date: "2024-01-10",
    author: {
      name: "Dr. Maria Santos",
      avatar: "/images/team/maria-santos.jpg",
      role: "Solar Educator",
    },
    image: "/images/blog/solar-myths.jpg",
    readTime: "5 min",
    content: `
      Get the facts straight:

      - Weather impact myths
      - Cost misconceptions
      - Performance realities
      - Installation facts
      - ROI truths
    `,
  },
  {
    id: "15",
    slug: "commercial-solar-guide",
    title: "Commercial Solar Installation: A Business Owner's Guide",
    excerpt:
      "Comprehensive guide for Florida business owners considering solar power installation.",
    category: "Commercial",
    date: "2024-01-05",
    author: {
      name: "Robert Chang",
      avatar: "/images/team/robert-chang.jpg",
      role: "Commercial Solar Director",
    },
    image: "/images/blog/commercial-solar.jpg",
    readTime: "10 min",
    content: `
      Make informed business decisions:

      - Commercial system sizing
      - Tax incentives for businesses
      - ROI calculations
      - Installation timeline
      - Employee engagement benefits
    `,
  },
  {
    id: "16",
    slug: "battery-storage-guide",
    title: "Solar Battery Storage: Is It Right for Your Florida Home?",
    excerpt:
      "Everything you need to know about adding battery storage to your solar system.",
    category: "Technology",
    date: "2023-12-28",
    author: {
      name: "Patricia Wu",
      avatar: "/images/team/patricia-wu.jpg",
      role: "Energy Storage Specialist",
    },
    image: "/images/blog/battery-storage.jpg",
    readTime: "8 min",
    content: `
      Understanding battery storage options:

      - Battery types and capacities
      - Cost-benefit analysis
      - Backup power capabilities
      - Installation requirements
      - Future-proofing considerations
    `,
  },
  {
    id: "17",
    slug: "solar-financing",
    title: "Solar Financing Options in Florida: Making the Right Choice",
    excerpt:
      "Compare different financing options for your solar installation, from loans to leases.",
    category: "Financial",
    date: "2023-12-20",
    author: {
      name: "Michael Foster",
      avatar: "/images/team/michael-foster.jpg",
      role: "Financial Advisor",
    },
    image: "/images/blog/solar-financing.jpg",
    readTime: "7 min",
    content: `
      Find the right financing solution:

      - Cash vs. loan comparison
      - Solar lease options
      - PPA agreements
      - Federal tax credits
      - State incentives
    `,
  },
  {
    id: "18",
    slug: "energy-efficiency",
    title: "Maximizing Energy Efficiency with Solar",
    excerpt:
      "Tips and strategies to optimize your home's energy efficiency alongside solar power.",
    category: "Tips",
    date: "2023-12-15",
    author: {
      name: "Sarah Miller",
      avatar: "/images/team/sarah-miller.jpg",
      role: "Energy Efficiency Consultant",
    },
    image: "/images/blog/energy-efficiency.jpg",
    readTime: "6 min",
    content: `
      Optimize your energy usage:

      - Home efficiency audit
      - Insulation improvements
      - Smart thermostat integration
      - LED lighting upgrades
      - Appliance recommendations
    `,
  },
  {
    id: "19",
    slug: "solar-monitoring",
    title: "Understanding Your Solar Monitoring System",
    excerpt:
      "Get the most out of your solar monitoring system with this comprehensive guide.",
    category: "Technology",
    date: "2023-12-10",
    author: {
      name: "David Lee",
      avatar: "/images/team/david-lee.jpg",
      role: "Technical Support Manager",
    },
    image: "/images/blog/solar-monitoring.jpg",
    readTime: "5 min",
    content: `
      Master your monitoring system:

      - Reading system data
      - Performance tracking
      - Problem detection
      - Mobile app features
      - Maintenance alerts
    `,
  },
  {
    id: "20",
    slug: "solar-property-value",
    title: "How Solar Installations Affect Florida Property Values",
    excerpt:
      "Research-based analysis of solar power's impact on Florida real estate values.",
    category: "Financial",
    date: "2023-12-05",
    author: {
      name: "Amanda Johnson",
      avatar: "/images/team/amanda-johnson.jpg",
      role: "Real Estate Analyst",
    },
    image: "/images/blog/property-value.jpg",
    readTime: "7 min",
    content: `
      Understand the real estate impact:

      - Market value increases
      - Buyer preferences
      - ROI calculations
      - Resale considerations
      - Real estate agent insights
    `,
  },
];
