import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAnnouncements = (req: AuthRequest, res: Response) => {
  const store = db.getStore();
  let className = (req.query.class as string) || '8-A';

  if (req.user && req.user.role === 'student') {
    const student = store.students.find((s) => s.user_id === req.user?.id);
    if (student) {
      className = `${student.class_name}-${student.section}`;
    }
  }

  const announcements = store.announcements.filter(
    (a) => a.class_name === className || a.class_name === className.split('-')[0] || a.class_name === 'All'
  );

  return res.json({ announcements });
};

export const createAnnouncement = (req: AuthRequest, res: Response) => {
  const { class_name, title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const store = db.getStore();
  const newAnn = {
    id: `ann-${Date.now()}`,
    class_name: class_name || '8-A',
    title,
    content,
    posted_at: new Date().toLocaleString(),
    category: category || 'general',
    author: req.user ? req.user.name : 'School Administration'
  };

  store.announcements.unshift(newAnn);
  db.saveData();

  return res.status(201).json({ message: 'Announcement published successfully.', announcement: newAnn });
};
