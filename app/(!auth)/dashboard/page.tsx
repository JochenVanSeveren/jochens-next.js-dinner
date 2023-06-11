import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function DashBoard() {
	const session = await getServerSession(authOptions);
	const user = session?.user;
	console.log("User: ", user);

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
