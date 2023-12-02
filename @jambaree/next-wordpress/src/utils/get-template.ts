import type { WpPage } from "@/types";
import log from "./log";

type GetTemplateArgs = {
  uri: string;
  data: WpPage;
  archive?: WpPage;
  templates: any;
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
}: GetTemplateArgs) {
  if (archive?.slug) {
    const tmplName = handleTemplateName(archive.slug);
    const template = templates?.archive?.[tmplName];
    if (!template && !supressWarnings) {
      log(
        `Warn: Archive template "${archive.slug}" not found on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }

  if (!archive) {
    const tmplName = handleTemplateName(data.template || "default");
    const template = templates?.[data.type]?.[tmplName];

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
