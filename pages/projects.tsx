import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import Image from 'next/image';

// Extract unique categories from project tags
const extractCategories = () => {
  const allTags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => allTags.add(tag));
  });
  return ['All', ...Array.from(allTags).slice(0, 8)]; // Limit to 8 categories + 'All'
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories] = useState(extractCategories());

  // Filter projects based on category and search
  useEffect(() => {
    let result = projects;

    if (selectedCategory !== 'All') {
      result = result.filter(project =>
        project.tags.some(tag =>
          tag.toLowerCase().includes(selectedCategory.toLowerCase())
        ) || project.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, searchQuery]);

  // Animation variants with proper typing
  const pageVariants: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } as const,
    },
  };

  const filterBarVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 20 
      } as const,
    },
  };

  const projectVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 20 
      } as const,
    },
  };

  const emptyStateVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 20 
      } as const,
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    }),
  };

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    active: { 
      scale: 1.1,
      backgroundColor: '#2563eb',
      color: 'white',
    },
  };

  return (
    <>
      <Header />
      
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen py-20 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg"
            >
              PORTFOLIO
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
            >
              My Projects
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              A collection of my work showcasing expertise in modern web technologies,
              responsive design, and innovative solutions.
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12"
          >
            {[
              { label: 'Total Projects', value: projects.length },
              { label: 'Technologies', value: Array.from(new Set(projects.flatMap(p => p.tags))).length },
              { label: 'Featured', value: projects.filter(p => p.featured).length },
              { label: 'Years Experience', value: '5' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statsVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter & Search Bar */}
          <motion.div
            variants={filterBarVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 md:mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by name, tech, or description..."
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <FiGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <FiList className="h-5 w-5" />
                </button>
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiFilter className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <motion.div
              initial={false}
              animate={{
                height: isFilterOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 'auto' : 0,
                opacity: isFilterOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`overflow-hidden mt-4 ${isFilterOpen || 'md:block'}`}
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={selectedCategory === category ? "active" : "initial"}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex justify-between items-center"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProjects.length}</span> of{' '}
              <span className="font-bold">{projects.length}</span> projects
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCategory !== 'All' && `Filtered by: ${selectedCategory}`}
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className={`
                  ${viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
                    : 'space-y-6 md:space-y-8'
                  }
                `}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={projectVariants}
                    layout
                    whileHover={{ 
                      y: -10,
                      transition: { type: "spring" as const, stiffness: 400, damping: 25 }
                    }}
                    className={viewMode === 'list' ? 'w-full' : ''}
                  >
                    <ProjectCard 
                      project={project} 
                      viewMode={viewMode}
                      index={index}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={emptyStateVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-16 md:py-24"
              >
                <div className="max-w-md mx-auto">
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                    No Projects Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search or filter to find what you&apos;re looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Button */}
          {filteredProjects.length > 0 && filteredProjects.length < projects.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => {
                  // Implement load more logic here
                }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Load More Projects
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </motion.main>
      
      <Footer />
    </>
  );
}