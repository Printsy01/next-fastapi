import React from "react";

export default function IsLoading() {
  return (
    <div className="flex justify-center items-center min-h-96 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
