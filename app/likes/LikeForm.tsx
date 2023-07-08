"use client";

import { LikeFormattedErrors } from "@/lib/validationSchema";
import { Like } from "@prisma/client";
import { useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { handleLikeSubmit } from "../actions";

interface LikeFormProps {
	like: Like | null;
	setIsEditing?: (isEditing: boolean) => void;
}

export default function LikeForm({ like, setIsEditing }: LikeFormProps) {
	const { pending } = useFormStatus();
	const [validationError, setValidationError] =
		useState<LikeFormattedErrors | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	async function handleSubmit(formdata: FormData) {
		if (pending) return;

		const result = await handleLikeSubmit(
			like?.id || null,
			formdata.get("name") as string,
			formdata.get("category") as string
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
					defaultValue={like?.name}
					placeholder="Name"
				/>
				<input
					type="text"
					name="category"
					defaultValue={like?.category}
					placeholder="Category"
				/>
				<button type="submit">{like ? "save" : "add"}</button>
			</form>
			{validationError?.name && (
				<p>{validationError.name._errors.join(", ")}</p>
			)}
			{validationError?.category && (
				<p>{validationError.category._errors.join(", ")}</p>
			)}
		</div>
	);
}
