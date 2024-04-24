import { coursesMapHttpApi } from "./_api";
import { Flow } from "./_ui/flow";
import { FlowProvider } from "./_ui/flow-provider";

export async function CoursesMap() {
  const coursesMap = await coursesMapHttpApi.coursesMap.get.query();

  return (
    <FlowProvider>
      <div className="grow relative">
        <Flow coursesMap={coursesMap} />
      </div>
    </FlowProvider>
  );
}
