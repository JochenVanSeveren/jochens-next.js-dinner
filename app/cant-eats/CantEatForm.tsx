"use client";

import {
	CantEatFormattedErrors,
	LikeFormattedErrors,
} from "@/lib/validationSchema";
import { CantEat } from "@prisma/client";
import { useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { handleCantEatSubmit } from "../actions";

interface CantEatFormProps {
	cantEat: CantEat | null;
	setIsEditing?: (isEditing: boolean) => void;
}

export default function CantEatForm({
	cantEat,
	setIsEditing,
}: CantEatFormProps) {
	const { pending } = useFormStatus();
	const [validationError, setValidationError] =
		useState<CantEatFormattedErrors | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	async function handleSubmit(formdata: FormData) {
		if (pending) return;

		const result = await handleCantEatSubmit(
			cantEat?.id || null,
			formdata.get("name") as string
		);
		if (result?.error) {
			setValidationError(result?.error);
		} else {
			if (formRef.current) {
				formRef.current.reset();
			}
			setValidationError(null);
			if (setIsEditing) {
				setIsEditing(false);
			}
		}
	}

	return (
		<div>
			<form ref={formRef} action={handleSubmit}>
				<input
					type="text"
					name="name"
					defaultValue={cantEat?.name}
					placeholder="Name"
				/>

				<button type="submit">{cantEat ? "save" : "add"}</button>
			</form>
			{validationError?.name && (
				<p>{validationError.name._errors.join(", ")}</p>
			)}
		</div>
	);
}
