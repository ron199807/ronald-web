import { useState } from 'react';
import Image from 'next/image';
import { Project } from '../data/projects';
import { motion, Variants } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
  className?: string;
  viewMode?: 'grid' | 'list';
  index?: number;
}

export default function ProjectCard({ 
  project, 
  className = '',
  viewMode = 'grid',
  index = 0
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants with proper typing
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: index * 0.05,
      } as const,
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    } as const,
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.3 }
    } as const,
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3 + custom * 0.05 }
    }),
    hover: { scale: 1.1, y: -2 }
  };

  const hoverAnimation = viewMode === 'grid' ? {
    y: -10,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  } : {};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverAnimation}
      className={`
        ${viewMode === 'grid' 
          ? 'h-full flex flex-col' 
          : 'flex flex-col md:flex-row gap-6'
        }
        bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
        shadow-lg hover:shadow-2xl transition-all duration-300
        group ${className}
      `}
    >
      {/* Project Image */}
      <motion.div
        variants={imageVariants}
        className={`
          relative overflow-hidden
          ${viewMode === 'grid' 
            ? 'h-48 md:h-56 lg:h-64' 
            : 'md:w-1/3 h-48 md:h-auto'
          }
        `}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className={`
            object-cover transition-all duration-500
            ${!imageLoaded ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
            group-hover:scale-110
          `}
          sizes={viewMode === 'grid' 
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            : "(max-width: 768px) 100vw, 33vw"
          }
          priority={index < 3}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-4 right-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-50" />
              <div className="relative flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <FiStar className="w-3 h-3" />
                <span>Featured</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.projectUrl && (
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white transition-colors shadow-lg"
            >
              <FiExternalLink className="w-5 h-5" />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gray-900/90 backdrop-blur-sm rounded-full text-white hover:bg-gray-900 transition-colors shadow-lg"
            >
              <FiGithub className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Project Content */}
      <motion.div
        variants={contentVariants}
        className={`
          flex flex-col flex-1 p-6
          ${viewMode === 'list' ? 'md:w-2/3' : ''}
        `}
      >
        {/* Title and Description */}
        <div className="flex-1">
          <motion.h3 
            className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              custom={tagIndex}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium shadow-sm"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <motion.span
              variants={tagVariants}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              +{project.tags.length - 4} more
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          {project.projectUrl && (
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn inline-flex items-center gap-2 flex-1 justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Live Demo</span>
              <FiExternalLink className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn inline-flex items-center gap-2 flex-1 justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <FiGithub className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
        </div>

        {/* Stats (optional) */}
        {(project.stats || project.date) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            {project.stats && (
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {project.stats.stars && (
                  <span className="flex items-center gap-1">
                    <FiStar className="w-4 h-4" />
                    {project.stats.stars}
                  </span>
                )}
                {project.stats.forks && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {project.stats.forks}
                  </span>
                )}
              </div>
            )}
            {project.date && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short' 
                })}
              </span>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}