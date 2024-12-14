import { MAP_LAYERS } from "@/config/map";
import { IS_IN_DEVELOPMENT } from "@/constants/workspace";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Node } from "@payload-types";
import { ScatterplotLayer } from "deck.gl";
import { toast } from "sonner";
import { orange } from "tailwindcss/colors";
import { hexToRGBArray } from "../../utils";

export function NodesLayer(nodes: Node[] | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (d: any) => {
    const node: Node = d.object;
    if (!node) return;

    const nodeId = node.id;
    copy(nodeId)
      .then(() => toast("Node id copied to clipboard."))
      .catch(() => alert("Failed to copy!"));
  };

  return new ScatterplotLayer({
    id: MAP_LAYERS.GRAPH_NODES_LAYER_ID,
    data: nodes,
    pickable: true,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 4,
    onClick: handleClick,
    getLineWidth: 0.25,
    getPosition: (d: Node) => [d.coordinates[0], d.coordinates[1]],
    getFillColor: hexToRGBArray(orange[400]),
    visible: IS_IN_DEVELOPMENT,
  });
}
