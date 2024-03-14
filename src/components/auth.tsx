import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

import { handleAuth, handleDeauth } from '../utils/google';
import { listCourses, listCourseCourseWorks } from '../utils/classroom';

import { Button } from './ui/button';

import { QuizAssignment } from './quiz-assignment';

export const Auth = () => {
  const { authenticated, login, logout } = useContext(AuthContext);

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

  return (
    <>
      {/* Buttons Section */}
      <div className='space-x-4'>
        {authenticated ? (
          <>
            <Button onClick={deauthenticate}>Logout</Button>
            <Button onClick={listCourses}>Get Courses</Button>
            {/* You need to pass courseId! 👇🏻 */}
            <Button onClick={() => listCourseCourseWorks('665227818263')}>
              Get Course Works
            </Button>
          </>
        ) : (
          <Button onClick={authenticate}>Login</Button>
        )}
      </div>
      {authenticated && (
        <>
          <QuizAssignment />
        </>
      )}
    </>
  );
};
