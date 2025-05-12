
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        className="bg-card/80 backdrop-blur-lg p-10 rounded-xl shadow-2xl"
      >
        <AlertTriangle className="mx-auto h-24 w-24 text-destructive mb-8" />
        <h1 className="text-6xl font-extrabold text-destructive mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6 gradient-text">Página Não Encontrada</h2>
        <p className="text-muted-foreground mb-10 max-w-md">
          Oops! Parece que a página que você está procurando não existe ou foi movida.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground">
            <Link to="/">Voltar para a Página Inicial</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
  