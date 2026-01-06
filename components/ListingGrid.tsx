
import React, { useState } from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, Heart, Sparkles, Loader2, Search, MapPin, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ListingGridProps {
  properties: Property[];
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const getAiInsight = async () => {
    setIsLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a one-sentence professional real estate analysis of this property: 
          Title: ${property.title}, Price: $${property.price}, Location: ${property.location}, 
          Type: ${property.type}, Specs: ${property.beds} beds, ${property.baths} baths, ${property.sqft} sqft.
          Focus on potential investment value or lifestyle appeal.`,
        config: {
          maxOutputTokens: 60,
          temperature: 0.7,
        }
      });
      setAiInsight(response.text || "Insight unavailable at this moment.");
    } catch (err) {
      console.error(err);
      setAiInsight("Unable to fetch AI insights. Check API key.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="listing-card group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            {property.type}
          </span>
          {property.tags.map(tag => (
            <span key={tag} className="bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 shadow-lg ${isLiked ? 'bg-red-500 text-white scale-110' : 'bg-white/90 text-slate-600 hover:text-red-500 hover:bg-white'}`}
          aria-label="Save Property"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-slate-900/80 backdrop-blur-md text-white font-bold text-xl px-4 py-1.5 rounded-xl shadow-2xl border border-white/20">
            ${property.price.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {property.location}
          </p>
        </div>

        {/* Property Specs - Refined Grid */}
        <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 mb-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-900">
              <Bed className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-lg leading-none">{property.beds}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-tight">Beds</span>
          </div>
          <div className="flex flex-col border-x border-slate-100 px-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Bath className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-lg leading-none">{property.baths}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-tight">Baths</span>
          </div>
          <div className="flex flex-col pl-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Square className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-lg leading-none">{property.sqft.toLocaleString()}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-tight">Sqft</span>
          </div>
        </div>

        {/* AI Insight Section - Enhanced styling */}
        <div className="mb-6">
          {aiInsight ? (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl text-sm text-blue-900 leading-relaxed animate-in fade-in zoom-in duration-300 relative overflow-hidden group/insight">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center gap-2 font-bold text-blue-700 mb-1.5 uppercase text-[10px] tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                AI Property Analysis
              </div>
              <p className="italic font-medium">"{aiInsight}"</p>
            </div>
          ) : (
            <button 
              onClick={getAiInsight}
              disabled={isLoadingAi}
              className="w-full flex items-center justify-center gap-2.5 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-600 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 disabled:opacity-50"
            >
              {isLoadingAi ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              ) : (
                <Sparkles className="w-4 h-4 text-blue-500" />
              )}
              {isLoadingAi ? 'Analyzing market data...' : 'Get AI Property Insight'}
            </button>
          )}
        </div>

        {/* Action Button */}
        <button className="mt-auto group/btn w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200">
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const ListingGrid: React.FC<ListingGridProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400 text-center px-4">
        <div className="bg-slate-100 p-8 rounded-full mb-6 ring-8 ring-slate-50">
          <Search className="w-16 h-16 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No matching properties</h2>
        <p className="text-slate-500 max-w-xs mx-auto">We couldn't find anything matching your filters. Try expanding your search area or budget.</p>
        <button className="mt-6 text-blue-600 font-bold hover:underline">Clear all filters</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default ListingGrid;
