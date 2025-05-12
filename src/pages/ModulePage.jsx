
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LessonCard from '@/components/shared/LessonCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Atom, Thermometer, Lightbulb } from 'lucide-react';

const modulesData = {
  mechanics: { 
    id: 'mechanics', 
    name: 'Mecânica Clássica', 
    icon: <Atom className="h-10 w-10 text-primary" />,
    description: 'Aprofunde-se nas leis de Newton, trabalho, energia cinética e potencial, e conservação de momento. Essencial para entender o mundo físico ao nosso redor.',
    lessons: [
      { id: 'm1', title: 'Introdução à Cinemática', duration: '25 min', description: 'Conceitos básicos de movimento, posição, velocidade e aceleração.' },
      { id: 'm2', title: 'Leis de Newton', duration: '35 min', description: 'As três leis fundamentais do movimento e suas aplicações.' },
      { id: 'm3', title: 'Trabalho e Energia', duration: '30 min', description: 'Entendendo trabalho, energia cinética, potencial e conservação de energia.' },
      { id: 'm4', title: 'Momento Linear e Colisões', duration: '32 min', description: 'Conservação do momento linear e diferentes tipos de colisões.' },
    ]
  },
  thermodynamics: { 
    id: 'thermodynamics', 
    name: 'Termodinâmica', 
    icon: <Thermometer className="h-10 w-10 text-primary" />,
    description: 'Explore os princípios que governam a transferência de calor, as transformações de energia e o conceito de entropia. Fundamental para engenharia e ciências naturais.',
    lessons: [
      { id: 't1', title: 'Conceitos Fundamentais e Temperatura', duration: '20 min', description: 'Definições de sistemas, vizinhanças, calor e escalas de temperatura.' },
      { id: 't2', title: 'Primeira Lei da Termodinâmica', duration: '40 min', description: 'Conservação de energia em processos termodinâmicos.' },
      { id: 't3', title: 'Segunda Lei da Termodinâmica e Entropia', duration: '35 min', description: 'O conceito de entropia e a direção espontânea dos processos.' },
      { id: 't4', title: 'Ciclos Termodinâmicos', duration: '38 min', description: 'Análise de ciclos como Carnot, Otto e Diesel.' },
    ]
  },
  electromagnetism: { 
    id: 'electromagnetism', 
    name: 'Eletromagnetismo', 
    icon: <Zap className="h-10 w-10 text-primary" />,
    description: 'Descubra as forças fundamentais que regem a eletricidade e o magnetismo, desde cargas estáticas até ondas eletromagnéticas e suas aplicações tecnológicas.',
    lessons: [
      { id: 'e1', title: 'Campo Elétrico e Lei de Coulomb', duration: '30 min', description: 'Forças entre cargas e o conceito de campo elétrico.' },
      { id: 'e2', title: 'Potencial Elétrico e Capacitância', duration: '35 min', description: 'Energia potencial elétrica, diferença de potencial e capacitores.' },
      { id: 'e3', title: 'Corrente Elétrica e Circuitos DC', duration: '45 min', description: 'Lei de Ohm, resistores e análise de circuitos simples.' },
      { id: 'e4', title: 'Campo Magnético e Forças Magnéticas', duration: '33 min', description: 'Fontes de campo magnético e forças sobre cargas e correntes.' },
      { id: 'e5', title: 'Indução Eletromagnética e Lei de Faraday', duration: '30 min', description: 'Como campos magnéticos variáveis geram correntes elétricas.' },
    ]
  },
  optics: { 
    id: 'optics', 
    name: 'Óptica Geométrica e Ondulatória', 
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    description: 'Aprenda sobre a propagação da luz, reflexão, refração, formação de imagens por lentes e espelhos, e os princípios da óptica ondulatória como difração e interferência.',
    lessons: [
      { id: 'o1', title: 'Natureza da Luz e Reflexão', duration: '25 min', description: 'Modelos da luz, princípio de Huygens e leis da reflexão.' },
      { id: 'o2', title: 'Refração e Lentes Delgadas', duration: '35 min', description: 'Lei de Snell, dispersão e formação de imagens por lentes.' },
      { id: 'o3', title: 'Instrumentos Ópticos', duration: '30 min', description: 'Funcionamento de lupas, microscópios e telescópios.' },
      { id: 'o4', title: 'Interferência e Difração', duration: '37 min', description: 'Princípios da óptica ondulatória e seus fenômenos característicos.' },
    ]
  },
};


const ModulePage = () => {
  const { moduleId } = useParams();
  const module = modulesData[moduleId];

  if (!module) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">Módulo não encontrado</h1>
        <Button asChild variant="outline">
          <Link to="/dashboard">Voltar ao Painel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Painel
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row items-center mb-10 p-6 rounded-lg bg-card/50 backdrop-blur-md shadow-lg">
            <div className="mr-0 md:mr-6 mb-4 md:mb-0 text-primary">{module.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">{module.name}</h1>
              <p className="text-lg text-muted-foreground">{module.description}</p>
            </div>
          </div>
        
          <h2 className="text-3xl font-semibold mb-8">Aulas do Módulo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.lessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} moduleId={moduleId} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulePage;
  