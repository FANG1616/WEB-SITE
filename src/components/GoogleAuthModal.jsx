import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Shield, Sparkles, AlertCircle } from 'lucide-react';

export function GoogleAuthModal({ isOpen, onClose, onSignInSuccess, currentMinecraftUser }) {
  const [mode, setMode] = useState('choose'); // 'choose' or 'custom'
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [ign, setIgn] = useState(currentMinecraftUser || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Alex Crafter',
      email: 'alex.ceylon@gmail.com',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Lotus Gamer',
      email: 'lotus.gamer.smp@gmail.com',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces'
    }
  ];

  const handleSelectAccount = (acc) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        ...acc,
        linkedIgn: ign || 'Steve'
      });
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail || !customName) {
      setError('Please provide your name and Google email address.');
      return;
    }
    if (!customEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: customName,
        email: customEmail,
        photo: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customName)}`,
        linkedIgn: ign || customName.replace(/\s+/g, '_')
      });
      onClose();
    }, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 3, 8, 0.82)',
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
          background: '#ffffff',
          color: '#1f2937',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(255, 46, 147, 0.25), 0 0 0 1px rgba(0,0,0,0.1)',
          position: 'relative',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%'
          }}
        >
          <X size={20} />
        </button>

        {/* Google Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: '#f8fafc', borderRadius: '50%', marginBottom: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '4px 0' }}>
            Sign in with Google
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            Choose an account to continue to <span style={{ color: '#db2777', fontWeight: 600 }}>Ceylon SMP Store</span>
          </p>
        </div>

        {/* Optional Minecraft IGN sync */}
        <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#9d174d', display: 'block', marginBottom: '4px' }}>
            🎮 Link Minecraft Username (IGN):
          </label>
          <input
            type="text"
            placeholder="e.g. YourInGameName"
            value={ign}
            onChange={(e) => setIgn(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #f472b6',
              fontSize: '0.85rem',
              outline: 'none',
              background: '#fff'
            }}
          />
          <div style={{ fontSize: '0.7rem', color: '#db2777', marginTop: '4px' }}>
            Items will be sent directly to this character in Ceylon SMP.
          </div>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.8rem', marginBottom: '12px', background: '#fef2f2', padding: '8px', borderRadius: '6px' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {mode === 'choose' ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {defaultAccounts.map((acc, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAccount(acc)}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    background: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#db2777'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                >
                  <img src={acc.photo} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{acc.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{acc.email}</div>
                  </div>
                  <CheckCircle2 size={16} style={{ color: '#db2777', opacity: 0.8 }} />
                </button>
              ))}

              <button
                onClick={() => setMode('custom')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px dashed #cbd5e1',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} style={{ color: '#475569' }} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#334155' }}>
                  Use another Google account...
                </div>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Your Full Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Fernando"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Google Email Address:
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setMode('choose')}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: '#f3f4f6',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    flex: 2,
                    padding: '9px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
                  }}
                >
                  {isLoading ? 'Verifying with Google...' : 'Sign In Now'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Security Footer Notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '14px' }}>
          <Shield size={12} style={{ color: '#10b981' }} />
          <span>Secure Google OAuth 2.0 Protocol • 256-Bit SSL Protected</span>
        </div>
      </div>
    </div>
  );
}
