import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "./prisma";

/* The point gets user id and should take name, if
*/

const inputQueryDelete = z.object({
  id: z.string(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PATCH") {
    try {
      const { id } = inputQueryDelete.parse(request.query);
      await prisma.list.create({
        data: { userIdentifier: id },
      });

      response.status(201).json({ message: `List created` });
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send("Something is wrong");
      }
    }
  } else {
    response.status(405).send(`Invalid method, need PATCH: ${request.method}`);
  }
}