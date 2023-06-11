import AuthCheck from "@/components/AuthCheck";

export default async function DashBoard() {
	return (
		<AuthCheck permittedRoles={["ADMIN"]}>
			<div>
				<h1>Dashboard</h1>
			</div>
		</AuthCheck>
	);
}
