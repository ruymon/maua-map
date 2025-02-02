import { getAllEdges } from "@/data/edges";
import { getAllNodes } from "@/data/nodes";
import { Map } from ".";

export async function MapShell() {
  const [nodeData, edgeData] = await Promise.all([
    getAllNodes(),
    getAllEdges(),
  ]);

  return <Map nodesData={nodeData} edgesData={edgeData} />;
}
