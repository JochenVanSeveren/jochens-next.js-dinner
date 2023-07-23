"use client";

import AuthCheck from "@/components/auth/AuthCheck";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CantEat } from "@prisma/client";
import { useState } from "react";
import CantEatForm from "./CantEatForm";
import { handleCantEatDelete } from "../actions";

interface CantEatCardProps {
	cantEat: CantEat;
}

export default function CantEatCard({ cantEat }: CantEatCardProps) {
	const [isEditing, setIsEditing] = useState(false);

	async function handleDelete(id: string) {
		await handleCantEatDelete(id);
	}

	return (
		<>
			{isEditing ? (
				<>
					{" "}
					<CantEatForm
						cantEat={cantEat}
						setIsEditing={setIsEditing}></CantEatForm>
				</>
			) : (
				<div className="text-center">
					<span> {cantEat.name} </span>
					<AuthCheck permittedRoles={["ADMIN"]}>
						<button onClick={() => setIsEditing(true)}>
							<FontAwesomeIcon icon={faEdit} />
						</button>
						<button>
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => handleDelete(cantEat.id)}
							/>
						</button>
					</AuthCheck>
				</div>
			)}
		</>
	);
}
