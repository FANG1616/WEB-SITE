import React from 'react';
import { MessageSquare, Users, Shield, Gift, Sparkles, ExternalLink, Headphones } from 'lucide-react';

export function DiscordSection({ siteConfig }) {
  const widgetId = siteConfig?.discordWidgetId || '1518561012452819045';
  const serverName = siteConfig?.serverName || 'Ceylon SMP';

  return (
    <section id="discord" style={{ padding: '50px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      <div 
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 46, 147, 0.15) 0%, rgba(18, 12, 25, 0.9) 70%, #0d0914 100%)',
          border: '1px solid rgba(255, 46, 147, 0.35)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.65)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Left Community Info */}
        <div>
          <h2 
            style={{ 
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', 
              fontWeight: 900, 
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '16px' 
            }}
          >
            Join <span style={{
              background: 'linear-gradient(135deg, #ff75a0 0%, #ff2e93 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{serverName}</span> on Discord
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Hang out with hundreds of fellow players, participate in weekly crate key giveaways, claim your donor roles automatically, and get fast ticket support from our active staff team.
          </p>

          {/* Perks Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 46, 147, 0.15)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff75a0', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                <Gift size={16} /> Weekly Giveaways
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Win free God ranks and Advanced Crate keys in our Discord drops.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 46, 147, 0.15)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                <Headphones size={16} /> 24/7 Staff Support
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Instant private ticket desk for store & server assistance.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 46, 147, 0.15)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                <Shield size={16} /> Rank Role Sync
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Automatic Discord roles matching your God, Elite or VIP status.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 46, 147, 0.15)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                <Users size={16} /> Friendly Voice Chats
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                SMP grinding channels, trading voice rooms, and music bots.
              </div>
            </div>
          </div>

          <a 
            href="https://discord.gg/ceylonsmp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '12px 26px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              textDecoration: 'none'
            }}
          >
            <MessageSquare size={18} />
            <span>Open Discord & Join Server</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Right: Embedded Discord Widget */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div 
            style={{
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.75), 0 0 25px rgba(255, 46, 147, 0.25)',
              border: '2px solid rgba(255, 46, 147, 0.35)',
              background: '#2f3136'
            }}
          >
            {/* Embedded user requested Discord widget iframe */}
            <iframe 
              src={`https://discord.com/widget?id=${widgetId}&theme=dark`}
              width="350" 
              height="500" 
              allowtransparency="true" 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title={`${serverName} Discord Widget`}
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
