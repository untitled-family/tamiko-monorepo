import { Property, Attribute } from "@/hooks/useTamikoMetadata";
import { BigNumber } from "ethers";

/**
 * Filter an array of attributes by traits
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
 * Transform attributes array into an object
 * @param properties array of all attributes to convert to object
 * @returns Object of Property
 */
export const attributesToObject = (properties: Attribute[]): Property => {
  const propertiesObject = properties.reduce((obj, item) => Object.assign(obj, { [item.trait_type]: item.value }), {}) as Property

  return propertiesObject;
}

/**
 * Transform an array of Item values into an object of Item key values
 * @param 
 */
export type Item = {
  id: number;
  name: string;
  description: string;
  svg: string,
  price: number;
  creator: string;
}
type ItemTypes = number | string | BigNumber

export const extractItemProperties = (array: ItemTypes[]): Item => {
  const keys = ['id', 'name', 'description', 'svg', 'price', 'creator']
  const bigNumbers = ['id', 'price']

  const item = {
    id: 0,
    name: '',
    description: '',
    svg: '',
    price: 0,
    creator: '0x0'
  }

  keys.forEach((key, index) => {
    if (bigNumbers.includes(key)) {
      // @ts-ignore
      item[key] = array[index].toNumber()
    } else {
      // @ts-ignore
      item[key] = array[index]
    }
  })

  return item
}