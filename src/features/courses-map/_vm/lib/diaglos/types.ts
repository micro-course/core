import { MapNodeProjection } from "../../../_domain/projections";

export enum DialogType {
  ADD_COURSE = "ADD_COURSE",
  ADD_IMAGE = "ADD_IMAGE",
  UPDATE_NODE_BASE = "UPDATE_NODE_BASE",
}

export type DialogParams = {
  [DialogType.UPDATE_NODE_BASE]: {
    node: MapNodeProjection;
  };
  [DialogType.ADD_COURSE]: {};
  [DialogType.ADD_IMAGE]: {};
};
