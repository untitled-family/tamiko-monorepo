// Define layer stacking
type Item = "header" | "footer" | "section"

const items: Item[] = ["header", "footer"]

// Helper function to get the stack index
export const zIndex = (item: Item) => items.length - items.indexOf(item)
