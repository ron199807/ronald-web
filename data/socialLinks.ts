import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ron199807',
    icon: FaGithub,
    color: 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ronald-mweema-664276309/?trk=opento_sprofile_pfeditor',
    icon: FaLinkedin,
    color: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/RMweema',
    icon: FaTwitter,
    color: 'text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourusername',
    icon: FaInstagram,
    color: 'text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/100%cool',
    icon: FaYoutube,
    color: 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300',
  },
  {
    name: 'Email',
    url: 'mailto:ronaldmweema@gmail.com',
    icon: FaEnvelope,
    color: 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100',
  },
];