import type { ReactNode } from "react";
import type { WpPage } from "@/types";
import type { PostType } from "@/api/get-post-types";
import log from "./log";

// Define a type for the template objects
type TemplateObject = Record<string, React.ComponentType<any> | ReactNode>;

// Define a type for the templates
export type Templates = Record<
  string,
  {
    default?: React.ComponentType<any> | ReactNode;
  } & TemplateObject
>;

type GetTemplateArgs = {
  uri: string;
  data: WpPage | undefined;
  archive?: PostType | undefined;
  templates: Templates;
  supressWarnings?: boolean;
};

/**
 * Get the template for a given uri
 */
export default function getTemplate({
  uri,
  data,
  archive,
  templates,
  supressWarnings,
}: GetTemplateArgs): React.ComponentType<any> | undefined {
  if (archive?.slug) {
    const tmplName = handleTemplateName(archive.slug);
    const template = templates.archive[tmplName];
    if (!template && !supressWarnings) {
      log(
        `Warn: Archive template "${archive.slug}" not found on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }

  if (!archive && data) {
    const tmplName = handleTemplateName(data.template || "default");
    const template = templates[data.type || ""][tmplName];

    if (!template && !supressWarnings) {
      log(
        `Warn: Template "${tmplName || "default"}" not found for type "${
          data.type
        }" on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }
}

export { getTemplate };

function handleTemplateName(filename: string) {
  let templateName = filename;

  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex !== -1) {
    templateName = filename.substring(0, dotIndex);
  }

  templateName = templateName
    .split(/[_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  templateName = templateName.charAt(0).toLowerCase() + templateName.slice(1);

  return templateName;
}
