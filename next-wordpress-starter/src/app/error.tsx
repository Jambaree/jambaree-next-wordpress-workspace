"use client";

import Button from "@/components/button";
import React from "react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // todo: Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  // Function to replace URLs with anchor tags
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">${url}</a>`
    );
  };

  const processedErrorMessage = renderTextWithLinks(error?.message);

  return (
    <div className="text-center p-24 flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>

      <h3 className="mt-2 text-sm font-semibold text-gray-900">Error</h3>

      <div className="prose">
        {process.env.NODE_ENV === "development" ? (
          <p
            className="mt-1 text-sm text-gray-500 prose"
            dangerouslySetInnerHTML={{ __html: processedErrorMessage }}
          />
        ) : (
          <p className="mt-1 text-sm text-gray-500">Something went wrong</p>
        )}
      </div>

      <div className="flex items-center gap-x-6 flex-wrap justify-center mt-6">
        <Button onClick={() => reset()}>Click to retry</Button>

        <a href="/" className="flex items-center gap-x-2">
          Go to home page{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
