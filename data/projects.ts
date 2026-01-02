export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
  backendUrl?: string;
  tags: string[];
  featured?: boolean;
  category?: string;
  date?: string;
  stats?: {
    stars?: number;
    forks?: number;
  };
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
    title: "Airbnb Clone",
    description: "A full-stack Airbnb clone with user authentication, property listings, and booking functionality.",
    tags: ["React", "Node.js", "Next.js", "tailwindcss"],
    imageUrl: "/assets/images/airbnb.webp",
    projectUrl: "https://alx-listing-app-deployed-nine-gamma.vercel.app/",
    githubUrl: "https://github.com/ron199807/alx-listing-app-deployed"
  },
  {
    id: 3,
    title: "e-learning Platform",
    description: "A comprehensive e-learning platform with course management, quizzes, and progress tracking.",
    tags: ["React","Next.js", "Django", "REST API"],
    imageUrl: "/assets/images/btee.png",
    projectUrl: "https://btee-lms.vercel.app/",
    githubUrl: "https://github.com/ron199807/btee-lms",
    backendUrl: "https://github.com/ron199807/elearning-backend",
    featured: true
  },
  {
    id: 4,
    title: "Movie Forest",
    description: "A movie discovery app that allows users to search for movies, view details, and get recommendations.",
    tags: ["typescript", "API Integration", "Tailwind CSS", "React", "Next.js"],
    imageUrl: "/assets/images/movie.webp",
    projectUrl: "https://the-movie-forest.vercel.app/",
    githubUrl: "https://github.com/ron199807/the-movie-forest"
  }
];