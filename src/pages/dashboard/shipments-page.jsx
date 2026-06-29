import { useState } from 'react';
import { Search, SlidersHorizontal, Eye, XCircle, Info, Calendar, Phone, MapPin, Truck } from 'lucide-react';
import Button from '../../components/ui/button';
import Dialog from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function ShipmentsPage() {
  // Rich mock database of shipments
  const [shipments, setShipments] = useState([
    { id: 'ZP-9403', name: 'Kabir Ahmed', phone: '01711223344', address: 'House 12, Road 4, Sector 3', division: 'Dhaka', district: 'Dhaka', weight: 1.5, fare: 95, status: 'In Transit', date: '2026-06-29', tier: 'express' },
    { id: 'ZP-8291', name: 'Mahrin Rahman', phone: '01899887766', address: 'Boalmari Bazaar', division: 'Dhaka', district: 'Faridpur', weight: 2.0, fare: 110, status: 'Delivered', date: '2026-06-28', tier: 'standard' },
    { id: 'ZP-7362', name: 'Zeeshan Ali', phone: '01511223344', address: 'Halishahar Block C', division: 'Chattogram', district: 'Chattogram', weight: 0.8, fare: 155, status: 'Delivered', date: '2026-06-27', tier: 'express' },
    { id: 'ZP-6391', name: 'Sadia Islam', phone: '01911223344', address: 'Sylhet Sadar, Amborkhana', division: 'Sylhet', district: 'Sylhet', weight: 3.5, fare: 95, status: 'Returned', date: '2026-06-26', tier: 'standard' },
    { id: 'ZP-5482', name: 'Tanzil Hasan', phone: '01311223344', address: 'Khulna Rupsha Link Rd', division: 'Khulna', district: 'Khulna', weight: 1.2, fare: 113, status: 'Pending', date: '2026-06-25', tier: 'standard' },
    { id: 'ZP-4938', name: 'Nabila Karim', phone: '01611223344', address: 'Mymensingh Station Rd', division: 'Mymensingh', district: 'Mymensingh', weight: 2.5, fare: 132, status: 'In Transit', date: '2026-06-24', tier: 'standard' },
    { id: 'ZP-3029', name: 'Fahim Faisal', phone: '01755667788', address: 'Rajshahi University area', division: 'Rajshahi', district: 'Rajshahi', weight: 0.5, fare: 130, status: 'Delivered', date: '2026-06-23', tier: 'express' },
    { id: 'ZP-2038', name: 'Rezaul Karim', phone: '01855667788', address: 'Barisal Sadar road', division: 'Barisal', district: 'Barisal', weight: 4.0, fare: 155, status: 'Delivered', date: '2026-06-22', tier: 'standard' },
    { id: 'ZP-1029', name: 'Israt Jahan', phone: '01955667788', address: 'Rangpur College intersection', division: 'Rangpur', district: 'Rangpur', weight: 1.8, fare: 122, status: 'Returned', date: '2026-06-21', tier: 'standard' }
  ]);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [sortKey, setSortKey] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Selected row for details dialog
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Status badge styling helper
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-success/15 text-success border border-success/30';
      case 'in transit': return 'bg-info/15 text-info border border-info/30';
      case 'returned': return 'bg-error/15 text-error border border-error/30';
      case 'pending': return 'bg-warning/15 text-warning border border-warning/30';
      default: return 'bg-neutral-100 text-neutral-500 border border-neutral-200';
    }
  };

  // Sorting handler
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // Filter & Sort core logic
  const filteredShipments = shipments
    .filter(ship => {
      const matchesSearch = ship.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.phone.includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || ship.status === statusFilter;
      const matchesDivision = divisionFilter === 'All' || ship.division === divisionFilter;
      return matchesSearch && matchesStatus && matchesDivision;
    })
    .sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === 'fare' || sortKey === 'weight') {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Paginated rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredShipments.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredShipments.length / rowsPerPage);

  const cancelShipment = (id) => {
    setShipments(prev => prev.map(s => s.id === id ? { ...s, status: 'Returned' } : s));
    setSelectedShipment(prev => prev && prev.id === id ? { ...prev, status: 'Returned' } : prev);
    toast.error(`Shipment ${id} cancelled and marked as Returned.`);
  };

  return (
    <div className="space-y-6 text-left pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Shipment Ledgers</h1>
        <p className="text-xs text-neutral-400">Search and sort recorded customer dispatches and billing parameters.</p>
      </div>

      {/* Search & Filter Controls Bento */}
      <div className="p-4 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft flex flex-col md:flex-row md:items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search Order ID, name, or phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-bg-light dark:bg-zinc-950/40 text-xs focus:outline-none focus:border-primary text-neutral-800 dark:text-neutral-200"
          />
        </div>

        {/* Filter triggers */}
        <div className="flex flex-wrap items-center gap-3.5">
          {/* Status */}
          <div className="flex items-center space-x-1.5 text-xs text-neutral-500">
            <SlidersHorizontal size={13} />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-bg-light dark:bg-zinc-950/40 focus:outline-none"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Division */}
          <div className="flex items-center space-x-1.5 text-xs text-neutral-500">
            <span>Division:</span>
            <select
              value={divisionFilter}
              onChange={(e) => { setDivisionFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-bg-light dark:bg-zinc-950/40 focus:outline-none"
            >
              <option value="All">All regions</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="p-4 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-neutral-600 dark:text-neutral-300">
            <thead>
              <tr className="border-b border-borderColor-light dark:border-borderColor-dark text-neutral-400 font-bold">
                <th className="py-3 px-4 text-left font-bold cursor-pointer hover:text-neutral-700 dark:hover:text-white" onClick={() => handleSort('id')}>Order ID {sortKey === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="py-3 px-4 text-left font-bold cursor-pointer hover:text-neutral-700 dark:hover:text-white" onClick={() => handleSort('name')}>Recipient {sortKey === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="py-3 px-4 text-left font-bold">Division</th>
                <th className="py-3 px-4 text-left font-bold cursor-pointer hover:text-neutral-700 dark:hover:text-white" onClick={() => handleSort('weight')}>Weight {sortKey === 'weight' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="py-3 px-4 text-left font-bold cursor-pointer hover:text-neutral-700 dark:hover:text-white" onClick={() => handleSort('status')}>Status {sortKey === 'status' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-neutral-700 dark:hover:text-white" onClick={() => handleSort('fare')}>Fare {sortKey === 'fare' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="py-3 px-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor-light/40 dark:divide-borderColor-dark/40">
              {currentRows.length > 0 ? (
                currentRows.map((ship) => (
                  <tr key={ship.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/15 transition-all">
                    <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white">{ship.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-700 dark:text-neutral-200">{ship.name}</div>
                      <div className="text-[10px] text-neutral-400">{ship.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{ship.division}</td>
                    <td className="py-3.5 px-4">{ship.weight} kg</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(ship.status)}`}>
                        {ship.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-neutral-800 dark:text-neutral-100">৳{ship.fare}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedShipment(ship)}
                          className="p-1 rounded text-neutral-400 hover:text-primary hover:bg-primary/10"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </Button>
                        {ship.status !== 'Returned' && ship.status !== 'Delivered' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelShipment(ship.id)}
                            className="p-1 rounded text-neutral-400 hover:text-error hover:bg-error/10"
                            title="Cancel Order"
                          >
                            <XCircle size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-neutral-400 font-medium">
                    No shipments found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        {totalPages > 1 && (
          <div className="border-t border-borderColor-light dark:border-borderColor-dark mt-4 pt-4 flex items-center justify-between text-xs text-neutral-400">
            <p>
              Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredShipments.length)} of {filteredShipments.length} records
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1"
              >
                Prev
              </Button>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Shipment Details Dialog Modal */}
      {selectedShipment && (
        <Dialog
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipment(null)}
          title={`Order Details: ${selectedShipment.id}`}
          size="md"
        >
          <div className="space-y-6 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-neutral-400">Recipient Name</p>
                <p className="text-sm font-semibold text-neutral-800 dark:text-white">{selectedShipment.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-neutral-400">Transit Code</p>
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-[10px] font-bold uppercase">{selectedShipment.tier}</span>
                  <span className="text-neutral-400">৳{selectedShipment.fare} Fare</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-borderColor-light dark:border-borderColor-dark pt-4">
              <div className="flex items-center space-x-2 text-neutral-500">
                <Phone size={14} className="shrink-0" />
                <span>Phone Contact: <strong>{selectedShipment.phone}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-500">
                <MapPin size={14} className="shrink-0" />
                <span>Address: <strong>{selectedShipment.address}, {selectedShipment.district}, {selectedShipment.division} Division</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-500">
                <Calendar size={14} className="shrink-0" />
                <span>Created Date: <strong>{selectedShipment.date}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-500">
                <Truck size={14} className="shrink-0" />
                <span>Current Status: <strong className={`ml-1.5 px-2 py-0.5 rounded-full ${getStatusColor(selectedShipment.status)}`}>{selectedShipment.status}</strong></span>
              </div>
            </div>

            {selectedShipment.status !== 'Returned' && selectedShipment.status !== 'Delivered' && (
              <div className="border-t border-borderColor-light dark:border-borderColor-dark pt-4 flex justify-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => cancelShipment(selectedShipment.id)}
                >
                  Cancel Order
                </Button>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
}
