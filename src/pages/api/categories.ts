import { z } from "zod";
import { defineEndpoints } from "../../next-rest-framework/client";
import { prisma } from "./prisma";

/* The point of this endpoint is to delete a list.
It will receive an id, will find corresponding list and remove it.
*/
export const categoriesGetOutput = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export default defineEndpoints({
  GET: {
    openApiSpec: {
      description: "Will get all the categories currently used",
    },
    output: [
      {
        status: 418,
        contentType: "text/plain",
        schema: z.string(),
      },
      {
        status: 200,
        contentType: "application/json",
        schema: categoriesGetOutput,
      },
    ],
    handler: async ({ res }) => {
      try {
        const test = await prisma.category.findMany({});
        res.status(200).send(test);
      } catch (err) {
        res.status(418).send("Something is wrong");
      }
    },
  },
});
