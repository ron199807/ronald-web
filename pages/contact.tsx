import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>
          <ContactForm />
        </div>
      </main>
      
      <Footer />
    </>
  );
}