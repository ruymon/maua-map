import { getAllEdges } from "@/lib/edges";
import { getAllNodes } from "@/lib/nodes";
import { Map } from ".";

export async function MapShell() {
  const [nodeData, edgeData] = await Promise.all([
    getAllNodes(),
    getAllEdges(),
  ]);

  return <Map nodesData={nodeData} edgesData={edgeData} />;
}
