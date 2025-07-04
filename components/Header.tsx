import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LikeCounter from './LikeCounter';
import ReactGA from 'react-ga4';
import AskTarsButton from './AskTarsButton';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Menu, X, Github, Linkedin, MessageCircle } from 'lucide-react';

const Header = ({ currentLink = '', loading = false }) => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleThemeMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const NavLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <>
      <Link href="/">
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${
            currentLink === '' ? 'text-primary' : 'text-muted-foreground'
          } ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Home
        </Button>
      </Link>
      <Link href="/projects">
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${
            currentLink === 'projects'
              ? 'text-primary'
              : 'text-muted-foreground'
          } underline-offset-2 ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Projects
        </Button>
      </Link>
      <Link href="/resume">
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${
            currentLink === 'resume' ? 'text-primary' : 'text-muted-foreground'
          } ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Resume
        </Button>
      </Link>
      {mobile && (
        <Link href="/tars">
          <Button
            variant="link"
            onClick={onLinkClick}
            className={`${
              currentLink === 'tars' ? 'text-primary' : 'text-muted-foreground'
            } ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
          >
            Tars AI
          </Button>
        </Link>
      )}
      <Button
        variant="link"
        onClick={() => {
          ReactGA.event({
            category: 'Button.Click',
            action: 'Github Link',
          });
          window.open('https://github.com/vivek9patel');
          onLinkClick();
        }}
        className={`text-muted-foreground ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
      >
        {mobile && <Github className="mr-2 h-4 w-4" />}
        Github
      </Button>
      <Button
        variant="link"
        onClick={() => {
          ReactGA.event({
            category: 'Button.Click',
            action: 'Linkedin Link',
          });
          window.open('https://www.linkedin.com/in/vivek9patel/');
          onLinkClick();
        }}
        className={`text-muted-foreground ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
      >
        {mobile && <Linkedin className="mr-2 h-4 w-4" />}
        LinkedIn
      </Button>
      <Button
        variant="link"
        onClick={() => {
          ReactGA.send({
            hitType: 'pageview',
            page: 'meet.vivek9patel.com',
            title: 'V9 Meet',
          });
          window.open('https://meet.vivek9patel.com/');
          onLinkClick();
        }}
        className={`text-muted-foreground ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
      >
        {mobile && <MessageCircle className="mr-2 h-4 w-4" />}
        Let's chat
      </Button>
    </>
  );

  return (
    <>
      <div
        className={`sticky bg-background z-50 top-0 left-0 transition-none transform `}
      >
        <LikeCounter />
        <AskTarsButton currentLink={currentLink} />
        <div className="flex justify-center">
          <div className=" w-full px-10 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] py-4 flex justify-between relative">
            <Button
              variant="link"
              onClick={() => {
                window.open('https://www.linkedin.com/in/vivek9patel/');
                ReactGA.event({
                  category: 'Button.Click',
                  action: '@vivek9patel linkedin',
                });
              }}
              className={`font-thin sm:hidden md:block text-xl no-underline text-center w-32 transition ease-linear duration-1000 text-muted-foreground ${
                false ? 'animateFullWidth' : 'animateNormalWidth'
              }`}
            >
              @vivek9patel
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center space-x-1">
              <NavLinks />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mx-2 radius-full">
                      <input
                        onChange={toggleThemeMode}
                        checked={theme === 'dark'}
                        className="themeToggle"
                        type="checkbox"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme to {theme === 'dark' ? 'light' : 'dark'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="w-full border-y border-border border-gray-400 h-1">
          <div
            className={`bg-accent w-0 h-1 ${
              loading ? 'triggerLoader' : 'trigeerLoaderDone'
            }`}
          ></div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Moved outside header */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer - Moved outside header */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out z-50 sm:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full bg-background">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Navigation
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col space-y-1">
            <NavLinks mobile={true} onLinkClick={closeMobileMenu} />

            <div className="border-t border-border pt-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mx-2 radius-full">
                        <input
                          onChange={toggleThemeMode}
                          checked={theme === 'dark'}
                          className="themeToggle"
                          type="checkbox"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Toggle theme to {theme === 'dark' ? 'light' : 'dark'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
