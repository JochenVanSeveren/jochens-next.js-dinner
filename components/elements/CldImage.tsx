// Client component for the CldImage element
"use client";

import { CldImage as NextCldImage } from "next-cloudinary";

export default function CldImage(props: any) {
	return (
		<div>
			<NextCldImage {...props} />
		</div>
	);
}
