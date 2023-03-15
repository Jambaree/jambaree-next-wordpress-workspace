import {
  WordpressTemplate,
  generateStaticParams,
  generateMetadata,
} from "@jambaree/next-wordpress";
import templates from "../../templates";

export default async function PageTemplate(props: {
  params: { paths: string[] };
}) {
  const {
    params: { paths },
  } = props;

  return (
    <>
      {/* https://beta.nextjs.org/docs/configuring/typescript  for more info*/}
      {/* @ts-expect-error Server Component */}

      <WordpressTemplate templates={templates} paths={paths} {...props} />
    </>
  );
}

export const revalidate = "force-cache";

export { generateStaticParams, generateMetadata };
