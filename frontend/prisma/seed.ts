import { PrismaClient, Prisma } from "@/app/generated/prisma";

const prisma = new PrismaClient();

const articles: Prisma.ArticleCreateInput[] = [
  {
    title: "Qu'est-ce que l'EBITDA ?",
    date: new Date("2024-11-02"),
    summary: "Définition et intérêt pour l'analyse de performance.",
  },
  {
    title: "Marge brute vs marge nette",
    date: new Date("2025-01-15"),
    summary: "Comprendre les niveaux de marge et leurs usages.",
  },
  {
    title: "Les fondamentaux du cash-flow",
    date: new Date("2024-09-10"),
    summary: "Apprendre à analyser la trésorerie d'une entreprise.",
  },
  {
    title: "ROI et ROE : indicateurs de rentabilité",
    date: new Date("2024-12-05"),
    summary:
      "Différences et utilité du retour sur investissement et sur capitaux propres.",
  },
  {
    title: "Comprendre le bilan comptable",
    date: new Date("2024-08-22"),
    summary: "Structure et lecture d'un bilan pour les débutants.",
  },
  {
    title: "Analyse du compte de résultat",
    date: new Date("2025-02-18"),
    summary: "Interpréter les produits et charges d'une entreprise.",
  },
  {
    title: "Le fonds de roulement optimal",
    date: new Date("2024-10-30"),
    summary: "Calcul et importance du fonds de roulement en gestion.",
  },
  {
    title: "Ratios financiers essentiels",
    date: new Date("2025-01-08"),
    summary: "Les 10 ratios clés pour analyser une entreprise.",
  },
  {
    title: "Gestion de la trésorerie",
    date: new Date("2024-07-14"),
    summary: "Techniques pour optimiser la gestion quotidienne de cash.",
  },
  {
    title: "Prévisionnel financier",
    date: new Date("2025-03-22"),
    summary: "Élaborer un business plan financier fiable.",
  },
  {
    title: "Le point mort : calcul et analyse",
    date: new Date("2024-11-28"),
    summary: "Déterminer le seuil de rentabilité de son activité.",
  },
  {
    title: "Amortissement et dépréciation",
    date: new Date("2024-06-19"),
    summary: "Comptabilisation et impact sur les résultats.",
  },
  {
    title: "Analyse verticale et horizontale",
    date: new Date("2025-02-03"),
    summary: "Techniques d'analyse comparative des états financiers.",
  },
  {
    title: "Le besoin en fonds de roulement",
    date: new Date("2024-12-20"),
    summary: "Calcul et optimisation du BFR pour les entreprises.",
  },
  {
    title: "Tableau de flux de trésorerie",
    date: new Date("2025-03-10"),
    summary: "Établir et interpréter un tableau des flux de trésorerie.",
  },
];

export async function main() {
  for (const a of articles) await prisma.article.create({ data: a });
}

main();
