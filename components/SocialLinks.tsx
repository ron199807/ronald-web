// components/SocialLinks.tsx
import { socialLinks } from '../data/socialLinks';

export interface SocialLinksProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  hoverEffect?: 'scaleup' | 'colorchange' | 'slideup';
}

export default function SocialLinks({ className = '', iconSize = 'md' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} transition-colors duration-200`}
            aria-label={link.name}
          >
            <Icon className={sizeClasses[iconSize]} />
          </a>
        );
      })}
    </div>
  );
}