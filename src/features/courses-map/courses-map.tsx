"use client";
import { ReactFlowProvider } from "reactflow";
import { ActionsPanel } from "./_ui/actions-panel";
import { ControlsLayout } from "./_ui/controls-layout";
import { Flow } from "./_ui/flow";
import { AddImageDialog } from "./_ui/dialogs/add-image-dialog";
import { useGetMapQuery } from "./_vm/queries";
import { useQuery } from "@tanstack/react-query";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { UpdateNodeBaseDialog } from "./_ui/dialogs/update-node-base-dialog";

export function CoursesMap() {
  const mapQuery = useQuery({
    ...useGetMapQuery(),
  });

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
        <ControlsLayout actionsPanel={<ActionsPanel />} />
      </div>
      <AddImageDialog />
      <UpdateNodeBaseDialog />
    </ReactFlowProvider>
  );
}
