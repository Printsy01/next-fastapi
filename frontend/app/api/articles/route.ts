import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

    const articles = await prisma.article.findMany({
      orderBy: {
        date: sort,
      },
    });

    const queryArticles = query
      ? articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query)
        )
      : articles;

    const response = {
      data: queryArticles,
      message: "List of articles",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "There was an error",
      data: [],
    });
  }
}
