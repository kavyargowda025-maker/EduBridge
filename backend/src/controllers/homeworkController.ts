import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getHomeworkList = (req: AuthRequest, res: Response) => {
  const store = db.getStore();
  let className = (req.query.class as string) || '8';

  if (req.user && req.user.role === 'student') {
    const student = store.students.find((s) => s.user_id === req.user?.id);
    if (student) className = student.class_name;
  }

  const homework = store.homework.filter((h) => h.class_name === className);
  return res.json({ class_name: className, homework });
};

export const submitHomework = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getStore();

  const hw = store.homework.find((h) => h.id === id);
  if (!hw) {
    return res.status(404).json({ message: 'Homework assignment not found.' });
  }

  hw.status = 'submitted';
  db.saveData();

  return res.json({ message: 'Homework submitted successfully!', homework: hw });
};

export const addHomework = (req: AuthRequest, res: Response) => {
  const { subject_id, class_name, title, description, questions, due_date } = req.body;

  if (!subject_id || !class_name || !title || !description || !due_date) {
    return res.status(400).json({ message: 'Subject, class, title, description, and due date are required.' });
  }

  const store = db.getStore();
  const subject = store.subjects.find((s) => s.id === subject_id);

  const newHw = {
    id: `hw-${Date.now()}`,
    subject_id,
    subject_name: subject ? subject.title : 'Subject',
    class_name,
    title,
    description,
    questions: Array.isArray(questions) ? questions : [questions].filter(Boolean),
    assigned_date: new Date().toISOString().split('T')[0],
    due_date,
    status: 'pending' as const
  };

  store.homework.push(newHw);
  db.saveData();

  return res.status(201).json({ message: 'Homework created successfully.', homework: newHw });
};
