"use client";

import { motion } from "framer-motion";

const TransitionEffect = () => {
	return (
		<>
			<motion.div
				className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-buff-300"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
			/>
			<motion.div
				className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-buff-200"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
			/>
			<motion.div
				className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-buff-100"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
			/>
		</>
	);
};

export default TransitionEffect;
