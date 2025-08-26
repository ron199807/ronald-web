import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
          <div className="prose dark:prose-invert">
            <p>
              I'm a passionate developer with experience in building web applications
              using modern technologies. My focus is on creating clean, efficient,
              and user-friendly interfaces.
            </p>
            {/* Add more content */}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}