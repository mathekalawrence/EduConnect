import { createContext, useContext, useState } from 'react';

const EduContext = createContext();

export const EduProvider = ({ children }) => {
  const [classrooms, setClassrooms] = useState([
    {
      id: '1',
      name: 'Mathematics Grade 10',
      teacher: 'John Smith',
      students: ['2', '5'],
      schedule: 'Mon, Wed, Fri 9:00 AM',
      materials: [
        { id: '1', name: 'Algebra Basics.pdf', type: 'pdf', date: '2024-01-15' },
        { id: '2', name: 'Geometry Introduction.pptx', type: 'ppt', date: '2024-01-20' }
      ]
    }
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: '1',
      title: 'Algebra Problem Set',
      description: 'Complete problems 1-20 from chapter 3',
      dueDate: '2024-02-01',
      classroomId: '1',
      submissions: [
        { studentId: '2', file: 'algebra_solution.pdf', submittedAt: '2024-01-28', grade: 'A' }
      ]
    }
  ]);

  const [grades, setGrades] = useState([
    { studentId: '2', subject: 'Mathematics', grade: 'A', progress: 95 },
    { studentId: '2', subject: 'Physics', grade: 'B+', progress: 88 },
    { studentId: '2', subject: 'English', grade: 'A-', progress: 92 }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'School Holiday',
      message: 'No classes on February 15th for professional development',
      date: '2024-01-25',
      author: 'John Smith'
    }
  ]);

  const addAssignment = (assignment) => {
    setAssignments(prev => [...prev, { ...assignment, id: Date.now().toString() }]);
  };

  const submitAssignment = (assignmentId, submission) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, submissions: [...assignment.submissions, submission] }
          : assignment
      )
    );
  };

  return (
    <EduContext.Provider value={{ 
      classrooms, 
      assignments, 
      grades, 
      announcements,
      addAssignment,
      submitAssignment
    }}>
      {children}
    </EduContext.Provider>
  );
};

export const useEdu = () => useContext(EduContext);