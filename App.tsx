
import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import ListingGrid from './components/ListingGrid';
import PropertyMapPreview from './components/PropertyMapPreview';
import AgentContact from './components/AgentContact';
import { MOCK_PROPERTIES } from './constants';
import { Filters, PropertyType } from './types';
import { Building2, Map as MapIcon, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minPrice: 0,
    maxPrice: 5000000,
    propertyType: 'All'
  });

  const [viewMode, setViewMode] = useState<'split' | 'map' | 'grid'>('split');

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(prop => {
      const matchesLocation = prop.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = filters.propertyType === 'All' || prop.type === filters.propertyType;
      const matchesPrice = prop.price >= filters.minPrice && prop.price <= filters.maxPrice;
      return matchesLocation && matchesType && matchesPrice;
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3 lg:px-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">
              LuxeEstate
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-lg p-1 mr-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'split' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                title="Split View"
              >
                <div className="flex gap-0.5">
                  <LayoutGrid className="w-4 h-4" />
                  <MapIcon className="w-4 h-4" />
                </div>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
            <button className="text-slate-600 font-semibold text-sm hover:text-blue-600 px-3 hidden sm:block">
              Rent
            </button>
            <button className="text-slate-600 font-semibold text-sm hover:text-blue-600 px-3 hidden sm:block">
              Sell
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm ml-2">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative">
        {/* Search Bar Section - Compact Sticky Placement */}
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-[61px] z-40 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 py-3">
            <SearchBar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex flex-grow overflow-hidden ${viewMode === 'map' ? 'h-[calc(100vh-120px)]' : ''}`}>
          {/* List Section */}
          <div className={`
            overflow-y-auto transition-all duration-300 scroll-smooth
            ${viewMode === 'grid' ? 'w-full' : ''}
            ${viewMode === 'split' ? 'w-full lg:w-[55%] xl:w-3/5' : ''}
            ${viewMode === 'map' ? 'hidden' : 'block'}
          `}>
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Properties in {filters.location || 'Your Area'}
                  </h1>
                  <p className="text-slate-500 mt-1 font-medium">
                    Showing {filteredProperties.length} verified listings
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Sort by:</span>
                  <select className="bg-transparent text-slate-900 font-bold text-sm outline-none cursor-pointer hover:text-blue-600 border-none p-0 focus:ring-0">
                    <option>Newest</option>
                    <option>Price (High to Low)</option>
                    <option>Price (Low to High)</option>
                    <option>Sqft</option>
                  </select>
                </div>
              </div>
              <ListingGrid properties={filteredProperties} />
            </div>
          </div>

          {/* Map Section */}
          <div className={`
            bg-slate-100 transition-all duration-300 border-l border-slate-200 relative
            ${viewMode === 'grid' ? 'hidden' : ''}
            ${viewMode === 'split' ? 'hidden lg:block lg:w-[45%] xl:w-2/5' : ''}
            ${viewMode === 'map' ? 'w-full h-full' : ''}
          `}>
            <PropertyMapPreview properties={filteredProperties} />
          </div>
        </div>
      </main>

      <AgentContact />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-black text-2xl mb-4">
              <Building2 className="w-8 h-8 text-blue-500" /> LuxeEstate
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed mb-6">
              The world's most advanced real estate portal powered by artificial intelligence. Find your dream home with deep market insights and real-time data.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">f</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">t</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">in</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Our Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Safety Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-xs font-semibold text-slate-500">
          &copy; 2024 LuxeEstate. All rights reserved. Real estate listings provided by verified MLS data.
        </div>
      </footer>
    </div>
  );
};

export default App;
