// Test-time replacement for `*.avif?...&as=picture` imports. vite-imagetools
// only runs under Vite, so under Vitest we alias all those queries to this
// stub. That way pages with hero images can mount without exploding.
const picture = {
  sources: {
    avif: '/stub.avif 480w, /stub.avif 800w, /stub.avif 1200w',
    webp: '/stub.webp 480w, /stub.webp 800w, /stub.webp 1200w',
    jpeg: '/stub.jpeg 480w, /stub.jpeg 800w, /stub.jpeg 1200w',
  },
  img: { src: '/stub.jpeg', w: 800, h: 600 },
}

export default picture
