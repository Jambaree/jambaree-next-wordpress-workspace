import DefaultPageTemplate from "./page/default";
import DefaultPostTemplate from "./post/default";
import DefaultPostArchiveTemplate from "./archive/post";
import CategoryTaxonomyTemplate from "./taxonomy/category";
import TagTaxonomyTemplate from "./taxonomy/tag";

const templates = {
  page: {
    default: DefaultPageTemplate,
  },
  post: {
    default: DefaultPostTemplate,
  },
  archive: {
    post: DefaultPostArchiveTemplate,
  },
  taxonomy: {
    category: CategoryTaxonomyTemplate,
    post_tag: TagTaxonomyTemplate,
  },
};

export default templates;
