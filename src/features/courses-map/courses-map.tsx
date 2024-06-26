"use client";
import { ReactFlowProvider } from "reactflow";
import { ActionsPanel } from "./_ui/actions-panel";
import { ControlsLayout } from "./_ui/controls-layout";
import { Flow } from "./_ui/flow";
import { AddImageDialog } from "./_ui/dialogs/add-image-dialog";
import { useGetMapQuery } from "./_vm/queries";
import { useQuery } from "@tanstack/react-query";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { UpdateNodeDialog } from "./_ui/dialogs/update-node-dialog";
import { AddCourseDialog } from "./_ui/dialogs/add-course-dialog";
import { useMapAbility } from "./_vm/use-map-ability";

export function CoursesMap() {
  const mapQuery = useQuery({
    ...useGetMapQuery(),
  });

  const ability = useMapAbility();

  if (mapQuery.isPending) {
    return <FullPageSpinner />;
  }

  if (mapQuery.isError) {
    return <div>{mapQuery.error.message}</div>;
  }

  return (
    <ReactFlowProvider>
      <div className="grow relative">
        <Flow map={mapQuery.data} />
        <ControlsLayout
          actionsPanel={ability?.canMangeNodes() && <ActionsPanel />}
        />
      </div>
      {ability?.canMangeNodes() && (
        <>
          <AddImageDialog />
          <UpdateNodeDialog />
          <AddCourseDialog />
        </>
      )}
    </ReactFlowProvider>
  );
}
