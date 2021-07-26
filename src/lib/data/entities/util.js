import { createIdBuilder } from "/lib/util";

/**
 * An ID generator for entities. IDs are composed of the "type" property of the
 * object passed into the function and the current timestamp in base 32.
 */
 export const createEntityId = createIdBuilder(
  [({ type }) => type, ({ created }) => created ?? Date.now().toString(32)],
  {}
);