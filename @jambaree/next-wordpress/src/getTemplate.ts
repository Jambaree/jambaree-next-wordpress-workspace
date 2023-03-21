import log from "./utils/log";

type GetTemplateArgs = {
  seedData: {
    name: string;
    __typename: string;

    graphqlSingleName?: string;

    template?: {
      templateName: string;
    };

    contentTypeName?: string;

    contentType?: {
      node: {
        graphqlSingleName: string;
        hasArchive: boolean;
        uri: string;
      };
    };

    taxonomyName?: string;
    isTermNode?: boolean;
  };
  templates: any;
};

export default async function getTemplate({
  seedData,
  templates,
}: GetTemplateArgs) {
  const isArchive = seedData?.__typename === "ContentType";

  if (isArchive) {
    const templateName = toCamel(seedData?.graphqlSingleName);
    const template = templates?.archive?.[templateName];

    if (!template) {
      log(
        `Warn: Template "${templateName}" not found for type "${seedData?.__typename}" (${templateName} archive) on uri '${seedData?.uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );

      log(seedData, {
        prefix: "seedData",
        prefixColor: "cyan",
        separator: ":",
      });
    }
    return template;
  }

  if (seedData?.isTermNode) {
    const template = templates?.taxonomy?.[`${seedData?.taxonomyName}`];

    if (!template) {
      log(
        `Warn: Template "${seedData?.taxonomyName}" that would be used for term "${seedData?.slug}" not found for taxonomy "${seedData?.__typename}" on uri '${seedData?.uri}'. Did you forget to add it to the templates object in src/templates/index? `
      );

      log(seedData, {
        prefix: "seedData",
        prefixColor: "cyan",
        separator: ":",
      });
    }
    return template;
  }

  const contentType = toCamel(seedData?.contentType?.node?.graphqlSingleName);

  const templateName = toCamel(seedData?.template?.templateName);
  const template = templates?.[contentType]?.[templateName];

  if (!template) {
    log(
      `Warn: Template "${templateName}" not found for type "${seedData?.__typename}" on uri '${seedData?.uri}'. Did you forget to add it to the templates object in src/templates/index? `
    );

    log(seedData, {
      prefix: "seedData",
      prefixColor: "cyan",
      separator: ":",
    });
  }

  return template;
}

const toCamel = (string) => {
  if (!string) {
    return null;
  }
  string = string.replace(/[-_\s.]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : ""
  );
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

export { getTemplate };
