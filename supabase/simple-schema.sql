-- Voyager Simple Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS saved_places CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;

-- Destinations table
CREATE TABLE destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  tags TEXT[],
  is_trending BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trips table (no user_id for demo purposes)
CREATE TABLE trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'upcoming', 'ongoing', 'completed')),
  estimated_cost DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT CHECK (activity_type IN ('flight', 'hotel', 'restaurant', 'attraction', 'transport', 'other')),
  location_name TEXT,
  location_address TEXT,
  image_url TEXT,
  scheduled_date DATE,
  scheduled_time TIME,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved places table
CREATE TABLE saved_places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location_address TEXT,
  image_url TEXT,
  place_type TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security but allow public read for now
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;

-- Public read policies (for demo purposes)
CREATE POLICY "Allow public read on destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on destinations" ON destinations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on trips" ON trips FOR SELECT USING (true);
CREATE POLICY "Allow public insert on trips" ON trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on trips" ON trips FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on trips" ON trips FOR DELETE USING (true);
CREATE POLICY "Allow public read on activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public insert on activities" ON activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on activities" ON activities FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on activities" ON activities FOR DELETE USING (true);
CREATE POLICY "Allow public read on saved_places" ON saved_places FOR SELECT USING (true);
CREATE POLICY "Allow public insert on saved_places" ON saved_places FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on saved_places" ON saved_places FOR DELETE USING (true);

-- Seed destinations data
INSERT INTO destinations (name, country, description, image_url, is_trending, tags) VALUES
('Tokyo', 'Japan', 'From the neon pulse of Tokyo to the serene temples of Kyoto.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7StCzzpqXowHIaXFBFks6arHLSrKOCHbenatq688I1ou8aQcJns61OJAStJA5YRTmiGa7pkFEj7EcObt7i1doVfhLwMGwNiflSppqs7nV_MIUSgtetqLNcSY6OCagyeB6M0ohN1thVFqF0C4vct9vAT7wCH1zwP5DQ91coAf0LpF7Fr_OAg4h-IssN4ZBdcU68koOAJMw8H0hd5dPjDRNhP835ymvmykB0k8DZrbVfSp8yO7G6XLUlfOPco98hAP7azGfVt9TgDU', true, ARRAY['culture', 'food', 'technology']),
('Reykjavik', 'Iceland', 'Adventure in the Land of Fire and Ice.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkrrNMXHzTdrwD_DIPjuiQvMdZFaaqTpuLBBa7I-d1jYvfZZRifg52YBLRPHOuVlo_Nfq_9xtxI5kma3gj2eNVlw_f496dOwVDumWKeMAF90tqCO1KzM3uVTwpeDPv4zqA_Y1iKHZc6pkFL7p_UdUgbfX5-BFvco9wyhOfQlOyXjIrHCV7S1xEVdv3tLnr9vrMo7UvZu8vJp2_dS_QmtehywtK8epp5-6Kx7a6iyJ7jUZ0pmARJ59gVuMQKZ9Pi-ebwoCCgIPq9I', true, ARRAY['nature', 'adventure', 'northern-lights']),
('Lisbon', 'Portugal', 'Sun-drenched streets and Atlantic breezes.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0PpzxzA1CBi2GrT5lnYmCt0utnpntGfWiaL3aar14ZeFiCHdwYS_WY9PQrzf27ZTw4wO0OWqxcqg7r6xHwpj2-DX4KbH0kTjxry7eD_LhNtWfeUf-JPX8VU1YBY0nqOxn6aoB6PhnCz7N0zI7R8Z3rI4xfuDjBG1_2LWPtDdEqIQrUgHm7ipzdhh_DwhdMltkGKOZBlB0mVGs0PbTUpBth38PghmsiALeq-p_1HJkxTlOtd8rqQ-l0QcrDHaEQhep235fLeP-mvE', true, ARRAY['beach', 'culture', 'food']),
('Marrakech', 'Morocco', 'A sensory journey through the medinas.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu5PCp7vp1j8-0auIdTQ0PK6bE8OzeJA41akwejiytRAbC-0syKH5AMNM46WVkKlViavo7uhAT-RmVx70ZMoqCbb5oPZdJb8kjVEwIAOxGobTDc4A8sm2dKu4w1N7cs_mY1EOm1td-WEvsqbSLLS1g1WywDf69efJHCvMbWb0qM8cQSRGxa0PlknoLXR8Sez3OnTHZjBW3_9m7tAJY2vCE9uJ6nuvh4MlM-iR-fGt8xgeYhIa54ORsCeCMnrV7ndbf6Nywljvfbjk', true, ARRAY['culture', 'shopping', 'food']),
('Zermatt', 'Switzerland', 'Pure serenity at 3,000 meters.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnPgo23JvGCAfJ-GjFuIMBkOa4TS634GfiOGcETFiJ_R7aqrhufM1Y9uOpPGg9orGp4KuUqdiJLG3P5M_L4D5BXzyp23zV1fWUyCpEGCSC2kPiiwhSzI00Q1-45YBvkX0PSUH_3dAUTQsBiFj794VE3WM6NKPgYiqQhIXQJRgEQkbQrksCPmqiDYD8yhRFT74bgWXRJQ1J_MznhylXHzb2ICfbQzVKMblJ8LV_8yhT83XO1zVM3PSUqjc5w0kLeXVxca3MzqV7ffA', true, ARRAY['skiing', 'nature', 'mountains']),
('Paris', 'France', 'The city of lights and endless romance.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtR9u5kWcdPfE4yZsJmTxECPujnBQuYkRv_5rpHjoUimDls1AwRTo_TNIxUPTDTQfHeaUk7oNGuOcI-QZ6eVicReC67DKSelsMZ3FFcXV2NjFiGJ4J6JRlym6lbdrIyo6eFFX20-GsT3_pFpNfZtxfV34SRQBO2pRArlxEqNF3qJXl5YzKDUXAG6qHUZV0pIrftLIsnh3GyM-fFbrJvsc2qzFpD9W9yhaDhSgB_aLVbhTphZNJP3oie28sJUbrFWtYo8mdG337nA', true, ARRAY['culture', 'food', 'art']),
('Florence', 'Italy', 'Renaissance art and Tuscan charm.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA', false, ARRAY['art', 'culture', 'food']),
('Athens', 'Greece', 'Ancient history meets Mediterranean vibes.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmIMDHWM2bavq1GhvL-MgRrKMnO0MDKIJHkuOdoUPoWedYbZhWUOSNUzLRW9hyaOnjPkl0If23c4j6WfwTvbYiLvic6RPwp0jrcfJuv445NVb4M6SaaXqWpdd7DwyoBRNDFF4PKTYu7lPN8iAXB1FYiWwIgGduyZoNe5eBlbfs7UuHo_BDHYE-CUwnPPRgbKXmkz2z49eNQfKLlMdHCR33bhJNxLMxalVeFp4mGt298UEca_ir8rbMhj6DSsQnB2-fzNe9vK_eJ00', false, ARRAY['history', 'beach', 'culture']),
('Amalfi Coast', 'Italy', 'Dramatic cliffs and azure waters.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDySh5kc8_j_r9TbzZJ49gHygFZi4L_908opbIreeSGRhVbstliGpVGuIUJ1CiaVkNWvrKF63Ucbssrg9OXstgLxNwByOz2LXy1lROKoSFJ_kCp31exbEiy1LOcGi3qmrKpU6nN3Q_8lGTvcfz5Ty11BrssLFV4oAkFqjSsvUblv-Q0bl9REy2smPKIol4lDMw4KK21tV9Zuf1zEHvAVIUfaaNnY9yG2H90O7Y2uxNhYttghhgb82ORYjHbMek2vTRcXKB9n7h4LsA', false, ARRAY['beach', 'romantic', 'food']);

-- Seed trips data
INSERT INTO trips (title, description, cover_image_url, start_date, end_date, status, estimated_cost) VALUES
('Summer in Paris', 'A romantic getaway to the city of lights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtR9u5kWcdPfE4yZsJmTxECPujnBQuYkRv_5rpHjoUimDls1AwRTo_TNIxUPTDTQfHeaUk7oNGuOcI-QZ6eVicReC67DKSelsMZ3FFcXV2NjFiGJ4J6JRlym6lbdrIyo6eFFX20-GsT3_pFpNfZtxfV34SRQBO2pRArlxEqNF3qJXl5YzKDUXAG6qHUZV0pIrftLIsnh3GyM-fFbrJvsc2qzFpD9W9yhaDhSgB_aLVbhTphZNJP3oie28sJUbrFWtYo8mdG337nA', '2024-07-15', '2024-07-28', 'upcoming', 3500.00),
('Florence & Siena Journal', 'Autumn in Tuscany exploring Renaissance art', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA', '2024-10-12', '2024-10-20', 'planning', 2800.00),
('Mediterranean Coastline', 'Athens to Amalfi summer expedition', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV7WjjIGs2_EHlky55jI-G3xiFsXkvafQ_9M1FjArp8iyeMoWiZmnuNReIuftyi8sonuKZfmfwjvTul9BwJvR9g7WKJy3VyVRV8fUU2yvtYJJ5QpnxLq8PWt_WMhD737n9D3_HLKDvAN6x_FADd41Dg0nRIict8sqCxTB7hwRaj0iLno9fq8LiWYyuEEsWD3upyPQBhS4PvUPJDqH-Gtxf2HRrR5nNh5heAyQnfUUTJDMoXYxiKdQzYTq1a9Xuxq0rkM0mWjAXPLE', '2024-06-01', '2024-06-14', 'planning', 4250.00);

-- Seed activities for Florence trip
INSERT INTO activities (trip_id, title, description, activity_type, location_name, location_address, scheduled_date, scheduled_time, order_index)
SELECT 
  t.id,
  'Arrival at Amerigo Vespucci (FLR)',
  'Flight arrival in Florence',
  'flight',
  'Amerigo Vespucci Airport',
  'Via del Termine, 11, 50127 Firenze FI, Italy',
  '2024-10-12',
  '08:45:00',
  1
FROM trips t WHERE t.title = 'Florence & Siena Journal';

-- Seed saved places
INSERT INTO saved_places (name, description, location_address, image_url, place_type)
VALUES 
('Ditta Artigianale', 'Best specialty coffee in Florence', 'Via dei Neri, 32/R, 50122 Firenze FI, Italy', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA', 'restaurant'),
('Uffizi Gallery', 'World-renowned art museum', 'Piazzale degli Uffizi, 6, 50122 Firenze FI, Italy', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA', 'attraction');
