import chalk from "chalk";

type LogArgs = {
  prefix?: string;
  prefixColor?: string;
  separator?: string;
};

export default function log(
  message: any,
  {
    prefix = "@jambaree/next-wordpress",
    prefixColor = "red",
    separator = "-",
  }: LogArgs = {
    prefix: "@jambaree/next-wordpress",
    prefixColor: "red",
    separator: "-",
  }
) {
  // eslint-disable-next-line no-console -- we're logging to console
  console.log(
    chalk[prefixColor]?.(`${prefix}${chalk.white(` ${separator}`)}`),
    message
  );
}
