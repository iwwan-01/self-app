import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

export const Courses = ({ courses, selectCourse }) => {
  return (
    <>
      {/* Courses Container */}
      <div className='flex flex-row space-x-10'>
        {courses?.map((course) => {
          return (
            <div key={course.courseId}>
              <Card className='w-[400px] h-[210px]'>
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
                  <Button
                    onClick={() => selectCourse(course.courseId)}
                    className='w-full'
                  >
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
