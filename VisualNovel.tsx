import React, { useEffect, useRef, useState } from 'react';
import { GameState, Choice } from '../types';
import { Heart, RefreshCw, Lock, Gift, X, ChevronRight, Eye } from 'lucide-react';

interface VisualNovelProps {
  gameState: GameState;
  onChoice: (choice: Choice) => void;
  onRestart: () => void;
  onSecretBack: () => void;
  bgImage: string;
  activePopup: string | null;
  onNextPopup: () => void;
}

export const CHARACTER_PROFILES: Record<string, string> = {
  'Erlina': 'https://i.ibb.co.com/tpr5qV64/storyforge-photo-resizer-1770228703036.jpg',
  'Mama': 'https://i.ibb.co.com/v4kyBPBF/storyforge-photo-resizer-1770228671793.jpg',
  'Om Rudi': 'https://i.ibb.co.com/m5xNS0Km/storyforge-photo-resizer-1770228638004.jpg',
  'Lingerie': 'https://i.ibb.co.com/tTrm0C7d/storyforge-photo-resizer-1770229297472.jpg',
  'Erlina (Lingerie)': 'https://i.ibb.co.com/1fsfFhC9/storyforge-photo-resizer-1770228787769.jpg',
  'Erlina Basah': 'https://i.ibb.co.com/7xNSQY22/storyforge-photo-resizer-1770227914253.jpg',
  'Sentuhan Wajah': 'https://i.ibb.co.com/B5s1KfCL/storyforge-photo-resizer-1770229433400.jpg',
  'Pelukan Akhir': 'https://i.ibb.co.com/1JKb1tGj/storyforge-photo-resizer-1770229473461.jpg',
  'Foto Keluarga': 'https://i.ibb.co.com/Rk86nkqG/storyforge-photo-resizer-1770228132033.jpg',
  'Ruang Tengah Berdua': 'https://i.ibb.co.com/21yTr0pF/Untitled4-20260205011253.jpg',
  'Di Bawah Selimut': 'https://i.ibb.co.com/WN9cWMWY/storyforge-photo-resizer-1770228105983.jpg',
  'Hujan Jendela': 'https://i.ibb.co.com/hRKn3vsd/storyforge-photo-resizer-1770228053895.jpg'
};

const INVENTORY_IMAGE_MAP: Record<string, string> = {
  'Foto Erlina': 'Erlina',
  'Foto Mama': 'Mama',
  'Foto Om Rudi': 'Om Rudi',
  'Foto Lingerie': 'Lingerie',
  'Foto Erlina Lingerie': 'Erlina (Lingerie)',
  'Foto Keluarga': 'Foto Keluarga'
};

// List of popups that should NOT display text caption
const NO_TEXT_POPUPS = [
  'Erlina Basah', 
  'Sentuhan Wajah', 
  'Pelukan Akhir',
  'Hujan Jendela',
  'Ruang Tengah Berdua',
  'Di Bawah Selimut'
];

export const VisualNovel: React.FC<VisualNovelProps> = ({ 
  gameState, 
  onChoice, 
  onRestart, 
  onSecretBack, 
  bgImage,
  activePopup,
  onNextPopup
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  
  // Notification State
  const [hasNotification, setHasNotification] = useState(false);
  const prevPopupRef = useRef<string | null>(null);
  
  // Local state for viewing images from inventory
  const [viewingInventoryImage, setViewingInventoryImage] = useState<string | null>(null);
  
  // Image Loading State for Popups
  const [isPopupImageLoaded, setIsPopupImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Ending Typewriter State
  const [endingTextDisplayed, setEndingTextDisplayed] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  // Scroll to top on new text (Standard Mode)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [gameState.currentText]);

  // Logic to trigger notification when intro/scene popup CLOSES
  useEffect(() => {
    // If we had a popup before, and now it's null, it means the popup sequence just finished.
    if (prevPopupRef.current !== null && activePopup === null) {
      setHasNotification(true);
    }
    prevPopupRef.current = activePopup;
  }, [activePopup]);

  // Reset logic when entering ending mode
  useEffect(() => {
    if (gameState.isEnding) {
      setCurrentParagraphIndex(0);
      setEndingTextDisplayed('');
      setIsTypingComplete(false);
    }
  }, [gameState.isEnding]);

  // Typewriter Logic (Ending Mode - Paragraph based)
  useEffect(() => {
    if (gameState.isEnding) {
      // Split text by double newlines to get paragraphs
      const paragraphs = gameState.currentText.split(/\n\n+/);
      const currentParagraph = paragraphs[currentParagraphIndex] || "";

      // Initialize
      setEndingTextDisplayed('');
      setIsTypingComplete(false);
      
      let localIndex = 0;
      const typingSpeed = 25; // ms per char

      const typingInterval = setInterval(() => {
        // Use localIndex < length to determine if we should continue
        if (localIndex < currentParagraph.length) {
          localIndex++;
          // FIX: Use slice(0, localIndex) instead of appending char-by-char.
          // This prevents missing letters due to state update batching/lag.
          setEndingTextDisplayed(currentParagraph.slice(0, localIndex));
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [gameState.isEnding, gameState.currentText, currentParagraphIndex]);

  // Handler for Next Paragraph
  const handleNextParagraph = () => {
    setCurrentParagraphIndex((prev) => prev + 1);
  };

  // Helper to determine if a choice is locked
  const isChoiceLocked = (choice: Choice): { locked: boolean; message?: string } => {
    if (choice.requiredMinAffinity !== undefined && gameState.affinity < choice.requiredMinAffinity) {
      return { locked: true, message: `Butuh gairah > ${choice.requiredMinAffinity}%` };
    }
    if (choice.requiredMaxAffinity !== undefined && gameState.affinity > choice.requiredMaxAffinity) {
      return { locked: true, message: `Gairah terlalu tinggi (> ${choice.requiredMaxAffinity}%)` };
    }
    return { locked: false };
  };

  // Helper to display affinity impact
  const getAffinityIndicator = (effect: string) => {
      if (effect === 'positive' || effect === 'ending_romance') return <span className="text-xs font-bold text-rose-400 ml-2">(+❤️)</span>;
      if (effect === 'negative' || effect === 'ending_reject') return <span className="text-xs font-bold text-stone-400 ml-2">(-💔)</span>;
      return null;
  };

  const handleChoiceClick = (choice: Choice) => {
      setSelectedChoiceId(choice.id);
      setTimeout(() => {
          onChoice(choice);
          setSelectedChoiceId(null);
      }, 200);
  };

  const handleInventoryClick = () => {
    setShowInventory(!showInventory);
    setHasNotification(false); // Clear notification on click
  };

  // --- POPUP COMPONENT (Used for Intro & Inventory View) ---
  const activeCharacterKey = activePopup || viewingInventoryImage;
  const isIntroMode = !!activePopup;

  // Reset image loading state when the active popup changes
  useEffect(() => {
    setIsPopupImageLoaded(false);
  }, [activeCharacterKey]);

  // UseEffect to check if image is already loaded (from cache) immediately after render
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
        setIsPopupImageLoaded(true);
    }
  }, [activeCharacterKey]);

  const CharacterPopup = () => {
    if (!activeCharacterKey) return null;
    const imageUrl = CHARACTER_PROFILES[activeCharacterKey];
    const showText = !NO_TEXT_POPUPS.includes(activeCharacterKey);

    if (!imageUrl) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in p-4">
        <div className="relative max-w-md w-full flex flex-col items-center">
           <div className="relative p-2 bg-stone-900 border border-stone-700 rounded-sm shadow-2xl shadow-rose-900/30 min-h-[300px] w-full flex items-center justify-center bg-stone-950">
              {/* Loading Spinner - Only show if absolutely necessary */}
              {!isPopupImageLoaded && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-500 z-10">
                    <RefreshCw className="w-8 h-8 animate-spin text-rose-600" />
                    <span className="text-xs tracking-widest uppercase animate-pulse">Memuat Foto...</span>
                 </div>
              )}

              <img 
                ref={imgRef}
                src={imageUrl} 
                alt={activeCharacterKey} 
                className={`w-full h-auto max-h-[70vh] object-cover rounded-sm border border-stone-800 transition-opacity duration-700 ${isPopupImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsPopupImageLoaded(true)}
              />

              {showText && isPopupImageLoaded && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center animate-fade-in">
                   {/* Modified Font: More relaxed (Italic Heading) and White */}
                   <h2 className="text-3xl font-heading italic text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                     {activeCharacterKey}
                   </h2>
                </div>
              )}
           </div>
           
           <div className={`transition-all duration-700 transform ${isPopupImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <button 
               onClick={() => {
                 if (isIntroMode) onNextPopup();
                 else setViewingInventoryImage(null);
               }}
               className="mt-6 px-8 py-2 bg-rose-700 hover:bg-rose-600 text-white font-heading tracking-widest uppercase text-sm rounded-full transition-all shadow-lg hover:shadow-rose-500/40"
             >
               {isIntroMode ? 'Lanjut' : 'Tutup'}
             </button>
           </div>
        </div>
      </div>
    );
  };


  // --- RENDER MODE: CINEMATIC ENDING ---
  if (gameState.isEnding) {
    const paragraphs = gameState.currentText.split(/\n\n+/);
    const isLastParagraph = currentParagraphIndex >= paragraphs.length - 1;

    return (
      <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background - Darker/Blurred for ending focus */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 blur-sm scale-105 opacity-40"
          style={{ backgroundImage: `url(https://picsum.photos/seed/${bgImage}/1920/1080?blur=2)` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0"></div>
        
        {/* New: Character Popup Layer on Ending Screen (ensure it's above background but below text if needed, or overlay everything) */}
        {/* We reuse the component, which uses fixed positioning z-50, so it will overlay the ending text until dismissed */}
        <CharacterPopup />

        {/* Ending Content */}
        <div className="relative z-10 max-w-3xl px-6 animate-fade-in flex flex-col items-center h-full justify-center">
          
          <div className="mb-8">
            <span className="text-stone-500 tracking-[0.5em] text-sm uppercase block mb-2 font-place">Akhir Cerita</span>
            <h1 className="text-4xl md:text-6xl font-title text-rose-500 tracking-tighter drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]">
              {gameState.currentLocation || "EPILOG"}
            </h1>
          </div>

          {/* Text Container */}
          <div className="min-h-[200px] mb-12 flex items-center justify-center">
            <p className={`font-dialogue text-lg md:text-2xl text-stone-200 leading-relaxed whitespace-pre-line transition-opacity duration-300 ${!isTypingComplete ? 'typewriter-cursor' : ''}`}>
              {endingTextDisplayed}
            </p>
          </div>

          {/* Controls Area */}
          <div className="h-20 flex items-center justify-center">
            
            {/* Show NEXT button if typing is done AND not last paragraph */}
            {isTypingComplete && !isLastParagraph && (
              <button 
                onClick={handleNextParagraph}
                className="animate-fade-in flex items-center gap-2 px-6 py-3 text-stone-300 hover:text-rose-400 border border-transparent hover:border-rose-500/30 rounded-full transition-all group"
              >
                <span className="font-heading tracking-widest uppercase text-sm">Selanjutnya</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Show RESTART button if typing is done AND IS last paragraph */}
            {isTypingComplete && isLastParagraph && (
              <div className="animate-fade-in">
                <button
                  onClick={onRestart}
                  className="group relative px-8 py-4 bg-transparent overflow-hidden border border-rose-600/50 hover:border-rose-500 rounded-sm transition-all hover:bg-rose-950/30"
                >
                  <div className="absolute inset-0 w-0 bg-rose-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-rose-400 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="font-heading text-stone-100 tracking-widest uppercase text-sm group-hover:text-rose-200">Mainkan Ulang Takdir</span>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // --- RENDER MODE: STANDARD GAMEPLAY ---
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-end">
      
      {/* Intro / Inventory Image Popup */}
      <CharacterPopup />
      
      {/* Top Bar: Stats & Inventory */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center pointer-events-none">
        
        {/* Affinity Stat */}
        <div className="text-white/80 font-title tracking-widest text-sm flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
           <Heart className={`transition-all duration-500 
             ${gameState.affinity >= 100 
               ? 'w-8 h-8 text-rose-600 fill-rose-600 animate-heart-icon' 
               : gameState.affinity > 50 
                 ? 'w-4 h-4 text-rose-500 fill-rose-500' 
                 : 'w-4 h-4 text-stone-500'}`} 
           />
           <span className={`${gameState.affinity >= 100 ? 'font-bold text-rose-400' : ''}`}>GAIRAH: {gameState.affinity}%</span>
        </div>

        {/* Inventory Button */}
        <div className="pointer-events-auto relative">
          <button 
            onClick={handleInventoryClick}
            className={`transition-all duration-300 bg-black/30 backdrop-blur-sm p-2 rounded-full border 
              ${hasNotification 
                ? 'animate-notify text-rose-500 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]' 
                : 'text-white/80 border-white/10 hover:text-rose-400 hover:border-rose-500/50'}`}
            title="Item Saya"
          >
            <Gift className={`w-5 h-5 ${hasNotification ? 'fill-rose-500/20' : ''}`} />
          </button>

          {/* Inventory Modal/Popover */}
          {showInventory && (
            <div className="absolute right-0 top-12 w-72 bg-stone-900/95 backdrop-blur-md border border-stone-700 rounded-lg shadow-2xl p-4 animate-fade-in origin-top-right z-30">
              <div className="flex justify-between items-center mb-3 border-b border-stone-700 pb-2">
                <h3 className="text-rose-400 font-title text-sm tracking-widest">KOLEKSI ITEM</h3>
                <button onClick={() => setShowInventory(false)}>
                  <X className="w-4 h-4 text-stone-500 hover:text-white" />
                </button>
              </div>
              
              {gameState.inventory.length === 0 ? (
                <p className="text-stone-500 text-xs italic text-center py-4">Belum ada item yang didapatkan.</p>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                  {gameState.inventory.map((item, idx) => {
                    const mappedKey = INVENTORY_IMAGE_MAP[item];
                    return (
                      <li key={idx} className="text-sm text-stone-300 flex items-center justify-between bg-stone-800/50 p-2 rounded border border-stone-800 hover:border-stone-600 transition-colors">
                        <div className="flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${mappedKey ? 'bg-blue-400' : 'bg-rose-500'}`}></div>
                           <span>{item}</span>
                        </div>
                        {mappedKey && (
                          <button 
                             onClick={() => setViewingInventoryImage(mappedKey)}
                             className="text-xs bg-stone-700 hover:bg-rose-700 text-stone-300 hover:text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                             <Eye className="w-3 h-3" /> Lihat
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mb-4 md:mb-12 px-4">
        
        {/* Character/Focus Area (Abstractly represented by layout space) */}
        <div className="h-[20vh] md:h-[40vh] w-full flex items-center justify-center">
             {/* Placeholder for character sprite */}
        </div>

        {/* Text Box */}
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/50 rounded-lg p-6 md:p-8 shadow-2xl animate-fade-in min-h-[250px] flex flex-col justify-between">
          
          <div className="mb-6">
            <h2 
              onClick={!gameState.isEnding ? onSecretBack : undefined}
              className={`text-rose-400 font-place font-bold text-sm md:text-base mb-2 tracking-widest w-fit uppercase cursor-pointer hover:text-rose-300 transition-colors select-none`}
              title="Kembali ke sebelumnya"
            >
               {gameState.currentLocation || "LOKASI"}
            </h2>
            <div 
                ref={scrollRef}
                className="font-dialogue text-lg md:text-xl text-stone-200 leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              {gameState.currentText.split('\n').map((line, i) => (
                  <p key={i} className="mb-4 last:mb-0 min-h-[1rem]">{line}</p>
              ))}
            </div>
          </div>

          {/* Choices Area */}
          <div className="flex flex-col gap-3 mt-4 border-t border-stone-700/50 pt-4">
            {gameState.currentChoices.map((choice) => {
              const { locked, message } = isChoiceLocked(choice);
              const isSelected = selectedChoiceId === choice.id;
              
              return (
                <button
                  key={choice.id}
                  onClick={() => !locked && handleChoiceClick(choice)}
                  disabled={locked || selectedChoiceId !== null}
                  className={`group relative w-full text-left p-4 transition-all duration-200 rounded-md overflow-hidden transform
                    ${isSelected ? 'scale-95 bg-stone-700 border-rose-500/50' : ''}
                    ${locked 
                      ? 'bg-stone-900/50 border border-stone-800 text-stone-600 cursor-not-allowed' 
                      : `bg-stone-800/50 hover:bg-stone-700/80 border border-stone-700 hover:border-rose-500/50 ${choice.isHeartbeat ? 'animate-button-glow border-rose-500/60' : ''}`
                    }`}
                >
                  {!locked && <div className={`absolute inset-0 w-1 bg-rose-500 -translate-x-full transition-transform duration-300 ${isSelected ? 'translate-x-0' : 'group-hover:translate-x-0'}`} />}
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`font-medium italic flex items-center ${locked ? 'text-stone-600 line-through' : 'text-stone-300 group-hover:text-white'} ${choice.isHeartbeat ? 'text-rose-100 font-bold' : ''}`}>
                       "{choice.text}" {getAffinityIndicator(choice.effect)}
                    </span>
                    {locked && (
                      <div className="flex items-center text-xs text-stone-500 gap-1 uppercase tracking-wider">
                        <Lock className="w-3 h-3" />
                        <span>{message}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};