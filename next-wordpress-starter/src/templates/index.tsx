import DefaultPageTemplate from "./page/default";
import DefaultPostTemplate from "./post/default";
import PostArchive from "./archive/blog";
import CategoryTaxonomyTemplate from "./taxonomy/category";
import TagTaxonomyTemplate from "./taxonomy/tag";
import DefaultMovieTemplate from "./movie/default";
import MovieArchive from "./archive/movie";

const templates = {
  page: {
    default: DefaultPageTemplate,
  },
  movie: {
    default: DefaultMovieTemplate,
  },
  post: {
    default: DefaultPostTemplate,
  },
  archive: {
    blog: PostArchive,
    movie: MovieArchive,
  },
  taxonomy: {
    category: CategoryTaxonomyTemplate,
    post_tag: TagTaxonomyTemplate,
  },
};

export default templates;
