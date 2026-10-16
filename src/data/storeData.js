export const RANKS_DATA = [
  {
    id: 'god',
    name: 'GOD',
    tier: 1,
    tag: '[GOD]',
    tagColor: '#ff2e93',
    textColor: '#ffffff',
    glowColor: 'rgba(255, 46, 147, 0.6)',
    badge: 'SUPREME TIER',
    price: 34.99,
    originalPrice: 49.99,
    discount: '30% OFF',
    popular: true,
    available: true,
    description: 'The omnipotent supreme rank of Ceylon SMP. Commands respect across every realm with godlike privileges.',
    perks: [
      'Pink Celestial God Chat Tag: [GOD]',
      'Permanent Global Fly (/fly everywhere)',
      'Godmode in spawn & hubs (/god)',
      '10x Private Player Vaults (/pv 1-10)',
      '50x Set Homes (/sethome 1-50)',
      'Monthly 5x Advanced Crate Keys',
      'Exclusive God Sakura Particle Trail & Halo',
      'Instant Nickname Access (/nick with color formatting)',
      'Keep Inventory & Keep Exp enabled on death',
      'VIP Priority Queue Slot #1 (Bypass full server)',
      'Exclusive [GOD] Discord Role & Secret Channel'
    ],
    commands: ['/fly', '/god', '/feed', '/heal', '/repair all', '/workbench', '/condense', '/near', '/hat', '/pweather']
  },
  {
    id: 'elite-plus',
    name: 'ELITE+',
    tier: 2,
    tag: '[ELITE+]',
    tagColor: '#ff4d9e',
    textColor: '#ffffff',
    glowColor: 'rgba(255, 77, 158, 0.45)',
    badge: 'POPULAR CHOICE',
    price: 24.99,
    originalPrice: 34.99,
    discount: '28% OFF',
    popular: false,
    available: true,
    description: 'High-tier power with automated survival conveniences and high-tier crate privileges.',
    perks: [
      'Rose Pink Chat Tag: [ELITE+]',
      'Global Fly (/fly) in Survival & Hubs',
      'Instant Auto-Heal & Saturation (/heal & /feed)',
      '8x Private Player Vaults (/pv 1-8)',
      '35x Set Homes (/sethome 1-35)',
      'Monthly 3x Advanced Crate Keys',
      'Rose Sparkle Particle Aura',
      'Colored Nickname formatting (/nick)',
      'Priority Server Queue (Tier 2)',
      'Elite+ Discord Role & Emote perks'
    ],
    commands: ['/fly', '/heal', '/feed', '/repair', '/workbench', '/hat', '/condense', '/near']
  },
  {
    id: 'elite',
    name: 'ELITE',
    tier: 3,
    tag: '[ELITE]',
    tagColor: '#ff66b2',
    textColor: '#ffffff',
    glowColor: 'rgba(255, 102, 178, 0.4)',
    badge: 'HIGH TIER',
    price: 17.99,
    originalPrice: 24.99,
    discount: '28% OFF',
    popular: false,
    available: true,
    description: 'For dedicated players who want flight privileges and superior survival utility.',
    perks: [
      'Vibrant Fuchsia Chat Tag: [ELITE]',
      'Fly in Lobby & Hub Realms (/fly)',
      'Hand Item Repair (/repair hand)',
      '6x Private Player Vaults (/pv 1-6)',
      '25x Set Homes (/sethome 1-25)',
      'Monthly 2x Advanced Crate Keys',
      'Fuchsia Heart Particle Effect',
      'Auto-Smelt toggle (/autosmelt)',
      'Priority Server Queue (Tier 3)',
      'Elite Discord Role'
    ],
    commands: ['/fly', '/repair', '/workbench', '/hat', '/near', '/feed']
  },
  {
    id: 'vip-plus',
    name: 'VIP+',
    tier: 4,
    tag: '[VIP+]',
    tagColor: '#ff80bf',
    textColor: '#ffffff',
    glowColor: 'rgba(255, 128, 191, 0.35)',
    badge: 'VALUE PICK',
    price: 12.99,
    originalPrice: 17.99,
    discount: '27% OFF',
    popular: false,
    available: true,
    description: 'Upgraded VIP with extra storage, portable crafting, and monthly cosmic keys.',
    perks: [
      'Bright Pink Chat Tag: [VIP+]',
      'Instant Saturation Fill (/feed)',
      'Wear any item as Hat (/hat)',
      '5x Private Player Vaults (/pv 1-5)',
      '15x Set Homes (/sethome 1-15)',
      'Monthly 4x Cosmic Crate Keys',
      'Star Dust Footstep particles',
      'Portable Crafting Table (/craft /wb)',
      'Priority Server Queue (Tier 4)',
      'VIP+ Discord Role'
    ],
    commands: ['/feed', '/hat', '/craft', '/near', '/ptime']
  },
  {
    id: 'vip',
    name: 'VIP',
    tier: 5,
    tag: '[VIP]',
    tagColor: '#ff99cc',
    textColor: '#1a101d',
    glowColor: 'rgba(255, 153, 204, 0.3)',
    badge: 'COMMUNITY FAVORITE',
    price: 8.99,
    originalPrice: 11.99,
    discount: '25% OFF',
    popular: false,
    available: true,
    description: 'The classic supporter rank with vital quality-of-life perks and inventory storage.',
    perks: [
      'Soft Pink Chat Tag: [VIP]',
      'Player Radar Scanner (/near)',
      'Portable Crafting Table (/workbench)',
      '3x Private Player Vaults (/pv 1-3)',
      '10x Set Homes (/sethome 1-10)',
      'Monthly 2x Cosmic Crate Keys',
      'Pink Bubble Particle Aura',
      'Join during soft whitelist events',
      'VIP Discord Role'
    ],
    commands: ['/near', '/workbench', '/craft', '/pweather']
  },
  {
    id: 'pro',
    name: 'PRO',
    tier: 6,
    tag: '[PRO]',
    tagColor: '#ffb3d9',
    textColor: '#1a101d',
    glowColor: 'rgba(255, 179, 217, 0.25)',
    badge: 'PRO SUPPORTER',
    price: 5.99,
    originalPrice: 7.99,
    discount: '25% OFF',
    popular: false,
    available: true,
    description: 'Essential perks for active builders and grinders looking to organize resources quickly.',
    perks: [
      'Pastel Rose Chat Tag: [PRO]',
      'Quick Block Condensing (/condense)',
      '2x Private Player Vaults (/pv 1-2)',
      '7x Set Homes (/sethome 1-7)',
      'Monthly 3x Casino Crate Keys',
      'Sparkle Particle trail',
      'Disposal Trash Bin (/trash)',
      'Pro Discord Role'
    ],
    commands: ['/condense', '/trash', '/craft']
  },
  {
    id: 'youtube',
    name: 'YOUTUBE',
    tier: 7,
    tag: '[YOUTUBE]',
    tagColor: '#ff1744',
    textColor: '#ffffff',
    glowColor: 'rgba(255, 23, 68, 0.45)',
    badge: 'CREATOR RANK',
    price: 14.99,
    originalPrice: 19.99,
    discount: '25% OFF',
    popular: false,
    available: true,
    description: 'Official Content Creator rank! Promote your streams, videos, and build your Ceylon SMP fanbase.',
    perks: [
      'Iconic Crimson & Pink Tag: [YOUTUBE]',
      'Server-Wide Stream Broadcast (/stream <url>)',
      'Broadcast video drops (/shout <msg>)',
      'Direct link permissions in chat',
      'Replay Mod recording permissions',
      'Monthly 4x Cosmic Crate Keys',
      'Creator Golden Camera Particle Aura',
      'Access to Creator Discord Channels & Bot shoutouts',
      'Priority Server Queue (Bypass limit)'
    ],
    commands: ['/stream', '/shout', '/fly', '/nick', '/workbench', '/trash']
  },
  {
    id: 'noob',
    name: 'NOOB',
    tier: 8,
    tag: '[NOOB]',
    tagColor: '#fecdd3',
    textColor: '#831843',
    glowColor: 'rgba(254, 205, 211, 0.25)',
    badge: 'CUTE STARTER',
    price: 2.99,
    originalPrice: 3.99,
    discount: '25% OFF',
    popular: false,
    available: true,
    description: 'The most adorable starter donor rank! Support the server and flex the cute Noob status.',
    perks: [
      'Cute Baby Pink Tag: [NOOB]',
      'Full Iron Armor Starter Kit (/kit noob)',
      'Custom Colored Chat Access (&d, &f, &7)',
      '1x Private Player Vault (/pv 1)',
      '3x Set Homes (/sethome 1-3)',
      'Monthly 2x Wander Crate Keys',
      'Heart Particle when sneaking',
      'Virtual Trash Bin (/trash)',
      'Supporter Discord Role'
    ],
    commands: ['/kit noob', '/trash', '/sethome']
  }
];

export const CRATES_DATA = [
  {
    id: 'advanced',
    name: 'Advanced Crates',
    tier: 1,
    tag: 'MYTHIC TIER',
    badge: 'MOST POWERFUL',
    accentColor: '#ff2e93',
    bgGradient: 'linear-gradient(135deg, rgba(255, 46, 147, 0.2) 0%, rgba(20, 10, 25, 0.9) 100%)',
    borderColor: 'rgba(255, 46, 147, 0.5)',
    available: true,
    description: 'The pinnacle of Ceylon SMP treasure chests. Contains mythical god weapons, flight vouchers, and game-changing gear.',
    lootPreview: [
      { name: 'Mythic Ceylon God Sword (Sharpness VII, Fire Aspect III)', rarity: 'Mythic', chance: '3%', color: '#ff2e93' },
      { name: 'God Netherite Armor Set (Protection V, Mending)', rarity: 'Legendary', chance: '7%', color: '#f43f5e' },
      { name: '30-Day Server Fly Voucher (/fly)', rarity: 'Legendary', chance: '10%', color: '#fb7185' },
      { name: 'Sakura Angel Pink Particle Wings', rarity: 'Epic', chance: '15%', color: '#e879f9' },
      { name: '100,000 Ceylon Server Economy Coins', rarity: 'Epic', chance: '20%', color: '#fbbf24' },
      { name: '3x Cosmic Crate Keys Voucher', rarity: 'Rare', chance: '25%', color: '#38bdf8' },
      { name: '32x Enchanted Golden Apples & Totems', rarity: 'Common', chance: '20%', color: '#a3e635' }
    ],
    keyTiers: [
      { count: 1, label: '1 Key', price: 4.99, originalPrice: 4.99, tag: 'Starter' },
      { count: 5, label: '5 Keys', price: 19.99, originalPrice: 24.95, tag: 'Save 20%' },
      { count: 10, label: '10 Keys', price: 34.99, originalPrice: 49.90, tag: 'Popular (Save 30%)' },
      { count: 20, label: '20 Keys', price: 59.99, originalPrice: 99.80, tag: 'Best Value (Save 40%)' }
    ]
  },
  {
    id: 'cosmic',
    name: 'Cosmic Crates',
    tier: 2,
    tag: 'CELESTIAL TIER',
    badge: 'HIGH VALUE',
    accentColor: '#d946ef',
    bgGradient: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2) 0%, rgba(18, 12, 28, 0.9) 100%)',
    borderColor: 'rgba(217, 70, 239, 0.45)',
    available: true,
    description: 'Forged from fallen stars in the Ceylon nebula. Unlocks celestial bows, monster spawners, and cosmic enchants.',
    lootPreview: [
      { name: 'Celestial Star Bow (Power VI, Infinity, Flame)', rarity: 'Legendary', chance: '5%', color: '#d946ef' },
      { name: 'Blaze / Iron Golem Mob Spawner Box', rarity: 'Legendary', chance: '8%', color: '#f43f5e' },
      { name: 'Cosmic Galaxy Particle Boots', rarity: 'Epic', chance: '14%', color: '#a855f7' },
      { name: '50,000 Ceylon Server Economy Coins', rarity: 'Epic', chance: '22%', color: '#fbbf24' },
      { name: '64x Bottle o Enchanting & XP Boost (2x)', rarity: 'Rare', chance: '26%', color: '#38bdf8' },
      { name: 'Diamond Block x32 + Netherite Ingot x4', rarity: 'Common', chance: '25%', color: '#a3e635' }
    ],
    keyTiers: [
      { count: 1, label: '1 Key', price: 3.49, originalPrice: 3.49, tag: 'Starter' },
      { count: 5, label: '5 Keys', price: 14.99, originalPrice: 17.45, tag: 'Save 15%' },
      { count: 10, label: '10 Keys', price: 24.99, originalPrice: 34.90, tag: 'Popular (Save 28%)' },
      { count: 20, label: '20 Keys', price: 42.99, originalPrice: 69.80, tag: 'Best Value (Save 38%)' }
    ]
  },
  {
    id: 'casino',
    name: 'Casino Crates',
    tier: 3,
    tag: 'HIGH ROLLER',
    badge: 'BIG JACKPOTS',
    accentColor: '#f43f5e',
    bgGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(22, 10, 20, 0.9) 100%)',
    borderColor: 'rgba(244, 63, 94, 0.45)',
    available: true,
    description: 'Feeling lucky? Spin the high-stakes wheel for massive economy multipliers, rank vouchers, and surprise mystery loot.',
    lootPreview: [
      { name: 'Jackpot Mystery Rank Voucher (Random VIP - GOD!)', rarity: 'Jackpot', chance: '4%', color: '#f59e0b' },
      { name: '5x Economy Multiplier Booster (24 Hours)', rarity: 'Legendary', chance: '9%', color: '#f43f5e' },
      { name: 'High-Roller Casino Crown Cosmetic', rarity: 'Epic', chance: '15%', color: '#ec4899' },
      { name: '75,000 Ceylon Casino Chip Coins', rarity: 'Epic', chance: '20%', color: '#fbbf24' },
      { name: '2x Advanced Crate Keys Token', rarity: 'Rare', chance: '22%', color: '#38bdf8' },
      { name: 'Slot Machine Mystery Box', rarity: 'Common', chance: '30%', color: '#a3e635' }
    ],
    keyTiers: [
      { count: 1, label: '1 Key', price: 2.49, originalPrice: 2.49, tag: 'Single Spin' },
      { count: 5, label: '5 Keys', price: 9.99, originalPrice: 12.45, tag: 'Save 20%' },
      { count: 10, label: '10 Keys', price: 17.99, originalPrice: 24.90, tag: 'Lucky 10 (Save 28%)' },
      { count: 20, label: '20 Keys', price: 29.99, originalPrice: 49.80, tag: 'Jackpot Pack (Save 40%)' }
    ]
  },
  {
    id: 'wander',
    name: 'Wander Crates',
    tier: 4,
    tag: 'EXPLORER TIER',
    badge: 'ADVENTURER',
    accentColor: '#fb7185',
    bgGradient: 'linear-gradient(135deg, rgba(251, 113, 133, 0.15) 0%, rgba(18, 12, 22, 0.9) 100%)',
    borderColor: 'rgba(251, 113, 133, 0.35)',
    available: true,
    description: 'Designed for wilderness explorers and builders! Packed with elytra rockets, building bundles, tools, and starter wealth.',
    lootPreview: [
      { name: 'Unbreakable Elytra Wings (Unbreaking IV, Mending)', rarity: 'Legendary', chance: '6%', color: '#fb7185' },
      { name: 'Super Charged Firework Rocket Bundle (x512)', rarity: 'Epic', chance: '16%', color: '#e879f9' },
      { name: 'Master Builder Quartz & Prismarine Palette Box', rarity: 'Epic', chance: '20%', color: '#38bdf8' },
      { name: 'Diamond Tools Survival Toolkit (Efficiency V)', rarity: 'Rare', chance: '25%', color: '#a3e635' },
      { name: '15,000 Ceylon Server Economy Coins', rarity: 'Common', chance: '33%', color: '#fbbf24' }
    ],
    keyTiers: [
      { count: 1, label: '1 Key', price: 1.49, originalPrice: 1.49, tag: 'Explorer Key' },
      { count: 5, label: '5 Keys', price: 5.99, originalPrice: 7.45, tag: 'Save 20%' },
      { count: 10, label: '10 Keys', price: 9.99, originalPrice: 14.90, tag: 'Save 33%' },
      { count: 20, label: '20 Keys', price: 16.99, originalPrice: 29.80, tag: 'Best Value (Save 43%)' }
    ]
  }
];

export const DEFAULT_SITE_CONFIG = {
  serverName: 'Ceylon SMP',
  serverIp: 'play.ceylonsmp.net',
  playersOnline: 248,
  saleBannerActive: true,
  saleTitle: 'SPRING PINK SALE IS LIVE!',
  saleDiscountText: 'UP TO 40% OFF',
  saleCouponCode: 'PINK20',
  saleCountdownDays: 18,
  discordWidgetId: '1518561012452819045',
  maintenanceMode: false
};

export const DEFAULT_COUPONS = [
  { id: 'c1', code: 'PINK20', discount: 20, active: true, desc: 'Spring Pink Sale 20% Off' },
  { id: 'c2', code: 'CEYLON15', discount: 15, active: true, desc: 'Ceylon Community 15% Off' },
  { id: 'c3', code: 'OWNER50', discount: 50, active: true, desc: 'VIP Admin 50% Off' }
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', icon: 'credit-card', providers: ['Visa', 'Mastercard', 'Amex'] },
  { id: 'paypal', name: 'PayPal', icon: 'paypal', providers: ['PayPal Balance', 'Pay in 4'] },
  { id: 'applepay', name: 'Apple Pay', icon: 'apple', providers: ['One-touch checkout'] },
  { id: 'googlepay', name: 'Google Pay', icon: 'google', providers: ['Instant GPay'] },
  { id: 'paysafecard', name: 'Paysafecard', icon: 'shield-check', providers: ['Prepaid vouchers'] },
  { id: 'crypto', name: 'Cryptocurrency', icon: 'coins', providers: ['BTC', 'ETH', 'USDT', 'SOL'] }
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD ($)' },
  AUD: { symbol: 'AU$', rate: 1.52, label: 'AUD ($)' },
  LKR: { symbol: 'Rs ', rate: 305, label: 'LKR (Rs)' }
};

export const RECENT_PURCHASES = [
  { player: 'SakuraKnight', item: 'GOD Rank', time: '2 minutes ago', avatar: 'https://mc-heads.net/avatar/SakuraKnight/48' },
  { player: 'DragonSlayer_99', item: '20x Advanced Keys', time: '6 minutes ago', avatar: 'https://mc-heads.net/avatar/DragonSlayer_99/48' },
  { player: 'PinkLotus', item: 'ELITE+ Rank', time: '14 minutes ago', avatar: 'https://mc-heads.net/avatar/PinkLotus/48' },
  { player: 'ColomboCrafter', item: '10x Cosmic Keys', time: '21 minutes ago', avatar: 'https://mc-heads.net/avatar/ColomboCrafter/48' },
  { player: 'KandyKing', item: 'Casino 20 Keys Pack', time: '35 minutes ago', avatar: 'https://mc-heads.net/avatar/KandyKing/48' },
  { player: 'NoobMaster42', item: 'NOOB Rank', time: '48 minutes ago', avatar: 'https://mc-heads.net/avatar/NoobMaster42/48' }
];

export const FAQS = [
  {
    q: 'How long does it take to receive my ranks or crate keys after paying?',
    a: 'All purchases on Ceylon SMP are automated via our server socket integration. In 99% of cases, your rank permissions or crate keys will be delivered in-game within 30 to 90 seconds. Please make sure you are online on the server (play.ceylonsmp.net) or your inventory has free space!'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major Credit and Debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, Paysafecard, and popular cryptocurrencies. All transactions are protected with 256-bit SSL encryption and verified fraud protection.'
  },
  {
    q: 'Can I upgrade my rank later and only pay the difference?',
    a: 'Yes! If you already hold a rank like VIP or Elite, you can upgrade to God or Elite+ by only paying the difference between the ranks during checkout.'
  },
  {
    q: 'Can I gift a rank or crate keys to a friend?',
    a: 'Absolutely! In the checkout modal, simply toggle the "Gift to a Friend" switch and input your friend\'s exact Minecraft in-game name. They will receive the perks directly!'
  },
  {
    q: 'Do you support both Java and Bedrock editions?',
    a: 'Yes! Ceylon SMP supports both Java Edition (PC/Mac) and Bedrock Edition (Mobile/Xbox/PlayStation/Switch). For Bedrock players, prepend your username with an asterisk or enter your exact Gamertag.'
  }
];
