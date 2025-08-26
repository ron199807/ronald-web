import Link from 'next/link';
import { socialLinks } from '../data/socialLinks';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>
        
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-blue-500">
              About
            </Link>
            <Link href="/projects" className="hover:text-blue-500">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4 ml-6">
            {socialLinks.slice(0, 3).map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-xl`}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}