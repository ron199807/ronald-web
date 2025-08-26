import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12">All Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}