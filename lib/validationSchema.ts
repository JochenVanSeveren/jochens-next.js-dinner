import { z } from "zod";

export const RecipeEntrySchema = z.object({
	slug: z.string().nonempty({ message: "Slug is required" }),
	title: z.string().nonempty({ message: "Title is required" }),
	ingredients: z
		.array(z.string())
		.nonempty({ message: "At least one ingredient is required" }),
	optionalIngredients: z.array(z.string()),
	herbs: z.array(z.string()),
	steps: z
		.array(z.string())
		.nonempty({ message: "At least one step is required" }),
	image: z.string().optional(),
	authorId: z.string().nonempty({ message: "Author ID is required" }),
});

export type RecipeFormattedErrors = z.inferFormattedError<
	typeof RecipeEntrySchema
>;
