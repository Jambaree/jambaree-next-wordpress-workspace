export interface WpPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any; // Define a more specific type if the structure of meta is known
  acf?: any;
  yoast_head: string;
  yoast_head_json?: YoastHeadJson;
  _links: any; // Define a more specific type if the structure of _links is known
}

interface YoastHeadJson {
  title?: string;
  og_description?: string;
  og_title?: string;
  og_site_name?: string;
  og_locale?: string;
  og_url?: string;
  og_image?: OgImage[];
  twitter_card?: string;
  twitter_image?: string;
}

interface OgImage {
  url?: string;
}

export interface WpLink {
  target?: string;
  title?: string;
  url?: string;
}

export interface WpImage {
  ID?: number;
  id?: number;
  title?: string;
  filename?: string;
  filesize?: number;
  url?: string;
  link?: string;
  alt?: string;
  author?: string;
  description?: string;
  caption?: string;
  name?: string;
  status?: string;
  uploaded_to?: number;
  date?: string;
  modified?: string;
  menu_order?: number;
  mime_type?: string;
  type?: string;
  subtype?: string;
  icon?: string;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: string;
    "thumbnail-width"?: number;
    "thumbnail-height"?: number;
    medium?: string;
    "medium-width"?: number;
    "medium-height"?: number;
    medium_large?: string;
    "medium_large-width"?: number;
    "medium_large-height"?: number;
    large?: string;
    "large-width"?: number;
    "large-height"?: number;
    "1536x1536"?: string;
    "1536x1536-width"?: number;
    "1536x1536-height"?: number;
    "2048x2048"?: string;
    "2048x2048-width"?: number;
    "2048x2048-height"?: number;
  };
}

export interface WpSettings {
  title: string;
  description: string;
  url: string;
  email: string;
  timezone: string;
  date_format: string;
  time_format: string;
  start_of_week: number;
  language: string;
  use_smilies: boolean;
  default_category: number;
  default_post_format: string;
  posts_per_page: number;
  show_on_front: string;
  page_on_front: number;
  page_for_posts: number;
  default_ping_status: string;
  default_comment_status: string;
  site_logo: null | string; // Assuming it could be a string when not null
  site_icon: number;
}

export interface WpMenuItem {
  id: number;
  title: {
    rendered: string;
  };
  status: string;
  url: string;
  attr_title: string;
  description: string;
  type: string;
  type_label: string;
  object: string;
  object_id: number;
  parent: number;
  menu_order: number;
  target: string;
  classes: string[];
  xfn: string[];
  invalid: boolean;
  meta: any;
  menus: number;
  acf: any[]; // This might include WpImage or WpLink
  _links: WpLink[]; // Replacing LinksType with WpLink
  label: string;
  path: string;
  childItems: WpMenuItem[];
}

export type WpMenu = WpMenuItem[];
