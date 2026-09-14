const srgb = (hex) => {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => parseInt(value, 16) / 255);
  return channels.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
};
const luminance = (hex) => {
  const [r, g, b] = srgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (foreground, background) => {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
console.log(JSON.stringify({
  green700_on_white: contrast('#007651', '#FFFFFF'),
  white_on_green700: contrast('#FFFFFF', '#007651'),
  white_on_green600: contrast('#FFFFFF', '#008F69'),
}, null, 2));
