// Module declarations for vite-imagetools query imports.
// `?as=picture` (or `&as=picture` when other params come first) returns a
// Picture object with one srcset string per format plus a fallback img.

interface ImagetoolsPicture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*?as=picture' {
  const value: ImagetoolsPicture
  export default value
}

declare module '*&as=picture' {
  const value: ImagetoolsPicture
  export default value
}
