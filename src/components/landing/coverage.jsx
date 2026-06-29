import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, CheckCircle, XCircle, Compass } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useTheme from '../../hooks/useTheme';

export default function Coverage() {
  const { theme } = useTheme();
  const [warehouses, setWarehouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [regions, setRegions] = useState([]);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const markersRef = useRef({});

  // Fetch warehouses data
  useEffect(() => {
    fetch('/data/warehouses.json')
      .then(res => res.json())
      .then(data => {
        setWarehouses(data);
        // Extract unique regions
        const uniqueRegions = ['All', ...new Set(data.map(w => w.region))];
        setRegions(uniqueRegions);
      })
      .catch(err => console.error("Error fetching warehouses", err));
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

    // Center of Bangladesh
    const map = L.map(mapRef.current, {
      zoomControl: false
    }).setView([23.8103, 90.4125], 7);
    
    mapInstanceRef.current = map;

    // Add Zoom Control to bottom-right instead of top-left
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Dynamic Theme Tile Layers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const url = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(url, {
      attribution: '&copy; CARTO'
    }).addTo(mapInstanceRef.current);
  }, [theme]);

  // Update Markers when warehouses load
  useEffect(() => {
    if (!mapInstanceRef.current || warehouses.length === 0) return;

    // Clear old markers
    markersLayerRef.current.clearLayers();
    markersRef.current = {};

    // Premium marker styling with Tailwind CSS
    const customMarkerIcon = new L.DivIcon({
      html: `<div class="relative w-8 h-8 flex items-center justify-center">
               <div class="absolute w-6 h-6 bg-primary/20 border border-primary/40 rounded-full animate-ping"></div>
               <div class="w-3.5 h-3.5 bg-primary border-2 border-white rounded-full shadow-glow"></div>
             </div>`,
      className: 'custom-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });

    warehouses.forEach(w => {
      const popupContent = `
        <div class="p-2 text-left min-w-[200px] font-sans">
          <h4 class="font-extrabold text-sm text-neutral-900 dark:text-neutral-900 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ${w.district} Hub
          </h4>
          <p class="text-[10px] text-neutral-400 font-bold uppercase mt-0.5 tracking-wider">${w.region} Region</p>
          <p class="text-xs text-neutral-600 dark:text-neutral-700 mt-2 font-semibold">Covered Subzones:</p>
          <div class="mt-1 flex flex-wrap gap-1 max-h-[80px] overflow-y-auto pr-1">
            ${w.covered_area.map(area => `<span class="bg-neutral-100 dark:bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded text-[9px] font-medium border border-neutral-200/50">${area}</span>`).join('')}
          </div>
        </div>
      `;

      const marker = L.marker([w.latitude, w.longitude], { icon: customMarkerIcon })
        .bindPopup(popupContent);

      markersLayerRef.current.addLayer(marker);
      markersRef.current[w.district.toLowerCase()] = marker;
    });

    // Invalidate map size to solve container fit rendering issues
    setTimeout(() => {
      mapInstanceRef.current.invalidateSize();
    }, 100);

  }, [warehouses]);

  // Handle Hub selection
  const handleHubSelect = (hub) => {
    if (!mapInstanceRef.current) return;
    
    // Zoom and pan to coordinates
    mapInstanceRef.current.flyTo([hub.latitude, hub.longitude], 11, {
      duration: 1.5
    });

    // Open popup
    const marker = markersRef.current[hub.district.toLowerCase()];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 1600);
    }
  };

  // Handle Area search checking
  const handleSearchCheck = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    
    // Find if the query fits district name or inside covered_area
    const matchedHub = warehouses.find(
      w => w.district.toLowerCase() === query || 
           w.covered_area.some(area => area.toLowerCase().includes(query))
    );

    if (matchedHub) {
      setSearchResult({
        status: 'success',
        message: `Excellent! We deliver to "${searchQuery}" from our ${matchedHub.district} Hub.`,
        hub: matchedHub
      });
      handleHubSelect(matchedHub);
    } else {
      setSearchResult({
        status: 'failed',
        message: `Sorry, we do not currently cover "${searchQuery}". We are expanding rapidly, check back soon!`
      });
    }
  };

  const filteredHubs = activeTab === 'All' 
    ? warehouses 
    : warehouses.filter(w => w.region === activeTab);

  return (
    <section id="coverage" className="py-20 border-t border-borderColor-light dark:border-borderColor-dark text-left bg-neutral-50/30 dark:bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass size={14} className="animate-spin-slow" />
            <span>Delivery Operations Map</span>
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
            Nationwide Logistics Network
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
            Operating multiple state-of-the-art distribution centers across the country. Check if our express fulfillment couriers cover your business location.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Left Panel (2/5) */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            
            {/* Search Coverage Checker */}
            <div className="p-6 rounded-3xl border border-borderColor-light dark:border-borderColor-dark bg-card shadow-soft space-y-4">
              <h3 className="font-bold text-sm text-neutral-850 dark:text-white flex items-center gap-2">
                <Search size={16} className="text-primary" />
                Coverage Checker
              </h3>
              <p className="text-xs text-neutral-400">Type your city or area (e.g. Uttara, Tongi, Bhanga) to verify delivery options.</p>
              
              <form onSubmit={handleSearchCheck} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your delivery area..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-neutral-100/50 dark:bg-neutral-800/40 text-xs focus:outline-none focus:border-primary text-neutral-800 dark:text-neutral-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors cursor-pointer border-0"
                >
                  Verify
                </button>
              </form>

              {/* Search Result Indicator */}
              {searchResult && (
                <div className={`p-4 rounded-2xl flex items-start gap-3 border text-xs leading-relaxed animate-fade-in ${
                  searchResult.status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25'
                }`}>
                  {searchResult.status === 'success' ? (
                    <CheckCircle size={18} className="shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle size={18} className="shrink-0 text-rose-500" />
                  )}
                  <p>{searchResult.message}</p>
                </div>
              )}
            </div>

            {/* Region Hubs Directory */}
            <div className="flex-1 p-6 rounded-3xl border border-borderColor-light dark:border-borderColor-dark bg-card shadow-soft flex flex-col min-h-[300px] max-h-[400px]">
              <h3 className="font-bold text-sm text-neutral-850 dark:text-white flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-primary" />
                Fulfillment Hub Directory
              </h3>

              {/* Tabs */}
              <div className="flex gap-1 overflow-x-auto pb-2 border-b border-borderColor-light dark:border-borderColor-dark mb-3 no-scrollbar">
                {regions.map((reg, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(reg)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                      activeTab === reg
                        ? 'bg-primary text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredHubs.length > 0 ? (
                  filteredHubs.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleHubSelect(w)}
                      className="w-full text-left p-3 rounded-2xl border border-borderColor-light/65 dark:border-borderColor-dark/65 bg-neutral-50/20 dark:bg-zinc-900/10 hover:border-primary hover:bg-primary/5 dark:hover:border-accent-light dark:hover:bg-accent/5 transition-all flex flex-col space-y-1.5 cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors">
                          {w.district} Hub
                        </span>
                        <span className="text-[8px] font-extrabold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase">
                          {w.region}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 truncate max-w-full">
                        Covered: {w.covered_area.join(', ')}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-xs text-neutral-400 py-10">No hubs listed in this region.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Map Panel (3/5) */}
          <div className="lg:col-span-3 h-[450px] lg:h-auto rounded-3xl border border-borderColor-light dark:border-borderColor-dark bg-card shadow-soft p-2 overflow-hidden relative min-h-[400px]">
            {/* Map Canvas */}
            <div ref={mapRef} className="h-full w-full rounded-2xl z-0 overflow-hidden" />
          </div>

        </div>

      </div>

      {/* Override styles for clean Leaflet look */}
      <style>{`
        .leaflet-container {
          font-family: var(--font-sans) !important;
          background: transparent !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: var(--card) !important;
          color: var(--foreground) !important;
          border-radius: 1rem !important;
          border: 1px solid var(--border) !important;
          box-shadow: var(--shadow-soft) !important;
        }
        .leaflet-popup-content {
          margin: 12px 14px !important;
        }
        .leaflet-popup-tip {
          background-color: var(--card) !important;
          border: 1px solid var(--border) !important;
        }
        .leaflet-bar {
          border: 1px solid var(--border) !important;
          box-shadow: var(--shadow-soft) !important;
          border-radius: 0.75rem !important;
          overflow: hidden;
        }
        .leaflet-bar a {
          background-color: var(--card) !important;
          color: var(--foreground) !important;
          border-bottom: 1px solid var(--border) !important;
        }
        .leaflet-bar a:hover {
          background-color: var(--secondary) !important;
        }
      `}</style>
    </section>
  );
}
