import Image from "next/image";
import Link from "next/link";
import Button from "../button";

export async function Hero({ headline, subline, links, image }) {
  const [headline1, headline2] = headline ? chunkString(headline) : [];

  return (
    <section className="lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            {headline1 && <span className="block xl:inline">{headline1}</span>}{" "}
            {headline2 && (
              <span className="block text-indigo-600 xl:inline">
                {headline2}
              </span>
            )}
          </h1>

          {subline && (
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              {subline}
            </p>
          )}

          <div className="mt-10 sm:flex sm:justify-center lg:justify-start sm:space-x-4 space-y-2 sm:space-y-0">
            {links?.map(({ link, variant }, index) => {
              return (
                <Button
                  key={index}
                  variant={variant}
                  component={Link}
                  href={link.url}
                  target={link.target}
                  size="lg"
                >
                  {link.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        {image && (
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={image.url}
            alt={image.alt || ""}
            width={image.width}
            height={image.height}
          />
        )}
      </div>
    </section>
  );
}

const chunkString = (string) => {
  let middle = Math.floor(string.length / 2);
  let before = string.lastIndexOf(" ", middle);
  const after = string.indexOf(" ", middle + 1);

  if (middle - before < after - middle) {
    middle = before;
  } else {
    middle = after;
  }

  const s1 = string.substr(0, middle);
  const s2 = string.substr(middle + 1);
  return [s1, s2];
};
