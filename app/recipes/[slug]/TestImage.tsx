"use client";

import { CldImage } from "next-cloudinary";
// import Image from "next/image";
interface TestImageProps {
	image: string;
	title: string;
}

export default function TestImage({ image, title }: TestImageProps) {
	return (
		<div>
			<CldImage
				src={image ?? ""}
				alt={title}
				width={500} // specify your desired width
				height={300} // and height
			/>
		</div>
	);
}
