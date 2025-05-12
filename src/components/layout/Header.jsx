
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { LogIn, LogOut, UserPlus, BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  const navLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return cn(
      "relative transition-colors hover:text-primary",
      isActive ? "text-primary font-semibold" : "text-muted-foreground"
    );
  };
  
  const activeIndicator = (path) => {
    const isActive = location.pathname === path;
    return isActive && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    );
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background"
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <span className="hidden lg:inline text-2xl font-bold gradient-text">Física Aplicada Pro</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Button variant="noHover" asChild className="p-0">
            <Link to="/" className={navLinkClasses("/")}>
              Início
              {activeIndicator("/")}
            </Link>
          </Button>
          {user && (
            <Button variant="noHover" asChild className="p-0">
              <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
                Painel
                {activeIndicator("/dashboard")}
              </Link>
            </Button>
          )}
          <div className="flex items-center space-x-2">
            {user ? (
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            ) : (
              <>
                <Button asChild variant="noHover" size="sm" className={navLinkClasses("/login")}>
                  <Link to="/login">
                    <LogIn className="mr-1 h-4 w-4" /> Entrar
                    {activeIndicator("/login")}
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" /> Cadastrar
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
  