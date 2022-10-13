// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | string>
) {
    const test = req.query.test;

    if (test === undefined) {
        res.status(200).json('Generic response');
        return;
    }

    res.status(200).json(test.toString());
}
