import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import ProjectDetail from '../ProjectDetail.vue'
import { projectsFixture } from '../../test/api-fixtures'

async function mountAt(slug: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/projects', component: { template: '<div />' } },
      { path: '/projects/:slug', component: ProjectDetail, name: 'project-detail' },
    ],
  })
  await router.push(`/projects/${slug}`)
  await router.isReady()
  const head = createHead()
  const wrapper = mount(ProjectDetail, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('ProjectDetail page', () => {
  it('renders the project title for an existing slug', async () => {
    const project = projectsFixture[0]!
    const w = await mountAt(project.slug)
    expect(w.find('h1').text()).toBe(project.title)
  })

  it('renders the summary paragraph', async () => {
    const project = projectsFixture[0]!
    const w = await mountAt(project.slug)
    expect(w.find('.summary').text()).toBe(project.summary)
  })

  it('renders external links when present', async () => {
    const project = projectsFixture[0]!
    const w = await mountAt(project.slug)
    if (project.links?.live) {
      const liveLink = w.findAll('a.ext').find((a) => a.text().includes('Live'))
      expect(liveLink?.attributes('href')).toBe(project.links.live)
    }
  })

  it('renders the not-found state for an unknown slug', async () => {
    const w = await mountAt('nope-not-real')
    await flushPromises()
    expect(w.find('h1').text()).toBe('Not found')
  })
})
