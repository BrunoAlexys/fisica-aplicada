
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ModuleCard = ({ module, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 bg-card/70 backdrop-blur-sm overflow-hidden group">
        <CardHeader>
          <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
            {module.icon}
          </div>
          <CardTitle className="text-2xl gradient-text">{module.name}</CardTitle>
          <CardDescription className="text-base">{module.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm">{module.longDescription}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full group-hover:bg-gradient-to-r from-primary to-accent group-hover:text-primary-foreground transition-all">
            <Link to={`/modules/${module.id}`}>
              Explorar Módulo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModuleCard;
  