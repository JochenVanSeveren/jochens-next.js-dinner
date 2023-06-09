import { NextResponse } from "next/server";

// Dummy data
const recipes = [
	{
		name: "Krielpatatjes à la Jochen",
		ingredients: ["Krielpatatjes", "Bakboter"],
		herbs: ["Peper", "Zout", "Tijm", "Rozemarijn", "Basilicum"],
		img: "https://static.ah.nl/static/recepten/img_061468_1224x900_JPG.jpg",
		steps: [
			"Snij de patatjes in frietvorm",
			"Kook ze licht of steek ze 5 minuten in de microgolf",
			"Bak ze in de pan op een hoog vuur en voeg de kruiden toe",
		],
		slug: "krielpatatjes-a-la-jochen",
	},
	{
		name: "Kip met appel en groentjes ",
		ingredients: ["Kip", "Olie", "Appel", "Tomaten"],
		herbs: ["Peper", "Zout", "Tijm", "Rozemarijn", "Basilicum"],
		img: "https://static.ah.nl/static/recepten/img_061468_1224x900_JPG.jpg",
		steps: [
			"Giet olie in een ovenschaal",
			"Snij de appel in kleine lange stukjes",
			"Leg de kip, appeltjes en tomaten in de ovenschaal",
			"Kruid de kip met de kruiden",
			"Drenk de kip in de olie en wrijf rond",
			"Zet de ovenschaal in de oven op 175°C voor 20 minuten, na 10 minuten de kip omdraaien",
		],
		slug: "kip-met-appel-en-groentjes",
	},
];

export async function GET() {
	return NextResponse.json(recipes);
}
