// src/components/sections/ClienteleSection.tsx
import { MOCK_CLIENTS } from "@/mock/clients";

export default function ClienteleSection() {
  return (
    <section className="section-padding bg-gray-50 border-t border-border/50 py-20">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to partner with respected organizations.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {MOCK_CLIENTS.map((client, index) => (
            <div 
              key={client.id} 
              className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-48"
            >
              {/* Logo Container */}
              <div className="h-20 w-full flex items-center justify-center mb-4 px-4">
                {/* 🟢 MODIFIED IMAGE TAG: Removed grayscale classes */}
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>

              {/* Client Name (Still appears on hover for a clean look) */}
              <span className="text-sm font-bold text-gray-900 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6">
                {client.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}