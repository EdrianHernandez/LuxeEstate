
import React, { useState } from 'react';
import { Send, User, Phone, MessageSquare, X, CheckCircle2 } from 'lucide-react';

const AgentContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all z-50 flex items-center gap-2"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="hidden sm:inline font-bold">Contact Agent</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="https://i.pravatar.cc/150?u=agent" 
              className="w-10 h-10 rounded-full border-2 border-blue-500" 
              alt="Agent"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Sarah Jenkins</h4>
            <p className="text-[10px] text-slate-400">Senior Real Estate Expert</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center animate-in zoom-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h4 className="text-lg font-bold text-slate-800">Message Sent!</h4>
            <p className="text-sm text-slate-500">Sarah will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message</label>
              <textarea 
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="I'm interested in the Waterfront Villa..."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Inquiry
            </button>
          </form>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-6">
        <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          <Phone className="w-3.5 h-3.5" /> Call Agent
        </button>
        <div className="w-px h-4 bg-slate-200 self-center" />
        <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          <MessageSquare className="w-3.5 h-3.5" /> Live Chat
        </button>
      </div>
    </div>
  );
};

export default AgentContact;
