import AuthCheck from "@/components/AuthCheck";

export default function CantEats() {
	return (
		<AuthCheck>
			<div>
				<h1>Cant-eats</h1>
			</div>{" "}
		</AuthCheck>
	);
}
