import { getLocations } from '@/lib/locations';

export default async function MapRootPage() {
  const data = await getLocations();
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
