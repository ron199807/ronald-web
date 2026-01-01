import Header from '../components/Header';
import Footer from '../components/Footer';
import { Code, Server, Smartphone, Globe, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  const skills = {
    'Backend Development': [
      { name: 'Django/Django REST', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'PostgreSQL/MySQL', level: 85 },
      { name: 'Redis/Celery', level: 80 },
    ],
    'Frontend Development': [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    'Mobile Development': [
      { name: 'React Native', level: 85 },
      { name: 'Expo', level: 80 },
      { name: 'Mobile Architecture', level: 75 },
    ],
    'DevOps & Tools': [
      { name: 'Docker', level: 85 },
      { name: 'AWS/Azure', level: 75 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Git/GitHub Actions', level: 90 },
    ],
  };

  const methodologies = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance Optimization',
      description: 'Implementing code splitting, caching strategies, and database optimization for lightning-fast applications',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security First',
      description: 'Building secure applications with proper authentication, authorization, and data protection measures',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Scalable Architecture',
      description: 'Designing systems that scale efficiently with growing user bases and data loads',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Full-Stack Developer
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Specializing in Django, React, Next.js, and React Native to build performant, scalable applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">My Approach</h2>
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    With over 5 years of experience in full-stack development, I bridge the gap between robust backend systems and intuitive frontend interfaces. My expertise spans from crafting RESTful APIs with Django to building responsive SPAs with React and Next.js.
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and following best practices. Whether it&apos;s optimizing database queries, implementing server-side rendering, or building cross-platform mobile apps, I focus on delivering solutions that are both efficient and scalable.
                  </p>
                  <p>
                    My experience includes working with startups and enterprises, giving me insights into different development workflows, project requirements, and team dynamics.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Web Applications</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Full-stack web apps with Django backend and React/Next.js frontend
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Mobile Apps</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Cross-platform mobile applications using React Native
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                    <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Backend Systems</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Scalable APIs and microservices with Django REST Framework
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Architecture</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    System design and scalable application architecture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-xl mb-6 text-gray-800 dark:text-white">{category}</h3>
                  <div className="space-y-5">
                    {items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodologies Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Development Philosophy</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {methodologies.map((method, index) => (
                <div key={index} className="group">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-white">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-center mb-8">Preferred Tech Stack</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Django', 'Django REST', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 
                  'React Native', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'GraphQL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Let&apos;s Build Something Amazing</h2>
              <p className="text-xl mb-8 opacity-90">
                Have a project in mind? I&apos;d love to hear about it and discuss how we can work together to bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}