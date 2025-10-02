"use client";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../environment/api";
import { Article } from "../types";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";
import { useDebounce } from "../hooks/useDebounce";

export default function Articles() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("desc");
  const [queryError, setQueryError] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const isValidQuery = (value: string) => /^[a-zA-Z0-9]*$/.test(value);

  const { data, loading, error } = useFetch<Article>(`${API_URL}/articles`, {
    params: {
      sort: sort,
      query: isValidQuery(debouncedQuery) ? debouncedQuery : "",
    },
  });

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || isValidQuery(value)) {
      setQuery(value);
      setQueryError("");
    } else {
      setQueryError("Seuls les caractères alphanumériques sont autorisés");
    }
  };

  return (
    <div className="w-full px-1 md:px-20 flex flex-col gap-7">
      <div className="p-3 bg-gray-50 w-full shadow-md rounded-md">
        <div className="flex flex-row items-center">
          <div className="p-5">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Rechercher
            </label>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              className={`bg-white p-1 border ${
                queryError ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Rechercher ..."
            />
            {queryError && (
              <p className="mt-1 text-xs text-red-600">{queryError}</p>
            )}
          </div>
          <div className="p-5">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Filtrer par date
            </label>
            <select
              className="p-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="desc">Plus récent au plus ancien</option>
              <option value="asc">Plus ancien au plus récent</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-3 flex justify-center bg-gray-50 w-full shadow-md rounded-md min-h-96">
        {loading ? (
          <IsLoading />
        ) : error ? (
          <IsError
            error={error}
            title="Une erreur est survenue"
            onRetry={() => window.location.reload()!}
          />
        ) : data && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Aucun article trouvé
            </h3>
            <p className="text-sm text-gray-500">
              {query
                ? "Essayez de modifier votre recherche"
                : "Il n'y a pas d'articles pour le moment"}
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto max-h-96 overflow-y-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Résumé
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((article) => (
                  <tr
                    key={article.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {article.title}
                    </th>
                    <td className="px-6 py-4">
                      {new Date(article.date).toDateString()}
                    </td>
                    <td className="px-6 py-4">{article.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
