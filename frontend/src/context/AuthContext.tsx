import React, { createContext, useContext, useState, useEffect } from 'react';
import { type User, getAuthToken, setAuthToken, removeAuthToken, getStoredUser, setStoredUser, api } from '../services/api';


interface AuthContextType {
  user: User | null;
  student: any | null;
  token: string | null;
  loading: boolean;
  login: (admissionNo: string, pass: string) => Promise<void>;
  logout: () => void;
  updateStudent: (newStudentData: any) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [student, setStudent] = useState<any | null>(user?.student || null);
  const [token, setTokenState] = useState<string | null>(getAuthToken());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getAuthToken();
      if (storedToken) {
        try {
          const res = await api.getProfile();
          setUser(res.user);
          setStudent(res.student);
          setStoredUser({ ...res.user, student: res.student });
        } catch (err) {
          console.warn('Session expired or server unavailable during initAuth');
          // If token invalid, keep cached user if present or clear
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (admissionNo: string, pass: string) => {
    const res = await api.login({ admission_no: admissionNo, password: pass });
    setAuthToken(res.token);
    setTokenState(res.token);
    setUser(res.user);
    setStudent(res.user.student || null);
    setStoredUser(res.user);
  };

  const logout = () => {
    removeAuthToken();
    setTokenState(null);
    setUser(null);
    setStudent(null);
  };

  const updateStudent = (newStudentData: any) => {
    setStudent(newStudentData);
    if (user) {
      const updatedUser = { ...user, student: newStudentData };
      setUser(updatedUser);
      setStoredUser(updatedUser);
    }
  };

  const refreshProfile = async () => {
    try {
      const res = await api.getProfile();
      setUser(res.user);
      setStudent(res.student);
      setStoredUser({ ...res.user, student: res.student });
    } catch (e) {
      console.error('Failed to refresh profile', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, student, token, loading, login, logout, updateStudent, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
