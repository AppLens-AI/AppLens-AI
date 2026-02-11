/**
 * Font utility for managing custom fonts in the editor and during export
 */

export interface FontOption {
  value: string;
  label: string;
  category: "sans-serif" | "serif" | "display" | "handwriting" | "monospace";
  weights: number[];
}

/**
 * List of supported fonts with Google Fonts integration
 */
export const AVAILABLE_FONTS: FontOption[] = [
  // Sans-Serif Fonts
  {
    value: "Inter",
    label: "Inter",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Roboto",
    label: "Roboto",
    category: "sans-serif",
    weights: [400, 500, 700, 900],
  },
  {
    value: "Open Sans",
    label: "Open Sans",
    category: "sans-serif",
    weights: [400, 600, 700, 800],
  },
  {
    value: "Montserrat",
    label: "Montserrat",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Poppins",
    label: "Poppins",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Lato",
    label: "Lato",
    category: "sans-serif",
    weights: [400, 700, 900],
  },
  {
    value: "Raleway",
    label: "Raleway",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Work Sans",
    label: "Work Sans",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Nunito",
    label: "Nunito",
    category: "sans-serif",
    weights: [400, 600, 700, 800, 900],
  },
  {
    value: "Ubuntu",
    label: "Ubuntu",
    category: "sans-serif",
    weights: [400, 500, 700],
  },

  // Display Fonts
  {
    value: "Bebas Neue",
    label: "Bebas Neue",
    category: "display",
    weights: [400],
  },
  {
    value: "Oswald",
    label: "Oswald",
    category: "display",
    weights: [400, 500, 600, 700],
  },
  {
    value: "Playfair Display",
    label: "Playfair Display",
    category: "display",
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    value: "Anton",
    label: "Anton",
    category: "display",
    weights: [400],
  },
  {
    value: "Righteous",
    label: "Righteous",
    category: "display",
    weights: [400],
  },

  // Serif Fonts
  {
    value: "Merriweather",
    label: "Merriweather",
    category: "serif",
    weights: [400, 700, 900],
  },
  {
    value: "Lora",
    label: "Lora",
    category: "serif",
    weights: [400, 500, 600, 700],
  },
  {
    value: "PT Serif",
    label: "PT Serif",
    category: "serif",
    weights: [400, 700],
  },

  // Handwriting/Script
  {
    value: "Pacifico",
    label: "Pacifico",
    category: "handwriting",
    weights: [400],
  },
  {
    value: "Dancing Script",
    label: "Dancing Script",
    category: "handwriting",
    weights: [400, 500, 600, 700],
  },
  {
    value: "Satisfy",
    label: "Satisfy",
    category: "handwriting",
    weights: [400],
  },

  // Monospace
  {
    value: "Roboto Mono",
    label: "Roboto Mono",
    category: "monospace",
    weights: [400, 500, 600, 700],
  },
  {
    value: "JetBrains Mono",
    label: "JetBrains Mono",
    category: "monospace",
    weights: [400, 500, 600, 700, 800],
  },
];

/**
 * Generate Google Fonts URL for all fonts
 */
export const getGoogleFontsUrl = (): string => {
  const fontParams = AVAILABLE_FONTS.map((font) => {
    const weights = font.weights.join(";");
    const familyName = font.value.replace(/ /g, "+");
    return `family=${familyName}:wght@${weights}`;
  }).join("&");

  return `https://fonts.googleapis.com/css2?${fontParams}&display=block`;
};

/**
 * Preload a specific font before using it
 * @param fontFamily The font family name
 * @param weights Array of font weights to load (defaults to [400, 700])
 * @returns Promise that resolves when font is loaded
 */
export const loadFont = async (
  fontFamily: string,
  weights: number[] = [400, 700]
): Promise<void> => {
  // Check if Font Loading API is available
  if (!('fonts' in document)) {
    console.warn('Font Loading API not available');
    return Promise.resolve();
  }

  const fontOption = AVAILABLE_FONTS.find(f => f.value === fontFamily);
  const weightsToLoad = fontOption?.weights || weights;

  try {
    // Use Font Loading API to load and wait for fonts
    const fontPromises = weightsToLoad.map(async (weight) => {
      const fontDesc = `${weight} 16px "${fontFamily}"`;
      
      // Check if already loaded
      if ((document as any).fonts.check(fontDesc)) {
        return Promise.resolve();
      }

      // Load the font
      try {
        await (document as any).fonts.load(fontDesc);
      } catch (e) {
        // Font might not be available yet, that's ok
      }
    });

    await Promise.all(fontPromises);
  } catch (error) {
    console.warn(`Error loading font ${fontFamily}:`, error);
  }
};

/**
 * Preload all fonts used in the project
 * @param fontFamilies Array of font family names to preload
 * @returns Promise that resolves when all fonts are loaded
 */
export const preloadFonts = async (fontFamilies: string[]): Promise<void> => {
  const uniqueFonts = [...new Set(fontFamilies)];
  const fontPromises = uniqueFonts.map((fontFamily) => {
    const fontOption = AVAILABLE_FONTS.find((f) => f.value === fontFamily);
    const weights = fontOption?.weights || [400, 700];
    return loadFont(fontFamily, weights);
  });

  await Promise.all(fontPromises);
};

/**
 * Get font category label
 */
export const getFontCategoryLabel = (
  category: FontOption["category"]
): string => {
  const labels: Record<FontOption["category"], string> = {
    "sans-serif": "Sans Serif",
    serif: "Serif",
    display: "Display",
    handwriting: "Handwriting",
    monospace: "Monospace",
  };
  return labels[category];
};

/**
 * Group fonts by category
 */
export const getFontsByCategory = (): Record<
  FontOption["category"],
  FontOption[]
> => {
  return AVAILABLE_FONTS.reduce(
    (acc, font) => {
      if (!acc[font.category]) {
        acc[font.category] = [];
      }
      acc[font.category].push(font);
      return acc;
    },
    {} as Record<FontOption["category"], FontOption[]>
  );
};
