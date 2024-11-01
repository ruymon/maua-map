export async function getLocations() {
  const url = "http://localhost:3000/locations.json";

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const result = await fetch(url, options);
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Error fetching direction details:", data);
  }

  return data;
}
