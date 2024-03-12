import { useState } from 'react';

import { Button } from './ui/button';

import { handleAuth } from '../utils/google';
import { listCourses, listCourseCourseWorks } from '../utils/classroom';

import { QuizAssignment } from './quiz-assignment';

export const Auth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    // Callback function being passed to handleAuth
    handleAuth(() => {
      setAuthenticated(true);
    });
  };

  return (
    <>
      {/* Buttons Section */}
      <div className='space-x-4'>
        <Button onClick={authenticate}>Auth</Button>
        <Button onClick={listCourses}>Get Courses</Button>
        {/* You need to pass courseId! 👇🏻 */}
        <Button onClick={() => listCourseCourseWorks(665227818263)}>
          Get Course Works
        </Button>
      </div>
      {authenticated && (
        <>
          <QuizAssignment />
        </>
      )}
    </>
  );
};
