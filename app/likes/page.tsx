import { prisma } from "@/lib/prisma";
import { Like } from "@prisma/client";

export default async function Likes() {
	const likes: Like[] = await prisma.like.findMany();

	return (
		<div>
			<h1>Likes</h1>
			<div>
				{likes.map((like) => (
					<div key={like.id}>{like.name}</div>
				))}
			</div>
		</div>
	);
}
