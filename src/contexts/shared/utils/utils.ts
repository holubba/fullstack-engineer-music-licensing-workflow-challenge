export type PgInterval = {
  hours: number
  minutes: number
  seconds: number
}

export function intervalToHHMMSS(interval: {
  hours: number
  minutes: number
  seconds: number
}) {
  const h = String(interval.hours || 0).padStart(2, '0')
  const m = String(interval.minutes || 0).padStart(2, '0')
  const s = String(Math.floor(interval.seconds) || 0).padStart(2, '0')
  return `${h}:${m}:${s}`
}
