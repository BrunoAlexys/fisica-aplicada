
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t border-border/40 py-8 text-center text-muted-foreground"
    >
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Física Aplicada Pro. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">Desmistificando a física, uma aula de cada vez.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
  