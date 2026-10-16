import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Crown, 
  Package, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export function HeroSection({ onNavigateRanks, onNavigateCrates, siteConfig }) {
  const [copiedIp, setCopiedIp] = useState(false);

  const serverName = siteConfig?.serverName || 'Ceylon SMP';
  const serverIp = siteConfig?.serverIp || 'play.ceylonsmp.net';
  const playersOnline = siteConfig?.playersOnline || 248;

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <section 
      id="hero"
      style={{ 
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 72px)',
        margin: '0 auto',
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Fullscreen Transparent Minecraft Cherry Blossom Panoramic Backdrop */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: 'calc(100vh - 72px)',
          backgroundImage: `
            linear-gradient(180deg, 
              rgba(12, 10, 16, 0.35) 0%, 
              rgba(20, 12, 26, 0.45) 40%, 
              rgba(12, 10, 16, 0.85) 85%, 
              #0c0a10 100%
            ),
            radial-gradient(circle at 50% 35%, rgba(255, 46, 147, 0.28) 0%, transparent 65%),
            url('/minecraft-hero-bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Floating Ceylon SMP 3D Logo with Glowing Minecraft Aura */}
          <div style={{ marginBottom: '22px' }}>
            <div 
              style={{
                width: '150px',
                height: '150px',
                margin: '0 auto',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0 0 50px rgba(255, 46, 147, 0.75), 0 16px 40px rgba(0,0,0,0.85)',
                border: '3px solid #ff2e93',
                background: 'rgba(21, 9, 26, 0.75)',
                backdropFilter: 'blur(8px)'
              }}
              className="animate-float"
            >
              <img 
                src="/ceylon-logo.jpg" 
                alt="Ceylon SMP Official Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Clean Main Title */}
          <h1 
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 46, 147, 0.5)'
            }}
          >
            CEYLON <span style={{
              background: 'linear-gradient(135deg, #ffffff 10%, #ff75a0 50%, #ff2e93 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 46, 147, 0.7)'
            }}>SMP</span>
          </h1>

          <p 
            style={{
              fontSize: '1.1rem',
              color: '#f8fafc',
              maxWidth: '700px',
              margin: '0 auto 28px auto',
              lineHeight: 1.6,
              textShadow: '0 2px 12px rgba(0,0,0,0.95)'
            }}
          >
            Welcome to the premier {serverName} Minecraft network. Enhance your survival experience with lifetime ranks and mythic crate keys with instant in-game delivery.
          </p>

          {/* Transparent Glassmorphic Server IP Copy Box */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(15, 10, 24, 0.8)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 46, 147, 0.55)',
              borderRadius: '16px',
              padding: '8px 10px 8px 20px',
              gap: '16px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.75), 0 0 30px rgba(255, 46, 147, 0.3)',
              marginBottom: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                {serverIp}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#ff75a0', background: 'rgba(255, 46, 147, 0.22)', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
                {playersOnline} Online
              </span>
            </div>

            <button
              onClick={handleCopyIp}
              className="btn-primary"
              style={{
                padding: '9px 20px',
                fontSize: '0.88rem',
                borderRadius: '10px'
              }}
            >
              {copiedIp ? (
                <>
                  <Check size={16} />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Server IP</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Category Transparent Glass Cards */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
              maxWidth: '850px',
              width: '100%',
              margin: '0 auto',
              textAlign: 'left'
            }}
          >
            {/* Ranks Card */}
            <div 
              onClick={onNavigateRanks}
              style={{
                background: 'rgba(20, 12, 28, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 46, 147, 0.4)',
                borderRadius: '18px',
                padding: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#ff2e93'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(255, 46, 147, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 46, 147, 0.4)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 18px rgba(255, 46, 147, 0.45)' }}>
                  <Crown size={26} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                    Server Ranks
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#f472b6', marginTop: '2px' }}>
                    8 Tiers: God down to Noob
                  </div>
                </div>
              </div>
              <ArrowRight size={20} style={{ color: '#ff75a0' }} />
            </div>

            {/* Crates Card */}
            <div 
              onClick={onNavigateCrates}
              style={{
                background: 'rgba(20, 12, 28, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(217, 70, 239, 0.4)',
                borderRadius: '18px',
                padding: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#d946ef'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(217, 70, 239, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 18px rgba(217, 70, 239, 0.45)' }}>
                  <Package size={26} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                    Crates & Keys
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#e879f9', marginTop: '2px' }}>
                    1, 5, 10, or 20 Key Bundles
                  </div>
                </div>
              </div>
              <ArrowRight size={20} style={{ color: '#d946ef' }} />
            </div>
          </div>

          {/* Animated Scroll Down Indicator to Store */}
          <div 
            onClick={() => {
              const el = document.getElementById('ranks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              marginTop: '36px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ff75a0'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Explore Store
            </span>
            <ChevronDown size={20} className="animate-bounce-soft" style={{ color: '#ff2e93' }} />
          </div>

        </div>
      </div>
    </section>
  );
}

