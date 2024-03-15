import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

import { handleAuth, handleDeauth } from '../utils/google';
import {
  listCourses,
  listCourseCourseWorks,
  getCourseCourseWork,
} from '../utils/classroom';

import { Button } from './ui/button';

import { Courses } from './courses';
import { CourseWorks } from './course-works';
import { QuizAssignment } from './quiz-assignment';

export const Auth = () => {
  const { authenticated, login, logout } = useContext(AuthContext);

  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  const [courseWorks, setCourseWorks] = useState();
  const [selectedCourseWork, setSelectedCourseWork] = useState();

  useEffect(() => {
    if (authenticated) {
      getCourses();
    }
  }, [authenticated]);

  // Auth Methods
  const authenticate = () => {
    handleAuth(() => {
      login();
    });
  };

  const deauthenticate = () => {
    handleDeauth(() => {
      logout();
    });
  };

  // Courses Methods
  const getCourses = async () => {
    const courses = await listCourses();
    setCourses(courses);
  };

  const selectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    getCourseWorks(courseId);
  };

  // Course Works Methods
  const getCourseWorks = async (courseId) => {
    if (courseId) {
      const courseWorks = await listCourseCourseWorks(courseId);
      setCourseWorks(courseWorks);
    }
  };

  const selectCourseWork = (courseWorkId) => {
    setSelectedCourseWork(courseWorkId);
    console.log(selectedCourse, courseWorkId);
    getCourseCourseWork(selectedCourse, courseWorkId);
  };

  return (
    <>
      {/* Buttons Section */}
      <div className='space-x-4 h-[100px]'>
        {authenticated ? (
          <>
            <Button onClick={deauthenticate}>Logout</Button>
            <Button onClick={getCourses}>Get Courses</Button>
            <Button onClick={() => getCourseWorks(selectedCourse)}>
              Get Course Works
            </Button>
            <Button
              onClick={() => {
                getCourseCourseWork(selectedCourse, selectedCourseWork);
              }}
            >
              Get Course Work
            </Button>
          </>
        ) : (
          <Button onClick={authenticate}>Login</Button>
        )}
      </div>
      {authenticated && (
        <div className='flex flex-col justify-center items-center gap-y-10 h-full'>
          {courses && <Courses courses={courses} selectCourse={selectCourse} />}
          {selectedCourse && (
            <CourseWorks
              courseWorks={courseWorks}
              selectCourseWork={selectCourseWork}
            />
          )}
          {selectedCourseWork && <QuizAssignment />}
        </div>
      )}
    </>
  );
};
