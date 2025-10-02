import { ApiResponse, Article } from "@/app/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  query: z
    .string()
    .regex(/^[a-zA-Z]*$/, "Query must contain only alphabets")
    .optional()
    .default(""),
  sort: z.enum(["asc", "desc"]).optional().default("desc"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parseResult = querySchema.safeParse({
      query: searchParams.get("query") || "",
      sort: searchParams.get("sort") || "desc",
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Invalid parameters", errors: parseResult.error.format(), data: [] },
        { status: 400 }
      );
    }
    const { query, sort } = parseResult.data;
    const articles = await prisma.article.findMany({
      orderBy: {
        date: sort,
      },
    });

    const queryArticles = query
      ? articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.summary.toLowerCase().includes(query.toLowerCase())
        )
      : articles;

    const response: ApiResponse<Article> = {
      data: queryArticles,
      message: "List of articles",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There was an error", data: [] },
      { status: 500 }
    );
  }
}
