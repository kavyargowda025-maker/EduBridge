import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getStudentDashboard = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const store = db.getStore();
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!student) {
    return res.status(404).json({ message: 'Student profile not found.' });
  }

  // Attendance statistics
  const studentAttendance = store.attendance.filter((a) => a.student_id === student.id);
  const workingDays = studentAttendance.filter((a) => a.status !== 'holiday');
  const presentDays = workingDays.filter((a) => a.status === 'present').length;
  const absentDays = workingDays.filter((a) => a.status === 'absent').length;
  const attendancePercentage = workingDays.length > 0 
    ? Math.round((presentDays / workingDays.length) * 100) 
    : 100;

  // Class subjects
  const classSubjects = store.subjects.filter((s) => s.class_name === student.class_name);

  // Homework
  const activeHomework = store.homework.filter((h) => h.class_name === student.class_name);

  // Fee Summary
  const studentFee = store.fees.find((f) => f.student_id === student.id) || {
    total_amount: 60000,
    paid_amount: 45000,
    due_amount: 15000
  };

  // Class Group Announcements
  const announcements = store.announcements.filter(
    (a) => a.class_name === `${student.class_name}-${student.section}` || a.class_name === student.class_name
  );

  return res.json({
    student,
    summary: {
      attendance_percentage: attendancePercentage,
      total_working_days: workingDays.length,
      present_days: presentDays,
      absent_days: absentDays,
      subjects_count: classSubjects.length,
      due_fees: studentFee.due_amount,
      total_fees: studentFee.total_amount,
      paid_fees: studentFee.paid_amount,
      active_homework_count: activeHomework.filter(h => h.status === 'pending').length
    },
    subjects: classSubjects,
    recent_homework: activeHomework.slice(0, 3),
    announcements: announcements.slice(0, 3)
  });
};
