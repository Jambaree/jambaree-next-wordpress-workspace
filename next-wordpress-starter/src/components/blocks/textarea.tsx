import Edges from "../edges";

export function Textarea({ text }) {
  return <Edges className="my-10" dangerouslySetInnerHTML={{ __html: text }} />;
}
