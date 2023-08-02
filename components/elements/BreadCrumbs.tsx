"use client";

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";

// define the Props
export type CrumbItem = {
	label: string;
	path: string;
};

export type BreadcrumbsProps = {
	items: CrumbItem[];
};

export default function BreadCrumbs({ items }: BreadcrumbsProps) {
	return (
		<div className="hidden sm:flex gap-2 items-start ">
			{/* Home icon */}
			<Link href="/">
				<IoHomeOutline className="inline text-buff-500 hover:text-buff-400 hover:underline" />
			</Link>
			{/* separator */}
			<span className="text-buff-500"> {">"} </span>
			{items.map((crumb, i) => {
				const isLastItem = i === items.length - 1;
				if (!isLastItem) {
					return (
						<>
							<Link href={crumb.path} key={i}>
								<span className="text-buff-500 hover:text-buff-400 hover:underline">
									{crumb.label}
								</span>
							</Link>
							{/* separator */}
							<span className="text-buff-500"> {">"} </span>
						</>
					);
				} else {
					return (
						<span key={i} className="text-buff-500">
							{" "}
							{crumb.label}{" "}
						</span>
					);
				}
			})}
		</div>
	);
}
