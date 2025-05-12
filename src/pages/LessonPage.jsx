import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { ArrowLeft, Download, Youtube, ListChecks, CheckCircle2, Circle } from 'lucide-react';
import { DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';

const modulesData = {
  mechanics: {
    id: 'mechanics',
    name: 'Mecânica Clássica',
    lessons: [
      { id: 'm1', title: 'Introdução à Cinemática', duration: '25 min', videoUrl: '/video.mp4', description: 'Conceitos básicos de movimento, posição, velocidade e aceleração. Aprenda a descrever o movimento dos corpos sem se preocupar com suas causas.', pdfUrl: '/aula.pdf' },
      { id: 'm2', title: 'Leis de Newton', duration: '35 min', videoUrl: '/video.mp4', description: 'As três leis fundamentais do movimento e suas aplicações. Entenda a relação entre força e movimento.', pdfUrl: '/aula.pdf' },
      { id: 'm3', title: 'Trabalho e Energia', duration: '30 min', videoUrl: '/video.mp4', description: 'Entendendo trabalho, energia cinética, potencial e conservação de energia. Ferramentas poderosas para analisar sistemas físicos.', pdfUrl: '/aula.pdf' },
      { id: 'm4', title: 'Momento Linear e Colisões', duration: '32 min', videoUrl: '/video.mp4', description: 'Conservação do momento linear e diferentes tipos de colisões. Analise o impacto entre objetos.', pdfUrl: '/aula.pdf' },
    ]
  },
  thermodynamics: {
    id: 'thermodynamics',
    name: 'Termodinâmica',
    lessons: [
      { id: 't1', title: 'Conceitos Fundamentais e Temperatura', duration: '20 min', videoUrl: '/video.mp4', description: 'Definições de sistemas, vizinhanças, calor e escalas de temperatura. A base para entender a termodinâmica.', pdfUrl: '/aula.pdf' },
      { id: 't2', title: 'Primeira Lei da Termodinâmica', duration: '40 min', videoUrl: '/video.mp4', description: 'Conservação de energia em processos termodinâmicos. A energia não se cria nem se perde, apenas se transforma.', pdfUrl: '/aula.pdf' },
      { id: 't3', title: 'Segunda Lei da Termodinâmica e Entropia', duration: '35 min', videoUrl: '/video.mp4', description: 'O conceito de entropia e a direção espontânea dos processos. Por que o universo tende à desordem?', pdfUrl: '/aula.pdf' },
      { id: 't4', title: 'Ciclos Termodinâmicos', duration: '38 min', videoUrl: '/video.mp4', description: 'Análise de ciclos como Carnot, Otto e Diesel. O funcionamento de motores e refrigeradores.', pdfUrl: '/aula.pdf' },
    ]
  },
  electromagnetism: {
    id: 'electromagnetism',
    name: 'Eletromagnetismo',
    lessons: [
      { id: 'e1', title: 'Campo Elétrico e Lei de Coulomb', duration: '30 min', videoUrl: '/video.mp4', description: 'Forças entre cargas e o conceito de campo elétrico.', pdfUrl: '/aula.pdf' },
      { id: 'e2', title: 'Potencial Elétrico e Capacitância', duration: '35 min', videoUrl: '/video.mp4', description: 'Energia potencial elétrica, diferença de potencial e capacitores.', pdfUrl: '/aula.pdf' },
      { id: 'e3', title: 'Corrente Elétrica e Circuitos DC', duration: '45 min', videoUrl: '/video.mp4', description: 'Lei de Ohm, resistores e análise de circuitos simples.', pdfUrl: '/aula.pdf' },
      { id: 'e4', title: 'Campo Magnético e Forças Magnéticas', duration: '33 min', videoUrl: '/video.mp4', description: 'Fontes de campo magnético e forças sobre cargas e correntes.', pdfUrl: '/aula.pdf' },
      { id: 'e5', title: 'Indução Eletromagnética e Lei de Faraday', duration: '30 min', videoUrl: '/video.mp4', description: 'Como campos magnéticos variáveis geram correntes elétricas.', pdfUrl: '/aula.pdf' },
    ]
  },
  optics: {
    id: 'optics',
    name: 'Óptica Geométrica e Ondulatória',
    lessons: [
      { id: 'o1', title: 'Natureza da Luz e Reflexão', duration: '25 min', videoUrl: '/video.mp4', description: 'Modelos da luz, princípio de Huygens e leis da reflexão.', pdfUrl: '/aula.pdf' },
      { id: 'o2', title: 'Refração e Lentes Delgadas', duration: '35 min', videoUrl: '/video.mp4', description: 'Lei de Snell, dispersão e formação de imagens por lentes.', pdfUrl: '/aula.pdf' },
      { id: 'o3', title: 'Instrumentos Ópticos', duration: '30 min', videoUrl: '/video.mp4', description: 'Funcionamento de lupas, microscópios e telescópios.', pdfUrl: '/aula.pdf' },
      { id: 'o4', title: 'Interferência e Difração', duration: '37 min', videoUrl: '/video.mp4F', description: 'Princípios da óptica ondulatória e seus fenômenos característicos.', pdfUrl: '/aula.pdf' },
    ]
  },
};

const LessonPage = () => {
  const { moduleId, lessonId } = useParams();
  const { user, toggleLessonCompleted, isLessonCompleted, loadCompletedLessons } = useAuth();
  const module = modulesData[moduleId];
  const lesson = module?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (user) {
      loadCompletedLessons(user.id);
    }
  }, [user, loadCompletedLessons, lessonId]);


  if (!module || !lesson) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">Aula não encontrada</h1>
        <Button asChild variant="outline">
          <Link to={moduleId ? `/modules/${moduleId}` : '/dashboard'}>Voltar ao Módulo</Link>
        </Button>
      </div>
    );
  }

  const currentIndex = module.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = currentIndex < module.lessons.length - 1 ? module.lessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const lessonIsCompleted = isLessonCompleted(lesson.id);

  const handleToggleComplete = () => {
    toggleLessonCompleted(lesson.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-8">
            <Link to={`/modules/${moduleId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para {module.name}
            </Link>
          </Button>

          <Card className="mb-8 shadow-xl bg-card/80 backdrop-blur-lg overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl md:text-4xl gradient-text">{lesson.title}</CardTitle>
                  <CardDescription className="text-lg mt-1">{lesson.description}</CardDescription>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={handleToggleComplete}
                >
                  {lessonIsCompleted ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Concluída!</span>
                    </>
                  ) : (
                    <>
                      <Checkbox
                        id={`complete-${lesson.id}`}
                        checked={false}
                        onCheckedChange={handleToggleComplete}
                        aria-label="Marcar como concluída"
                      />
                      <Label htmlFor={`complete-${lesson.id}`} className="text-sm font-medium cursor-pointer select-none">
                        Marcar como concluída
                      </Label>
                    </>
                  )}
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-auto min-h-[360px] mb-6 rounded-lg overflow-hidden shadow-lg border border-border">
                <Video
                  autoPlay
                  className="w-full h-[600px]"
                >
                  <source type='video/webm' src={lesson.videoUrl}/>
                </Video>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button
                  onClick={() => window.open(lesson.pdfUrl, '_blank')}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground"
                >
                  <Download className="mr-2 h-5 w-5" /> Baixar Apostila PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {prevLesson && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardDescription>Aula Anterior</CardDescription>
                    <CardTitle className="text-xl">{prevLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/modules/${moduleId}/lessons/${prevLesson.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Ir para aula anterior
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {nextLesson && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className={!prevLesson ? "md:col-start-2" : ""}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardDescription>Próxima Aula</CardDescription>
                    <CardTitle className="text-xl">{nextLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={`/modules/${moduleId}/lessons/${nextLesson.id}`}>
                        Ir para próxima aula <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ListChecks className="mr-3 h-6 w-6 text-primary" />
                Outras Aulas no Módulo: {module.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {module.lessons.filter(l => l.id !== lessonId).map((otherLesson, index) => (
                  <motion.li
                    key={otherLesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      to={`/modules/${moduleId}/lessons/${otherLesson.id}`}
                      className="flex justify-between items-center p-3 rounded-md hover:bg-primary/10 transition-colors group"
                    >
                      <span className={`group-hover:text-primary ${isLessonCompleted(otherLesson.id) ? 'line-through text-muted-foreground' : ''}`}>{otherLesson.title}</span>
                      <div className="flex items-center">
                        {isLessonCompleted(otherLesson.id) && <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />}
                        <span className="text-sm text-muted-foreground">{otherLesson.duration}</span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;
