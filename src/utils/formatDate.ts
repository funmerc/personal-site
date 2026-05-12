const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

/**
 * Format an ISO date string (YYYY-MM-DD) as "May 11, 2026".
 * Parses as local time, not UTC, so the displayed day doesn't shift across
 * timezones (e.g. "2026-05-11" rendered in PST would otherwise show as May 10).
 */
export function formatDate(iso: string): string {
  const [datePart] = iso.split('T')
  return formatter.format(new Date(`${datePart}T00:00`))
}
