import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { handleClick } from "./ListItem";

type InputProps = {
  id: string;
  setDetails: Dispatch<SetStateAction<boolean>>;
};
export const units = ["ml", "l", "g", "kg", "cups"];
type Test = {
  id: string;
  what: string;
  toWhat: string;
};

export default function EditModal({ id, setDetails }: InputProps) {
  let [quantityInput, setQuantityInput] = useState<string[]>(["Placeholder"]);
  const { data } = useQuery(["categories"], () =>
    getCategories(setQuantityInput)
  );
  const queryClient = useQueryClient();

  const { mutate: reload } = useMutation({
    mutationFn: (input: Test) => {
      return patchItem(input.id, input.what, input.toWhat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });

  const clickOnSelect = (
    id: string,
    what: string,
    toWhat: string,
    setDetails: Dispatch<SetStateAction<boolean>>
  ) => {
    handleClick(id);
    setDetails(false);
    reload({ id: id, what: what, toWhat: toWhat });
  };

  let categories = [
    {
      name: "Quantity",
      values: ["1", "2", "3", "4", "5", "6"],
    },
    {
      name: "Category",
      values:
        //infinite categories can be created (somehow)
        quantityInput,
    },
    {
      name: "Unit",
      values: units,
    },
    { name: "ImageUrl", values: [] },
  ];

  return (
    <div className="absolute w-full h-full gap-0 flex flex-col font-sans outline-primary-default-background">
      <Tab.Group>
        <Tab.List className="flex rounded-xl bg-text-white px-3 py-3">
          {categories.map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-2xl py-2 font-medium leading-5 focus:outline-none",
                  selected
                    ? "bg-primary-default-Solid text-text-white"
                    : "bg-text-white text-text-typo"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-full h-8">
          {categories.map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl w-full bg-white py-0 outline-1 outline-primary-default-Solid font-sans text-text-typo ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <ul className="rounded-xl outline outline-offset-2 bg-text-white outline-primary-default-Solid overflow-y-auto max-h-44">
                {category.name !== "Category" && (
                  <li>
                    <input
                      type={category.name === "Quantity" ? "number" : "text"}
                      className=" text-sm font-medium leading-5 w-full h-10 rounded-md bg-secondary-transparent p-3 outline-primary-default-Solid"
                      placeholder="Enter custom input here"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          clickOnSelect(
                            id,
                            category.name,
                            e.currentTarget.value,
                            setDetails
                          );
                        }
                      }}
                    />
                  </li>
                )}
                {category.values.map((option) => (
                  <li
                    key={option}
                    className=" rounded-md p-3 hover:bg-secondary-transparent"
                  >
                    <h3
                      className="text-sm font-medium leading-5"
                      onClick={() =>
                        clickOnSelect(id, category.name, option, setDetails)
                      }
                    >
                      {option}
                    </h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export const patchItem = (item: string, what: string, toWhat: string) => {
  const object = {
    who: item,
    what: what.charAt(0).toLowerCase() + what.slice(1),
    toWhat:
      what === "Unit"
        ? (toWhat as string).split(" ")[0]
        : what === "Quantity"
        ? Number(toWhat)
        : toWhat,
  };
  return axios.patch("http://localhost:3000/api/item", object);
};

const getCategories = async (
  setQuantityInput: Dispatch<SetStateAction<string[]>>
) => {
  return await axios.get("http://localhost:3000/api/categories").then((res) => {
    let test: string[] = res.data.map((x: any) => x.name);
    setQuantityInput(test);
  });
};
