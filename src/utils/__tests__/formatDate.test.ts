import { describe, it, expect } from 'vitest'
import { formatDate } from '../formatDate'

describe('formatDate', () => {
  it('formats an ISO date as "Month D, YYYY"', () => {
    expect(formatDate('2026-05-11')).toBe('May 11, 2026')
  })

  it('accepts a full ISO timestamp and ignores the time portion', () => {
    expect(formatDate('2026-05-11T18:30:00Z')).toBe('May 11, 2026')
  })

  it('does not shift the displayed day across timezones', () => {
    expect(formatDate('2026-01-01')).toBe('January 1, 2026')
    expect(formatDate('2026-12-31')).toBe('December 31, 2026')
  })
})
