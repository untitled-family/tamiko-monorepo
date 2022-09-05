type Attribute = {
  trait_type: string;
  value: string;
}

export const extractAttributes = (attributes: Attribute[], traits: string[]) => {
  const filtered = attributes.map(attr => traits.includes(attr.trait_type) && attr)

  return filtered.filter(o => o !== false ? o : null)
}

export const attributesToObject = (properties: Attribute[]) => {
  return properties.reduce((obj, item) => Object.assign(obj, { [item.trait_type]: item.value }), {});
}