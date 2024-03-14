import { useState, useEffect } from 'react';

import { listCourses, listCourseCourseWorks } from '../utils/classroom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>();
  const [courseWorks, setCourseWorks] = useState();

  useEffect(() => {
    const getCourses = async () => {
      let courses = await listCourses();
      setCourses(courses);
    };

    getCourses();
  }, []);

  const getCourseWorks = async (courseId) => {
    let courseWorks = await listCourseCourseWorks(courseId);
    setCourseWorks(courseWorks);
  };

  return (
    <>
      {/* Courses Container */}
      <div className='flex flex-row space-x-10'>
        {courses?.map((course) => {
          return (
            <div key={course.courseId}>
              <Card className='w-[400px] h-[200px]'>
                <CardHeader>
                  <CardTitle>{course.courseName}</CardTitle>
                  <CardDescription>{course.courseId}</CardDescription>
                </CardHeader>
                <CardContent>
                  {course.courseDescription
                    ? course.courseDescription
                    : 'This course has no description.'}
                </CardContent>
                <CardFooter className='space-x-4'>
                  <Button className='w-full'>View Course</Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
