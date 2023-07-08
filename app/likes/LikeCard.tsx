"use client";

import AuthCheck from "@/components/AuthCheck";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Like } from "@prisma/client";
import { useState } from "react";
import LikeForm from "./LikeForm";
import { handleLikeDelete } from "../actions";

interface LikeCardProps {
	like: Like;
}

export default function LikeCard({ like }: LikeCardProps) {
	const [isEditing, setIsEditing] = useState(false);

	async function handleDelete(id: string) {
		await handleLikeDelete(id);
	}

	return (
		<>
			{isEditing ? (
				<>
					{" "}
					<LikeForm like={like} setIsEditing={setIsEditing}></LikeForm>
				</>
			) : (
				<div>
					{like.name}{" "}
					<AuthCheck permittedRoles={["ADMIN"]}>
						<button onClick={() => setIsEditing(true)}>
							<FontAwesomeIcon icon={faEdit} />
						</button>
						<button>
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => handleDelete(like.id)}
							/>
						</button>
					</AuthCheck>
				</div>
			)}
		</>
	);
}
