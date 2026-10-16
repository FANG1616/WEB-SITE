import React, { useState, useEffect, useRef } from 'react';
import { X, Dices, Sparkles, RefreshCw, Trophy, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CrateSpinModal({ isOpen, onClose, crate }) {
  if (!isOpen || !crate) return null;

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [reelItems, setReelItems] = useState([]);
  const [offset, setOffset] = useState(0);

  // Initialize random loot items for spinning reel
  useEffect(() => {
    if (crate && crate.lootPreview) {
      const items = [];
      for (let i = 0; i < 35; i++) {
        const rand = crate.lootPreview[Math.floor(Math.random() * crate.lootPreview.length)];
        items.push({ ...rand, uniqueId: i });
      }
      setReelItems(items);
      setWinner(null);
      setOffset(0);
    }
  }, [crate, isOpen]);

  const handleStartSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    // Pick a winner at index 25
    const winIndex = 25;
    const targetItem = reelItems[winIndex];

    // Card width is ~120px + 12px gap = 132px
    const cardWidth = 132;
    // Reel center offset
    const randomJiggle = Math.floor(Math.random() * 40) - 20;
    const targetOffset = winIndex * cardWidth - 200 + randomJiggle;

    setOffset(targetOffset);

    setTimeout(() => {
      setWinner(targetItem);
      setSpinning(false);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#ff2e93', '#d946ef', '#ffffff', '#fbbf24']
        });
      } catch (e) {
        // ignore
      }
    }, 4200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 3, 8, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
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
          border: `2px solid ${crate.accentColor || '#ff2e93'}`,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '680px',
          padding: '26px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 25px 60px rgba(0,0,0,0.95), 0 0 35px ${crate.accentColor}55`,
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
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

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 auto 8px auto', background: `${crate.accentColor}22`, color: crate.accentColor, padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
          <Dices size={14} /> Interactive Crate Simulator
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>
          Test Unbox: {crate.name}
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '24px' }}>
          Simulate opening this crate to see the random spinning reel and potential drops!
        </p>

        {/* Unboxing Reel Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '140px',
            background: '#090510',
            border: '2px solid rgba(255, 46, 147, 0.4)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}
        >
          {/* Center Selector Marker Indicator */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#ff2e93',
              boxShadow: '0 0 15px #ff2e93, 0 0 5px #fff',
              zIndex: 10,
              transform: 'translateX(-50%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '-2px',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '10px solid #ff2e93',
              zIndex: 11,
              transform: 'translateX(-50%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '-2px',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderBottom: '10px solid #ff2e93',
              zIndex: 11,
              transform: 'translateX(-50%)'
            }}
          />

          {/* Scrolling items row */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              paddingLeft: '240px',
              transform: `translateX(-${offset}px)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.12, 0.8, 0.15, 1)' : 'none'
            }}
          >
            {reelItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: '120px',
                  height: '108px',
                  background: 'rgba(25, 17, 34, 0.95)',
                  border: `2px solid ${item.color || '#ff2e93'}`,
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  flexShrink: 0,
                  boxShadow: `0 4px 15px ${item.color}33`
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, marginBottom: '6px' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.2, maxHeight: '38px', overflow: 'hidden' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.62rem', color: item.color, fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
                  {item.rarity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Winning Prize Banner */}
        {winner && (
          <div
            style={{
              background: 'rgba(255, 46, 147, 0.15)',
              border: `2px solid ${winner.color}`,
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: winner.color, fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Trophy size={18} /> YOU WON:
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>
              {winner.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: winner.color, fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
              {winner.rarity} Reward ({winner.chance} Chance)
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleStartSpin}
            disabled={spinning}
            className="btn-primary"
            style={{
              padding: '12px 28px',
              fontSize: '0.95rem',
              borderRadius: '12px'
            }}
          >
            {spinning ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Spinning Crate Reel...</span>
              </>
            ) : (
              <>
                <Dices size={18} />
                <span>{winner ? 'Spin Again!' : 'Click to Spin Reel'}</span>
              </>
            )}
          </button>

          <button onClick={onClose} className="btn-secondary" style={{ padding: '12px 20px', borderRadius: '12px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
