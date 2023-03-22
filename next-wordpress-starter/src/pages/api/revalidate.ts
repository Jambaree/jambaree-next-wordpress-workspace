import { NextApiRequest, NextApiResponse } from "next";

// import { getSeedData } from "@jambaree/next-wordpress";

type Data = {
  status: "success" | "error";
  message?: string;
  path?: string;
};

export default async function Revalidation(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const path = req.body.path;

  console.log(`Revalidating: ${path}`);

  // todo: handle revalidating content nodes and content types
  // const seedData = await getSeedData({uri: path})

  // if (seedData.isContentNode) {
  //   // handle revalidating this and it's archive
  // }

  // if (seedData.isTermNode) {
  //   // handle revalidating this term and also all nodes that are in this term
  // }

  // if (seedData.__typename === "ContentType") {
  //   // this is an archive node
  //   // handle revalidating this and all nodes that are in this archive
  // }

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
