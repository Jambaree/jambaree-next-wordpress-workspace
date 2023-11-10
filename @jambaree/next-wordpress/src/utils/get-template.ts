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
    const template = templates?.archive?.[archive.slug];
    if (!template) {
      log(
        `Warn: Archive template "${archive.slug}" not found on uri '${uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );
    }
    return template;
  }

  if (!archive) {
    const template = templates?.[data.type]?.[data?.template || "default"];

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
