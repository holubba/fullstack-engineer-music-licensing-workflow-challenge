import { ValueTransformer } from 'typeorm'

import { APPLICATION_ERRORS } from '@/src/app/http-api/response-normalizer/errors'

import { throwError } from './throw-error'

export type PgInterval = {
  hours: number
  minutes: number
  seconds: number
}

/**
 * Converts an interval object into an `HH:MM:SS` string.
 *
 * @param interval - Interval object with hours, minutes, and seconds.
 * @returns A string formatted as `HH:MM:SS`.
 *
 * @example
 * intervalToHHMMSS({ hours: 1, minutes: 5, seconds: 7 }) // "01:05:07"
 */
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

/**
 * Converts a `HH:MM:SS` string into an interval object.
 *
 * @param hhmmss - A string formatted as `HH:MM:SS`.
 * @returns An interval object with hours, minutes, and seconds.
 * @throws Will throw an error if the format is invalid.
 *
 * @example
 * hhmmssToInterval("01:05:07") // { hours: 1, minutes: 5, seconds: 7 }
 */
export function hhmmssToInterval(hhmmss: string): PgInterval {
  const [h, m, s] = hhmmss.split(':').map(Number)

  if ([h, m, s].some(n => Number.isNaN(n) || n < 0) || m > 59 || s > 59) {
    throwError(APPLICATION_ERRORS.TRACKS.WRONG_TIME_FORMAT)
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  }
}

/**
 * Converts a `HH:MM:SS` string into total seconds.
 *
 * @param hhmmss - A string formatted as `HH:MM:SS`.
 * @returns The total number of seconds represented by the string.
 * @throws Will throw an error if the format is invalid.
 *
 * @example
 * hhmmssToSeconds("01:05:07") // 3907
 */
export function hhmmssToSeconds(hhmmss: string): number {
  const [h, m, s] = hhmmss.split(':').map(Number)

  if ([h, m, s].some(n => Number.isNaN(n) || n < 0) || m > 59 || s > 59) {
    throwError(APPLICATION_ERRORS.TRACKS.WRONG_TIME_FORMAT)
  }

  return h * 3600 + m * 60 + s
}

/**
 * Validates whether a track's start and end times fit within a song's duration.
 *
 * @param start - Track start time as `HH:MM:SS`.
 * @param end - Track end time as `HH:MM:SS`.
 * @param songDuration - Total duration of the song as `HH:MM:SS`.
 * @returns `true` if the track fits within the song duration.
 * @throws Will throw an error if:
 * - The end time is not greater than the start time.
 * - The track exceeds the song duration.
 *
 * @example
 * validateTrackWithinSong("00:00:10", "00:01:30", "00:04:00") // true
 */
export function validateTrackWithinSong(
  start: string,
  end: string,
  songDuration: string,
): boolean {
  const startSec = hhmmssToSeconds(start)
  const endSec = hhmmssToSeconds(end)
  const durationSec = hhmmssToSeconds(songDuration)

  if (endSec <= startSec) {
    throwError(APPLICATION_ERRORS.TRACKS.INVALID_TRACK_TIMES)
  }

  if (endSec > durationSec) {
    throwError(APPLICATION_ERRORS.TRACKS.TRACK_EXCEEDS_SONG_DURATION)
  }

  return true
}

/**
 * TypeORM ValueTransformer for PostgreSQL interval fields.
 *
 * - `to`: Converts an interval object to `HH:MM:SS` string before saving to DB.
 * - `from`: Converts the DB value back into `HH:MM:SS` string (keeps consistency).
 *
 * @example
 * // Entity usage
 * @Column({ type: 'interval', transformer: IntervalTransformer })
 * startTime: PgInterval;
 */
export const IntervalTransformer: ValueTransformer = {
  to: (value: { hours: number; minutes: number; seconds: number }) =>
    value ? intervalToHHMMSS(value) : null,
  from: (value: { hours: number; minutes: number; seconds: number }) =>
    value ? intervalToHHMMSS(value) : null,
}
