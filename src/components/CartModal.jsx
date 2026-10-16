import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Gift, 
  Gamepad2, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/storeData';

export function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedCurrency,
  minecraftUsername,
  onOpenMinecraftModal,
  googleUser,
  onOpenGoogleAuth,
  coupons,
  onOrderPlaced
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.20 = 20%
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isGift, setIsGift] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isOpen) return null;

  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

  // Calculate totals
  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmountUSD = subtotalUSD * appliedDiscount;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const subtotalFormatted = (subtotalUSD * curr.rate).toFixed(2);
  const discountFormatted = (discountAmountUSD * curr.rate).toFixed(2);
  const totalFormatted = (totalUSD * curr.rate).toFixed(2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setDiscountError('');
    setDiscountSuccess('');

    const clean = couponCode.trim().toUpperCase();
    const foundCoupon = (coupons || []).find(c => c.code === clean && c.active !== false);
    if (foundCoupon) {
      setAppliedDiscount(foundCoupon.discount / 100);
      setDiscountSuccess(`${foundCoupon.discount}% discount applied! (${foundCoupon.desc || foundCoupon.code})`);
    } else if (clean === 'PINK20') {
      setAppliedDiscount(0.20);
      setDiscountSuccess('20% Spring Pink Sale discount applied!');
    } else {
      setDiscountError('Invalid or expired coupon code.');
    }
  };

  const handleProcessPayment = () => {
    if (!minecraftUsername && !isGift) {
      onOpenMinecraftModal();
      return;
    }

    if (isGift && !giftRecipient.trim()) {
      alert('Please enter your friend’s Minecraft IGN to send the gift.');
      return;
    }

    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      const order = {
        orderId: `CSMP-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(),
        items: [...cartItems],
        total: totalFormatted,
        currencySymbol: curr.symbol,
        targetPlayer: isGift ? giftRecipient : (minecraftUsername || 'Player'),
        paymentMethod: selectedPayment,
        googleAccount: googleUser ? googleUser.email : 'Guest'
      };

      setOrderComplete(order);
      if (onOrderPlaced) onOrderPlaced(order);
      onClearCart();

      // Trigger colorful pink celebratory confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff2e93', '#ff75a0', '#ffffff', '#fbbf24', '#f43f5e']
        });
      } catch (e) {
        // ignore
      }
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 4, 11, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #181024 0%, #100a16 100%)',
          border: '1px solid rgba(255, 46, 147, 0.45)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(255, 46, 147, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 46, 147, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 46, 147, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ff2e93' }}>
              <img src="/ceylon-logo.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {orderComplete ? 'Payment Receipt & Confirmation' : 'Ceylon SMP Shopping Cart'}
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#ff75a0', fontWeight: 600 }}>
                {orderComplete ? 'Delivery Initiated' : `${cartItems.length} items in your order`}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
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

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {orderComplete ? (
            /* Order Success View */
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div 
                style={{ 
                  width: '68px', 
                  height: '68px', 
                  borderRadius: '50%', 
                  background: 'rgba(34, 197, 94, 0.15)', 
                  border: '2px solid #22c55e',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4ade80',
                  marginBottom: '16px'
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
                Order Completed Successfully!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '480px', margin: '0 auto 20px auto' }}>
                Thank you for supporting <strong style={{ color: '#ff75a0' }}>Ceylon SMP</strong>! Your perks are being sent to your character right now.
              </p>

              {/* Order Receipt Box */}
              <div 
                style={{
                  background: 'rgba(255, 46, 147, 0.06)',
                  border: '1px solid rgba(255, 46, 147, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'left',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Order Transaction ID:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ff75a0' }}>{orderComplete.orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Receiving In-Game Player:</span>
                  <span style={{ fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img 
                      src={`https://mc-heads.net/avatar/${orderComplete.targetPlayer}/20`} 
                      alt="" 
                      onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/20'; }}
                      style={{ width: '18px', height: '18px', borderRadius: '4px' }}
                    />
                    {orderComplete.targetPlayer}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Google Account:</span>
                  <span style={{ color: '#cbd5e1' }}>{orderComplete.googleAccount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Payment Method:</span>
                  <span style={{ textTransform: 'capitalize', color: '#cbd5e1' }}>{orderComplete.paymentMethod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', marginTop: '10px', fontSize: '1rem', fontWeight: 800 }}>
                  <span style={{ color: '#fff' }}>Total Paid:</span>
                  <span style={{ color: '#ff75a0' }}>{orderComplete.currencySymbol}{orderComplete.total}</span>
                </div>
              </div>

              <div style={{ background: '#0e0915', borderRadius: '12px', padding: '14px', marginBottom: '20px', border: '1px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                <Clock size={20} style={{ color: '#4ade80', flexShrink: 0 }} />
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <strong>In-Game Delivery Status:</strong> Connecting to Ceylon SMP socket (play.ceylonsmp.net). Expected delivery time is under 60 seconds.
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderComplete(null);
                  onClose();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                Back to Ceylon SMP Store
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
                Browse our server ranks (God, Elite+, VIP+, etc.) or crate keys to get started!
              </p>
              <button onClick={onClose} className="btn-primary" style={{ padding: '10px 20px' }}>
                Browse Catalog
              </button>
            </div>
          ) : (
            /* Active Cart Items View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Account & IGN Verification Alert */}
              <div 
                style={{
                  background: 'rgba(255, 46, 147, 0.08)',
                  border: '1px solid rgba(255, 46, 147, 0.3)',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={`https://mc-heads.net/avatar/${minecraftUsername || 'Steve'}/42`}
                    alt=""
                    onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/42'; }}
                    style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid #ff2e93' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#ff75a0', fontWeight: 700, textTransform: 'uppercase' }}>
                      Delivery Target Character:
                    </div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                      {minecraftUsername ? minecraftUsername : 'No Minecraft IGN set!'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenMinecraftModal}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Change IGN
                </button>
              </div>

              {/* Requirement: Google account display / sign in requirement in cart */}
              {!googleUser && (
                <div 
                  style={{
                    background: '#ffffff',
                    color: '#1f2937',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Sign in with Google for fast checkout</div>
                      <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Saves order receipt and links to your account</div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenGoogleAuth}
                    style={{
                      background: '#1f2937',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '7px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '8px',
                          background: item.color ? `${item.color}22` : 'rgba(255, 46, 147, 0.15)',
                          border: `1px solid ${item.color || '#ff2e93'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          color: item.color || '#ff75a0',
                          fontSize: '0.85rem'
                        }}
                      >
                        {item.type === 'rank' ? '👑' : '🗝️'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {curr.symbol}{(item.price * curr.rate).toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '2px 6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '2px' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center', color: '#fff' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '2px' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ff75a0', minWidth: '65px', textAlign: 'right' }}>
                        {curr.symbol}{((item.price * item.quantity) * curr.rate).toFixed(2)}
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. PINK20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0d0815',
                    border: '1px solid rgba(255, 46, 147, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'rgba(255, 46, 147, 0.2)',
                    border: '1px solid rgba(255, 46, 147, 0.4)',
                    color: '#ff75a0',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Apply Code
                </button>
              </form>
              {discountSuccess && <div style={{ fontSize: '0.78rem', color: '#4ade80' }}>✓ {discountSuccess}</div>}
              {discountError && <div style={{ fontSize: '0.78rem', color: '#f87171' }}>✗ {discountError}</div>}

              {/* Payment Method Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  Choose Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'card', name: 'Credit Card', icon: '💳' },
                    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                    { id: 'gpay', name: 'Google Pay', icon: '⚡' },
                    { id: 'paysafecard', name: 'Paysafe', icon: '🛡️' }
                  ].map((pm) => {
                    const isSelected = selectedPayment === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setSelectedPayment(pm.id)}
                        style={{
                          background: isSelected ? 'rgba(255, 46, 147, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1px solid #ff2e93' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          color: isSelected ? '#ffffff' : '#94a3b8',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{pm.icon}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: isSelected ? 800 : 500 }}>
                          {pm.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Totals Summary */}
              <div 
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <span>Subtotal:</span>
                  <span>{curr.symbol}{subtotalFormatted}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', color: '#4ade80' }}>
                    <span>Spring Pink Discount ({(appliedDiscount * 100).toFixed(0)}%):</span>
                    <span>-{curr.symbol}{discountFormatted}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontSize: '1.2rem', fontWeight: 900 }}>
                  <span style={{ color: '#fff' }}>Total Amount:</span>
                  <span style={{ color: '#ff75a0' }}>{curr.symbol}{totalFormatted}</span>
                </div>
              </div>

              {/* Gift to a friend toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  id="giftToggle"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  style={{ accentColor: '#ff2e93', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="giftToggle" style={{ fontSize: '0.82rem', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Gift size={14} style={{ color: '#ff75a0' }} />
                  Gift this purchase to a friend instead
                </label>
              </div>

              {isGift && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '4px' }}>
                    Recipient's Minecraft In-Game Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Friend's IGN"
                    value={giftRecipient}
                    onChange={(e) => setGiftRecipient(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0d0815',
                      border: '1px solid #ff2e93',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleProcessPayment}
                disabled={isCheckingOut}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  borderRadius: '12px'
                }}
              >
                {isCheckingOut ? (
                  <span>Connecting to Payment Gateway...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay {curr.symbol}{totalFormatted} & Deliver In-Game</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b' }}>
                🔒 256-Bit SSL Encryption • Instant delivery on Ceylon SMP within 1-5 minutes
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
