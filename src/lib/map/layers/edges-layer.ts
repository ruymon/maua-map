import { MAP_LAYERS } from "@/config/map";
import { EdgeReturn } from "@/data/edges";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { hexToRGBArray } from "@/lib/utils";
import { useMapLayersStore } from "@/stores/map-layers-store";
import { Edge } from "@payload-types";
import { LineLayer } from "deck.gl";
import { toast } from "sonner";
import { red } from "tailwindcss/colors";

export function EdgesLayer(edges: EdgeReturn[] | undefined) {
  const { isEdgesLayerVisible } = useMapLayersStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (d: any) => {
    const edge: Edge = d.object;
    if (!edge) return;

    const edgeId = edge.id;
    copy(edgeId)
      .then(() => toast("Edge id copied to clipboard."))
      .catch(() => alert("Failed to copy!"));
  };

  return new LineLayer({
    id: MAP_LAYERS.GRAPH_EDGES_LAYER_ID,
    data: edges,
    pickable: true,
    getWidth: 3,
    getSourcePosition: ({ startNode }: Edge) => [
      // @ts-expect-error - TS doesn't know that startNode is a Node
      startNode.coordinates[0],
      // @ts-expect-error - TS doesn't know that startNode is a Node
      startNode.coordinates[1],
    ],
    getTargetPosition: ({ endNode }: Edge) => [
      // @ts-expect-error - TS doesn't know that endNode is a Node
      endNode.coordinates[0],
      // @ts-expect-error - TS doesn't know that endNode is a Node
      endNode.coordinates[1],
    ],
    getColor: hexToRGBArray(red[900]),
    visible: isEdgesLayerVisible,
    onClick: handleClick,
  });
}
