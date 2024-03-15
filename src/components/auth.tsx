import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

import { handleAuth, handleDeauth } from '../utils/google';
import { listCourses, listCourseCourseWorks } from '../utils/classroom';

import { Button } from './ui/button';

import { Courses } from './courses';
import { CourseWorks } from './course-works';

export const Auth = () => {
  const { authenticated, login, logout } = useContext(AuthContext);

  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  const [courseWorks, setCourseWorks] = useState();

  useEffect(() => {
    if (authenticated) {
      getCourses();
    }
  }, [authenticated]);

  // Auth
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

  // Courses
  const getCourses = async () => {
    const courses = await listCourses();
    setCourses(courses);
  };

  const selectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    getCourseWorks(courseId);
    console.log(courseId);
  };

  // Course Works
  const getCourseWorks = async (courseId) => {
    if (courseId) {
      const courseWorks = await listCourseCourseWorks(courseId);
      setCourseWorks(courseWorks);
    }
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
          </>
        ) : (
          <Button onClick={authenticate}>Login</Button>
        )}
      </div>
      {authenticated && (
        <div className='flex flex-col justify-center items-center gap-y-10 h-full'>
          {courses && <Courses courses={courses} selectCourse={selectCourse} />}
          {selectedCourse && courseWorks && (
            <CourseWorks courseWorks={courseWorks} />
          )}
        </div>
      )}
    </>
  );
};
