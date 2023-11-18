# @jambaree/next-wordpress

Welcome to `@jambaree/next-wordpress` v2. This package facilitates building Next.js sites using headless WordPress as the CMS. The shift from GraphQL to the WP REST API in this version significantly enhances performance and streamlines development.

## Features

- **WP REST API Integration**: Leverages WP REST API for optimized performance.
- **Enhanced Caching**: GET requests are cached at the WP server and in NextJS.
- **Speedy Development**: Reduces development time by eliminating the need for writing extensive queries.

## Prerequisites

Before you begin, ensure you have the following WordPress plugins installed:

- **Advanced Custom Fields PRO**: Enables custom fields in WordPress.
- **Yoast SEO**: Provides SEO features for WordPress sites.
- **Jambaree Next WP Plugin**: Essential for CMS previews in NextJS. [Plugin link](https://github.com/Jambaree/jambaree-next-wp-plugin)

## Installation

Install `@jambaree/next-wordpress@beta` via npm:

```bash
npm install @jambaree/next-wordpress@beta
```

## Quick Start

Here's a basic example to get started:

```tsx
// src/app/[[...paths]]/page.tsx
import { WordpressTemplate } from "@jambaree/next-wordpress";
import templates from "@/templates";

export default function PageTemplate(props) {
  return (
    <WordpressTemplate
      params={props.params}
      searchParams={props.searchParams}
      templates={templates}
    />
  );
}

export {
  generateMetadata,
  generateStaticParams,
} from "@jambaree/next-wordpress";
```

## Usage

### Importing Templates file

Import and define your page templates:

```tsx
// Example templates file
import ContactPageTemplate from "./page/contact";
import DefaultPageTemplate from "./page/default";

const templates = {
  // post type slug in WP
  page: {
    // template name in WP
    default: DefaultPageTemplate,
    contact: ContactPageTemplate,
  },
};

export default templates;
```

## Default page template example

### This example uses the Flexible Content component to render blocks

```tsx
// Default page template file
import { FlexibleContent } from "@jambaree/next-wordpress";
import * as blocks from "@/components/blocks";

export default function DefaultPageTemplate({ data }) {
  return <FlexibleContent blocks={blocks} rows={data?.acf?.flexible_content} />;
}
```

# API Reference

This document provides detailed information about the functions and components available in the `@jambaree/next-wordpress` package.

## Next.js App Functions

### `generateMetadata`

Generates metadata for a page using the `yoast_head_json` field from the WordPress REST API.

- **Parameters**:
  - `params`: Object - Contains routing parameters.
  - `wpUrl`: String - The WordPress URL (optional, default is `NEXT_PUBLIC_WP_URL` env variable).
- **Returns**: Promise\<Metadata\>
- **Usage**:
  ```typescript
  const metadata = await generateMetadata({ params });
  ```

## API Reference

This document provides detailed information about the functions and components available in the `@jambaree/next-wordpress` package.

### Next.js App Functions

#### `generateStaticParams`

Generates static routes for a Next.js site based on WordPress REST API results.

- **Parameters**:
  - `wpUrl`: `String` - The WordPress URL (optional, default is NEXT_PUBLIC_WP_URL env variable).
  - `postTypes`: `Array<String>` - The post types to include in static generation (default: ["pages", "posts"]).
- **Returns**: `Promise<Array>`
- **Usage**:
  ```typescript
  const staticParams = await generateStaticParams({
    postTypes: ["pages", "posts"],
  });
  ```

#### `generateSiteMap`

Generates a `sitemap.xml` file for a site using the WordPress REST API.

- **Parameters**:
  - `postTypes`: `Array<String>` - The post types to include in the sitemap (default: ["pages", "posts"]).
- **Returns**: `Promise<MetadataRoute.Sitemap>`
- **Usage**:
  ```typescript
  const siteMap = await generateSiteMap({ postTypes: ["pages", "posts"] });
  ```

#### `revalidate`

Triggers revalidation of specified paths in a Next.js app.

- **Parameters**:
  - `request`: `Request` - Contains the paths to be revalidated.
- **Returns**: `Promise<Response>`
- **Usage**:
  ```typescript
  // app/api/revalidate/route.ts
  export { revalidate as PUT } from "@jambaree/next-wordpress";
  ```

### Draft Mode Preview Route Handler

#### `NextWordPressPreview`

Handles preview routes in Next.js apps for draft content in WordPress.

- **Parameters**:
  - `req`: NextRequest - The request object.
  - `res`: RouteHandlerContext - The response context.
  - `options`: PreviewOptions - Options for the preview.
    - `toolbar`: Boolean - Whether to display draft mode toolbar (default: false).
- **Returns**: Function or Response
- **Usage**:

  ```typescript
  // app/api/draft/[...preview]/route.ts
  export { NextWordPressPreview as GET };
  ```

  With additional options:

  ```typescript
  // app/api/draft/[...preview]/route.ts
  import { NextWordPressPreview } from "@jambaree/next-wordpress";

  const previewOptions = {
    toolbar: true,
  };

  const previewHandler = NextWordPressPreview(previewOptions);

  export { previewHandler as GET };
  ```

### REST API Functions

#### `getPageData`

Fetches data for a specific page from a WordPress REST API endpoint.

- **Parameters**:
  - `uri`: String - The URI of the page.
- **Returns**: Promise<Object>
- **Usage**:
  ```typescript
  const pageData = await getPageData("/about");
  ```

#### `getMenuItems`

Retrieves menu items from a WordPress site.

- **Parameters**:
  - `slug`: String - The slug of the menu.
- **Returns**: Promise<Array>
- **Usage**:
  ```typescript
  const menuItems = await getMenuItems({ slug: "main-menu" });
  ```

### Custom REST API Functions

#### `getOptionsPage`

Fetches data from an options page created in WordPress.

- **Parameters**:
  - `slug`: String - The slug of the options page.
- **Returns**: Promise<Object>
- **Usage**:
  ```typescript
  const options = await getOptionsPage({ slug: "theme-options" });
  ```

### React Components

#### `FlexibleContent`

A React component for rendering flexible content blocks.

- **Props**:
  - `blocks`: Object - Map of React components.
  - `rows`: Array - Array of row data.
  - `data`: Object - Extra data passed to each component (optional).
- **Usage**:
  ```jsx
  <FlexibleContent blocks={blocks} rows={rows} />
  ```

#### `WordpressTemplate`

A component for rendering WordPress templates in a Next.js app.

- **Props**:
  - `params`: Object - Routing parameters.
  - `templates`: Object - Map of page templates.
  - `searchParams`: Object - Search parameters (optional).
- **Usage**:
  ```jsx
  <WordpressTemplate params={params} templates={templates} />
  ```

### Deprecated Functions

#### `getData` and `getSeedData`

These functions have been deprecated and removed in v2. Please use `getPageData` instead. They were removed due to the migration to REST API from GraphQL for performance reasons.
