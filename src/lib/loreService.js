/// <reference types="vite/client" />
/**
 * Lore Service for the Untelling Archive
 * This service handles the dynamic loading and categorization of markdown files
 * from the project root.
 */

// Use import.meta.glob to fetch all markdown files from the parent directories
// We exclude node_modules to be safe
const loreGlob = import.meta.glob('../../**/*.md', { as: 'raw', eager: true });

const TIER_MAPPING = {
    '01_Tier_0': 0,               // The Silent Origin
    '10_The_Seer': 1,             // The Observer's Hand
    '02_Tier_1': 2,               // Primordial Substrate
    '03_Tier_2': 3,               // Structural Axioms
    '04_Tier_3': 4,               // Governing Systems
    '16_Cosmological_Rules': 4,
    '12_Souls': 5,                // Ontological Anchors
    '14_Ontology': 5,
    '17_Planes': 6,               // Planar Projections
    '05_Tier_4': 7,               // Material Manifest
    '18_Elemental_Dialectics': 7,
    '19_Mana_Architecture': 8,    // Aetheric Weight
    '06_Tier_5': 9,               // Conceptual Domains
    '08_Concept_Entities': 9,
    '09_Deities': 9,
    '13_Worship': 10,             // Narrative Threads
    '15_Narrative_Mechanics': 10,
    '07_Tier_6': 11,              // Emergent Anomalies
    '11_Shadow': 11,
};

/**
 * Parses a file path to extract tier and human-readable title
 */
const parseLoreFile = (path, content) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];

    // Find which folder matches our tier mapping
    let tier = 4; // Default to Material
    for (const [folder, tierValue] of Object.entries(TIER_MAPPING)) {
        if (path.includes(folder)) {
            tier = tierValue;
            break;
        }
    }

    // Clean up title: remove numbering and extension, replace dashes with spaces
    // e.g. "01_aetheric-weight.md" -> "Aetheric Weight"
    let title = fileName
        .replace(/^\d+_/, '') // Remove leading numbers
        .replace('.md', '')    // Remove extension
        .replace(/-/g, ' ')    // Replace dashes
        .replace(/_/g, ' ');   // Replace underscores

    // Capitalize words
    title = title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Extract subtitle from the parent folder (e.g. "01_Tier_0_Palace_of_Fantasy" -> "Palace of Fantasy")
    const parentFolder = parts[parts.length - 2] || "";
    let subtitle = parentFolder
        .replace(/^\d+_/, '')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ');

    // Normalize content: Return as-is now that files are UTF-8
    const normalizedContent = content;

    return {
        path,
        title,
        subtitle,
        tier,
        content: normalizedContent
    };
};

const allArticles = Object.entries(loreGlob)
    .filter(([path]) => !path.includes('node_modules') && !path.includes('/website/'))
    .map(([path, content]) => parseLoreFile(path, content));

export const loreService = {
    /**
     * Get all articles for a specific tier
     */
    getArticlesByTier: (tier) => {
        return allArticles.filter(a => a.tier === tier);
    },

    /**
     * Get a specific article by its computed title or path
     */
    getArticle: (title) => {
        return allArticles.find(a => a.title === title);
    }
};
