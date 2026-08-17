import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { login, forgotPassword, getStudentProfile, updateStudentSettings } from './controllers/authController';
import { getStudentDashboard } from './controllers/studentController';
import { getAttendance, markAttendance } from './controllers/attendanceController';
import { getSubjects, getSubjectDetail } from './controllers/subjectController';
import { getHomeworkList, submitHomework, addHomework } from './controllers/homeworkController';
import { getFees, payFee } from './controllers/feeController';
import { getAnnouncements, createAnnouncement } from './controllers/announcementController';
import { submitAdmissionEnquiry, submitContactMessage, getPublicFeeStructure, getSchoolInfo } from './controllers/publicController';
import { getAdminOverview, updateEnquiryStatus, addStudent } from './controllers/adminController';
import { authenticateToken, requireRole } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Routes
app.get('/api/info', getSchoolInfo);
app.get('/api/fees/public', getPublicFeeStructure);
app.post('/api/admission-enquiry', submitAdmissionEnquiry);
app.post('/api/contact', submitContactMessage);
app.post('/api/auth/login', login);
app.post('/api/auth/forgot-password', forgotPassword);

// Protected Student & User Routes
app.get('/api/auth/profile', authenticateToken, getStudentProfile);
app.put('/api/auth/profile', authenticateToken, updateStudentSettings);
app.get('/api/student/dashboard', authenticateToken, getStudentDashboard);
app.get('/api/attendance', authenticateToken, getAttendance);
app.get('/api/subjects', authenticateToken, getSubjects);
app.get('/api/subjects/:subject_id', authenticateToken, getSubjectDetail);
app.get('/api/homework', authenticateToken, getHomeworkList);
app.post('/api/homework/:id/submit', authenticateToken, submitHomework);
app.get('/api/fees', authenticateToken, getFees);
app.post('/api/fees/pay', authenticateToken, payFee);
app.get('/api/announcements', authenticateToken, getAnnouncements);

// Protected Admin / Teacher Routes
app.get('/api/admin/overview', authenticateToken, requireRole(['teacher', 'admin']), getAdminOverview);
app.put('/api/admin/enquiry/:id', authenticateToken, requireRole(['teacher', 'admin']), updateEnquiryStatus);
app.post('/api/admin/students', authenticateToken, requireRole(['teacher', 'admin']), addStudent);
app.post('/api/admin/attendance', authenticateToken, requireRole(['teacher', 'admin']), markAttendance);
app.post('/api/admin/homework', authenticateToken, requireRole(['teacher', 'admin']), addHomework);
app.post('/api/admin/announcements', authenticateToken, requireRole(['teacher', 'admin']), createAnnouncement);

import path from 'path';
import fs from 'fs';

// Serve built frontend static files for production deployment
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Horizon International School - EduBridge API', timestamp: new Date().toISOString() });
});

import os from 'os';

function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIp = getLocalIpAddress();

if (!process.env.VERCEL) {
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`==================================================`);
    console.log(` 🎓 Horizon International School • EduBridge API  `);
    console.log(` 💻 Local API:    http://localhost:${PORT}       `);
    console.log(` 📱 Network API:  http://${localIp}:${PORT}     `);
    console.log(`==================================================`);
  });
}

export default app;
