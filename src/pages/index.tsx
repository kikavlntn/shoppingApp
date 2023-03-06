import Head from "next/head";
import EditModal from "./list/EditModal";

export default function Home() {
	return (
		<>
			<div className="h-screen bg-primary-frame">
				<Head>
					<h1 className="font-heading text-primary-default-background">
						go back Header List Name
					</h1>
				</Head>
				<EditModal />
			</div>

			{/* <Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-red-600 text-4xl font-bold flex justify-center">
				Landing Page
			</h1> */}
		</>
	);
}
