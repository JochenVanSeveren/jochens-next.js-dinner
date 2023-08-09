export default function loadingRecipes() {
	return (
		<div className="mb-4">
			{/* BreadCrumbs and Add Recipe button loading state */}
			<div className="animate-pulse space-y-4 w-32 hidden sm:block">
				<div className="h-4 bg-buff-200 rounded w-full "></div>
			</div>
			{/* Recipes h1 loading state */}
			<div className="animate-pulse h-10 bg-buff-200 rounded w-32 text-2xl mb-2 ml-auto mr-auto"></div>

			{/* Recipes loading state */}
			<div className="flex flex-wrap gap-4 sm:space-x-4 justify-evenly animate-pulse">
				{[...Array(5)].map((_, idx) => (
					<div key={idx} className="space-y-4 w-full sm:w-auto">
						{/* Title placeholder */}
						<div className="h-8 bg-buff-200 rounded w-full text-center"></div>
						{/* Image placeholder */}
						<div className="h-36 bg-buff-200 rounded w-full mb-2 sm:w-[600px]"></div>
					</div>
				))}
			</div>
		</div>
	);
}
