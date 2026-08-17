import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAttendance = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const store = db.getStore();
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!student) {
    return res.status(404).json({ message: 'Student record not found.' });
  }

  const records = store.attendance.filter((a) => a.student_id === student.id);
  const workingDays = records.filter((a) => a.status !== 'holiday');
  const presentDays = workingDays.filter((a) => a.status === 'present').length;
  const absentDays = workingDays.filter((a) => a.status === 'absent').length;
  const percentage = workingDays.length > 0 ? Math.round((presentDays / workingDays.length) * 100) : 100;

  return res.json({
    student: {
      name: student.name,
      admission_no: student.admission_no,
      class: student.class_name,
      section: student.section
    },
    statistics: {
      total_working_days: workingDays.length,
      present_days: presentDays,
      absent_days: absentDays,
      percentage
    },
    records
  });
};

export const markAttendance = (req: AuthRequest, res: Response) => {
  const { student_id, date, status, remark } = req.body;

  if (!student_id || !date || !status) {
    return res.status(400).json({ message: 'Student ID, date, and status are required.' });
  }

  const store = db.getStore();
  const existingIndex = store.attendance.findIndex(
    (a) => a.student_id === student_id && a.date === date
  );

  if (existingIndex >= 0) {
    store.attendance[existingIndex] = {
      ...store.attendance[existingIndex],
      status,
      remark: remark || store.attendance[existingIndex].remark
    };
  } else {
    store.attendance.push({
      id: `att-${Date.now()}`,
      student_id,
      date,
      status,
      remark
    });
  }

  db.saveData();

  return res.json({ message: 'Attendance recorded successfully.' });
};
