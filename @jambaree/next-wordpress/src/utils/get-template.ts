import log from "./log";

type GetTemplateArgs = {
  uri: string;
  data: any;
  archive: any;
  templates: any;
};

/**
 * Get the template for a given uri
 */
export default async function getTemplate({
  uri,
  data,
  archive,
  templates,
}: GetTemplateArgs) {
  if (archive?.slug) {
    const tmplName = removeFileExt(archive.slug);
    const template = templates?.archive?.[tmplName];
    if (!template) {
      log(
        `Warn: Archive template "${archive.slug}" not found on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }

  if (!archive) {
    const tmplName = removeFileExt(data?.template || "default");
    const template = templates?.[data.type]?.[tmplName];

    if (!template) {
      log(
        `Warn: Template "${data?.template || "default"}" not found for type "${
          data?.type
        }" on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }
}

export { getTemplate };

function removeFileExt(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return filename;
  return filename.substring(0, dotIndex);
}
