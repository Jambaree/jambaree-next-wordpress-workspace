import Image from "next/image";

export function Hero(props) {
  return (
    <div>
      <h1>{props.headline}</h1>

      <Image
        src={props.image.sourceUrl}
        alt={props.image.altText}
        width={props.image.mediaDetails.width}
        height={props.image.mediaDetails.height}
      />

      <pre>
        <code>{JSON.stringify({ props }, null, 2)}</code>
      </pre>
    </div>
  );
}
