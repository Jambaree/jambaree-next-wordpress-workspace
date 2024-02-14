export default function MovieArchive(props) {
  const { uri, data, archive } = props;

  return (
    <div>
      <h1>Movie Archive</h1>
      <pre>
        <code>{JSON.stringify({ uri }, null, 2)}</code>
      </pre>

      <p>items length: {data.items.length}</p>

      <pre>
        <code>{JSON.stringify({ page: data.page }, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify({ items: data.items }, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify({ archive }, null, 2)}</code>
      </pre>
    </div>
  );
}
