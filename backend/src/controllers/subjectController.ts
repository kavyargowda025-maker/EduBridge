import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getSubjects = (req: AuthRequest, res: Response) => {
  const store = db.getStore();
  let className = (req.query.class as string) || '8';

  if (req.user && req.user.role === 'student') {
    const student = store.students.find((s) => s.user_id === req.user?.id);
    if (student) {
      className = student.class_name;
    }
  }

  const classSubjects = store.subjects.filter((s) => s.class_name === className);

  // Attach homework count and textbook info
  const result = classSubjects.map((subj) => {
    const hwCount = store.homework.filter((h) => h.subject_id === subj.id && h.status === 'pending').length;
    const textbook = store.textbooks.find((t) => t.subject_id === subj.id) || null;
    return {
      ...subj,
      pending_homework_count: hwCount,
      textbook_title: textbook ? textbook.book_title : 'NCERT Standard Textbook',
      chapter_count: textbook ? textbook.chapters.length : 5
    };
  });

  return res.json({ class_name: className, subjects: result });
};

export const getSubjectDetail = (req: AuthRequest, res: Response) => {
  const { subject_id } = req.params;
  const store = db.getStore();

  const subject = store.subjects.find((s) => s.id === subject_id || s.code.toLowerCase() === subject_id.toLowerCase());

  if (!subject) {
    return res.status(404).json({ message: 'Subject not found.' });
  }

  const homeworkList = store.homework.filter((h) => h.subject_id === subject.id);
  const textbook = store.textbooks.find((t) => t.subject_id === subject.id) || {
    id: `tb-${subject.id}`,
    subject_id: subject.id,
    book_title: `${subject.title} Standard Textbook`,
    author: 'NCERT / School Board Editorial',
    chapters: [
      {
        id: `chap-default-1`,
        chapter_number: 1,
        title: `Introduction to ${subject.title}`,
        summary: `Fundamentals, key concepts, core principles and application topics of ${subject.title}.`,
        topics: [
          '1.1 Core Concepts & Terminology',
          '1.2 Elementary Principles & Models',
          '1.3 Practical Exercises & Practice Questions'
        ]
      },
      {
        id: `chap-default-2`,
        chapter_number: 2,
        title: `Advanced ${subject.title} Fundamentals`,
        summary: `Deep dive into advanced topics, problem solving techniques, and exam prep.`,
        topics: [
          '2.1 Problem Analysis & Derivations',
          '2.2 Worked Examples & Practice Workbook'
        ]
      }
    ]
  };

  return res.json({
    subject,
    homework: homeworkList,
    textbook
  });
};
