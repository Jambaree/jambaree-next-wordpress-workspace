import { NextWordPressPreview } from "@jambaree/next-wordpress";

const previewOptions = {
  toolbar: true,
};

const previewHandler = NextWordPressPreview(previewOptions);

export { previewHandler as GET };

// export { NextWordPressPreview as GET } from "@jambaree/next-wordpress";
