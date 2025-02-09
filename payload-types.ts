/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    media: Media;
    events: Event;
    users: User;
    locations: Location;
    block: Block;
    nodes: Node;
    edges: Edge;
    "payload-locked-documents": PayloadLockedDocument;
    "payload-preferences": PayloadPreference;
    "payload-migrations": PayloadMigration;
  };
  collectionsJoins: {
    block: {
      locations: "locations";
    };
  };
  collectionsSelect: {
    media: MediaSelect<false> | MediaSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    locations: LocationsSelect<false> | LocationsSelect<true>;
    block: BlockSelect<false> | BlockSelect<true>;
    nodes: NodesSelect<false> | NodesSelect<true>;
    edges: EdgesSelect<false> | EdgesSelect<true>;
    "payload-locked-documents":
      | PayloadLockedDocumentsSelect<false>
      | PayloadLockedDocumentsSelect<true>;
    "payload-preferences":
      | PayloadPreferencesSelect<false>
      | PayloadPreferencesSelect<true>;
    "payload-migrations":
      | PayloadMigrationsSelect<false>
      | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: "users";
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    username: string;
  };
  login: {
    password: string;
    username: string;
  };
  registerFirstUser: {
    password: string;
    username: string;
  };
  unlock: {
    username: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  description?: string | null;
  _key?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  name: string;
  banner: string | Media;
  description: string;
  startTime: string;
  endTime: string;
  activities?:
    | {
        name: string;
        description: string;
        banner?: (string | null) | Media;
        location?: (string | null) | Location;
        startTime: string;
        endTime: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations".
 */
export interface Location {
  id: string;
  name: string;
  normalizedName?: string | null;
  image?: (string | null) | Media;
  code?: string | null;
  block: string | Block;
  type:
    | "classroom"
    | "laboratory"
    | "office"
    | "bathroom"
    | "storage"
    | "cafeteria"
    | "restaurant"
    | "sports"
    | "auditorium";
  floor: string;
  referenceNode: string | Node;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "block".
 */
export interface Block {
  id: string;
  name: string;
  image?: (string | null) | Media;
  locations?: {
    docs?: (string | Location)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nodes".
 */
export interface Node {
  id: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  coordinates: [number, number];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  role?: ("admin" | "user") | null;
  updatedAt: string;
  createdAt: string;
  email?: string | null;
  username: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "edges".
 */
export interface Edge {
  id: string;
  startNode: string | Node;
  endNode: string | Node;
  cost?: number | null;
  type?: ("crosswalk" | "path" | "staircase") | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: "media";
        value: string | Media;
      } | null)
    | ({
        relationTo: "events";
        value: string | Event;
      } | null)
    | ({
        relationTo: "users";
        value: string | User;
      } | null)
    | ({
        relationTo: "locations";
        value: string | Location;
      } | null)
    | ({
        relationTo: "block";
        value: string | Block;
      } | null)
    | ({
        relationTo: "nodes";
        value: string | Node;
      } | null)
    | ({
        relationTo: "edges";
        value: string | Edge;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: "users";
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: "users";
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  description?: T;
  _key?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  name?: T;
  banner?: T;
  description?: T;
  startTime?: T;
  endTime?: T;
  activities?:
    | T
    | {
        name?: T;
        description?: T;
        banner?: T;
        location?: T;
        startTime?: T;
        endTime?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  username?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations_select".
 */
export interface LocationsSelect<T extends boolean = true> {
  name?: T;
  normalizedName?: T;
  image?: T;
  code?: T;
  block?: T;
  type?: T;
  floor?: T;
  referenceNode?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "block_select".
 */
export interface BlockSelect<T extends boolean = true> {
  name?: T;
  image?: T;
  locations?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nodes_select".
 */
export interface NodesSelect<T extends boolean = true> {
  coordinates?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "edges_select".
 */
export interface EdgesSelect<T extends boolean = true> {
  startNode?: T;
  endNode?: T;
  cost?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}
