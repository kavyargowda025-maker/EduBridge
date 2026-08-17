import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAdminOverview = (req: AuthRequest, res: Response) => {
  const store = db.getStore();

  return res.json({
    stats: {
      total_students: store.students.length,
      total_teachers: store.users.filter((u) => u.role === 'teacher').length,
      pending_enquiries: store.admission_enquiries.filter((e) => e.status === 'pending').length,
      unread_messages: store.contact_messages.filter((m) => m.status === 'new').length,
      total_homework_assigned: store.homework.length
    },
    students: store.students,
    admission_enquiries: store.admission_enquiries,
    contact_messages: store.contact_messages
  });
};

export const updateEnquiryStatus = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const store = db.getStore();
  const enquiry = store.admission_enquiries.find((e) => e.id === id);

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' });
  }

  enquiry.status = status;
  db.saveData();

  return res.json({ message: 'Enquiry status updated.', enquiry });
};

export const addStudent = (req: AuthRequest, res: Response) => {
  const { admission_no, name, class_name, section, dob, parent_name, phone, email, address, password } = req.body;

  if (!admission_no || !name || !class_name || !section) {
    return res.status(400).json({ message: 'Admission number, name, class, and section are required.' });
  }

  const store = db.getStore();
  const existingUser = store.users.find((u) => u.admission_no === admission_no);

  if (existingUser) {
    return res.status(400).json({ message: 'A student with this admission number already exists.' });
  }

  const userId = `u-std-${Date.now()}`;
  const studentId = `s-${Date.now()}`;

  const newUser = {
    id: userId,
    admission_no,
    password: password || 'student123',
    role: 'student' as const,
    name
  };

  const newStudent = {
    id: studentId,
    user_id: userId,
    admission_no,
    name,
    class_name,
    section,
    dob: dob || '2012-01-01',
    parent_name: parent_name || 'Parent/Guardian',
    phone: phone || '+91 98000 00000',
    email: email || `${admission_no}@abcschool.edu.in`,
    address: address || 'City Address',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    roll_no: String(store.students.length + 1),
    academic_year: '2026-2027'
  };

  store.users.push(newUser);
  store.students.push(newStudent);
  db.saveData();

  return res.status(201).json({ message: 'Student created successfully.', student: newStudent });
};
