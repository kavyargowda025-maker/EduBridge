import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { InstallPwaPrompt } from './components/InstallPwaPrompt';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { AdmissionEnquiry } from './pages/AdmissionEnquiry';
import { About } from './pages/About';
import { FeesStructure } from './pages/FeesStructure';
import { Contact } from './pages/Contact';

// Authenticated Student Pages
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Subjects } from './pages/Subjects';
import { SubjectDetail } from './pages/SubjectDetail';
import { ClassGroup } from './pages/ClassGroup';
import { Fees } from './pages/Fees';
import { Profile } from './pages/Profile';

// Admin / Teacher Pages
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
          <InstallPwaPrompt />
          <Navbar />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admission-enquiry" element={<AdmissionEnquiry />} />
              <Route path="/about" element={<About />} />
              <Route path="/fees-structure" element={<FeesStructure />} />
              <Route path="/contact" element={<Contact />} />

              {/* Authenticated Student Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subjects"
                element={
                  <ProtectedRoute>
                    <Subjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subjects/:subject_id"
                element={
                  <ProtectedRoute>
                    <SubjectDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class-group"
                element={
                  <ProtectedRoute>
                    <ClassGroup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fees"
                element={
                  <ProtectedRoute>
                    <Fees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Admin / Teacher Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
