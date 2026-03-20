import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiscoverScreen from './screens/DiscoverScreen';
import MyTripsScreen from './screens/MyTripsScreen';
import BuilderScreen from './screens/BuilderScreen';
import MapScreen from './screens/MapScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-surface text-on-surface antialiased">
        <Routes>
          <Route path="/" element={<DiscoverScreen />} />
          <Route path="/mytrips" element={<MyTripsScreen />} />
          <Route path="/builder" element={<BuilderScreen />} />
          <Route path="/map" element={<MapScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
