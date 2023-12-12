import type { WpImage, WpLink } from "@jambaree/next-wordpress/src/types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "../ui/button";

export function TextImage({
  headline,
  content,
  button,
  image,
  reverse,
  hideBottomBorder,
}: {
  headline?: string;
  content?: string;
  button?: WpLink;
  image?: WpImage;
  reverse?: boolean;
  hideBottomBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        "edges sm:py-24 md:py-32 grid md:grid-cols-2 lg:gap-x-32 sm:gap-y-20 gap-y-10 gap-x-20 py-16",
        hideBottomBorder ? "" : "border-b"
      )}
    >
      <div className={cn(reverse ? "order-1" : "")}>
        {headline ? (
          <h2
            className="mb-10"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        ) : null}

        {content ? (
          <div
            className="mb-10"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}

        {button?.url ? (
          <Button asChild>
            <Link
              dangerouslySetInnerHTML={{ __html: button.title || "" }}
              href={button.url}
              target={button.target}
            />
          </Button>
        ) : null}
      </div>

      <div>
        {image?.url ? (
          <Image
            alt={image.alt || ""}
            height={image.height}
            src={image.url}
            width={image.width}
          />
        ) : null}
      </div>
    </div>
  );
}
