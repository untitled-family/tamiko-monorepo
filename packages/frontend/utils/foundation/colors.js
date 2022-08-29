import { lighten, darken } from 'polished';

const generateColourPalette = (baseColor) => {
  const lightKeys = [400, 300, 200, 100, 50];
  const darkKeys = [600, 700, 800, 900];
  const indexDivider = 20;

  const light = lightKeys.reduce(
    (acc, key, index) => (
      // eslint-disable-next-line no-sequences
      (acc[key] = lighten((index + 1) / indexDivider, baseColor)), acc
    ),
    {}
  );
  const dark = darkKeys.reduce(
    (acc, key, index) => (
      // eslint-disable-next-line no-sequences
      (acc[key] = darken((index + 1) / indexDivider, baseColor)), acc
    ),
    {}
  );

  return {
    ...light,
    500: baseColor,
    ...dark,
  };
};

const tamikoColourPalette = (light, normal, dark, darker) => {
  return {
    400: light,
    500: normal,
    600: dark,
    700: darker
  }
}

export const colors = {
  black: generateColourPalette('#000'),
  white: generateColourPalette('#fff'),
  neutral: tamikoColourPalette("#FFFFFF", "#B6BDC8", "#5C5E6D", "#14181F"),
  bug: tamikoColourPalette("#FFF9D8", "#CDD024", "#608D00", "#141B00"),
  water: tamikoColourPalette("#DBEEFF", "#1F6BFF", "#0033B5", "#01002D"),
  fire: tamikoColourPalette("#FFDCA7", "#FF382C", "#B40B00", "#2D0000"),
  electric: tamikoColourPalette("#FFF5D3", "#FFC224", "#F28300", "#1A0B00"),
  ghost: tamikoColourPalette("#FECCFF", "#804CD4", "#4A00A8", "#0B001A"),
  dark: tamikoColourPalette("#CDBFEC", "#2F2F40", "#1A1825", "#070607"),
  ice: tamikoColourPalette("#F3FCFF", "#84DEEB", "#2892B4", "#04152F"),
  grass: tamikoColourPalette("#EFFFDA", "#3ED25F", "#0B6333", "#001D0B"),
  magic: tamikoColourPalette("#FFE7FF", "#FF78E1", "#CF1886", "#32001E")
};
