/**
 * Extracts the background color from the current theme and updates meta theme tag.
 */
const refreshThemeMetaTag = () => {
  // retrieve meta element
  const metaTag: HTMLMetaElement | null = document.querySelector(
    'meta[name="theme-color"]'
  );

  // extract current theme's background color
  const bgColour = getComputedStyle(document.documentElement).getPropertyValue(
    'background-color'
  );

  // update meta tag
  if (metaTag) metaTag.content = bgColour;
};

export default refreshThemeMetaTag;
