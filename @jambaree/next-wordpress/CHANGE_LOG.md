## Changelog

0.1.0

- Revamped query to handle more complicated taxonomies

  0.1.5

- remove revalidate function

  0.1.6

- added getData() function

  0.1.7

- added YoastSEO support for taxonomies

  0.1.8

- Remove generateStaticParam for debugging

  0.1.9

- Add generateStaticParam

  0.2.0

- Changed getMenuItems - > useMenuItems and reduced complexity

  0.2.1

- Changed getMenuItems - > useMenuItems in index

  0.2.2

- Removed YoastSEO as there is a new way to handle this now with beta.next app directory (generateMetaData)
- Remove generateStaticParams from package

  0.3.0

- Added generateStaticParams and generateMetadata fexportable functions

  0.3.1

- fixed type in generateMetaData

  0.3.2

- added more seo data to getSeedData and default image for openGraph

  0.3.3

- conditional to prevent error on archive pages seo

  0.3.4

- added maximum-scale=5 to viewport

  0.3.5

- added revalidation to support functions

  0.3.6

- remove revalidation.

  0.3.7

- renamed const in generateStaticParam

  0.3.8

- by default uses NEXT_PUBLIC_WPGRAPHQL_URL for queries but can now overwrite by passing in url: {process.env.NEXT_PUBLIC_WPGRAPHQL_URL} to any of "getData, getYoastData, getSeedData" etc.

  0.3.9

- remove overwrite url for generateStaticParams, must use process.env.NEXT_PUBLIC_WPGRAPHQL_UR

  0.4.1

- add "" to prevent typescript error in all functions

  0.4.5

- fixed issue with getTemplate not resolving correctly in preview causing 404 (error introduced in 0.4.3)
- breaking change for getMenuItems -> provide id and idType instead of just name (easy fix now is just change it from name to id, the idType will default to NAME.) This allows more flexibility for querying by location, id, name, slug, etc.

  0.4.6

- add some yoast meta for archives and taxonomy term nodes

  0.4.9

- Updated generateStaticParams to query first: 99 instead of 10
- Pass uri into template to handle null uri bug with wordpress archive pages.
- Regarding null uri bug -> naming convention for post archive page will be whatever the page uri is
  Example: archive/post.tsx is now -> archive/blog.tsx (this is temporary until they fix null uri on blog archvies)

  0.5.0

- added support for contentTypes in generateStaticParams

  0.5.1

- added metadataBase to seo
- removed "location" from menuitems query

  0.5.3

- added generateSiteMap and attempting to give searchParams error
