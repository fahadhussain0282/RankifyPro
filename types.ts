
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features: string[];
  icon: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  metric: string;
  avatar: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features: string[];
  icon: string;
  image: string;
}
