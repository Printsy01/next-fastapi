"use client";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../environment/api";
import { Article } from "../types";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";

export default function Articles() {
  const { data, loading, error } = useFetch<Article>(`${API_URL}/aricles`);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("desc");

  return (
    <div className="w-full px-20 flex flex-col gap-7">
      <div className="p-3 bg-gray-50 w-full shadow-md rounded-md">
        <div className="flex flex-row items-center">
          <div className="p-5">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Rechercher
            </label>
            <input
              type="text"
              className="p-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rechercher ..."
            />
          </div>
          <div className="p-5">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Filtrer par date
            </label>
            <select className="p-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="desc">Plus récent au plus ancien</option>
              <option value="asc">Plus ancien au plus récent</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-3 flex justify-center items-center bg-gray-50 w-full shadow-md rounded-md min-h-96">
        {loading ? (
          <IsLoading />
        ) : error ? (
          <IsError
            error={error}
            title="Une erreur est survenue"
            onRetry={() => window.location.reload()!}
          />
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
