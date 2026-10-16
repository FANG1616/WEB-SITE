import React from 'react';
import { X, Check, Terminal, Shield, Sparkles, ShoppingCart } from 'lucide-react';
import { CURRENCIES } from '../data/storeData';

export function RankDetailModal({ isOpen, onClose, rank, selectedCurrency, onAddToCart }) {
  if (!isOpen || !rank) return null;

  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const priceConverted = (rank.price * curr.rate).toFixed(2);

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
          border: `2px solid ${rank.tagColor || '#ff2e93'}`,
          borderRadius: '22px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 25px 60px rgba(0,0,0,0.9), 0 0 35px ${rank.tagColor}44`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px',
            borderBottom: '1px solid rgba(255, 46, 147, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 46, 147, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                background: rank.tagColor, 
                color: '#fff', 
                borderRadius: '10px', 
                padding: '6px 12px',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '0.04em'
              }}
            >
              {rank.tag}
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                {rank.name} Rank Details
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#ff75a0', fontWeight: 600 }}>
                Tier #{rank.tier} Permanent Server Rank
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

        {/* Scrollable details */}
        <div style={{ padding: '22px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Chat tag display */}
          <div style={{ background: '#08050e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <span style={{ color: '#64748b' }}>In-Game Chat: </span>
            <span style={{ color: rank.tagColor, fontWeight: 700 }}>{rank.tag} </span>
            <span style={{ color: '#fff' }}>Player: </span>
            <span style={{ color: '#fbcfe8' }}>I just unlocked the {rank.name} rank on Ceylon SMP!</span>
          </div>

          {/* Perks */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} style={{ color: rank.tagColor }} /> Included Rank Perks:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {rank.perks.map((perk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.82rem', color: '#e2e8f0' }}>
                  <Check size={14} style={{ color: rank.tagColor, flexShrink: 0 }} />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permitted Commands */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={16} style={{ color: '#38bdf8' }} /> Unlocked Server Commands:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {rank.commands.map((cmd, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#7dd3fc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: 600
                  }}
                >
                  {cmd}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Cart Button */}
        <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Lifetime Purchase:</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>
              {curr.symbol}{priceConverted}
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart({
                id: `rank-${rank.id}`,
                name: `${rank.name} Rank`,
                type: 'rank',
                price: rank.price,
                image: '/ceylon-logo.jpg',
                color: rank.tagColor,
                tag: rank.tag
              });
              onClose();
            }}
            className="btn-primary"
            style={{ padding: '10px 22px' }}
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
