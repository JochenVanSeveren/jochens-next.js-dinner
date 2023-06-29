"use client";

import { Recipe as RecipeType } from "@prisma/client";
import { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import urlSlug from "url-slug";
import { handleRecipeDelete, handleRecipeSubmit } from "@/app/actions";
import CldImage from "@/components/elements/CldImage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { RecipeFormattedErrors } from "@/lib/validationSchema";

type RecipeFormProps = {
	recipe: RecipeType | null;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
	const [validationError, setValidationError] =
		useState<RecipeFormattedErrors | null>(null);
	const [imageChanged, setImageChanged] = useState<boolean>(false);
	const {} = recipe ?? {};
	const [title, setTitle] = useState<string>(recipe?.title ?? "");
	const [slug, setSlug] = useState<string>(recipe?.slug ?? "");
	const [imageSrc, setImageSrc] = useState<string>(recipe?.image ?? "");
	const [ingredients, setIngredients] = useState<string[]>(
		recipe?.ingredients ?? [""]
	);
	const [optionalIngredients, setOptionalIngredients] = useState<string[]>(
		recipe?.optionalIngredients ?? []
	);
	const [herbs, setHerbs] = useState<string[]>(recipe?.herbs ?? []);
	const [steps, setSteps] = useState<string[]>(recipe?.steps ?? [""]);

	const { pending } = useFormStatus();

	const params = useParams();
	const router = useRouter();

	useEffect(() => {
		if (title && params.slug === "new") {
			setSlug(urlSlug(title));
		}
	}, [title, params.slug]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		// check if files are present
		if (!e.target.files) return;
		const file = e.target.files[0];
		setImageSrc(URL.createObjectURL(file));
		setImageChanged(true); // Image has changed
	}

	async function handleSubmit(formdata: FormData) {
		if (pending) return;

		const result = await handleRecipeSubmit(
			slug,
			formdata,
			imageChanged,
			ingredients,
			optionalIngredients,
			herbs,
			steps,
			imageSrc
		);

		if (result?.error) {
			setValidationError(result?.error);
		} else {
			setValidationError(null);
		}
	}

	const handleDelete = async () => {
		if (recipe && confirm("Are you sure you want to delete this recipe?")) {
			await handleRecipeDelete(recipe.id, recipe.image);
			router.push("/recipes");
		}
	};

	return (
		<>
			<h1>RecipeForm</h1>
			<form action={handleSubmit}>
				<label>Title:</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{validationError?.title && (
					<p>{validationError.title._errors.join(", ")}</p>
				)}

				<label>Slug:</label>
				<input type="text" name="slug" value={slug} readOnly />
				{validationError?.slug && (
					<p>{validationError.slug._errors.join(", ")}</p>
				)}
				<div>
					{imageSrc && (
						<CldImage
							src={imageSrc}
							alt={"Upload image"}
							width={500} // specify your desired width
							height={300} // and height
						/>
					)}
				</div>

				<label>Upload Image:</label>
				<input
					type="file"
					name="file"
					accept="image/*"
					onChange={handleChange}
				/>
				{validationError?.image && (
					<p>{validationError.image._errors.join(", ")}</p>
				)}
				<InputList
					name="Ingredients"
					items={ingredients}
					setItems={setIngredients}
					validationError={validationError?.ingredients}
				/>

				<InputList
					name="Optional Ingredients"
					items={optionalIngredients}
					setItems={setOptionalIngredients}
					validationError={validationError?.optionalIngredients}
				/>
				<InputList
					name="Herbs"
					items={herbs}
					setItems={setHerbs}
					validationError={validationError?.herbs}
				/>
				<InputList
					name="Steps"
					items={steps}
					setItems={setSteps}
					validationError={validationError?.steps}
				/>

				<button type="submit" disabled={pending}>
					Save
				</button>
			</form>{" "}
			{recipe?.id && (
				<form onSubmit={handleDelete}>
					<button type="submit">Delete</button>
				</form>
			)}
		</>
	);
}

type InputListProps = {
	name: string;
	items: string[];
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
	validationError?: RecipeFormattedErrors;
};

function InputList({ name, items, setItems, validationError }: InputListProps) {
	const handleChange = (index: number, value: string) => {
		const newItems = [...items];
		newItems[index] = value;
		setItems(newItems);
	};

	const handleAdd = () => {
		setItems([...items, ""]);
	};

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return;
		const { source, destination } = result;
		const newItems = Array.from(items);
		const [reorderedItem] = newItems.splice(source.index, 1);
		newItems.splice(destination.index, 0, reorderedItem);
		setItems(newItems);
	};

	const handleRemove = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	return (
		<div>
			<label>{name}:</label>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId={name}>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{items.length > 0
								? items.map((item, index) => (
										<Draggable
											key={`${name}-${index}`}
											draggableId={`${name}-${index}`}
											index={index}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}>
													<div {...provided.dragHandleProps}>
														{name === "Steps" ? (
															<label style={{ cursor: "grab" }}>{`Step ${
																index + 1
															}: `}</label>
														) : (
															<FontAwesomeIcon icon={faBars} />
														)}{" "}
													</div>

													<input
														type="text"
														value={item}
														onChange={(e) =>
															handleChange(index, e.target.value)
														}
													/>
													<button>
														<FontAwesomeIcon
															icon={faTrash}
															onClick={() => handleRemove(index)}
														/>
													</button>
												</div>
											)}
										</Draggable>
								  ))
								: null}
							{validationError && <p>{validationError._errors.join(", ")}</p>}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<button type="button" onClick={handleAdd}>
				Add {name}
			</button>
		</div>
	);
}
