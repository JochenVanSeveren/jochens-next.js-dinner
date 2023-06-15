-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "optionalIngredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "herbs" SET DEFAULT ARRAY[]::TEXT[];
