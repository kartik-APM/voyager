-- Voyager Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- Trips table
CREATE TABLE trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
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

-- Trip destinations (many-to-many relationship)
CREATE TABLE trip_destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER DEFAULT 0,
  arrival_date DATE,
  departure_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  trip_destination_id UUID REFERENCES trip_destinations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT CHECK (activity_type IN ('flight', 'hotel', 'restaurant', 'attraction', 'transport', 'other')),
  location_name TEXT,
  location_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  scheduled_date DATE,
  scheduled_time TIME,
  duration_minutes INTEGER,
  cost DECIMAL(10, 2),
  booking_reference TEXT,
  booking_url TEXT,
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved places (user's wishlist)
CREATE TABLE saved_places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  place_type TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip collaborators
CREATE TABLE trip_collaborators (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  UNIQUE(trip_id, user_id)
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_collaborators ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Destinations policies (public read)
CREATE POLICY "Anyone can view destinations" ON destinations
  FOR SELECT USING (true);

-- Trips policies
CREATE POLICY "Users can view their own trips" ON trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public trips" ON trips
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view trips they collaborate on" ON trips
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM trip_collaborators 
      WHERE trip_collaborators.trip_id = trips.id 
      AND trip_collaborators.user_id = auth.uid()
      AND trip_collaborators.accepted_at IS NOT NULL
    )
  );

CREATE POLICY "Users can create their own trips" ON trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" ON trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" ON trips
  FOR DELETE USING (auth.uid() = user_id);

-- Trip destinations policies
CREATE POLICY "Users can manage trip destinations for their trips" ON trip_destinations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_destinations.trip_id AND trips.user_id = auth.uid()
    )
  );

-- Activities policies
CREATE POLICY "Users can manage activities for their trips" ON activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  );

-- Saved places policies
CREATE POLICY "Users can manage their saved places" ON saved_places
  FOR ALL USING (auth.uid() = user_id);

-- Trip collaborators policies
CREATE POLICY "Trip owners can manage collaborators" ON trip_collaborators
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_collaborators.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their collaboration invites" ON trip_collaborators
  FOR SELECT USING (auth.uid() = user_id);

-- Functions and Triggers

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed data for destinations
INSERT INTO destinations (name, country, description, image_url, is_trending, tags) VALUES
('Tokyo', 'Japan', 'From the neon pulse of Shibuya to the serene temples of Asakusa.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7StCzzpqXowHIaXFBFks6arHLSrKOCHbenatq688I1ou8aQcJns61OJAStJA5YRTmiGa7pkFEj7EcObt7i1doVfhLwMGwNiflSppqs7nV_MIUSgtetqLNcSY6OCagyeB6M0ohN1thVFqF0C4vct9vAT7wCH1zwP5DQ91coAf0LpF7Fr_OAg4h-IssN4ZBdcU68koOAJMw8H0hd5dPjDRNhP835ymvmykB0k8DZrbVfSp8yO7G6XLUlfOPco98hAP7azGfVt9TgDU', true, ARRAY['culture', 'food', 'technology']),
('Reykjavik', 'Iceland', 'Adventure in the Land of Fire and Ice.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkrrNMXHzTdrwD_DIPjuiQvMdZFaaqTpuLBBa7I-d1jYvfZZRifg52YBLRPHOuVlo_Nfq_9xtxI5kma3gj2eNVlw_f496dOwVDumWKeMAF90tqCO1KzM3uVTwpeDPv4zqA_Y1iKHZc6pkFL7p_UdUgbfX5-BFvco9wyhOfQlOyXjIrHCV7S1xEVdv3tLnr9vrMo7UvZu8vJp2_dS_QmtehywtK8epp5-6Kx7a6iyJ7jUZ0pmARJ59gVuMQKZ9Pi-ebwoCCgIPq9I', true, ARRAY['nature', 'adventure', 'northern-lights']),
('Lisbon', 'Portugal', 'Sun-drenched streets and Atlantic breezes.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0PpzxzA1CBi2GrT5lnYmCt0utnpntGfWiaL3aar14ZeFiCHdwYS_WY9PQrzf27ZTw4wO0OWqxcqg7r6xHwpj2-DX4KbH0kTjxry7eD_LhNtWfeUf-JPX8VU1YBY0nqOxn6aoB6PhnCz7N0zI7R8Z3rI4xfuDjBG1_2LWPtDdEqIQrUgHm7ipzdhh_DwhdMltkGKOZBlB0mVGs0PbTUpBth38PghmsiALeq-p_1HJkxTlOtd8rqQ-l0QcrDHaEQhep235fLeP-mvE', true, ARRAY['beach', 'culture', 'food']),
('Marrakech', 'Morocco', 'A sensory journey through the medinas.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu5PCp7vp1j8-0auIdTQ0PK6bE8OzeJA41akwejiytRAbC-0syKH5AMNM46WVkKlViavo7uhAT-RmVx70ZMoqCbb5oPZdJb8kjVEwIAOxGobTDc4A8sm2dKu4w1N7cs_mY1EOm1td-WEvsqbSLLS1g1WywDf69efJHCvMbWb0qM8cQSRGxa0PlknoLXR8Sez3OnTHZjBW3_9m7tAJY2vCE9uJ6nuvh4MlM-iR-fGt8xgeYhIa54ORsCeCMnrV7ndbf6Nywljvfbjk', true, ARRAY['culture', 'shopping', 'food']),
('Zermatt', 'Switzerland', 'Pure serenity at 3,000 meters.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnPgo23JvGCAfJ-GjFuIMBkOa4TS634GfiOGcETFiJ_R7aqrhufM1Y9uOpPGg9orGp4KuUqdiJLG3P5M_L4D5BXzyp23zV1fWUyCpEGCSC2kPiiwhSzI00Q1-45YBvkX0PSUH_3dAUTQsBiFj794VE3WM6NKPgYiqQhIXQJRgEQkbQrksCPmqiDYD8yhRFT74bgWXRJQ1J_MznhylXHzb2ICfbQzVKMblJ8LV_8yhT83XO1zVM3PSUqjc5w0kLeXVxca3MzqV7ffA', true, ARRAY['skiing', 'nature', 'mountains']),
('Paris', 'France', 'The city of lights and endless romance.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtR9u5kWcdPfE4yZsJmTxECPujnBQuYkRv_5rpHjoUimDls1AwRTo_TNIxUPTDTQfHeaUk7oNGuOcI-QZ6eVicReC67DKSelsMZ3FFcXV2NjFiGJ4J6JRlym6lbdrIyo6eFFX20-GsT3_pFpNfZtxfV34SRQBO2pRArlxEqNF3qJXl5YzKDUXAG6qHUZV0pIrftLIsnh3GyM-fFbrJvsc2qzFpD9W9yhaDhSgB_aLVbhTphZNJP3oie28sJUbrFWtYo8mdG337nA', true, ARRAY['culture', 'food', 'art']),
('Florence', 'Italy', 'Renaissance art and Tuscan charm.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA', false, ARRAY['art', 'culture', 'food']),
('Athens', 'Greece', 'Ancient history meets Mediterranean vibes.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmIMDHWM2bavq1GhvL-MgRrKMnO0MDKIJHkuOdoUPoWedYbZhWUOSNUzLRW9hyaOnjPkl0If23c4j6WfwTvbYiLvic6RPwp0jrcfJuv445NVb4M6SaaXqWpdd7DwyoBRNDFF4PKTYu7lPN8iAXB1FYiWwIgGduyZoNe5eBlbfs7UuHo_BDHYE-CUwnPPRgbKXmkz2z49eNQfKLlMdHCR33bhJNxLMxalVeFp4mGt298UEca_ir8rbMhj6DSsQnB2-fzNe9vK_eJ00', false, ARRAY['history', 'beach', 'culture']);
