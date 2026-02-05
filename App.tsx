import React, { useState, useEffect, useCallback } from 'react';
import { VisualNovel, CHARACTER_PROFILES } from './components/VisualNovel';
import { STORY_NODES, ENDING_REJECT, ENDING_FLING, ENDING_ROMANCE } from './constants';
import { GameState, Choice, StoryNode } from './types';
import { BookOpen, AlertTriangle } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentNodeIndex: 0,
  history: [],
  affinity: 0, // Start with neutral/low affinity
  currentText: '',
  currentLocation: '',
  currentChoices: [],
  inventory: [],
  isEnding: false,
  nodeHistory: [],
  affinityHistory: [],
  inventoryHistory: [],
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // For start transition
  const [isLoadingAssets, setIsLoadingAssets] = useState(false); // For asset preloading
  const [loadingProgress, setLoadingProgress] = useState(0); // New: For progress bar
  
  // Disclaimer State
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  // Popup Queue State (formerly Character Intro)
  const [popupQueue, setPopupQueue] = useState<string[]>([]);
  const [hasShownIntro, setHasShownIntro] = useState(false);

  // Check for items based on Node ID
  const checkAndAddItem = (nodeId: string, currentInventory: string[]): string[] => {
    let newItems = [...currentInventory];
    
    // Add logic for item acquisition based on plot points
    if (nodeId === '0_prologue') {
      if (!newItems.includes('Foto Erlina')) newItems.push('Foto Erlina');
      if (!newItems.includes('Foto Mama')) newItems.push('Foto Mama');
      if (!newItems.includes('Foto Om Rudi')) newItems.push('Foto Om Rudi');
    }
    if (nodeId === '4c_touch') {
      if (!newItems.includes('Foto Keluarga')) newItems.push('Foto Keluarga');
    }
    if (nodeId === '6a_pre_birthday' && !newItems.includes('Jam Tangan')) {
      newItems.push('Jam Tangan');
    }
    if (nodeId === '6c_lingerie') {
      if (!newItems.includes('Lingerie Sutra')) newItems.push('Lingerie Sutra');
      if (!newItems.includes('Foto Lingerie')) newItems.push('Foto Lingerie');
    }
    if (nodeId === '7a_mirror') {
      if (!newItems.includes('Foto Erlina Lingerie')) newItems.push('Foto Erlina Lingerie');
    }
    // 9a_wet inventory logic removed as requested
    if (nodeId === '5c_toy_reveal' && !newItems.includes('Tongkat Getar')) {
      newItems.push('Tongkat Getar');
    }

    return newItems;
  };

  const loadScene = useCallback((index: number, prevHistory: string[], currentAffinity: number, currentInventory: string[]) => {
    const node = STORY_NODES[index];
    
    // Safety check
    if (!node) {
       console.error("Node not found for index:", index);
       return;
    }

    const updatedInventory = checkAndAddItem(node.id, currentInventory);

    setGameState(prev => ({
      ...prev,
      currentNodeIndex: index,
      currentText: node.text,
      currentLocation: node.location || 'LOKASI TIDAK DIKETAHUI',
      currentChoices: node.choices,
      history: prevHistory,
      affinity: currentAffinity,
      inventory: updatedInventory,
      isEnding: false,
    }));
  }, []);

  const loadEnding = useCallback((type: 'reject' | 'fling' | 'romance') => {
    let endingNode: StoryNode;
    switch(type) {
        case 'reject': endingNode = ENDING_REJECT; break;
        case 'fling': endingNode = ENDING_FLING; break;
        case 'romance': endingNode = ENDING_ROMANCE; break;
        default: endingNode = ENDING_REJECT;
    }

    setGameState(prev => ({
        ...prev,
        isEnding: true,
        endingType: type,
        currentText: endingNode.text,
        currentLocation: endingNode.location || 'EPILOG',
        currentChoices: [],
    }));
  }, []);

  // Initial load logic
  useEffect(() => {
    if (hasStarted && gameState.currentNodeIndex === 0 && gameState.currentText === '') {
      loadScene(0, [], 0, []); // Load prologue (index 0)
    }
  }, [hasStarted, loadScene, gameState.currentNodeIndex, gameState.currentText]);

  // Trigger Character Intro Sequence on Prologue
  useEffect(() => {
    if (hasStarted && gameState.currentNodeIndex === 0 && !hasShownIntro) {
      // Delay slightly to let the scene load visually first
      setTimeout(() => {
        setPopupQueue(['Erlina', 'Mama', 'Om Rudi']);
        setHasShownIntro(true);
      }, 500);
    }
  }, [hasStarted, gameState.currentNodeIndex, hasShownIntro]);

  // Trigger Scene Specific Popups (CGs) - MAIN STORY NODES
  useEffect(() => {
    const currentNode = STORY_NODES[gameState.currentNodeIndex];
    if (!currentNode || !hasStarted) return;

    if (currentNode.id === '6c_lingerie') {
        setPopupQueue(prev => prev.includes('Lingerie') ? prev : [...prev, 'Lingerie']);
    } else if (currentNode.id === '7a_mirror') {
        setPopupQueue(prev => prev.includes('Erlina (Lingerie)') ? prev : [...prev, 'Erlina (Lingerie)']);
    } else if (currentNode.id === '9b_welcome') {
        setPopupQueue(prev => prev.includes('Erlina Basah') ? prev : [...prev, 'Erlina Basah']);
    } else if (currentNode.id === '11c_choice') {
        setPopupQueue(prev => prev.includes('Sentuhan Wajah') ? prev : [...prev, 'Sentuhan Wajah']);
    } else if (currentNode.id === '4c_touch') {
        setPopupQueue(prev => prev.includes('Foto Keluarga') ? prev : [...prev, 'Foto Keluarga']);
    } else if (currentNode.id === '2b_tension') {
        setPopupQueue(prev => prev.includes('Ruang Tengah Berdua') ? prev : [...prev, 'Ruang Tengah Berdua']);
    } else if (currentNode.id === '5b_act_continues') {
        setPopupQueue(prev => prev.includes('Di Bawah Selimut') ? prev : [...prev, 'Di Bawah Selimut']);
    } else if (currentNode.id === '3a_rain') {
        setPopupQueue(prev => prev.includes('Hujan Jendela') ? prev : [...prev, 'Hujan Jendela']);
    }
  }, [gameState.currentNodeIndex, hasStarted]);

  // Trigger Ending Specific Popups
  useEffect(() => {
    if (gameState.isEnding && gameState.endingType === 'romance') {
         setPopupQueue(prev => prev.includes('Pelukan Akhir') ? prev : [...prev, 'Pelukan Akhir']);
    }
  }, [gameState.isEnding, gameState.endingType]);


  const handleNextPopup = () => {
    setPopupQueue(prev => prev.slice(1));
  };

  const handleInitialStartClick = () => {
    setShowDisclaimer(true);
  };

  const handleConfirmDisclaimer = async () => {
    if (!isDisclaimerAccepted) return;
    
    setShowDisclaimer(false);
    // REMOVED: setIsTransitioning(true); -- This caused the blank screen because it faded out the container immediately
    setIsLoadingAssets(true); 
    setLoadingProgress(0); // Start progress at 0

    // 1. Prepare Asset Promises
    const imageUrls = Object.values(CHARACTER_PROFILES);
    const assetPromises = imageUrls.map(src => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error
        });
    });

    // 2. Setup Progress Animation Interval
    const minDuration = 3000; // 3 seconds
    const intervalStep = 50; // Update every 50ms
    const startTime = Date.now();

    // Create a timer to smoothly update the progress bar visually
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        // Calculate percentage based on time, capped at 90% until fully loaded
        const timeProgress = Math.min((elapsed / minDuration) * 90, 90); 
        setLoadingProgress(timeProgress);
    }, intervalStep);

    // 3. Wait for BOTH assets to load AND minimum time to pass
    await Promise.all([
        new Promise(resolve => setTimeout(resolve, minDuration)),
        Promise.all(assetPromises)
    ]);

    // 4. Complete
    clearInterval(progressInterval);
    setLoadingProgress(100);

    // Trigger Fade Out of Loading Screen
    setIsTransitioning(true);

    // Short delay to show 100% and allow fade out before switching components
    setTimeout(() => {
        setIsLoadingAssets(false);
        setHasStarted(true);
        // Do NOT turn off transitioning yet, so the new component starts invisible (opacity-0)
        
        // Trigger Fade In of Game Screen
        setTimeout(() => {
            setIsTransitioning(false);
        }, 100);
    }, 1000); // 1 second for fade out animation
  };

  const handleChoice = (choice: Choice) => {
    // Record current state before moving forward for "Undo" functionality
    setGameState(prev => ({
        ...prev,
        nodeHistory: [...prev.nodeHistory, prev.currentNodeIndex],
        affinityHistory: [...prev.affinityHistory, prev.affinity],
        inventoryHistory: [...prev.inventoryHistory, prev.inventory],
    }));

    const newHistory = [...gameState.history, choice.text];
    let newAffinity = gameState.affinity;

    // Logic for affinity changes (Updated to +/- 5)
    if (choice.effect === 'positive') newAffinity += 5;
    if (choice.effect === 'negative') newAffinity -= 5;

    // Clamp affinity
    newAffinity = Math.max(0, Math.min(100, newAffinity));
    
    // Check for specific endings triggered by the choice
    if (choice.effect.startsWith('ending_')) {
        const type = choice.effect.replace('ending_', '') as 'reject' | 'fling' | 'romance';
        loadEnding(type);
        return;
    }

    // Navigation Logic: Check for explicit jump ID, otherwise linear +1
    let nextIndex = gameState.currentNodeIndex + 1;

    if (choice.nextNodeId) {
        const targetIndex = STORY_NODES.findIndex(node => node.id === choice.nextNodeId);
        if (targetIndex !== -1) {
            nextIndex = targetIndex;
        } else {
            console.error(`Target node ID '${choice.nextNodeId}' not found. Falling back to next index.`);
        }
    }

    if (nextIndex < STORY_NODES.length) {
      loadScene(nextIndex, newHistory, newAffinity, gameState.inventory);
    } else {
      // Fallback if we run out of nodes without explicit ending
      if (newAffinity > 70) loadEnding('romance');
      else if (newAffinity > 40) loadEnding('fling');
      else loadEnding('reject');
    }
  };

  const handleSecretBack = () => {
    setGameState(prev => {
        if (prev.nodeHistory.length === 0) return prev; // Cannot go back further

        const prevIndex = prev.nodeHistory[prev.nodeHistory.length - 1];
        const prevAffinity = prev.affinityHistory[prev.affinityHistory.length - 1];
        const prevInventory = prev.inventoryHistory[prev.inventoryHistory.length - 1];
        
        // Remove the last entry from histories
        const newNodeHistory = prev.nodeHistory.slice(0, -1);
        const newAffinityHistory = prev.affinityHistory.slice(0, -1);
        const newInventoryHistory = prev.inventoryHistory.slice(0, -1);
        const newTextHistory = prev.history.slice(0, -1);

        const node = STORY_NODES[prevIndex];

        return {
            ...prev,
            currentNodeIndex: prevIndex,
            currentText: node.text,
            currentLocation: node.location || 'LOKASI TIDAK DIKETAHUI',
            currentChoices: node.choices,
            history: newTextHistory,
            affinity: prevAffinity,
            inventory: prevInventory,
            nodeHistory: newNodeHistory,
            affinityHistory: newAffinityHistory,
            inventoryHistory: newInventoryHistory,
            isEnding: false, 
        };
    });
  };

  const handleRestart = () => {
    setGameState(INITIAL_STATE);
    setHasShownIntro(false);
    setPopupQueue([]);
    // Reset disclaimer state as well if you want them to agree again, or keep it.
    // Here keeping it simple, user stays verified for session.
    // Trigger reload
    setTimeout(() => loadScene(0, [], 0, []), 50);
  };

  if (!hasStarted) {
    return (
      <div className={`w-full h-[100dvh] bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ${isTransitioning ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100'}`}>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rain/1920/1080?blur=4')] bg-cover opacity-30"></div>
        
        {/* Title Screen Content - Only show if NOT loading */}
        {!isLoadingAssets && (
             <div className="z-10 text-center max-w-lg animate-fade-in relative">
                <BookOpen className="w-16 h-16 text-rose-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                <h1 className="text-4xl md:text-6xl font-title text-stone-100 mb-4 tracking-tighter">Hadiah <br/><span className="text-rose-500">Terlarang</span></h1>
                <p className="text-lg text-stone-400 font-heading italic mb-8">
                    "Di antara batasan moral dan hasrat, sebuah pilihan harus dibuat."
                </p>
                
                <button 
                    onClick={handleInitialStartClick}
                    className="px-10 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold tracking-widest rounded-full transition-all shadow-lg hover:shadow-rose-500/50 active:scale-95"
                >
                    MULAI
                </button>
                
                <p className="mt-8 text-xs text-stone-600">
                    Novel Visual Interaktif
                </p>
             </div>
        )}

        {/* Loading Overlay - Positioned Absolutely to Center */}
        {isLoadingAssets && (
             <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm animate-fade-in">
                 <div className="w-full max-w-[280px] flex flex-col items-center">
                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mb-6 border border-stone-600 shadow-2xl">
                        <div 
                            className="h-full bg-rose-600 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(225,29,72,0.9)] relative"
                            style={{ width: `${loadingProgress}%` }}
                        >
                            {/* Shiny Effect */}
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-[1px]"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-lg font-title text-stone-100 tracking-widest text-center animate-pulse drop-shadow-lg">
                        Mempersiapkan cerita dengan cinta...
                    </h2>
                    <p className="text-stone-400 text-xs mt-3 font-mono tracking-widest">
                        {Math.round(loadingProgress)}%
                    </p>
                 </div>
             </div>
        )}

        {/* Disclaimer Modal */}
        {showDisclaimer && !isLoadingAssets && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-stone-900 border border-rose-900/50 rounded-lg p-6 max-w-md w-full shadow-2xl shadow-rose-900/20">
                <div className="flex flex-col items-center text-center mb-6">
                  <AlertTriangle className="w-12 h-12 text-rose-500 mb-3" />
                  <h2 className="text-xl font-title text-stone-100 mb-2">PERINGATAN KONTEN</h2>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Game ini mengandung tema <strong>dewasa</strong>, <strong>psikologis</strong>, dan <strong>hubungan tabu</strong> yang mungkin tidak sesuai untuk semua audiens. Kebijaksanaan pemain sangat disarankan.
                  </p>
                </div>

                <div className="bg-stone-950/50 rounded p-4 border border-stone-800 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={isDisclaimerAccepted}
                        onChange={(e) => setIsDisclaimerAccepted(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-stone-600 bg-stone-800 transition-all checked:border-rose-500 checked:bg-rose-600 hover:border-rose-400"
                      />
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-stone-300 group-hover:text-stone-200 select-none">
                      Saya menyatakan bahwa saya berusia <strong>18 tahun ke atas</strong> dan setuju untuk melanjutkan.
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDisclaimer(false)}
                    className="flex-1 py-3 text-stone-500 hover:text-stone-300 font-bold tracking-wider text-xs border border-transparent hover:border-stone-700 rounded transition-colors"
                  >
                    KEMBALI
                  </button>
                  <button 
                    onClick={handleConfirmDisclaimer}
                    disabled={!isDisclaimerAccepted}
                    className={`flex-1 py-3 font-bold tracking-wider text-xs rounded transition-all
                      ${isDisclaimerAccepted 
                        ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg hover:shadow-rose-500/30' 
                        : 'bg-stone-800 text-stone-600 cursor-not-allowed'}`}
                  >
                    LANJUT
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  const currentBg = gameState.isEnding 
    ? (gameState.endingType === 'romance' ? 'fire' : gameState.endingType === 'fling' ? 'autumn' : 'rain_window')
    : STORY_NODES[gameState.currentNodeIndex]?.backgroundImage || 'abstract';

  return (
    <div className={`transition-opacity duration-1000 ${hasStarted && !isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
        <VisualNovel 
          gameState={gameState} 
          onChoice={handleChoice} 
          onRestart={handleRestart}
          onSecretBack={handleSecretBack}
          bgImage={currentBg}
          activePopup={popupQueue[0] || null}
          onNextPopup={handleNextPopup}
        />
    </div>
  );
}

export default App;