import { CoursesMapNode } from "../../../_domain/projections";

export enum DialogType {
  ADD_COURSE = "ADD_COURSE",
  ADD_IMAGE = "ADD_IMAGE",
  UPDATE_NODE = "UPDATE_NODE",
}

export type DialogParams = {
  [DialogType.UPDATE_NODE]: {
    node: CoursesMapNode;
  };
  [DialogType.ADD_COURSE]: {};
  [DialogType.ADD_IMAGE]: {};
};
