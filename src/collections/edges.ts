import { CollectionConfig } from "payload";

export const EdgesCollection: CollectionConfig = {
  slug: "edges",
  disableDuplicate: true,
  admin: {
    group: "Grafo",
  },
  labels: {
    singular: {
      pt: "Aresta",
    },
    plural: {
      pt: "Arestas",
    },
  },
  fields: [
    // Todo Validate that the startNode and endNode are different
    {
      name: "startNode",
      label: {
        pt: "Nó de início",
      },
      index: true,
      required: true,
      type: "relationship",
      relationTo: "nodes",
    },
    {
      name: "endNode",
      label: {
        pt: "Nó de fim",
      },
      index: true,
      required: true,
      type: "relationship",
      relationTo: "nodes",
    },
    {
      name: "cost",
      label: {
        pt: "Custo",
      },
      type: "number",
    },
    {
      name: "type",
      label: {
        pt: "Tipo de vértice",
      },
      type: "select",
      options: ["crosswalk", "path", "staircase"],
      defaultValue: "path",
    },
  ],
};
