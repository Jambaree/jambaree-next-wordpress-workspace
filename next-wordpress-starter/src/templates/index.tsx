import DefaultPageTemplate from "./page/default";
import DefaultPostTemplate from "./post/default";
import DefaultPostArchiveTemplate from "./archive/post";
import CategoryTaxonomyTemplate from "./taxonomy/category";
import TagTaxonomyTemplate from "./taxonomy/tag";
import NewTaxonomyTaxonomyTemplate from "./taxonomy/taxonomytest";
import DefaultTestProductTemplate from "./testProduct/default";
import WeirdTaxonomyTaxonomyTemplate from "./taxonomy/weird-taxonomy";

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
  testProduct: {
    default: DefaultTestProductTemplate,
  },
  taxonomy: {
    category: CategoryTaxonomyTemplate,
    post_tag: TagTaxonomyTemplate,
    taxonomytest: NewTaxonomyTaxonomyTemplate,
    ["weird-taxonomy"]: WeirdTaxonomyTaxonomyTemplate,
  },
};

export default templates;
