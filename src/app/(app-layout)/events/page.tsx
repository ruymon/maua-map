export default async function EventsPage() {
  // mock delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <h1>Events Root</h1>;
}
