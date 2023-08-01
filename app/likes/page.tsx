import AuthCheck from "@/components/auth/AuthCheck";
import { prisma } from "@/lib/prisma";
import { Like } from "@prisma/client";
import LikeCard from "./LikeCard";
import LikeForm from "./LikeForm";
import BreadCrumbs from "@/components/elements/BreadCrumbs";

export default async function Likes() {
	const likes: Like[] = await prisma.like.findMany();

	const groupedLikes: { [key: string]: Like[] } = likes.reduce(
		(groups: { [key: string]: Like[] }, like) => {
			if (!groups[like.category]) {
				groups[like.category] = [];
			}
			groups[like.category].push(like);
			return groups;
		},
		{}
	);

	return (
		<div>
			<BreadCrumbs items={[{ label: "Likes", path: "/likes" }]}></BreadCrumbs>
			<h1>Likes</h1>

			{Object.entries(groupedLikes)
				.sort(([catA], [catB]) => catA.localeCompare(catB))
				.map(([category, likes]) => (
					<div key={category} className="max-w-xl mr-auto ml-auto">
						<h2>{category}</h2>
						{likes
							.sort((a: Like, b: Like) => a.name.localeCompare(b.name))
							.map((like: Like) => (
								<LikeCard key={like.id} like={like} />
							))}
					</div>
				))}

			<AuthCheck permittedRoles={["ADMIN"]}>
				<LikeForm like={null}></LikeForm>{" "}
			</AuthCheck>
		</div>
	);
}
