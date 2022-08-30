interface Color {
  400: string,
  500: string,
  600: string,
  700: string,
}

const tamikoColourPalette = (light: string, normal: string, dark: string, darker: string) => {
  return {
    400: light,
    500: normal,
    600: dark,
    700: darker
  }
}

export const colors: { [name: string]: Color } = {
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
