import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Eye, EyeOff, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [admissionNo, setAdmissionNo] = useState('20260125'); // Pre-filled with sample student
  const [password, setPassword] = useState('student123'); // Pre-filled with sample student password
  const [showPassword, setShowPassword] = useState(false);
  const [roleMode, setRoleMode] = useState<'student' | 'admin'>('student');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSwitch = (mode: 'student' | 'admin') => {
    setRoleMode(mode);
    setErrorMsg('');
    if (mode === 'student') {
      setAdmissionNo('20260125');
      setPassword('student123');
    } else {
      setAdmissionNo('ADMIN01');
      setPassword('admin123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await login(admissionNo, password);
      if (roleMode === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid admission number or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Header / Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex w-16 h-16 rounded-2xl school-gradient items-center justify-center text-white shadow-lg mx-auto">
            <GraduationCap className="w-10 h-10 text-amber-300" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-widest">
              EduBridge App Portal
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">HORIZON INTERNATIONAL SCHOOL</h2>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mt-0.5">
              {roleMode === 'student' ? 'Student Login Portal' : 'Teacher & Admin Portal'}
            </p>
          </div>

          {/* Role Mode Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleSwitch('student')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleMode === 'student' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Student Login
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('admin')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleMode === 'admin' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛡️ Admin / Teacher
            </button>
          </div>
        </div>

        {/* Demo Credentials Quick-Fill Alert Box */}
        <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
          <p className="font-bold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Sample Login Credentials:</span>
          </p>
          {roleMode === 'student' ? (
            <p className="font-mono text-[11px] text-slate-700">
              Admission No: <span className="font-bold text-blue-700">20260125</span> | Password: <span className="font-bold text-blue-700">student123</span>
            </p>
          ) : (
            <p className="font-mono text-[11px] text-slate-700">
              Admin No: <span className="font-bold text-blue-700">ADMIN01</span> | Password: <span className="font-bold text-blue-700">admin123</span>
            </p>
          )}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 flex items-center space-x-2 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Admission Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {roleMode === 'student' ? 'Admission Number' : 'Employee / Admin ID'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder={roleMode === 'student' ? 'Enter admission number' : 'Enter admin ID'}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </label>
              {roleMode === 'student' && (
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-mono"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl school-gradient text-white font-extrabold text-base shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-70 uppercase tracking-wider"
          >
            {isSubmitting ? 'Authenticating...' : 'LOGIN'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            For technical login assistance, contact <span className="font-semibold text-slate-700">it.support@horizonschool.edu.in</span>
          </p>
        </div>

      </div>
    </div>
  );
};
