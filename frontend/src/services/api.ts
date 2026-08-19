const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface User {
  id: string;
  admission_no: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  student?: any;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('school_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('school_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_user');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('school_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('school_user', JSON.stringify(user));
};

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'An unexpected server error occurred.');
    }
    return data as T;
  } catch (error: any) {
    // If backend server is unreachable or failed, throw error for components to handle
    console.warn(`API call failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Public
  getSchoolInfo: () => apiRequest<any>('/info'),
  getPublicFeeStructure: () => apiRequest<any>('/fees/public'),
  submitAdmissionEnquiry: (payload: any) => apiRequest<any>('/admission-enquiry', { method: 'POST', body: JSON.stringify(payload) }),
  submitContactMessage: (payload: any) => apiRequest<any>('/contact', { method: 'POST', body: JSON.stringify(payload) }),

  // Auth
  login: (payload: any) => apiRequest<any>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  forgotPassword: (payload: any) => apiRequest<any>('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => apiRequest<any>('/auth/profile'),
  updateProfile: (payload: any) => apiRequest<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),

  // Student Dashboard & Modules
  getStudentDashboard: () => apiRequest<any>('/student/dashboard'),
  getAttendance: () => apiRequest<any>('/attendance'),
  getSubjects: (className?: string) => apiRequest<any>(`/subjects${className ? `?class=${className}` : ''}`),
  getSubjectDetail: (subjectId: string) => apiRequest<any>(`/subjects/${subjectId}`),
  getHomework: (className?: string) => apiRequest<any>(`/homework${className ? `?class=${className}` : ''}`),
  submitHomework: (id: string) => apiRequest<any>(`/homework/${id}/submit`, { method: 'POST' }),
  getFees: () => apiRequest<any>('/fees'),
  payFee: (payload: any) => apiRequest<any>('/fees/pay', { method: 'POST', body: JSON.stringify(payload) }),
  getAnnouncements: (className?: string) => apiRequest<any>(`/announcements${className ? `?class=${className}` : ''}`),

  // Admin / Teacher
  getAdminOverview: () => apiRequest<any>('/admin/overview'),
  updateEnquiryStatus: (id: string, status: string) => apiRequest<any>(`/admin/enquiry/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  addStudent: (payload: any) => apiRequest<any>('/admin/students', { method: 'POST', body: JSON.stringify(payload) }),
  markAttendance: (payload: any) => apiRequest<any>('/admin/attendance', { method: 'POST', body: JSON.stringify(payload) }),
  addHomework: (payload: any) => apiRequest<any>('/admin/homework', { method: 'POST', body: JSON.stringify(payload) }),
  createAnnouncement: (payload: any) => apiRequest<any>('/admin/announcements', { method: 'POST', body: JSON.stringify(payload) })
};
