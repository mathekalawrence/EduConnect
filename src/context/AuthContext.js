import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'teacher@edu.com',
      password: 'password',
      name: 'John Smith',
      role: 'teacher',
      avatar: '👨‍🏫',
      subjects: ['Mathematics', 'Physics']
    },
    {
      id: '2',
      email: 'student@edu.com',
      password: 'password',
      name: 'Sarah Johnson',
      role: 'student',
      avatar: '👩‍🎓',
      grade: 'Grade 10'
    },
    {
      id: '3',
      email: 'parent@edu.com',
      password: 'password',
      name: 'Michael Brown',
      role: 'parent',
      avatar: '👨‍👧',
      children: ['Sarah Johnson']
    }
  ]);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: userData.role === 'teacher' ? '👨‍🏫' : userData.role === 'student' ? '👩‍🎓' : '👨‍👧'
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);