type GetTemplateArgs = {
  seedData: {
    name: string;
    __typename: string;

    graphqlSingleName?: string;

    template?: {
      templateName: string;
    };

    contentType?: {
      node: {
        graphqlSingleName: string;
        hasArchive: boolean;
        uri: string;
      };
    };
  };
  templates: any;
};

export default async function getTemplate({
  seedData,
  templates,
}: GetTemplateArgs) {
  const isArchive = seedData?.__typename === "ContentType";
  const isCategory = seedData?.__typename === "Taxonomy";

  if (isArchive) {
    const template = templates?.archive?.[toCamel(seedData?.graphqlSingleName)];
    return template;
  }

  if (isCategory) {
    console.log(seedData?.name);
    const template = templates?.taxonomy?.[`${seedData?.name}`];
    return template;
  }

  const contentType = toCamel(seedData?.contentType?.node?.graphqlSingleName);

  const templateName = toCamel(seedData?.template?.templateName);
  const template = templates?.[contentType]?.[templateName];

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
