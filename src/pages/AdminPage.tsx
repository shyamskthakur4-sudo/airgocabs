import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Car, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Power, 
  RefreshCw, 
  Save, 
  Search, 
  MessageSquare, 
  Phone, 
  DollarSign, 
  Check, 
  X, 
  Image as ImageIcon,
  Database
} from 'lucide-react';
import { store } from '../lib/store';
import { Booking, Vehicle, BusinessSettings, VehicleCategory, TransmissionType, FuelType } from '../types';
import { formatINR } from '../lib/utils';
import { updateMetaTags } from '../lib/seo';
import { isSupabaseConfigured } from '../lib/supabase';
import { buildBookingWhatsAppUrl } from '../lib/whatsapp';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('airgo_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'fleet' | 'settings'>('overview');

  // Store data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(store.getSettings());

  // Filter state for Bookings
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<Booking | null>(null);

  // Vehicle Editing / Creating state
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [editingVehicleData, setEditingVehicleData] = useState<Partial<Vehicle>>({});

  // Settings Feedback
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: 'Admin Control Center | AIRGOCABS Indore',
      description: 'Management console for AIRGOCABS bookings, fleet inventory, dynamic pricing rules, and Indore operations.',
    });

    const refreshData = () => {
      setBookings(store.getBookings());
      setVehicles(store.getVehicles());
      setSettings(store.getSettings());
    };

    refreshData();
    return store.subscribe(refreshData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'airgo2026' || password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('airgo_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('airgo_admin_auth');
  };

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    await store.updateBookingStatus(bookingId, newStatus);
    if (selectedBookingDetails && selectedBookingDetails.id === bookingId) {
      setSelectedBookingDetails({ ...selectedBookingDetails, status: newStatus });
    }
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicleData.name || !editingVehicleData.brand) return;

    const p24 = Number(editingVehicleData.price24h || editingVehicleData.selfDrivePricePerDay) || 2999;
    const p12 = Number(editingVehicleData.price12h) || 1999;
    const dFee24 = Number(editingVehicleData.driverFee24h) || 1499;
    const dFee12 = Number(editingVehicleData.driverFee12h) || 899;

    const vehicleToSave: Vehicle = {
      id: editingVehicleData.id || `veh-${Date.now()}`,
      name: editingVehicleData.name,
      brand: editingVehicleData.brand,
      model: editingVehicleData.model || editingVehicleData.name,
      category: (editingVehicleData.category as VehicleCategory) || 'Sedan',
      transmission: (editingVehicleData.transmission as TransmissionType) || 'Automatic',
      seats: Number(editingVehicleData.seats) || 5,
      luggage: Number(editingVehicleData.luggage) || 3,
      fuelType: (editingVehicleData.fuelType as FuelType) || 'Petrol',
      mileage: editingVehicleData.mileage || '18.0 km/l',
      image: editingVehicleData.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      features: editingVehicleData.features || ['Touchscreen Infotainment', 'Reverse Camera', 'Fastag Active', 'Sanitized Cabin'],
      selfDriveAvailable: editingVehicleData.selfDriveAvailable ?? true,
      chauffeurAvailable: editingVehicleData.chauffeurAvailable ?? true,
      price24h: p24,
      price12h: p12,
      kmLimit24h: Number(editingVehicleData.kmLimit24h) || 250,
      kmLimit12h: Number(editingVehicleData.kmLimit12h) || 150,
      driverFee24h: dFee24,
      driverFee12h: dFee12,
      selfDrivePricePerDay: p24,
      chauffeurPricePerDay: p24 + dFee24,
      securityDeposit: Number(editingVehicleData.securityDeposit) || 10000,
      kmLimitPerDay: Number(editingVehicleData.kmLimit24h) || 250,
      extraKmRate: Number(editingVehicleData.extraKmRate) || 6,
      extraKmRateWithDriver: Number(editingVehicleData.extraKmRateWithDriver) || 8,
      isAvailable: editingVehicleData.isAvailable ?? true,
      rating: editingVehicleData.rating || 4.9,
      tripsCompleted: editingVehicleData.tripsCompleted || 10,
      isPopular: editingVehicleData.isPopular ?? false,
      isAirportSpecial: editingVehicleData.isAirportSpecial ?? true,
      tagline: editingVehicleData.tagline || 'Indore executive rental',
    };

    await store.saveVehicle(vehicleToSave);
    setIsEditingVehicle(false);
    setEditingVehicleData({});
  };

  const handleDeleteVehicle = async (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle from the fleet?')) {
      await store.deleteVehicle(id);
    }
  };

  const handleToggleAvailability = async (id: string) => {
    await store.toggleVehicleAvailability(id);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Overview calculations
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const activeCount = bookings.filter((b) => b.status === 'Active').length;
  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.baseAmount || 0), 0);

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      return (
        b.bookingReference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.vehicleName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // If NOT authenticated, show elegant PIN login gate
  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 bg-[#F7F7F5] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-[#E7E7E5] rounded-[4px] p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#286BFF]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777]">
                Restricted Access
              </span>
            </div>
            <h1 className="font-display text-2xl font-light text-[#171717]">
              AIRGOCABS Admin Portal
            </h1>
            <p className="text-xs text-[#777777] leading-relaxed">
              Enter authorized credentials to manage fleet allocations and client bookings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="Enter password (default: airgo2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-sm text-[#171717] focus:border-[#111318] focus:outline-none transition-colors"
                autoFocus
                required
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-[4px] bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>Incorrect password. Use: <strong className="font-mono">airgo2026</strong></span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-[4px] bg-[#111318] hover:bg-[#22252c] text-white font-medium text-xs uppercase tracking-wider transition-colors"
            >
              Sign In to Console
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#F0F0ED]">
            <span className="text-[11px] font-mono text-[#777777]">
              Demo passkey: <code className="text-[#171717] font-semibold">airgo2026</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E5]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#286BFF] font-semibold">
                Operations Desk
              </span>
              <span className="text-xs text-[#777777] font-mono">
                • {isSupabaseConfigured ? 'Supabase Sync Active' : 'Local Persistence'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#171717] tracking-tight mt-1">
              Fleet & Dispatch Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset store back to clean default demonstration data?')) {
                  store.resetToDefaults();
                }
              }}
              className="px-3.5 py-2 rounded-[4px] bg-white hover:bg-[#F0F0ED] border border-[#E7E7E5] text-xs font-medium text-[#777777] hover:text-[#171717] flex items-center gap-1.5 transition-colors"
              title="Reset data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-[4px] bg-[#111318] hover:bg-red-700 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full max-w-full min-w-0 overflow-x-auto pb-1 border-b border-[#E7E7E5] scrollbar-none">
          <div className="flex items-center gap-2 w-max">
            {[
              { id: 'overview', label: 'Overview', icon: DollarSign },
              { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
              { id: 'fleet', label: `Fleet (${vehicles.length})`, icon: Car },
              { id: 'settings', label: 'Settings & Identity', icon: Save },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    isActive
                      ? 'border-[#111318] text-[#111318] font-semibold'
                      : 'border-transparent text-[#777777] hover:text-[#171717]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                  Total Bookings
                </span>
                <div className="font-display text-3xl font-light text-[#171717]">
                  {totalBookingsCount}
                </div>
                <p className="text-xs text-[#777777]">
                  Across Self-Drive & Chauffeur
                </p>
              </div>

              <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block">
                  Pending Dispatch
                </span>
                <div className="font-display text-3xl font-light text-amber-600">
                  {pendingCount}
                </div>
                <p className="text-xs text-[#777777]">Requires coordinator action</p>
              </div>

              <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 block">
                  Confirmed & Active
                </span>
                <div className="font-display text-3xl font-light text-emerald-600">
                  {confirmedCount + activeCount}
                </div>
                <p className="text-xs text-[#777777]">Vehicles allocated & ready</p>
              </div>

              <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#286BFF] block">
                  Estimated Revenue
                </span>
                <div className="font-display text-3xl font-light text-[#171717]">
                  {formatINR(totalRevenue)}
                </div>
                <p className="text-xs text-[#777777]">Excluding refundable deposits</p>
              </div>
            </div>

            {/* Recent Bookings Snapshot */}
            <div className="bg-white border border-[#E7E7E5] rounded-[4px] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-medium text-[#171717]">Recent Booking Inquiries</h3>
                  <p className="text-xs text-[#777777]">Live dispatch queue from Indore</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-mono uppercase tracking-wider text-[#286BFF] hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7F5] border-b border-[#E7E7E5] text-[#777777] uppercase text-[10px] font-mono tracking-wider">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Pickup Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0ED] text-[#171717]">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAFAF9] transition-colors">
                        <td className="p-3 font-mono font-medium text-[#286BFF]">{b.bookingReference}</td>
                        <td className="p-3">
                          <span className="font-medium text-[#171717] block">{b.customerName}</span>
                          <span className="text-[10px] text-[#777777] font-mono">{b.customerPhone}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-[#171717] block">{b.vehicleName}</span>
                          <span className="text-[10px] text-[#777777]">{b.rentalType}</span>
                        </td>
                        <td className="p-3 font-mono text-[#555555]">
                          {b.pickupDate} ({b.rentalDurationDays}d)
                        </td>
                        <td className="p-3 font-mono font-semibold text-[#171717]">
                          {formatINR(b.totalEstimatedAmount)}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider font-semibold ${
                            b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            b.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            b.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedBookingDetails(b);
                              setActiveTab('bookings');
                            }}
                            className="px-2.5 py-1 rounded-[4px] bg-white text-[#171717] hover:bg-[#F0F0ED] border border-[#E7E7E5] text-[11px] font-medium"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search & Status Filters */}
            <div className="bg-white rounded-[4px] p-4 sm:p-6 border border-[#E7E7E5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search ref, customer, phone..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-white border border-[#E7E7E5] rounded-[4px] pl-10 pr-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#111318]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {['All', 'Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#111318] text-white font-semibold'
                        : 'bg-[#F7F7F5] text-[#777777] hover:text-[#171717] border border-[#E7E7E5]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-[4px] p-6 border border-[#E7E7E5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7F5] border-b border-[#E7E7E5] text-[#777777] uppercase text-[10px] font-mono tracking-wider">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Customer & Phone</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Itinerary</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0ED] text-[#171717]">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAFAF9] transition-colors">
                        <td className="p-3 font-mono font-medium text-[#286BFF]">{b.bookingReference}</td>
                        <td className="p-3">
                          <span className="font-medium text-[#171717] block">{b.customerName}</span>
                          <span className="text-[10px] text-[#777777] font-mono">{b.customerPhone}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-[#171717] block">{b.vehicleName}</span>
                          <span className="text-[10px] text-[#777777]">{b.rentalType}</span>
                        </td>
                        <td className="p-3 text-[11px] text-[#555555]">
                          <div>Pickup: {b.pickupDate} ({b.pickupTime})</div>
                          <div className="text-[#777777]">Return: {b.returnDate} ({b.returnTime})</div>
                          <span className="font-mono text-[#286BFF] text-[10px]">{b.rentalDurationDays}d duration</span>
                        </td>
                        <td className="p-3 font-mono font-semibold text-[#171717]">
                          {formatINR(b.totalEstimatedAmount)}
                        </td>
                        <td className="p-3">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                            className="bg-white border border-[#E7E7E5] rounded-[4px] px-2 py-1 text-xs text-[#171717] font-medium focus:outline-none focus:border-[#111318]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => setSelectedBookingDetails(b)}
                            className="px-2.5 py-1 rounded-[4px] bg-[#F7F7F5] hover:bg-[#EAEAEA] text-[#171717] border border-[#E7E7E5] text-xs font-medium"
                          >
                            Inspect
                          </button>
                          <a
                            href={buildBookingWhatsAppUrl(b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-1 rounded-[4px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inspect Booking Modal */}
            {selectedBookingDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="relative w-full max-w-2xl rounded-[4px] bg-white border border-[#E7E7E5] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E5]">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#286BFF] font-semibold">
                        Reservation Dossier
                      </span>
                      <h3 className="font-display text-xl font-medium text-[#171717] font-mono">
                        {selectedBookingDetails.bookingReference}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedBookingDetails(null)}
                      className="p-2 rounded-[4px] bg-[#F7F7F5] text-[#777777] hover:text-[#171717]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] space-y-1">
                      <span className="text-[#777777] uppercase text-[10px] font-mono block">Customer</span>
                      <p className="font-medium text-[#171717] text-sm">{selectedBookingDetails.customerName}</p>
                      <p className="font-mono text-[#555555]">{selectedBookingDetails.customerPhone}</p>
                      <p className="text-[#555555] truncate">{selectedBookingDetails.customerEmail}</p>
                      {selectedBookingDetails.drivingLicenseNumber && (
                        <p className="font-mono text-[#286BFF] pt-1">DL: {selectedBookingDetails.drivingLicenseNumber}</p>
                      )}
                    </div>

                    <div className="p-4 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] space-y-1">
                      <span className="text-[#777777] uppercase text-[10px] font-mono block">Vehicle</span>
                      <p className="font-medium text-[#171717] text-sm">{selectedBookingDetails.vehicleName}</p>
                      <p className="text-[#555555]">{selectedBookingDetails.vehicleCategory} • {selectedBookingDetails.rentalType}</p>
                      <p className="font-mono text-[#777777]">Duration: {selectedBookingDetails.rentalDurationDays} Day(s)</p>
                    </div>

                    <div className="p-4 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] col-span-2 space-y-2">
                      <span className="text-[#777777] uppercase text-[10px] font-mono block">Itinerary</span>
                      <p className="text-[#171717]"><strong>Pickup:</strong> {selectedBookingDetails.pickupLocation} on {selectedBookingDetails.pickupDate} at {selectedBookingDetails.pickupTime}</p>
                      <p className="text-[#171717]"><strong>Return:</strong> {selectedBookingDetails.dropoffLocation} on {selectedBookingDetails.returnDate} at {selectedBookingDetails.returnTime}</p>
                      {selectedBookingDetails.flightNumber && (
                        <p className="text-[#286BFF] font-mono">Flight Number: {selectedBookingDetails.flightNumber}</p>
                      )}
                      {selectedBookingDetails.specialRequests && (
                        <p className="text-amber-700 italic pt-1">Notes: "{selectedBookingDetails.specialRequests}"</p>
                      )}
                    </div>

                    <div className="p-4 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] col-span-2 space-y-1">
                      <span className="text-[#777777] uppercase text-[10px] font-mono block">Financial Breakdown</span>
                      <div className="flex justify-between"><span>Rental Fare:</span><span className="font-mono">{formatINR(selectedBookingDetails.baseAmount)}</span></div>
                      <div className="flex justify-between font-semibold text-sm text-[#171717] pt-2 border-t border-[#E7E7E5]">
                        <span>Total Payable:</span>
                        <span className="font-mono">{formatINR(selectedBookingDetails.totalEstimatedAmount)}</span>
                      </div>
                      {selectedBookingDetails.securityDeposit > 0 && (
                        <div className="flex justify-between text-[#777777] pt-1">
                          <span>Refundable Deposit (At Handover):</span>
                          <span className="font-mono">{formatINR(selectedBookingDetails.securityDeposit)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#777777]">Update Status:</span>
                      {['Confirmed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(selectedBookingDetails.id, st as any)}
                          className={`px-3 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider font-semibold ${
                            st === 'Confirmed' ? 'bg-[#111318] text-white' : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          Mark {st}
                        </button>
                      ))}
                    </div>

                    <a
                      href={buildBookingWhatsAppUrl(selectedBookingDetails)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-[4px] bg-[#25D366] text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FLEET INVENTORY */}
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-medium text-[#171717]">Fleet Inventory & Pricing</h3>
                <p className="text-xs text-[#777777]">Manage car models, rates, deposits, and active availability</p>
              </div>

              <button
                onClick={() => {
                  setEditingVehicleData({
                    category: 'Sedan',
                    transmission: 'Automatic',
                    fuelType: 'Petrol',
                    seats: 5,
                    luggage: 3,
                    price24h: 2999,
                    price12h: 1999,
                    kmLimit24h: 250,
                    kmLimit12h: 150,
                    driverFee24h: 1499,
                    driverFee12h: 899,
                    selfDrivePricePerDay: 2999,
                    chauffeurPricePerDay: 4498,
                    securityDeposit: 10000,
                    kmLimitPerDay: 250,
                    extraKmRate: 6,
                    extraKmRateWithDriver: 8,
                    isAvailable: true,
                    selfDriveAvailable: true,
                    chauffeurAvailable: true,
                  });
                  setIsEditingVehicle(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#111318] hover:bg-[#22252c] text-white text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Vehicle</span>
              </button>
            </div>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="rounded-[4px] bg-white border border-[#E7E7E5] overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-[#F7F7F5]">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#111318] px-2.5 py-1 rounded-[2px] text-[10px] font-mono uppercase text-white font-medium">
                      {v.category}
                    </div>

                    <button
                      onClick={() => handleToggleAvailability(v.id)}
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                        v.isAvailable
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {v.isAvailable ? '● Available' : '○ On Trip'}
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-display text-base font-medium text-[#171717]">{v.name}</h4>
                      <p className="text-xs text-[#777777] font-mono">{v.fuelType} • {v.transmission} • {v.seats} Seats</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#555555] py-2 border-y border-[#F0F0ED]">
                      <div>
                        <span className="text-[10px] text-[#777777] font-mono block">24H (250 KM):</span>
                        <span className="font-semibold text-[#171717] font-mono">{formatINR(v.price24h)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#777777] font-mono block">12H (150 KM):</span>
                        <span className="font-semibold text-[#171717] font-mono">{formatINR(v.price12h)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#777777] font-mono block">Extra KM:</span>
                        <span className="font-mono text-[#777777]">₹{v.extraKmRate} SD / ₹{v.extraKmRateWithDriver} Drv</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#777777] font-mono block">Driver Fee:</span>
                        <span className="font-mono text-[#777777]">+{formatINR(v.driverFee24h)} / +{formatINR(v.driverFee12h)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setEditingVehicleData({ ...v });
                          setIsEditingVehicle(true);
                        }}
                        className="flex-1 py-2 rounded-[4px] bg-[#F7F7F5] hover:bg-[#EAEAEA] text-[#171717] text-xs font-medium uppercase tracking-wider border border-[#E7E7E5] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteVehicle(v.id)}
                        className="p-2 rounded-[4px] bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                        title="Delete vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit / Add Vehicle Modal */}
            {isEditingVehicle && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="relative w-full max-w-2xl rounded-[4px] bg-white border border-[#E7E7E5] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E5]">
                    <h3 className="font-display text-xl font-medium text-[#171717]">
                      {editingVehicleData.id ? 'Edit Vehicle Listing' : 'Add New Vehicle to Fleet'}
                    </h3>
                    <button
                      onClick={() => setIsEditingVehicle(false)}
                      className="p-2 rounded-[4px] bg-[#F7F7F5] text-[#777777] hover:text-[#171717]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Vehicle Display Name *</label>
                        <input
                          type="text"
                          required
                          value={editingVehicleData.name || ''}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, name: e.target.value })}
                          placeholder="e.g. Maruti Suzuki Swift ZXi+"
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:border-[#111318] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Brand *</label>
                        <input
                          type="text"
                          required
                          value={editingVehicleData.brand || ''}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, brand: e.target.value })}
                          placeholder="e.g. Maruti Suzuki"
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:border-[#111318] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Category</label>
                        <select
                          value={editingVehicleData.category || 'Sedan'}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, category: e.target.value as any })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717]"
                        >
                          <option value="Hatchback">Hatchback</option>
                          <option value="Compact SUV">Compact SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Transmission</label>
                        <select
                          value={editingVehicleData.transmission || 'Automatic'}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, transmission: e.target.value as any })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717]"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Fuel Type</label>
                        <select
                          value={editingVehicleData.fuelType || 'Petrol'}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, fuelType: e.target.value as any })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717]"
                        >
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="CNG + Petrol">CNG + Petrol</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Electric">Electric</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">24H Rate — 250 KM (₹) *</label>
                        <input
                          type="number"
                          required
                          value={editingVehicleData.price24h || ''}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, price24h: Number(e.target.value), selfDrivePricePerDay: Number(e.target.value) })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">12H Rate — 150 KM (₹) *</label>
                        <input
                          type="number"
                          required
                          value={editingVehicleData.price12h || ''}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, price12h: Number(e.target.value) })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[#777777] uppercase text-[10px]">Security Deposit (₹) *</label>
                        <input
                          type="number"
                          required
                          value={editingVehicleData.securityDeposit || ''}
                          onChange={(e) => setEditingVehicleData({ ...editingVehicleData, securityDeposit: Number(e.target.value) })}
                          className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[#777777] uppercase text-[10px]">Vehicle Image URL</label>
                      <input
                        type="url"
                        value={editingVehicleData.image || ''}
                        onChange={(e) => setEditingVehicleData({ ...editingVehicleData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-[#E7E7E5]">
                      <button
                        type="button"
                        onClick={() => setIsEditingVehicle(false)}
                        className="px-5 py-2.5 rounded-[4px] bg-[#F7F7F5] text-[#171717] hover:bg-[#EAEAEA] text-xs uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-[4px] bg-[#111318] hover:bg-[#22252c] text-white font-medium text-xs uppercase tracking-wider"
                      >
                        Save Vehicle Listing
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS & LOGO */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-[4px] p-6 sm:p-10 border border-[#E7E7E5] space-y-8 animate-fade-in max-w-4xl">
            <div>
              <h3 className="font-display text-xl font-medium text-[#171717]">Business Settings & Identity</h3>
              <p className="text-xs text-[#777777] mt-1">
                Configure operational telephone lines, WhatsApp numbers, handover bays, and brand asset bindings.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Business settings successfully updated and saved!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[#777777] uppercase text-[10px]">Primary Hotline Phone</label>
                  <input
                    type="text"
                    value={settings.primaryPhone}
                    onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] focus:border-[#111318] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[#777777] uppercase text-[10px]">Business WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] font-mono focus:border-[#111318] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[#777777] uppercase text-[10px]">Reservations Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] focus:border-[#111318] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[#777777] uppercase text-[10px]">Daily Included Distance (KM)</label>
                  <input
                    type="number"
                    value={settings.freeKmPerDay}
                    onChange={(e) => setSettings({ ...settings, freeKmPerDay: Number(e.target.value) })}
                    className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] font-mono focus:border-[#111318] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[#777777] uppercase text-[10px]">Indore Airport Handover Bay Address</label>
                <input
                  type="text"
                  value={settings.addressAirportHub}
                  onChange={(e) => setSettings({ ...settings, addressAirportHub: e.target.value })}
                  className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] focus:border-[#111318] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[#777777] uppercase text-[10px]">Main Commercial Office Address</label>
                <input
                  type="text"
                  value={settings.addressMain}
                  onChange={(e) => setSettings({ ...settings, addressMain: e.target.value })}
                  className="w-full bg-white border border-[#E7E7E5] rounded-[4px] p-3 text-[#171717] focus:border-[#111318] focus:outline-none"
                />
              </div>

              {/* Logo Asset Instruction Card */}
              <div className="p-5 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] space-y-3">
                <div className="flex items-center gap-2 text-[#111318] font-medium">
                  <ImageIcon className="w-4 h-4 text-[#286BFF]" />
                  <span>AIRGOCABS Logo Asset Hook</span>
                </div>
                <p className="text-[#555555] leading-relaxed">
                  The website directly references <code className="text-[#171717] font-mono">/logo.png</code> in the public folder. The original uploaded brand asset is extracted with transparent background and exact proportions, automatically applied across the header, footer, and receipts.
                </p>
                <div className="p-4 rounded-[4px] bg-white border border-[#E7E7E5] flex items-center gap-4">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">Active Logo:</span>
                  <img src="/logo.png" alt="Current Logo" className="h-7 w-auto object-contain" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-[4px] bg-[#111318] hover:bg-[#22252c] text-white font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  Save Business Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
