import React, { Fragment } from "react";

interface IFlexibleContentProps {
  blocks: any;
  rows: any;
  /**
   * Extra data that will be passed to each individual component
   */
  data?: any;
}

export const FlexibleContent = ({
  blocks,
  rows,
  data,
}: IFlexibleContentProps) => {
  if (!!rows) {
    return rows
      .filter((o) => o !== null)
      .map(({ acf_fc_layout, ...rest }: any, index: number) => {
        // capitalize each word and remove underscores
        const type = acf_fc_layout
          ?.split("_")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");

        const rowData = { type, ...rest };

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
