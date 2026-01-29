import React, { useState } from 'react';
import { Search, Home, User, Bell, Heart, MessageCircle, Send, ArrowRight } from 'lucide-react';

// --- Color Palette Constants ---
const COLORS = {
  olive: '#434D41',       // Deep Olive Green (Primary)
  terracotta: '#A89B8D',  // Pale Terracotta (Secondary)
  labWhite: '#F2F0EA',    // Laboratory White (Background)
  matteBlack: '#1E1E1E',  // Matte Black (Text/Structure)
  concrete: '#8C8883',    // Concrete Grey (Texture/bg)
  amber: '#BF8D58',       // Amber (Liquids/Highlights)
  brass: '#AF9A73',       // Brass Oxidation (Details)
};

// --- Custom Component: Six Petal Firework Icon ---
const RoamFlowerIcon = ({ size = 24, filledCount = 6, color = COLORS.olive, emptyColor = 'transparent', strokeColor = COLORS.olive }) => {
  const petals = [0, 60, 120, 180, 240, 300]; 

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(12, 12)">
        {petals.map((angle, index) => (
          <g key={index} transform={`rotate(${angle})`}>
            <line 
              x1="0" 
              y1="-4" 
              x2="0" 
              y2="-10" 
              stroke={index < filledCount ? color : (emptyColor === 'transparent' ? 'none' : emptyColor)}
              strokeWidth="2" 
              strokeLinecap="round"
            />
            {index >= filledCount && (
               <line 
               x1="0" 
               y1="-4" 
               x2="0" 
               y2="-10" 
               stroke={strokeColor}
               strokeWidth="1" 
               strokeLinecap="round"
               opacity="0.3"
             />
            )}
          </g>
        ))}
        <circle cx="0" cy="0" r="2" fill={COLORS.terracotta} />
      </g>
    </svg>
  );
};

// --- Component: Bottom Navigation ---
const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div 
      className="fixed bottom-0 w-full max-w-md bg-opacity-95 backdrop-blur-sm border-t h-20 flex justify-around items-center z-50 px-4 pb-2"
      style={{ 
        backgroundColor: COLORS.labWhite, 
        borderColor: COLORS.terracotta,
        color: COLORS.matteBlack
      }}
    >
      <button 
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'opacity-100' : 'opacity-50'}`}
      >
        <Home size={24} color={activeTab === 'home' ? COLORS.olive : COLORS.concrete} />
        <span className="text-[10px] font-sans tracking-widest uppercase mt-1">Home</span>
      </button>

      <button 
        onClick={() => setActiveTab('roam')}
        className={`flex flex-col items-center gap-1 -mt-6 ${activeTab === 'roam' ? 'opacity-100' : 'opacity-70'}`}
      >
        <div 
          className="p-3 rounded-full shadow-lg transition-transform transform active:scale-95"
          style={{ backgroundColor: COLORS.labWhite, border: `1px solid ${COLORS.terracotta}` }}
        >
          <RoamFlowerIcon size={32} filledCount={6} color={COLORS.amber} strokeColor={COLORS.matteBlack} />
        </div>
        <span className="text-[10px] font-sans tracking-widest font-bold uppercase mt-1" style={{ color: COLORS.olive }}>Roam</span>
      </button>

      <button 
        onClick={() => setActiveTab('roamie')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'roamie' ? 'opacity-100' : 'opacity-50'}`}
      >
        <User size={24} color={activeTab === 'roamie' ? COLORS.olive : COLORS.concrete} />
        <span className="text-[10px] font-sans tracking-widest uppercase mt-1">Roamie</span>
      </button>
    </div>
  );
};

// --- Avatar Mapping ---
const AVATARS = {
  'Hannah': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  'Sheldon': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 
  'Amy': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
};

// --- Component: User Header (Avatar) ---
const UserHeader = ({ name, id, petalsLit }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif text-lg border border-opacity-20 border-black overflow-hidden shadow-sm">
       <img 
         src={AVATARS[name] || AVATARS['Hannah']} 
         alt={name} 
         className="w-full h-full object-cover" 
       />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-serif text-base font-bold leading-none" style={{ color: COLORS.olive }}>{name}</span>
        <RoamFlowerIcon size={14} filledCount={petalsLit} color={COLORS.amber} strokeColor={COLORS.terracotta} />
      </div>
    </div>
    <button className="opacity-40 hover:opacity-100 transition-opacity">
      <div className="w-1 h-1 bg-black rounded-full mb-1"></div>
      <div className="w-1 h-1 bg-black rounded-full mb-1"></div>
      <div className="w-1 h-1 bg-black rounded-full"></div>
    </button>
  </div>
);

// --- Component: Feed Post (Roamie) ---
const RoamiePostCard = ({ user, date, content, imageUrl, imageCaption, likes }) => (
  <div className="mb-12 relative border-b border-stone-200 pb-6 last:border-0">
    <div className="px-1">
      <UserHeader name={user.name} id={user.id} petalsLit={user.petals} />
    </div>
    <div 
      className="w-full aspect-video rounded-sm mb-3 flex items-center justify-center relative overflow-hidden shadow-sm group"
    >
      <img src={imageUrl} alt="post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply"></div> 
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-serif italic text-white text-opacity-90 text-2xl font-light tracking-widest drop-shadow-md">
          {imageCaption}
        </span>
      </div>
    </div>
    <div className="flex justify-between items-center mb-3 px-1">
      <div className="flex gap-4">
        <Heart size={22} color={COLORS.matteBlack} strokeWidth={1.5} />
        <MessageCircle size={22} color={COLORS.matteBlack} strokeWidth={1.5} />
        <Send size={22} color={COLORS.matteBlack} strokeWidth={1.5} />
      </div>
      <div className="flex items-center gap-1 opacity-60">
        <RoamFlowerIcon size={16} filledCount={6} color={COLORS.terracotta} strokeColor={COLORS.terracotta} />
        <span className="text-xs font-sans tracking-wide" style={{ color: COLORS.olive }}>{likes} likes</span>
      </div>
    </div>
    <div className="px-1">
      <div className="mb-1">
        <span className="font-bold font-serif text-sm mr-2" style={{ color: COLORS.olive }}>{user.name}</span>
        <span className="font-serif text-sm leading-relaxed whitespace-pre-line" style={{ color: COLORS.matteBlack }}>
          {content}
        </span>
      </div>
      <div className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-sans" style={{ color: COLORS.concrete }}>
        {date} • Via Roamie App
      </div>
    </div>
  </div>
);

// --- Component: Activity Card (Roam) ---
const ActivityCard = ({ title, subTitle, time, address, imageUrl, capacity, current }) => (
  <div className="mb-6 relative h-64 rounded-xl overflow-hidden shadow-md group">
    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
       <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
       <div className="absolute inset-0 bg-stone-900 opacity-30 mix-blend-multiply"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
    </div>

    <div className="relative h-full p-5 flex flex-col justify-between text-white">
       <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-3xl italic tracking-tight leading-none text-white opacity-95 shadow-sm">
              {title}
            </h3>
            <p className="font-sans mt-2 opacity-80 uppercase tracking-widest text-[10px] text-stone-200">
              {subTitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2" />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeDasharray="125" 
                  strokeDashoffset={125 - (current / capacity) * 125} 
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-sans opacity-90">
                {current}/{capacity}
              </div>
            </div>
            <span className="text-[9px] font-sans uppercase tracking-wider opacity-70">Slots</span>
          </div>
       </div>

       <div className="flex items-end justify-between">
          <div className="space-y-1 text-sm opacity-90 drop-shadow-sm">
             <p className="font-sans text-xs tracking-wide"><span className="text-[9px] uppercase opacity-60 mr-2 text-stone-300">Time</span>{time}</p>
             <p className="font-sans text-xs tracking-wide"><span className="text-[9px] uppercase opacity-60 mr-2 text-stone-300">Loc</span>{address}</p>
          </div>

          <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-sm text-xs font-sans uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
            Reserve Spot
          </button>
       </div>
    </div>
  </div>
);

// --- Component: Hero Home Section ---
const HomeSection = () => (
  <div className="pb-8">
    <div className="relative w-full h-[500px] mb-8 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80" 
        alt="Aesop Atmosphere" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
        <h2 className="text-5xl font-serif text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
          Wander<br/>Listen<br/><span className="italic">and Be Whole</span>
        </h2>
        <div className="w-16 h-px bg-white mb-6 opacity-60"></div>
        <p className="text-white text-sm font-serif tracking-widest opacity-90 mb-8">
          Where there's Aesop<br/>there's belief
        </p>
        <button className="text-white border border-white px-6 py-2 text-xs font-sans uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
           Come and roam with us.
        </button>
      </div>
    </div>

    <div className="px-8 text-center mb-12">
      <p className="font-serif text-2xl leading-snug italic mb-4" style={{ color: COLORS.matteBlack }}>
        "Scent is the last memory to fade."
      </p>
      <p className="font-serif text-sm text-gray-500 leading-relaxed">
        Our fragrances are complex, distinctive, and devoid of gender. <br/>
        An olfactory expedition into the <span className="italic text-black">Unknown</span>.
      </p>
    </div>

    <div className="mx-4 border border-stone-200 p-6 relative bg-white shadow-sm">
       <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 text-[10px] font-sans uppercase tracking-widest">
         Signature Scent
       </div>
       <div className="flex flex-col items-center">
         <div className="w-full h-64 mb-6 overflow-hidden rounded-sm relative">
             <img src="https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&w=600&q=80" alt="Dried Botanicals Art" className="object-cover w-full h-full" />
         </div>
         
         <h3 className="font-serif text-lg font-bold tracking-wide uppercase mb-1" style={{ color: COLORS.olive }}>
           Gloam Eau de Parfum
         </h3>
         <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-4">
           Floral • Spicy • Green
         </p>
         <p className="text-center text-sm font-serif italic text-gray-600 mb-6 leading-relaxed">
           Mimosa, Saffron, Iris. <br/>
           A horizontal portal to self-observation.
         </p>
         <button className="flex items-center gap-2 border-b border-black pb-1 text-xs font-sans uppercase tracking-widest hover:opacity-50 transition-opacity">
           Discover Notes <ArrowRight size={12}/>
         </button>
       </div>
    </div>

    <div className="mt-16 px-10 text-center mb-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">
        Olfactory Philosophy
      </p>
      <div className="w-px h-8 bg-black mx-auto my-4 opacity-20"></div>
      <p className="font-serif italic text-xs text-gray-500">
        Inhale silence, exhale narrative.
      </p>
    </div>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Updated Data with STRICTLY NO BOTTLES
  const posts = [
    {
      id: 1,
      user: { name: 'Hannah', id: '123456', petals: 3 },
      date: 'NOVEMBER 3',
      // Concrete/Stone Texture
      imageUrl: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'Texture & Silence',
      content: "The silence of the store this morning. Light hits the raw concrete wall—a visual echo of our base notes.",
      likes: 84
    },
    {
      id: 2,
      user: { name: 'Sheldon', id: '987654', petals: 6 },
      date: 'NOVEMBER 2',
      // Abstract Amber/Gold Fluid Texture (Abstract, No Bottles)
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'Amber Refraction',
      content: "Study of light refraction through amber resin. It protects the stability of the botanical formulations inside.",
      likes: 245
    },
    {
      id: 3,
      user: { name: 'Amy', id: '456789', petals: 4 },
      date: 'OCTOBER 31',
      // Green Leaf 
      imageUrl: 'https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'Verdant Notes',
      content: "Crushed Basil. The sharp, green top note of Tacit. A memory of summer in Kyoto.",
      likes: 156
    }
  ];

  const activities = [
    { 
      id: 1, 
      title: 'Scent Mapping', 
      subTitle: 'Olfactory Workshop', 
      time: 'Sep. 8th 14:00-16:00',
      address: 'Aesop Aoyama, Tokyo',
      current: 12, 
      capacity: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Incense Rituals', 
      subTitle: 'Aromatherapy Session', 
      time: 'Sep. 12th 18:30-20:00',
      address: 'Aesop Shibuya, Tokyo',
      current: 48, 
      capacity: 50, 
      // Abstract Smoke/Incense (No Bottles)
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      title: 'The Fabulist', 
      subTitle: 'Scent & Literature', 
      time: 'Sep. 15th 19:00-21:00',
      address: 'Aesop Nakameguro',
      current: 5, 
      capacity: 30, 
      imageUrl: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  const renderHeader = () => {
    if (activeTab === 'roamie') {
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif text-lg border border-opacity-10 border-black shadow-sm overflow-hidden">
             <img src={AVATARS['Hannah']} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight italic" style={{ color: COLORS.olive }}>
              Hannah
            </h1>
            <p className="text-[10px] font-sans uppercase tracking-widest opacity-50">
              ID: 123456
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight italic" style={{ color: COLORS.olive }}>
          {activeTab === 'home' ? 'Aesop.' : 'Events'}
        </h1>
        <p className="text-[10px] font-sans uppercase tracking-widest opacity-50 mt-1">
          {activeTab === 'home' ? 'Fragrance & Art' : 'Curated Experiences'}
        </p>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen font-sans selection:bg-stone-200"
      style={{ backgroundColor: COLORS.labWhite, color: COLORS.matteBlack }}
    >
      <style>{`
        .font-serif { font-family: "Times New Roman", "Georgia", "Garamond", "Baskerville", serif !important; }
        .font-sans { font-family: "Helvetica Neue", "Arial", "SF Pro Text", "Futura", sans-serif !important; }
      `}</style>

      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden flex flex-col bg-white">
        
        <header className="pt-12 pb-3 px-5 flex justify-between items-end sticky top-0 z-40 border-b border-opacity-10 border-black bg-opacity-95 backdrop-blur-md" 
          style={{ backgroundColor: COLORS.labWhite }}>
           {renderHeader()}
           <div className="flex gap-4 mb-2 opacity-80">
              <Search color={COLORS.matteBlack} size={20} strokeWidth={1.5} />
              <Bell color={COLORS.matteBlack} size={20} strokeWidth={1.5} />
           </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 bg-opacity-50" style={{ backgroundColor: COLORS.labWhite }}>
          
          {activeTab === 'home' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <HomeSection />
            </div>
          )}

          {activeTab === 'roam' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 pt-6 px-5">
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {['All Cities', 'Workshops', 'Seasonal'].map((filter, i) => (
                  <button 
                    key={i}
                    className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider border whitespace-nowrap transition-colors ${i === 0 ? 'text-white' : 'bg-transparent'}`}
                    style={{ 
                      backgroundColor: i === 0 ? COLORS.olive : 'transparent',
                      borderColor: COLORS.olive,
                      color: i === 0 ? 'white' : COLORS.olive
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {activities.map(activity => (
                  <ActivityCard key={activity.id} {...activity} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roamie' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 pt-4 px-4">
               {posts.map(post => (
                 <RoamiePostCard key={post.id} {...post} />
               ))}
               <div className="text-center py-8 opacity-40">
                 <RoamFlowerIcon size={24} filledCount={0} color={COLORS.concrete} strokeColor={COLORS.concrete} />
                 <p className="mt-2 text-xs font-serif italic">End of Journal</p>
               </div>
            </div>
          )}

        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        
      </div>
    </div>
  );
}