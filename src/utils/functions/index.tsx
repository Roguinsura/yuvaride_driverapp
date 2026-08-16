export const formatDates = (dateString: any) => {
  const milliseconds =
    dateString._seconds * 1000 + dateString._nanoseconds / 1_000_000
  const date = new Date(milliseconds)

  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = String(date.getFullYear())
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  return {
    date: `${day} ${month}’${year}`,
    time: `${hours}:${minutes} ${ampm}`,
  }
}

export const apiformatDates = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = String(date.getFullYear())
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  return {
    date: `${day} ${month}`,
    time: `${hours}:${minutes} ${ampm}`,
  }
}

// Calendar date in the device's own timezone, as YYYY-MM-DD.
//
// Deliberately not toISOString().split('T')[0] — that converts to UTC first, so
// it names the wrong day for part of every 24 hours (the late-evening hours in
// any timezone behind UTC, the early-morning hours in any timezone ahead of it).
// The incentive screen keys its lookups off this string, so it has to agree
// with what the driver considers "today".
export const toLocalDateString = (value: Date | string = new Date()) => {
  const date = typeof value === 'string' ? parseLocalDateString(value) : value
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// `new Date('2026-08-15')` is parsed as UTC midnight, which in a timezone behind
// UTC reads back as the 14th. Build it from the parts so it stays local.
export const parseLocalDateString = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return new Date(value)
  return new Date(year, month - 1, day)
}

