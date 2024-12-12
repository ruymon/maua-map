import { aStar } from "@/lib/astar";
import { getAllEdges } from "@/lib/edges";
import { findNearestNode, getAllNodes } from "@/lib/nodes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startLat = parseFloat(searchParams.get("startLat") || "");
  const startLon = parseFloat(searchParams.get("startLon") || "");
  const endLat = parseFloat(searchParams.get("endLat") || "");
  const endLon = parseFloat(searchParams.get("endLon") || "");

  if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
    return NextResponse.json(
      { error: "Invalid coordinates provided" },
      { status: 400 },
    );
  }

  try {
    const [nodes, edges] = await Promise.all([getAllNodes(), getAllEdges()]);

    const startNode = await findNearestNode(startLon, startLat);
    const endNode = await findNearestNode(endLon, endLat);

    const path = aStar(startNode, endNode, nodes, edges);

    if (!path) {
      return NextResponse.json({ error: "No path found" }, { status: 404 });
    }

    return NextResponse.json({ path });
  } catch (error) {
    console.error("Error in path finding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
