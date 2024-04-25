import { coursesMapHttpApi } from "./_api";
import { Controls } from "./_ui/controls/controls";
import { Flow } from "./_ui/flow/flow";
import { FlowProvider } from "./_ui/flow/flow-provider";

export async function CoursesMap() {
  const coursesMap = await coursesMapHttpApi.coursesMap.get.query();

  return (
    <FlowProvider>
      <div className="grow relative">
        <Flow coursesMap={coursesMap} />
        <Controls />
      </div>
    </FlowProvider>
  );
}
