import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: "success" | "error";
  message?: string;
  path?: string[];
};

export default async function Revalidation(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const path: string[] = req.body.path;
  console.log(`Revalidating: ${path}`);
  // todo: add secret to prevent unauthorized requestset to confirm this is a valid request
  //   if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  if (!path || !path.length) {
    return res.status(400).json({
      status: "error",
      message: "No path provided",
    });
  }

  try {
    console.log(`revalidating /${path}`);

    await res.revalidate(`/${path}`);

    return res.json({
      status: "success",
      message: `Revalidated ${path.length} path(s)`,
      path,
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({
      status: "error",
      message: `Internal server error`,
    });
  }
}
