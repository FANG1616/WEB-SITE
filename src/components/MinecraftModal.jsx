import React, { useState } from 'react';
import { X, Check, Gamepad2, Sparkles, UserCheck } from 'lucide-react';

export function MinecraftModal({ isOpen, onClose, currentUsername, onSaveUsername }) {
  const [ign, setIgn] = useState(currentUsername || '');
  const [previewIgn, setPreviewIgn] = useState(currentUsername || 'Steve');

  if (!isOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (ign.trim()) {
      onSaveUsername(ign.trim());
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 4, 11, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #181122 0%, #100b17 100%)',
          border: '1px solid rgba(255, 46, 147, 0.4)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          color: '#f8fafc',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 46, 147, 0.25)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div 
            style={{ 
              width: '54px', 
              height: '54px', 
              borderRadius: '16px', 
              background: 'rgba(255, 46, 147, 0.15)',
              border: '1px solid #ff2e93',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff75a0',
              marginBottom: '10px'
            }}
          >
            <Gamepad2 size={28} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '2px 0', color: '#fff' }}>
            Link Your Minecraft Character
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            We need your in-game name (IGN) to instantly send your purchased ranks and crate keys on <strong style={{ color: '#ff75a0' }}>Ceylon SMP</strong>.
          </p>
        </div>

        {/* Live Skin Avatar Preview */}
        <div 
          style={{ 
            background: 'rgba(255, 46, 147, 0.06)',
            border: '1px solid rgba(255, 46, 147, 0.2)',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          <img 
            src={`https://mc-heads.net/avatar/${previewIgn || 'Steve'}/64`}
            alt={previewIgn}
            onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/64'; }}
            style={{ width: '56px', height: '56px', borderRadius: '10px', border: '2px solid #ff2e93', background: '#0e0a14' }}
          />
          <div>
            <div style={{ fontSize: '0.72rem', color: '#f472b6', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Character Preview
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              {previewIgn || 'Steve'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <UserCheck size={12} /> Ready for instant delivery
            </div>
          </div>
        </div>

        <form onSubmit={handleApply}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
              Minecraft In-Game Name (IGN):
            </label>
            <input 
              type="text"
              placeholder="e.g. CeylonPlayer"
              value={ign}
              onChange={(e) => {
                setIgn(e.target.value);
                setPreviewIgn(e.target.value.trim() || 'Steve');
              }}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                background: '#0d0815',
                border: '1px solid rgba(255, 46, 147, 0.4)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-mono)'
              }}
              required
            />
            <div style={{ fontSize: '0.73rem', color: '#64748b', marginTop: '6px' }}>
              * Bedrock Edition players: please enter your exact Gamertag (e.g. *YourName).
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 46, 147, 0.4)'
            }}
          >
            <Check size={18} /> Confirm Player Name
          </button>
        </form>
      </div>
    </div>
  );
}
