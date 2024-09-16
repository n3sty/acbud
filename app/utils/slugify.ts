export function slugify(text = "John Doe"): string {
  return text
    .normalize("NFD") // Normalize the text to its decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove all previously joined accents
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}