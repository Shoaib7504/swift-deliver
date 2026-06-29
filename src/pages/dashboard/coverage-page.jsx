import { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, ToggleLeft, Activity, Info, BarChart2 } from 'lucide-react';
import Button from '../../components/ui/button';

export default function CoveragePage() {
  const [divisions, setDivisions] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiv, setSelectedDiv] = useState('All');

  // Selected warehouse for flowcharts or coordinates
  const [selectedHub, setSelectedHub] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/division.json').then(res => res.json()),
      fetch('/data/warehouses.json').then(res => res.json())
    ])
      .then(([divisionsData, warehousesData]) => {
        setDivisions(divisionsData);
        setWarehouses(warehousesData);
        if (warehousesData.length > 0) {
          setSelectedHub(warehousesData[0]); // Select first hub initially
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading coverage database:", err);
        setLoading(false);
      });
  }, []);

  const filteredHubs = warehouses.filter(w => {
    const matchesDiv = selectedDiv === 'All' || w.region.toLowerCase() === selectedDiv.toLowerCase();
    const matchesQuery = w.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.covered_area.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiv && matchesQuery;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-neutral-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
          <div className="h-96 bg-neutral-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-96 lg:col-span-2 bg-neutral-200 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Fulfillment Hubs</h1>
        <p className="text-xs text-neutral-400">View coordinates, capacity, and active zone status for each logistics warehouse node.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Directory search list */}
        <div className="p-5 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft flex flex-col space-y-4 max-h-[70vh]">
          <h3 className="font-bold text-sm text-neutral-850 dark:text-white">Warehouse Directory</h3>

          <div className="space-y-3">
            {/* Division dropdown selector */}
            <select
              value={selectedDiv}
              onChange={(e) => setSelectedDiv(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-bg-light dark:bg-zinc-950/40 text-xs focus:outline-none focus:border-primary text-neutral-700 dark:text-neutral-300"
            >
              <option value="All">All regions</option>
              {divisions.map((div, i) => (
                <option key={i} value={div}>{div}</option>
              ))}
            </select>

            {/* Input Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search district, covered area..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-bg-light dark:bg-zinc-950/40 text-xs focus:outline-none focus:border-primary text-neutral-800 dark:text-neutral-200"
              />
            </div>
          </div>

          {/* List scrollbox */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredHubs.length > 0 ? (
              filteredHubs.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHub(w)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col space-y-1 ${
                    selectedHub?.district === w.district
                      ? 'border-primary bg-primary/5 dark:border-accent-light dark:bg-accent/15'
                      : 'border-transparent hover:bg-neutral-50 dark:hover:bg-zinc-800/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200">{w.district}</span>
                    <span className="text-[9px] font-semibold text-neutral-400 uppercase">{w.region}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    Covered: {w.covered_area.join(', ')}
                  </p>
                </button>
              ))
            ) : (
              <p className="text-center text-xs text-neutral-400 py-10">No matching hubs found.</p>
            )}
          </div>
        </div>

        {/* Right Side: Map coordinates viewer */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft lg:col-span-2 space-y-6 flex flex-col justify-between">
          {selectedHub ? (
            <>
              {/* Warehouse Details header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-borderColor-light dark:border-borderColor-dark pb-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                      <MapPin size={16} />
                    </div>
                    <h3 className="font-extrabold text-base">{selectedHub.district} Distribution Hub</h3>
                  </div>
                  <p className="text-[10px] text-neutral-400">Region coordinates: Lon {selectedHub.longitude}° / Lat {selectedHub.latitude}°</p>
                </div>

                <span className="text-xs px-2.5 py-0.5 rounded-full bg-success/15 text-success border border-success/30 font-bold uppercase">
                  {selectedHub.status}
                </span>
              </div>

              {/* Warehouse graphical coordinates representation */}
              <div className="flex-1 relative border border-dashed border-borderColor-light dark:border-borderColor-dark rounded-xl bg-bg-light dark:bg-zinc-950/20 overflow-hidden flex items-center justify-center p-6 min-h-[250px]">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />

                {/* Target radar pulses */}
                <div className="relative w-20 h-20 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center animate-pulse">
                  <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-4 p-3.5 rounded-lg border border-borderColor-light/60 dark:border-borderColor-dark/60 bg-white/95 dark:bg-zinc-900/95 shadow-soft max-w-xs text-left space-y-1 glass-panel">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Covered Area Subzones</p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">{selectedHub.covered_area.join(', ')}</p>
                </div>
              </div>

              {/* Additional Warehouse capacity simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-borderColor-light dark:border-borderColor-dark pt-6 text-xs text-neutral-500">
                <div className="p-4 rounded-lg bg-neutral-50 dark:bg-zinc-900/50 space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-bold uppercase text-[9px]">
                    <BarChart2 size={12} />
                    <span>Usage Capacity</span>
                  </div>
                  <p className="text-neutral-800 dark:text-white font-extrabold text-sm">62.8%</p>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 dark:bg-zinc-900/50 space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-bold uppercase text-[9px]">
                    <Navigation size={12} />
                    <span>Primary Router</span>
                  </div>
                  <p className="text-neutral-800 dark:text-white font-semibold text-xs">Courier Dispatch ({selectedHub.city})</p>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 dark:bg-zinc-900/50 space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-bold uppercase text-[9px]">
                    <Activity size={12} />
                    <span>Remittance Status</span>
                  </div>
                  <p className="text-neutral-800 dark:text-white font-semibold text-xs">Next payout: Friday</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-neutral-400 text-center py-20">Select a warehouse distribution hub from the directory panel.</p>
          )}
        </div>

      </div>
    </div>
  );
}
