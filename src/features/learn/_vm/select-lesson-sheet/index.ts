import { create } from "zustand";
import { CourseSlug } from "@/entities/course/course";

type State = {
  isOpen: boolean;
  selectedCourseSlug?: CourseSlug;
  openCourses: () => void;
  openCourseLesons: (courseSlug: CourseSlug) => void;
  closeLessons: () => void;
  close: () => void;
};

export const useSelectLessonSheetStore = create<State>((set) => ({
  isOpen: false,
  openCourses: () => set({ isOpen: true }),
  openCourseLesons: (selectedCourseSlug: CourseSlug) =>
    set({
      isOpen: true,
      selectedCourseSlug: selectedCourseSlug,
    }),
  closeLessons: () => set({ isOpen: true, selectedCourseSlug: undefined }),
  close: () => set({ isOpen: false, selectedCourseSlug: undefined }),
}));
