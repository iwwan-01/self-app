export const listCourses = async () => {
  try {
    const response = await gapi.client.classroom.courses.list({
      pageSize: 10, // Maximum number of courses to return
    });

    console.log('Courses:', response.result.courses);
    return _getCoursesId(response);
  } catch (error) {
    console.error('Error listing courses:', error);
  }
};

export const listCourseCourseWorks = async (courseId: string) => {
  try {
    const response = await gapi.client.classroom.courses.courseWork.list({
      courseId: courseId, // Course works belong to a course
      pageSize: 10,
    });

    console.log('Course Works:', response.result.courseWork);
    if (response.result.courseWork) {
      return _getCourseWorkId(response);
    }
  } catch (error) {
    console.error('Error listing course works:', error);
  }
};

export const getCourseCourseWork = async (courseId, courseWorkId) => {
  try {
    const response = await gapi.client.classroom.courses.courseWork.get({
      courseId: courseId,
      id: courseWorkId,
    });

    console.log('Course Work:', response.result);
  } catch (error) {
    console.error('Error getting course work:', error);
  }
};

// Data Transformation
const _getCoursesId = (response) => {
  return response.result.courses.map((course) => {
    return {
      courseId: course.id,
      courseName: course.name,
      courseDescription: course.description,
    };
  });
};

const _getCourseWorkId = (response) => {
  return response.result.courseWork.map((courseWork) => {
    return {
      courseId: courseWork.courseId,
      courseWorkId: courseWork.id,
      courseWorkTitle: courseWork.title,
    };
  });
};
