import { NextWordPressPreview } from "@jambaree/next-wordpress";

const previewOptions = {
  toolbar: true,
};

const previewHandler = NextWordPressPreview(previewOptions);

export { previewHandler as GET };
