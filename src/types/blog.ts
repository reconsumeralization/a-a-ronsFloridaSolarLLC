export interface Author {
  name: string;
  avatar: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  author: Author;
  image: string;
  readTime: string;
  featured?: boolean;
  tags?: string[];
}

export type Category = "All" | "Maintenance" | "Tips" | "News" | "Technology";
