import React, { Fragment, Suspense } from "react";

interface IFlexibleContentProps {
  blocks: any;
  rows: any;
  /**
   * Extra data that will be passed to each individual component
   */
  data: any;
}

export const FlexibleContent = ({
  blocks,
  rows,
  data,
}: IFlexibleContentProps) => {
  if (!!rows) {
    return rows
      .filter((o) => o !== null)
      .map(({ __typename, ...rest }: any, index: number) => {
        const type = __typename.split("_").slice(-1)[0];

        const rowData = { __typename, type, ...rest };

        const Component = blocks?.[type];

        const el = Component ? (
          <Component
            key={index}
            firstItem={index === 0}
            {...rowData}
            {...data}
          />
        ) : (
          <>
            {console.log(`React component "${type}" was not found. Make sure the
            component exists and you are importing it.`)}
          </>
        );

        return <Fragment key={index}>{el}</Fragment>;
      });
  } else {
    return null;
  }
};

export default FlexibleContent;
