export default function ContactPageTemplate({ data }) {
  return (
    <div>
      <h1>Contact page template</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
