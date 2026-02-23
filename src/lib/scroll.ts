/**
 * Smoothly scrolls to the element with the given id.
 * Gracefully does nothing if the element doesn't exist.
 */
export function scrollToSection(id: string): void {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}
