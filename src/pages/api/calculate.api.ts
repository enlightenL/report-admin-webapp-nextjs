import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const { a, b } = request.query;
  response.status(200).send(+(a as string) + +(b as string));
};
