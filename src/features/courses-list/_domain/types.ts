type LessonListElement = {
  id: string;
  slug: string;
  title: string;
};

type CourseListElement = {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: LessonListElement[];
};
