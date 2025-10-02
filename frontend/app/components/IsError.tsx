interface ErrorDisplayProps {
  error: string | Error;
  title?: string;
  onRetry?: () => void;
}

export default function IsError({
  error,
  title = "Une erreur est survenue",
  onRetry,
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="text-red-600 dark:text-red-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
        {title}
      </h3>

      <p className="text-red-700 dark:text-red-400 text-center mb-6">
        {errorMessage}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
