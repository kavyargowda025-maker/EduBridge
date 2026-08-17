import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { JWT_SECRET, AuthRequest } from '../middleware/authMiddleware';

export const login = (req: Request, res: Response) => {
  const { admission_no, password } = req.body;

  if (!admission_no || !password) {
    return res.status(400).json({ message: 'Admission number and password are required.' });
  }

  const store = db.getStore();
  const user = store.users.find(
    (u) => u.admission_no.trim().toLowerCase() === admission_no.trim().toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid admission number or password.' });
  }

  // Find associated student details if role is student
  let studentDetails = null;
  if (user.role === 'student') {
    studentDetails = store.students.find((s) => s.user_id === user.id) || null;
  }

  const token = jwt.sign(
    {
      id: user.id,
      admission_no: user.admission_no,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      admission_no: user.admission_no,
      name: user.name,
      role: user.role,
      student: studentDetails
    }
  });
};

export const forgotPassword = (req: Request, res: Response) => {
  const { admission_no, contact_info, new_password } = req.body;

  if (!admission_no || !contact_info || !new_password) {
    return res.status(400).json({ message: 'Admission number, contact verification info, and new password are required.' });
  }

  const store = db.getStore();
  const user = store.users.find(
    (u) => u.admission_no.trim().toLowerCase() === admission_no.trim().toLowerCase()
  );

  if (!user) {
    return res.status(404).json({ message: 'No student record found with this admission number.' });
  }

  const student = store.students.find((s) => s.user_id === user.id);
  
  if (student) {
    const matchedContact = 
      student.phone.includes(contact_info) || 
      student.email.toLowerCase().includes(contact_info.toLowerCase());
    
    if (!matchedContact) {
      return res.status(400).json({ message: 'The registered phone/email does not match our records for this admission number.' });
    }
  }

  user.password = new_password;
  db.saveData();

  return res.json({ message: 'Password reset successfully. You can now log in with your new password.' });
};

export const getStudentProfile = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const store = db.getStore();
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!student) {
    return res.status(404).json({ message: 'Student profile not found.' });
  }

  return res.json({ student, user: req.user });
};

export const updateStudentSettings = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { phone, email, current_password, new_password } = req.body;
  const store = db.getStore();
  
  const user = store.users.find((u) => u.id === req.user?.id);
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!user || !student) {
    return res.status(404).json({ message: 'User profile not found.' });
  }

  if (new_password) {
    if (!current_password || user.password !== current_password) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }
    user.password = new_password;
  }

  if (phone) student.phone = phone;
  if (email) student.email = email;

  db.saveData();

  return res.json({
    message: 'Profile settings updated successfully.',
    student,
    user: { id: user.id, admission_no: user.admission_no, name: user.name, role: user.role }
  });
};
