import React from 'react';
import PotentialFlickers from './components/archive/PotentialFlickers';
import CoherenceCounter from './components/archive/CoherenceCounter';
import SeerCursor from './components/archive/SeerCursor';

export default function Layout({ children }) {
    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{
                background: `
          radial-gradient(ellipse at 30% 20%, rgba(30, 30, 60, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(20, 20, 40, 0.6) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a12 0%, #12121f 50%, #0d0d18 100%)
        `,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
        >
            {/* Custom cursor (desktop only) */}
            <div className="hidden md:block">
                <SeerCursor />
            </div>

            {/* Atmospheric background */}
            <PotentialFlickers />

            {/* Coherence HUD */}
            <CoherenceCounter />

            {/* Vignette overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-10"
                style={{
                    background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 18, 0.4) 70%, rgba(10, 10, 18, 0.8) 100%)
          `,
                }}
            />

            {/* Scan lines (subtle) */}
            <div
                className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )`,
                }}
            />

            {/* Main content */}
            <main className="relative z-20">
                {children}
            </main>

            {/* Global styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap');
        
        * {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto;
          }
        }
        
        ::selection {
          background: rgba(0, 212, 170, 0.3);
          color: white;
        }
        
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 170, 0.3);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 170, 0.5);
        }
      `}</style>
        </div>
    );
}