// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://www.tokopedia.com/search?st=product&q=aqua
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 50566 })
  console.log(res.status)
}
