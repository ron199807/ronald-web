import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { socialLinks } from '../data/socialLinks';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Handle scroll effect for header and track header height
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update header height whenever scrolled
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    // Initial measurements
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setActiveLinkIndex(null);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, menuRef, buttonRef]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Also add padding to header to prevent shift
      if (headerRef.current) {
        headerRef.current.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      
      // Reset header padding
      if (headerRef.current) {
        headerRef.current.style.paddingRight = '';
      }
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      if (headerRef.current) {
        headerRef.current.style.paddingRight = '';
      }
    };
  }, [isMenuOpen]);

  // Handle keyboard navigation in mobile menu
  const handleMenuKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])') || []
    ) as HTMLElement[];

    if (!menuItems.length) return;

    const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = menuItems.length - 1;
        break;
      case 'Tab':
        if (!event.shiftKey && currentIndex === menuItems.length - 1) {
          event.preventDefault();
          nextIndex = 0;
        } else if (event.shiftKey && currentIndex === 0) {
          event.preventDefault();
          nextIndex = menuItems.length - 1;
        }
        break;
      default:
        return;
    }

    menuItems[nextIndex]?.focus();
    setActiveLinkIndex(nextIndex);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  // Animation variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.07,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
  };

  const backdropVariants: Variants = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  const socialIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.3 + custom * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }),
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
  };

  const navItemVariants: Variants = {
    hidden: (custom: number) => ({
      opacity: 0,
      y: -10,
      transition: { delay: custom * 0.1 }
    }),
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 }
    }),
  };

  // Toggle menu with focus management
  const toggleMenu = useCallback(() => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    
    // Update header height when toggling menu
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    if (newState) {
      // Small delay to ensure menu is rendered before focusing
      setTimeout(() => {
        const firstMenuItem = menuRef.current?.querySelector('a, button');
        (firstMenuItem as HTMLElement)?.focus();
      }, 100);
    }
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white dark:bg-gray-900 shadow-sm py-4'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Homepage - My Portfolio"
            >
              My Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8" aria-label="Main navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    className={`relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 group px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      router.pathname === link.href ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}
                    aria-current={router.pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full ${
                      router.pathname === link.href ? 'w-full' : 'w-0'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social Links - Desktop */}
            <div className="flex items-center space-x-4 ml-8 border-l pl-8 border-gray-200 dark:border-gray-700">
              {socialLinks.slice(0, 3).map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={socialIconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${link.color} text-xl hover:scale-110 transition-transform duration-300 p-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    aria-label={`${link.name} (opens in new tab)`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            ref={buttonRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
              role="presentation"
              aria-hidden="true"
              style={{ top: `${headerHeight}px` }}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              id="mobile-menu"
              className="md:hidden fixed w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
              onKeyDown={handleMenuKeyDown}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              tabIndex={-1}
              style={{
                top: `${headerHeight}px`,
                right: 0,
                bottom: 0,
                height: `calc(100vh - ${headerHeight}px)`
              }}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Navigation
                  </h2>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      buttonRef.current?.focus();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Close menu"
                    ref={(el) => {
                      if (el && isMenuOpen && activeLinkIndex === null) {
                        setTimeout(() => el.focus(), 50);
                      }
                    }}
                  >
                    <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.li 
                        key={link.href} 
                        variants={linkVariants}
                        layout
                      >
                        <Link
                          href={link.href}
                          className={`block py-3 px-4 text-lg font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            router.pathname === link.href
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            buttonRef.current?.focus();
                          }}
                          aria-current={router.pathname === link.href ? 'page' : undefined}
                          tabIndex={0}
                          ref={(el) => {
                            if (el && isMenuOpen && activeLinkIndex === index) {
                              setTimeout(() => el.focus(), 50);
                            }
                          }}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Social Links - Mobile */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-center space-x-6">
                    {socialLinks.slice(0, 3).map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          custom={index}
                          variants={socialIconVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className={`${link.color} text-2xl p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                          aria-label={`${link.name} (opens in new tab)`}
                          tabIndex={0}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.a>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Connect with me
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}