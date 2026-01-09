import React from 'react';
import { MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react';

const PropertyMapPreview = ({ properties }) => {
  return (
    <div className="relative w-full h-full bg-[#e5e7eb] overflow-hidden">
      {/* Simulated Map Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#475569 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      
      {/* Simulated Roads/Features */}
      <svg className="absolute inset-0 w-full h-full text-slate-300/30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q50,25 100,20" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M0,80 Q50,75 100,80" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M20,0 Q25,50 20,100" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M80,0 Q75,50 80,100" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" fill="none" strokeWidth="0.2" strokeDasharray="1 1" />
      </svg>

      {/* Property Markers */}
      {properties.map(prop => (
        <div 
          key={prop.id}
          className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group z-10 hover:z-20"
          style={{ left: `${prop.coordinates.x}%`, top: `${prop.coordinates.y}%` }}
        >
          {/* Price Bubble */}
          <div className="bg-white px-2 py-1 rounded shadow-lg border border-slate-200 text-[10px] font-bold text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
            ${(prop.price / 1000).toFixed(0)}k
          </div>
          {/* Arrow */}
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white mx-auto -mt-0.5 group-hover:border-t-blue-600 transition-colors" />
          
          {/* Tooltip Card (hidden until hover) */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100 overflow-hidden">
            <img src={prop.imageUrl} className="w-full h-24 object-cover" alt={prop.title} />
            <div className="p-3">
              <p className="text-xs font-bold truncate">{prop.title}</p>
              <p className="text-[10px] text-slate-500">{prop.beds} beds • {prop.sqft} sqft</p>
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute right-6 top-6 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 text-slate-600 transition-colors">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 text-slate-600 transition-colors">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 text-slate-600 transition-colors">
          <Compass className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl border border-white/10">
        <MapPin className="w-3.5 h-3.5 text-blue-400" />
        Searching {properties.length} results in this area
      </div>
    </div>
  );
};

export default PropertyMapPreview;
