import React from "react";

import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div>404</div>
      <p>Oops, we can't find the page you're looking for.</p>
      <p>
        Return to the <Link href="/">homepage</Link>.
      </p>
    </div>
  );
}
