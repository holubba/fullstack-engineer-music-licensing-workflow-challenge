-- ENUM for license status
CREATE TYPE license_status_enum AS ENUM ('pending', 'negotiating', 'approved', 'rejected');

-- MOVIES
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP NULL
);

-- SCENES
CREATE TABLE scenes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  movie_id INT NOT NULL REFERENCES movies(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP NULL
);

-- SONGS
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  duration INT NOT NULL CHECK (duration > 0),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP NULL
);

-- TRACKS
CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  scene_id INT NOT NULL REFERENCES scenes(id),
  song_id INT NOT NULL REFERENCES songs(id),
  start_time INT NOT NULL CHECK (start_time >= 0),
  end_time INT NOT NULL CHECK (end_time > start_time),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP NULL
);

-- LICENSES
CREATE TABLE licenses (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL REFERENCES tracks(id),
  status license_status_enum NOT NULL,
  rights_holder VARCHAR(255) NOT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP NULL
);

-- LICENSE HISTORY
CREATE TABLE license_history (
  id SERIAL PRIMARY KEY,
  license_id INT NOT NULL REFERENCES licenses(id),
  old_status license_status_enum NOT NULL,
  new_status license_status_enum NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
