import Image from "next/image";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A responsive portfolio built with Next.js and Tailwind CSS featuring dark mode and project showcase.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    imageUrl: "/assets/images/nextjs.jpeg",
    projectUrl: "https://ronald-fonws3e5n-ron199807s-projects.vercel.app/",
    githubUrl: "https://github.com/ron199807/ronald-web",
    featured: false
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce application with product listings, cart functionality, and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/assets/images/e-commerce.jpeg",
    projectUrl: "/projects/ecommerce",
    githubUrl: "https://github.com/yourusername/ecommerce"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity application for managing tasks with drag-and-drop functionality and team collaboration.",
    tags: ["React", "Firebase", "Redux"],
    imageUrl: "/assets/images/task.jpeg",
    projectUrl: "/projects/task-manager",
    featured: true
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather application with 5-day forecasts and location-based weather data.",
    tags: ["JavaScript", "API Integration", "CSS3"],
    imageUrl: "/assets/images/weather.jpg",
    projectUrl: "/projects/weather-app",
    githubUrl: "https://github.com/yourusername/weather-app"
  }
];