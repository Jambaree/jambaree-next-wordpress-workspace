export function Hero(props) {
  return (
    <div>
      <h1>Hero</h1>
      <pre>
        <code>{JSON.stringify({ props }, null, 2)}</code>
      </pre>
    </div>
  );
}
