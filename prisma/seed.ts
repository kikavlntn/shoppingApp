import data from "../data.json";
import { PrismaClient } from "@prisma/client";
type Input = {
  image: string;
  name: string;
};
type Data = Record<string, Array<Input>>;
const prisma = new PrismaClient();
async function main() {
  const bigData: Data = data;
  for (let categoryName in bigData) {
    await prisma.masterItem.createMany({
      data: bigData[categoryName].map((x) => {
        return {
          approved: true,
          imageUrl: x.image,
          name: x.name,
          category: categoryName,
        };
      }),
      skipDuplicates: true,
    });
    await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }
}
main();
