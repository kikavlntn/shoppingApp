import { GetServerSideProps } from "next";
import axios from "axios";
import { Item, List } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { ItemListMapper } from "@/components/List/ItemListMapper";
import { SortBySwitches } from "@/components/List/SortBySwitches";
import {
  sortByDate,
  sortByAlphabet,
  sortByCategory,
} from "@/components/List/SortFunctions";

export type Category = {
  id: string;
  name: string;
  item: Item[];
};

// export type List = {
//   id: string;
//   listName: string | null;
//   createdAt: Date;
//   userIdentifier: string;
//   favorite: boolean | null;
//   items: Item[];
// };

export type InputProps = {
  list: List;
  category: Category;
};

export default function Home(getData: InputProps) {
  const [sortBy, setSortBy] = useState("date");

  let list: Item[] = [];
  let data = { ...getData };

  switch (sortBy) {
    case "date":
      list = sortByDate(data.category.item);
      break;
    case "alphabetical":
      list = sortByAlphabet(data.category.item);
      break;
    case "category":
      list = sortByCategory(data.category.item);
      break;
  }

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleClick = async () => {
    await axios.post("http://localhost:3000/api/addItem", {
      query: "sage",
      inputList: "1e3e64e1-bbb4-4b31-b829-772694127995",
    });
    refreshData();
  };

  return (
    <div>
      <div className="m-6">
        {/* <SortBySwitches sortBy={sortBy} setSort={setSortBy}></SortBySwitches>
        <ItemListMapper list={list} sortBy={sortBy}></ItemListMapper> */}
      </div>
      <div>{JSON.stringify(getData)}</div>
      <button
        className="bg-grad-default p-4 rounded-md text-text-white"
        onClick={handleClick}
      >
        Add Sage
      </button>
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug; // slug = listId
  const getData: InputProps = await axios
    .get(`http://localhost:3000/api/listItems?inputList=${slug}`)
    .then((res) => res.data);

  return {
    props: {
      getData,
    },
  };
};

export { getServerSideProps };
