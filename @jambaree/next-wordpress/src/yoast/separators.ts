export type Seperator = {
  label: string;
  value:
    | "sc-dash"
    | "sc-ndash"
    | "sc-mdash"
    | "sc-colon"
    | "sc-middot"
    | "sc-bull"
    | "sc-star"
    | "sc-smstar"
    | "sc-pipe"
    | "sc-tilde"
    | "sc-laquo"
    | "sc-raquo"
    | "sc-lt"
    | "sc-gt";
  symbol:
    | "–"
    | "-"
    | "—"
    | ":"
    | "·"
    | "•"
    | "*"
    | "⋆"
    | "|"
    | "~"
    | "«"
    | "»"
    | "<"
    | ">";
};

export const separators = [
  {
    label: "Dash",
    value: "sc-dash",
    symbol: "-",
  },
  {
    label: "En dash",
    value: "sc-ndash",
    symbol: "–",
  },
  {
    label: "Em dash",
    value: "sc-mdash",
    symbol: "—",
  },
  {
    label: "Colon",
    value: "sc-colon",
    symbol: ":",
  },
  {
    label: "Middle dot",
    value: "sc-middot",
    symbol: "·",
  },
  {
    label: "Bullet",
    value: "sc-bull",
    symbol: "•",
  },
  {
    label: "Asterisk",
    value: "sc-star",
    symbol: "*",
  },
  {
    label: "Low asterisk",
    value: "sc-smstar",
    symbol: "⋆",
  },
  {
    label: "Vertical bar",
    value: "sc-pipe",
    symbol: "|",
  },
  {
    label: "Small tilde",
    value: "sc-tilde",
    symbol: "~",
  },
  {
    label: "Left angle quotation mark",
    value: "sc-laquo",
    symbol: "«",
  },
  {
    label: "Right angle quotation mark",
    value: "sc-raquo",
    symbol: "»",
  },
  {
    label: "Less than sign",
    value: "sc-lt",
    symbol: "<",
  },
  {
    label: "Greater than sign",
    value: "sc-gt",
    symbol: ">",
  },
] as Seperator[];

export const getSeparator = (separator: Seperator["value"]) => {
  const found = separators.find((s) => s.value === separator);
  return found ? found.symbol : "";
};
