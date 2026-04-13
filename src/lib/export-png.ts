/**
 * SVG/DOM to PNG download utilities.
 */

const PIXEL_RATIO = 2

function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement(`a`)
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}

function canvasToPngDataUrl(
  img: HTMLImageElement,
  width: number,
  height: number,
): string {
  const canvas = document.createElement(`canvas`)
  canvas.width = width * PIXEL_RATIO
  canvas.height = height * PIXEL_RATIO
  const ctx = canvas.getContext(`2d`)!
  ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
  ctx.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL(`image/png`)
}

/**
 * Convert an SVG element to PNG and trigger a browser download.
 */
export async function downloadSvgAsPng(
  svgElement: SVGElement,
  filename: string,
): Promise<void> {
  try {
    const { width, height } = svgElement.getBoundingClientRect()
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

    const img = await loadImage(dataUri)
    const pngDataUrl = canvasToPngDataUrl(img, width, height)
    triggerDownload(pngDataUrl, filename)
  }
  catch (error) {
    console.error(`[export-png] downloadSvgAsPng failed:`, error)
  }
}

/**
 * Convert a DOM element to PNG via foreignObject SVG and trigger a download.
 * Best-effort: complex CSS (external fonts, pseudo-elements, etc.) may not render perfectly.
 */
export async function downloadDomAsPng(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  try {
    const { width, height } = element.getBoundingClientRect()
    const html = element.outerHTML

    const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">${html}</div>
  </foreignObject>
</svg>`.trim()

    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

    const img = await loadImage(dataUri)
    const pngDataUrl = canvasToPngDataUrl(img, width, height)
    triggerDownload(pngDataUrl, filename)
  }
  catch (error) {
    console.error(`[export-png] downloadDomAsPng failed:`, error)
  }
}
