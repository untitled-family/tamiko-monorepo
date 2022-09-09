import { Property, Attribute } from "@/hooks/useTamikoMetadata";

/**
 * Fetch tokenIds of owned by an address
 * @param attributes array of all attributes to look through
 * @param traits array of traits to be extracted
 * @returns Array of Attributes 
 */
export const extractAttributes = (attributes: Attribute[], traits: string[]): Attribute[] => {
  if (!attributes) return []

  const attrs = attributes.map(attr => traits.includes(attr.trait_type) && attr);
  const filtered = attrs.filter(Boolean) as Attribute[];

  return filtered;
}

/**
 * Fetch tokenIds of owned by an address
 * @param properties array of all attributes to convert to object
 * @returns Object of Property
 */
export const attributesToObject = (properties: Attribute[]): Property => {
  const propertiesObject = properties.reduce((obj, item) => Object.assign(obj, { [item.trait_type]: item.value }), {}) as Property

  return propertiesObject;
}