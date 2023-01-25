export default async function DefaultPageTemplate({ uri, preview }) {
  return (
    <>
      <h1>Default Page Template for {uri}</h1>
    </>
  );
}

// todo: need to query correct data depending on if preview === "true" or not
