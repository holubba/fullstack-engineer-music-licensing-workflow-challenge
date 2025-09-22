-- MOVIES
INSERT INTO movies (name) VALUES 
('Inception'),
('The Matrix');

-- SCENES
INSERT INTO scenes (movie_id, name) VALUES
(1, 'Opening Scene'),
(2, 'Lobby Scene');

-- SONGS
INSERT INTO songs (name, artist_name, duration) VALUES
('Time', 'Hans Zimmer', INTERVAL '4 minutes 36 seconds'),
('Clubbed to Death', 'Rob Dougan', INTERVAL '7 minutes 11 seconds');

-- TRACKS
INSERT INTO tracks (scene_id, song_id, start_time, end_time) VALUES
(1, 1, INTERVAL '15 seconds', INTERVAL '1 minute 30 seconds'),
(2, 2, INTERVAL '1 minute 10 seconds', INTERVAL '3 minutes');

-- LICENSES
INSERT INTO licenses (track_id, status, rights_holder, notes) VALUES
(1, 'approved', 'Warner Bros', 'Soundtrack license for cinematic release'),
(2, 'rejected', 'Village Roadshow', 'Expired distribution license');

-- LICENSE HISTORY
INSERT INTO license_history (license_id, old_status, new_status) VALUES
(1, 'negotiating', 'approved'),
(2, 'negotiating', 'rejected');
