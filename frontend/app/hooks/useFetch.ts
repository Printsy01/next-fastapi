"use client";
import { useEffect, useState } from "react";
import { ApiResponse } from "../types";

function buildParams(params: Record<string, any>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

export default function useFetch<T>(
  url: string,
  {
    params = {},
    options,
  }: { params?: Record<string, any>; options?: RequestInit } = {}
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = buildParams(params);
        const finalUrl = queryParams ? `${url}?${queryParams}` : url;

        const res = await fetch(finalUrl, options);

        if (!res.ok) throw new Error("Erreur lors de l'appel API");

        const json: ApiResponse<T> = await res.json();

        console.log(json);

        if (!ignore) setData(json.data);
      } catch (error: any) {
        if (!ignore) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
}
