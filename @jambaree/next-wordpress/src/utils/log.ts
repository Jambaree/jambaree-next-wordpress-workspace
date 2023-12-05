import type { ColorName } from "chalk";
import chalk from "chalk";

type LogArgs = {
  prefix?: string;
  prefixColor?: ColorName;
  separator?: string;
  messageColor?: ColorName;
};

export default function log(
  message: any,
  {
    prefix = "@jambaree/next-wordpress",
    prefixColor = "red",
    separator = "-",
    messageColor = "white",
  }: LogArgs = {
    prefix: "@jambaree/next-wordpress",
    prefixColor: "red",
    separator: "-",
    messageColor: "white",
  }
) {
  // eslint-disable-next-line no-console -- we're logging to console
  console.log(
    chalk[prefixColor](`${prefix}${chalk[messageColor](` ${separator}`)}`),
    message
  );
}
