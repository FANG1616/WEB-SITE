import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  Sparkles, 
  ShoppingCart, 
  Zap, 
  ChevronRight, 
  Info,
  Flame,
  ShieldCheck,
  Video
} from 'lucide-react';
import { RANKS_DATA, CURRENCIES } from '../data/storeData';

export function RanksSection({ ranks = RANKS_DATA, selectedCurrency, onAddToCart, onBuyNow, onOpenRankDetail }) {
  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const availableRanks = ranks.filter(r => r.available !== false);

  return (
    <section id="ranks" style={{ padding: '30px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 
          style={{ 
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.02em', 
            color: '#ffffff',
            marginBottom: '8px' 
          }}
        >
          Server <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ff75a0 50%, #ff2e93 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Ranks</span>
        </h2>
      </div>

      {/* Ranks Grid: High to Low (God -> Elite+ -> Elite -> VIP+ -> VIP -> Pro -> YouTube -> Noob) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {availableRanks.map((rank) => {
          const isGod = rank.id === 'god';
          const isYouTube = rank.id === 'youtube';
          const priceConverted = (rank.price * curr.rate).toFixed(2);
          const origPriceConverted = (rank.originalPrice * curr.rate).toFixed(2);

          return (
            <div
              key={rank.id}
              style={{
                position: 'relative',
                background: isGod 
                  ? 'radial-gradient(ellipse at 50% 0%, rgba(255, 46, 147, 0.25) 0%, rgba(24, 15, 32, 0.95) 75%)'
                  : 'rgba(23, 16, 30, 0.85)',
                border: isGod 
                  ? '2px solid #ff2e93' 
                  : '1px solid rgba(255, 46, 147, 0.22)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isGod 
                  ? '0 12px 35px rgba(255, 46, 147, 0.35)' 
                  : '0 8px 24px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = rank.tagColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isGod ? '#ff2e93' : 'rgba(255, 46, 147, 0.22)';
              }}
            >
              {/* Badge Tag on top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    background: rank.id === 'god' ? '#ff2e93' : 'rgba(255, 46, 147, 0.15)',
                    color: rank.id === 'god' ? '#ffffff' : '#ff75a0',
                    border: '1px solid ' + (rank.id === 'god' ? '#ff75a0' : 'rgba(255, 46, 147, 0.4)'),
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em'
                  }}
                >
                  {rank.badge}
                </span>

                <span
                  style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#4ade80',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  {rank.discount}
                </span>
              </div>

              {/* Rank Title & In-game Prefix Preview */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  {isGod && <Flame size={24} style={{ color: '#ff2e93' }} />}
                  {isYouTube && <Video size={22} style={{ color: '#ff1744' }} />}
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: 900, 
                      letterSpacing: '-0.01em',
                      color: rank.tagColor
                    }}
                  >
                    {rank.name}
                  </h3>
                </div>

                {/* Minecraft Chat Prefix Simulation */}
                <div 
                  style={{
                    background: '#0a0710',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ color: '#64748b' }}>Chat:</span>
                  <span style={{ color: rank.tagColor, fontWeight: 700 }}>{rank.tag}</span>
                  <span style={{ color: '#e2e8f0' }}>Player:</span>
                  <span style={{ color: '#cbd5e1' }}>Hello Ceylon SMP!</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#94a3b8', minHeight: '38px', marginBottom: '16px', lineHeight: 1.4 }}>
                  {rank.description}
                </p>

                {/* Pricing Block */}
                <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                    {curr.symbol}{priceConverted}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#64748b', textDecoration: 'line-through' }}>
                    {curr.symbol}{origPriceConverted}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 600 }}>
                    one-time
                  </span>
                </div>

                {/* Perks Checklist Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                  {rank.perks.slice(0, 5).map((perk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                      <span style={{ 
                        color: rank.tagColor, 
                        background: 'rgba(255, 46, 147, 0.1)', 
                        borderRadius: '50%', 
                        padding: '2px', 
                        display: 'flex',
                        marginTop: '2px'
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span style={{ flex: 1, lineHeight: 1.35 }}>{perk}</span>
                    </div>
                  ))}
                  {rank.perks.length > 5 && (
                    <button
                      onClick={() => onOpenRankDetail(rank)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff75a0',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      + {rank.perks.length - 5} more perks & commands <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => onAddToCart({
                    id: `rank-${rank.id}`,
                    name: `${rank.name} Rank`,
                    type: 'rank',
                    price: rank.price,
                    image: '/ceylon-logo.jpg',
                    color: rank.tagColor,
                    tag: rank.tag
                  })}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '0.88rem',
                    borderRadius: '10px'
                  }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onBuyNow({
                      id: `rank-${rank.id}`,
                      name: `${rank.name} Rank`,
                      type: 'rank',
                      price: rank.price,
                      image: '/ceylon-logo.jpg',
                      color: rank.tagColor,
                      tag: rank.tag
                    })}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 46, 147, 0.15)',
                      border: '1px solid rgba(255, 46, 147, 0.35)',
                      color: '#ffffff',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Zap size={14} style={{ color: '#ff75a0' }} /> Buy Now
                  </button>

                  <button
                    onClick={() => onOpenRankDetail(rank)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94a3b8',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="View details & commands"
                  >
                    <Info size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
