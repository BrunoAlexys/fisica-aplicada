
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Atom, Thermometer, Lightbulb, PlayCircle, CheckCircle, ArrowRight } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import LessonCard from '@/components/shared/LessonCard';


const allModulesData = [
  {
    id: 'mechanics',
    name: 'Mecânica Clássica',
    icon: <Atom className="h-10 w-10 text-primary" />,
    shortDescription: 'Movimento, forças e energia.',
    lessons: [
      { id: 'm1', title: 'Introdução à Cinemática', duration: '25 min', description: 'Conceitos básicos de movimento.' },
      { id: 'm2', title: 'Leis de Newton', duration: '35 min', description: 'As três leis fundamentais do movimento.' },
      { id: 'm3', title: 'Trabalho e Energia', duration: '30 min', description: 'Entendendo trabalho, energia cinética e potencial.' },
      { id: 'm4', title: 'Momento Linear e Colisões', duration: '32 min', description: 'Conservação do momento linear.' },
    ]
  },
  {
    id: 'thermodynamics',
    name: 'Termodinâmica',
    icon: <Thermometer className="h-10 w-10 text-primary" />,
    shortDescription: 'Calor, temperatura e entropia.',
    lessons: [
      { id: 't1', title: 'Conceitos Fundamentais e Temperatura', duration: '20 min', description: 'Definições de sistemas e escalas de temperatura.' },
      { id: 't2', title: 'Primeira Lei da Termodinâmica', duration: '40 min', description: 'Conservação de energia em processos termodinâmicos.' },
      { id: 't3', title: 'Segunda Lei da Termodinâmica e Entropia', duration: '35 min', description: 'O conceito de entropia.' },
      { id: 't4', title: 'Ciclos Termodinâmicos', duration: '38 min', description: 'Análise de ciclos como Carnot e Otto.' },
    ]
  },
  {
    id: 'electromagnetism',
    name: 'Eletromagnetismo',
    icon: <Zap className="h-10 w-10 text-primary" />,
    shortDescription: 'Campos elétricos e magnéticos.',
    lessons: [
      { id: 'e1', title: 'Campo Elétrico e Lei de Coulomb', duration: '30 min', description: 'Forças entre cargas elétricas.' },
      { id: 'e2', title: 'Potencial Elétrico e Capacitância', duration: '35 min', description: 'Energia potencial elétrica e capacitores.' },
      { id: 'e3', title: 'Corrente Elétrica e Circuitos DC', duration: '45 min', description: 'Lei de Ohm e resistores.' },
      { id: 'e4', title: 'Campo Magnético e Forças Magnéticas', duration: '33 min', description: 'Fontes de campo magnético.' },
      { id: 'e5', title: 'Indução Eletromagnética e Lei de Faraday', duration: '30 min', description: 'Geração de correntes elétricas.' },
    ]
  },
  {
    id: 'optics',
    name: 'Óptica Geométrica e Ondulatória',
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    shortDescription: 'Luz, lentes e fenômenos ópticos.',
    lessons: [
      { id: 'o1', title: 'Natureza da Luz e Reflexão', duration: '25 min', description: 'Modelos da luz e leis da reflexão.' },
      { id: 'o2', title: 'Refração e Lentes Delgadas', duration: '35 min', description: 'Lei de Snell e formação de imagens.' },
      { id: 'o3', title: 'Instrumentos Ópticos', duration: '30 min', description: 'Funcionamento de lupas e telescópios.' },
      { id: 'o4', title: 'Interferência e Difração', duration: '37 min', description: 'Princípios da óptica ondulatória.' },
    ]
  },
];

const HomePage = () => {
  const { user, completedLessons } = useAuth();
  
  let lastCompletedLessonInfo = null;
  let nextLessons = [];

  if (user && completedLessons.size > 0) {
    const completedLessonIds = Array.from(completedLessons);
    const lastCompletedLessonId = completedLessonIds[completedLessonIds.length - 1];

    let foundModuleId = null;
    let foundLessonIndex = -1;

    for (const module of allModulesData) {
      const lessonIndex = module.lessons.findIndex(l => l.id === lastCompletedLessonId);
      if (lessonIndex !== -1) {
        lastCompletedLessonInfo = { ...module.lessons[lessonIndex], moduleId: module.id };
        foundModuleId = module.id;
        foundLessonIndex = lessonIndex;
        break;
      }
    }

    if (lastCompletedLessonInfo) {
      const currentModule = allModulesData.find(m => m.id === foundModuleId);
      if (currentModule) {

        if (foundLessonIndex + 1 < currentModule.lessons.length) {
          nextLessons.push({ ...currentModule.lessons[foundLessonIndex + 1], moduleId: currentModule.id });
        }

        let lessonsAdded = 0;
        if (nextLessons.length > 0) lessonsAdded = 1;

        const currentModuleIndex = allModulesData.findIndex(m => m.id === foundModuleId);

        for (let i = foundLessonIndex + 2; i < currentModule.lessons.length && lessonsAdded < 3; i++) {
          nextLessons.push({ ...currentModule.lessons[i], moduleId: currentModule.id });
          lessonsAdded++;
        }

        if (lessonsAdded < 3) {
          for (let i = currentModuleIndex + 1; i < allModulesData.length && lessonsAdded < 3; i++) {
            const nextModule = allModulesData[i];
            for (let j = 0; j < nextModule.lessons.length && lessonsAdded < 3; j++) {
              nextLessons.push({ ...nextModule.lessons[j], moduleId: nextModule.id });
              lessonsAdded++;
            }
          }
        }
      }
    }
  }


  const publicModulesData = allModulesData.map(m => ({
    id: m.id,
    name: m.name,
    description: m.shortDescription,
    icon: m.icon,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {user && lastCompletedLessonInfo ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-24 bg-gradient-to-br from-background to-secondary/30"
          >
            <div className="container mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-4 text-center md:text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                Continue de onde parou, <span className="gradient-text">{user.name}!</span>
              </motion.h1>

              <Card className="mb-10 shadow-xl bg-card/80 backdrop-blur-lg overflow-hidden border border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardDescription className="text-sm font-medium text-primary">ÚLTIMA AULA CONCLUÍDA</CardDescription>
                      <CardTitle className="text-2xl md:text-3xl mt-1">{lastCompletedLessonInfo.title}</CardTitle>
                    </div>
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{lastCompletedLessonInfo.description}</p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg">
                    <Link to={`/modules/${lastCompletedLessonInfo.moduleId}/lessons/${lastCompletedLessonInfo.id}`}>
                      Revisitar Aula <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {nextLessons.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Próximas Aulas Sugeridas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nextLessons.map((lesson, index) => (
                      <LessonCard key={lesson.id} lesson={lesson} moduleId={lesson.moduleId} index={index} />
                    ))}
                  </div>
                  <div className="mt-10 text-center">
                    <Button asChild variant="outline">
                      <Link to="/dashboard">Ver todos os módulos</Link>
                    </Button>
                  </div>
                </div>
              )}
              {nextLessons.length === 0 && completedLessons.size > 0 && (
                <div className="text-center py-10">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Parabéns, {user.name}!</h2>
                  <p className="text-lg text-muted-foreground mb-6">Você concluiu todas as aulas disponíveis. Incrível!</p>
                  <Button asChild>
                    <Link to="/dashboard">Revisar Módulos</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30"
          >
            <div className="container mx-auto text-center">
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                Bem-vindo à <span className="gradient-text">Física Aplicada Pro</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Sua jornada para dominar os conceitos fundamentais da física começa aqui. Explore, aprenda e transforme sua compreensão do universo.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg">
                  <Link to={user ? "/dashboard" : "/register"}>{user ? "Ir para o Painel" : "Comece a Aprender Gratuitamente"}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>
        )}

        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nossos Módulos de Ensino</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {publicModulesData.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index + (user && lastCompletedLessonInfo ? 0.5 : 0), duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="items-center text-center">
                      {module.icon}
                      <CardTitle className="mt-4 text-2xl">{module.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <CardDescription>{module.description}</CardDescription>
                    </CardContent>
                    <div className="p-6 pt-0 text-center">
                      <Button variant="outline" asChild>
                        <Link to={user ? `/modules/${module.id}` : "/login"}>Ver Módulo</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Por que escolher a Física Aplicada Pro?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (user && lastCompletedLessonInfo ? 0.5 : 0), duration: 0.5 }}>
                <Card className="p-6 bg-card/70 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-2 gradient-text">Conteúdo Abrangente</h3>
                  <p className="text-muted-foreground">Módulos detalhados cobrindo os principais tópicos da física aplicada.</p>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (user && lastCompletedLessonInfo ? 0.5 : 0), duration: 0.5 }}>
                <Card className="p-6 bg-card/70 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-2 gradient-text">Aprendizagem Interativa</h3>
                  <p className="text-muted-foreground">Vídeos, apostilas e exemplos práticos para facilitar o entendimento.</p>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + (user && lastCompletedLessonInfo ? 0.5 : 0), duration: 0.5 }}>
                <Card className="p-6 bg-card/70 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-2 gradient-text">Acesso Flexível</h3>
                  <p className="text-muted-foreground">Estude no seu ritmo, em qualquer dispositivo, a qualquer hora.</p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
