import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashBoard() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}

	if (session.user?.role !== "admin") {
		return <h1>Not Authorized</h1>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
