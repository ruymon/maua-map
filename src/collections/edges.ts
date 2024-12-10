import { CollectionConfig } from "payload";

export const EdgesCollection: CollectionConfig = {
  slug: "edges",
  admin: {
    group: "Grafo",
  },
  labels: {
    singular: {
      pt: "Vértice",
    },
    plural: {
      pt: "Vértices",
    },
  },
  fields: [
    // Todo Validate that the start_node and end_node are different
    {
      name: "start_node",
      label: {
        pt: "Nó de início",
      },
      index: true,
      required: true,
      type: "relationship",
      relationTo: "nodes",
    },
    {
      name: "end_node",
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
