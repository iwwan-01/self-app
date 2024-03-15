import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { QuizAssignment } from './quiz-assignment';

export const CourseWorks = ({ courseWorks }) => {
  const [selectedCourseWork, setSelectedCourseWork] = useState();

  return (
    <>
      {/* Course Works Container */}
      <div className='flex flex-row space-x-10'>
        {courseWorks?.map((courseWork) => {
          return (
            <div key={courseWork.courseWorkId}>
              <Card className='w-[400px] h-[230px]'>
                <CardHeader>
                  <CardTitle>{courseWork.courseWorkTitle}</CardTitle>
                  <CardDescription>{courseWork.courseWorkId}</CardDescription>
                </CardHeader>
                <CardContent>
                  This course work belongs to course with a courseId{' '}
                  {courseWork.courseId}.
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setSelectedCourseWork(true)}
                    className='w-full'
                  >
                    View Course Work
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
      {selectedCourseWork && <QuizAssignment />}
    </>
  );
};
