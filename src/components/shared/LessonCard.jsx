
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Clock } from 'lucide-react';

const LessonCard = ({ lesson, moduleId, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-card/70 backdrop-blur-sm group">
        <Link to={`/modules/${moduleId}/lessons/${lesson.id}`} className="block">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{lesson.title}</CardTitle>
              <PlayCircle className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            {lesson.description && <CardDescription className="mb-2">{lesson.description}</CardDescription>}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{lesson.duration}</span>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default LessonCard;
  