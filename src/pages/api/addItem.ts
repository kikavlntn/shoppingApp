import { MasterItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "src/pages/api/prisma";

/*
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { query, units, number, inputList } = inputQueryTest.parse(
        request.body
      );
      // Getting ID of list we will add product to.  If none there create one

      let product: MasterItem;
      const list = await prisma.list.findFirst({
        where: {
          id: inputList,
        },
      });
      if (!list) {
        response.status(404).send("List not found");
      } else {
        try {
          product = (await prisma.masterItem.findFirst({
            where: {
              name: query,
            },
          })) as MasterItem;

          const test = await prisma.item.create({
            data: {
              imageUrl: product.imageUrl,
              name: product.name,
              checked: false,
              quantity: Number(number) ? Number(number) : 0,
              unit: units ? units : "",
              defaultCategory: {
                connect: {
                  name: product.category as string,
                },
              },
              inList: {
                connect: {
                  id: list.id,
                },
              },
            },
          });

          response.status(200).send(test.createdAt);
        } catch (err) {
          console.log("Find Me!", err);

          const other = await prisma.category.findFirst({
            where: {
              name: "other",
            },
          });
          const test = await prisma.item.create({
            data: {
              name: query,
              quantity: Number(number) ? Number(number) : 0,
              unit: units ? units : "",
              imageUrl:
                "https://a0.anyrgb.com/pngimg/1652/488/supermarket-lifelike-shopping-mall-realistic-shopping-bags-coffee-shop-shopping-bags-trolleys-shopping-bag-shopping-girl-shopping-cart-thumbnail.png",
              defaultCategory: {
                connect: {
                  id: other?.id,
                },
              },
              inList: {
                connect: {
                  id: list.id,
                },
              },
            },
          });
          response.status(201).send(test.createdAt);
        }
      }
    } catch (err) {
      if (err instanceof ZodError) {
        response.status(400).send(`Wrong Data Sent =>${JSON.stringify(err)}`);
      } else {
        response.status(418).send(JSON.stringify(err));
        console.log(err);
      }
    }
    response.status(404).send(`Invalid method, need POST: ${request.method}`);
  }
}

const inputQueryTest = z.object({
  query: z.string().regex(/[A-z]/, "No Numbers allowed"),
  number: z.optional(z.string()),
  units: z.optional(z.string()),
  inputList: z.string(),
});
