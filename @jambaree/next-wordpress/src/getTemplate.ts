import { toCamel } from "./utils/toCamel";
import log from "./utils/log";

type GetTemplateArgs = {
  uri: string;
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
  uri,
  seedData,
  templates,
}: GetTemplateArgs) {
  const isArchive = seedData?.__typename === "ContentType";

  if (isArchive) {
    // check if seedData?.uri exists, if not use uri instead
    const templateName = toCamel(
      seedData?.uri ? seedData?.graphqlSingleName : uri
    );

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

export { getTemplate };
