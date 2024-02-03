import { INITIAL_IMAGE_SIZE } from "../../_constants";

export const parseImageSize = ({
  widthStr,
  heightStr,
}: {
  widthStr: string;
  heightStr: string;
}) => {
  let width = parseInt(widthStr);
  let height = parseInt(heightStr);

  if (Number.isNaN(width)) {
    width = INITIAL_IMAGE_SIZE;
  }

  if (Number.isNaN(height)) {
    height = INITIAL_IMAGE_SIZE;
  }

  return {
    width,
    height,
  };
};
