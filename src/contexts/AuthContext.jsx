
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const { toast } = useToast();

  const loadCompletedLessons = useCallback((userId) => {
    if (!userId) return;
    const storedCompleted = localStorage.getItem(`completedLessons_${userId}`);
    if (storedCompleted) {
      setCompletedLessons(new Set(JSON.parse(storedCompleted)));
    } else {
      setCompletedLessons(new Set());
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('physicsPlatformUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      loadCompletedLessons(parsedUser.id);
    }
    setLoading(false);
  }, [loadCompletedLessons]);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let userData = null;
        if (email === 'test@example.com' && password === 'password123') {
          userData = { id: '1', name: 'Usuário Teste', email };
        } else {
          const users = JSON.parse(localStorage.getItem('physicsPlatformRegisteredUsers') || '[]');
          const foundUser = users.find(u => u.email === email && u.password === password);
          if (foundUser) {
            const { password: _p, ...userDataToStore } = foundUser;
            userData = userDataToStore;
          }
        }

        if (userData) {
          localStorage.setItem('physicsPlatformUser', JSON.stringify(userData));
          setUser(userData);
          loadCompletedLessons(userData.id);
          toast({ title: 'Login bem-sucedido!', description: 'Bem-vindo de volta!' });
          setLoading(false);
          resolve(userData);
        } else {
          toast({ variant: 'destructive', title: 'Erro no Login', description: 'Email ou senha inválidos.' });
          setLoading(false);
          reject(new Error('Email ou senha inválidos.'));
        }
      }, 1000);
    });
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem('physicsPlatformRegisteredUsers') || '[]');
        if (users.find(u => u.email === email)) {
          toast({ variant: 'destructive', title: 'Erro no Cadastro', description: 'Este email já está cadastrado.' });
          setLoading(false);
          reject(new Error('Email já cadastrado.'));
          return;
        }
        
        const newUser = { id: Date.now().toString(), name: fullName, email, password };
        users.push(newUser);
        localStorage.setItem('physicsPlatformRegisteredUsers', JSON.stringify(users));
        
        const { password: _p, ...userDataToStore } = newUser;
        localStorage.setItem('physicsPlatformUser', JSON.stringify(userDataToStore));
        setUser(userDataToStore);
        loadCompletedLessons(userDataToStore.id);
        
        toast({ title: 'Cadastro bem-sucedido!', description: 'Sua conta foi criada.' });
        setLoading(false);
        resolve(userDataToStore);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('physicsPlatformUser');
    setUser(null);
    setCompletedLessons(new Set());
    toast({ title: 'Logout realizado', description: 'Até logo!' });
  };

  const toggleLessonCompleted = (lessonId) => {
    if (!user) return;
    const newCompletedLessons = new Set(completedLessons);
    if (newCompletedLessons.has(lessonId)) {
      newCompletedLessons.delete(lessonId);
      toast({ title: 'Aula desmarcada', description: 'Aula marcada como não concluída.' });
    } else {
      newCompletedLessons.add(lessonId);
      toast({ title: 'Aula concluída!', description: 'Parabéns por concluir esta aula!' });
    }
    setCompletedLessons(newCompletedLessons);
    localStorage.setItem(`completedLessons_${user.id}`, JSON.stringify(Array.from(newCompletedLessons)));
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.has(lessonId);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, completedLessons, toggleLessonCompleted, isLessonCompleted, loadCompletedLessons }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
  