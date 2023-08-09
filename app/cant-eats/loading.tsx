export default function LoadingSignIn() {
	return (
		<>
			<div className="animate-pulse space-y-4 w-32 hidden sm:block">
				<div className="h-4 bg-buff-200 rounded w-full "></div>
			</div>
			<div className="space-y-4 max-w-xl mr-auto ml-auto">
				{/* Recipes h1 loading state */}
				<div className="animate-pulse h-10 bg-buff-200 rounded w-32 text-2xl mb-2 ml-auto mr-auto"></div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-16 bg-buff-200 rounded w-full mt-2 mb-2"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
				<div className="animate-pulse flex space-x-4">
					<div className="h-8 bg-buff-200 rounded w-full"></div>
				</div>
			</div>
		</>
	);
}
