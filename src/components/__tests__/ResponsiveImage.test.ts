import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResponsiveImage from '../ResponsiveImage.vue'

const samplePicture = {
  sources: {
    avif: '/a-1.avif 480w, /a-2.avif 800w',
    webp: '/b-1.webp 480w, /b-2.webp 800w',
    jpeg: '/c-1.jpeg 480w, /c-2.jpeg 800w',
  },
  img: { src: '/c-2.jpeg', w: 800, h: 600 },
}

describe('ResponsiveImage', () => {
  it('emits one <source> per format with the right type/srcset', () => {
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc' },
    })
    const sources = w.findAll('source')
    expect(sources).toHaveLength(3)
    const formats = sources.map((s) => s.attributes('type'))
    expect(formats).toEqual(['image/avif', 'image/webp', 'image/jpeg'])
    expect(sources[0]?.attributes('srcset')).toBe(samplePicture.sources.avif)
  })

  it('renders a fallback <img> with the right src/width/height/alt', () => {
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc' },
    })
    const img = w.find('img')
    expect(img.attributes('src')).toBe('/c-2.jpeg')
    expect(img.attributes('width')).toBe('800')
    expect(img.attributes('height')).toBe('600')
    expect(img.attributes('alt')).toBe('desc')
  })

  it('defaults to lazy loading and async decoding', () => {
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc' },
    })
    const img = w.find('img')
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('decoding')).toBe('async')
    expect(img.attributes('fetchpriority')).toBe('auto')
  })

  it('eager prop flips loading/decoding/fetchpriority', () => {
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc', eager: true },
    })
    const img = w.find('img')
    expect(img.attributes('loading')).toBe('eager')
    expect(img.attributes('decoding')).toBe('sync')
    expect(img.attributes('fetchpriority')).toBe('high')
  })

  it('forwards a load event from the underlying img', async () => {
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc' },
    })
    await w.find('img').trigger('load')
    expect(w.emitted()).toHaveProperty('load')
    expect(w.emitted('load')?.length).toBe(1)
  })

  it('passes sizes through to every <source>', () => {
    const sizes = '(min-width: 50rem) 45vw, 100vw'
    const w = mount(ResponsiveImage, {
      props: { picture: samplePicture, alt: 'desc', sizes },
    })
    for (const s of w.findAll('source')) {
      expect(s.attributes('sizes')).toBe(sizes)
    }
  })
})
