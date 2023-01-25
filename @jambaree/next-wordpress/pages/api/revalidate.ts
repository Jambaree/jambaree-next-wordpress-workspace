import { NextApiRequest, NextApiResponse } from "next"

type Data = {
  status: "success" | "error"
  message?: string
  paths?: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const paths: string[] = req.body.paths

  // todo: add secret to prevent unauthorized requestset to confirm this is a valid request
  //   if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  if (!paths || !paths.length) {
    return res.status(400).json({
      status: "error",
      message: "No paths provided",
    })
  }

  try {
    paths.forEach(async (path) => {
      console.log(`revalidating /${path}`)

      await res.revalidate(`/${path}`)
    })

    return res.json({
      status: "success",
      message: `Revalidated ${paths.length} path(s)`,
      paths,
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({
      status: "error",
      message: `Internal server error`,
    })
  }
}