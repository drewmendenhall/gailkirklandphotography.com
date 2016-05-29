const baseFontSize = 16
const footerHeight = 40
// TODO: handle various layout widths and heights
// 114 when width > 600
// 84 when width > 1000
const headerHeight = 80
// 40 when width > 600
const subheaderHeight = 32

const fontSize = baseFontSize * 1.25
const padding = fontSize * 3

export const layoutHeight = padding * 2 + headerHeight + subheaderHeight + footerHeight
export const layoutWidth = padding * 2
export const widths = [
  320,
  375,
  425,
  768,
  1024,
]
export const pictureWidths = widths.map((width) => (width - layoutWidth))
