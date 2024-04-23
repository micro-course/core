import { coursesMapHttpApi } from "./_api";
import { Flow } from "./_ui/flow";

export async function CoursesMap() {
  const coursesMap = await coursesMapHttpApi.coursesMap.get.query();

  return (
    <div className="grow relative">
      <Flow coursesMap={coursesMap} />
    </div>
  );
}
