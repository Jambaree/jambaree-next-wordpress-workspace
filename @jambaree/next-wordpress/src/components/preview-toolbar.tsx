import React from "react";
import Link from "next/link";

import "./preview-toolbar.css";
import { useSearchParams } from "next/navigation";

export function PreviewToolbar({ uri }) {
  const searchParams = useSearchParams();
  const toolbar = searchParams.get("toolbar");

  if (toolbar === "false") {
    return null;
  }

  return (
    <div className="previewToolbar">
      <Link
        prefetch={false}
        href={`/api/draft/disable-draft?uri=${uri}`}
        className={`preview-tooltip right`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    </div>
  );
}
