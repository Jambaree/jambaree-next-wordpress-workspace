"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>reset error boundary</button>
    </div>
  );
}
