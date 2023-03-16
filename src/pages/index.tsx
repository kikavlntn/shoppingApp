import SingleCard, { example_list, user_lists } from "@/components/Card";
import { Wrapper, returnNodes } from "@/components/cards";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm h-screen gap-2 justify-self-center">
        <h1 className="text-text-typo text-title">Landing Page</h1>
        <div className="">
          <SingleCard
            data={{
              id: "",
              listName: "",
              createdAt: "",
              itemsTotal: 0,
              itemsChecked: 0,
              favorite: false,
            }}
            createNewCard={false}

          />
          <Wrapper
          list={user_lists}/>
        </div>
      </div>
    </>
  );
}
