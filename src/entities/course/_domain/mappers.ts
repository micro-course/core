import { omit } from "lodash-es";
import { CourseEntity } from "./entities";
import { CourseListItem } from "./projections";

export const courseEntityToListItem = (
  courseEntity: CourseEntity,
): CourseListItem => {
  return omit(courseEntity, ["description"]);
};
