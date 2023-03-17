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
  console.log(
    chalk?.[prefixColor]?.(`${prefix}${chalk.white(` ${separator}`)}`),
    message
  );
}
