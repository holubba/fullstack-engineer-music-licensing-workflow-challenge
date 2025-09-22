import { APPLICATION_ERRORS } from '@/src/app/http-api/response-normalizer/errors'

import { throwError } from './throw-error'

export type PgInterval = {
  hours: number
  minutes: number
  seconds: number
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

  if (
    [h, m, s].some(n => Number.isNaN(n) || n < 0 || n === undefined) ||
    m > 59 ||
    s > 59
  ) {
    throwError(APPLICATION_ERRORS.TRACKS.WRONG_TIME_FORMAT)
  }

  return h * 3600 + m * 60 + s
}

/**
 * Converts a total number of seconds into a `HH:MM:SS` string.
 *
 * @param totalSeconds - The total number of seconds to convert.
 * @returns A string formatted as `HH:MM:SS`.
 *
 * @example
 * secondsToHHMMSS(3907) // "01:05:07"
 */
export function secondsToHHMMSS(totalSeconds: number): string {
  if (totalSeconds < 0) {
    throwError(APPLICATION_ERRORS.TRACKS.WRONG_TIME_FORMAT)
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${hh}:${mm}:${ss}`
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
