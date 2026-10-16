import React from 'react';
import { X, Sparkles, Percent, Package } from 'lucide-react';

export function LootPreviewModal({ isOpen, onClose, crate }) {
  if (!isOpen || !crate) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 3, 8, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #181024 0%, #100b17 100%)',
          border: `1px solid ${crate.accentColor || '#ff2e93'}`,
          borderRadius: '22px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 20px 50px rgba(0,0,0,0.9), 0 0 30px ${crate.accentColor}44`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 46, 147, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 46, 147, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: `${crate.accentColor}22`, border: `1px solid ${crate.accentColor}`, padding: '6px', borderRadius: '8px', color: crate.accentColor }}>
              <Package size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {crate.name} Loot Table
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Full drop rates & potential rewards
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Loot List */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {crate.lootPreview.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}`
                }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: item.color, fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.rarity}
                  </div>
                </div>
              </div>

              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {item.chance}
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(0,0,0,0.2)', textAlign: 'center' }}>
          <button onClick={onClose} className="btn-secondary" style={{ width: '100%', padding: '8px' }}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
