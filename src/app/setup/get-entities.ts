import {
  LicenseHistory,
  Licenses,
  Movies,
  Scenes,
  Tracks,
  Songs,
} from '../database/entities'

export const getEntities = () => {
  return [Movies, Scenes, Licenses, LicenseHistory, Songs, Tracks]
}
