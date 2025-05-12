import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ModuleCard from '@/components/shared/ModuleCard';
import { Zap, Atom, Thermometer, Lightbulb, BookOpen } from 'lucide-react';

const modulesStaticData = [
  { 
    id: 'mechanics', 
    name: 'Mecânica Clássica', 
    icon: <Atom className="h-6 w-6" />,
    shortDescription: 'Movimento, forças e energia.',
    longDescription: 'Aprofunde-se nas leis de Newton, trabalho, energia cinética e potencial, e conservação de momento. Essencial para entender o mundo físico ao nosso redor.',
    lessons: [
      { id: 'm1', title: 'Introdução à Cinemática', duration: '25 min' },
      { id: 'm2', title: 'Leis de Newton', duration: '35 min' },
      { id: 'm3', title: 'Trabalho e Energia', duration: '30 min' },
      { id: 'm4', title: 'Momento Linear e Colisões', duration: '32 min' },
    ]
  },
  { 
    id: 'thermodynamics', 
    name: 'Termodinâmica', 
    icon: <Thermometer className="h-6 w-6" />,
    shortDescription: 'Calor, temperatura e entropia.',
    longDescription: 'Explore os princípios que governam a transferência de calor, as transformações de energia e o conceito de entropia. Fundamental para engenharia e ciências naturais.',
    lessons: [
      { id: 't1', title: 'Conceitos Fundamentais e Temperatura', duration: '20 min' },
      { id: 't2', title: 'Primeira Lei da Termodinâmica', duration: '40 min' },
      { id: 't3', title: 'Segunda Lei da Termodinâmica e Entropia', duration: '35 min' },
      { id: 't4', title: 'Ciclos Termodinâmicos', duration: '38 min' },
    ]
  },
  { 
    id: 'electromagnetism', 
    name: 'Eletromagnetismo', 
    icon: <Zap className="h-6 w-6" />,
    shortDescription: 'Campos elétricos e magnéticos.',
    longDescription: 'Descubra as forças fundamentais que regem a eletricidade e o magnetismo, desde cargas estáticas até ondas eletromagnéticas e suas aplicações tecnológicas.',
    lessons: [
      { id: 'e1', title: 'Campo Elétrico e Lei de Coulomb', duration: '30 min' },
      { id: 'e2', title: 'Potencial Elétrico e Capacitância', duration: '35 min' },
      { id: 'e3', title: 'Corrente Elétrica e Circuitos DC', duration: '45 min' },
      { id: 'e4', title: 'Campo Magnético e Forças Magnéticas', duration: '33 min' },
      { id: 'e5', title: 'Indução Eletromagnética e Lei de Faraday', duration: '30 min' },
    ]
  },
  { 
    id: 'optics', 
    name: 'Óptica Geométrica e Ondulatória', 
    icon: <Lightbulb className="h-6 w-6" />,
    shortDescription: 'Luz, lentes e fenômenos ópticos.',
    longDescription: 'Aprenda sobre a propagação da luz, reflexão, refração, formação de imagens por lentes e espelhos, e os princípios da óptica ondulatória como difração e interferência.',
    lessons: [
      { id: 'o1', title: 'Natureza da Luz e Reflexão', duration: '25 min' },
      { id: 'o2', title: 'Refração e Lentes Delgadas', duration: '35 min' },
      { id: 'o3', title: 'Instrumentos Ópticos', duration: '30 min' },
      { id: 'o4', title: 'Interferência e Difração', duration: '37 min' },
    ]
  },
];

// Calcula o total de aulas uma vez, fora do componente
const totalLessonsCount = modulesStaticData.reduce((acc, mod) => acc + mod.lessons.length, 0);

const DashboardPage = () => {
  const { user, completedLessons, loadCompletedLessons } = useAuth();
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (user) {
      loadCompletedLessons(user.id);
    }
  }, [user, loadCompletedLessons]);

  useEffect(() => {
    if (completedLessons && totalLessonsCount > 0) {
      const completedCount = completedLessons.size ?? completedLessons.length;
      const percentage = (completedCount / totalLessonsCount) * 100;
      setProgressPercentage(percentage);
    }
  }, [completedLessons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Bem-vindo(a), <span className="gradient-text">{user?.name}!</span>
          </h1>
          <p className="text-xl text-muted-foreground">Continue sua jornada de aprendizado em Física Aplicada.</p>
        </motion.div>

        <motion.div 
          className="mb-10 p-6 rounded-lg bg-primary/10 border border-primary/20 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl font-semibold text-primary">Seu Progresso</h2>
          </div>
          <p className="text-muted-foreground mb-4">Você completou <span className="font-bold text-foreground">{completedLessons?.size || 0} de {totalLessonsCount}</span> aulas. Continue assim!</p>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-primary to-accent h-4 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>

        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">Módulos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modulesStaticData.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;