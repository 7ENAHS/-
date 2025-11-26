import React, { useState, useRef } from 'react';
import { Camera } from './components/Camera';
import { generateVirtualTryOn } from './services/geminiService';
import { Gender, ProcessingState, ShoeOption } from './types';
import { MEN_SHOES, WOMEN_SHOES } from './constants';

const App: React.FC = () => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedShoe, setSelectedShoe] = useState<ShoeOption | null>(null);
  const [appState, setAppState] = useState<ProcessingState>({ status: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentShoes = gender === Gender.MALE ? MEN_SHOES : WOMEN_SHOES;

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setAppState({ status: 'review' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setAppState({ status: 'review' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!capturedImage || !selectedShoe) return;

    setAppState({ status: 'processing' });
    setGeneratedImage(null);

    try {
      const resultImage = await generateVirtualTryOn(capturedImage, selectedShoe.description);
      setGeneratedImage(resultImage);
      setAppState({ status: 'complete' });
    } catch (error) {
      setAppState({ status: 'error', errorMessage: 'Failed to generate image. Please try again.' });
    }
  };

  const reset = () => {
    setAppState({ status: 'idle' });
    setCapturedImage(null);
    setGeneratedImage(null);
    setSelectedShoe(null);
  };

  // --- Render Functions ---

  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2" onClick={reset}>
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 cursor-pointer">
          ShoeSnap
        </h1>
      </div>
      
      {appState.status === 'idle' && (
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setGender(Gender.MALE)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              gender === Gender.MALE ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setGender(Gender.FEMALE)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              gender === Gender.FEMALE ? 'bg-pink-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Women
          </button>
        </div>
      )}
    </header>
  );

  const renderHero = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8 animate-fade-in">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Try on shoes <br/>
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gender === Gender.MALE ? 'from-indigo-400 to-blue-500' : 'from-pink-400 to-rose-500'}`}>
            in seconds
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Select a style, snap a photo of your feet, and let AI do the rest.
        </p>

        <div className="grid grid-cols-1 gap-4 w-full">
          <button
            onClick={() => setAppState({ status: 'camera' })}
            className="w-full py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-transform active:scale-95 shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Open Camera
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 bg-gray-800 text-white border border-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-750 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Preview Grid of Styles */}
      <div className="w-full max-w-2xl mt-8">
        <p className="text-sm text-gray-500 mb-4 font-semibold uppercase tracking-wider">Available {gender} Styles</p>
        <div className="grid grid-cols-4 gap-3">
          {currentShoes.slice(0, 4).map(shoe => (
            <div key={shoe.id} className="aspect-square rounded-lg bg-gray-800 border border-gray-700 p-2 flex flex-col items-center justify-center space-y-2 opacity-60">
               <div className={`w-8 h-8 rounded-full ${shoe.thumbnailColor} shadow-inner`}></div>
               <span className="text-[10px] text-gray-300 text-center leading-tight">{shoe.name}</span>
            </div>
          ))}
          <div className="col-span-4 text-center text-xs text-gray-600 italic mt-2">+ 4 more styles</div>
        </div>
      </div>
    </div>
  );

  const renderReviewAndSelect = () => (
    <div className="flex flex-col h-full min-h-screen">
      {/* Image Preview Area */}
      <div className="relative flex-1 bg-black w-full overflow-hidden flex items-center justify-center">
        {generatedImage ? (
           <div className="relative w-full h-full">
              <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
              <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                AI GENERATED
              </div>
           </div>
        ) : (
           <img src={capturedImage!} alt="Original" className="w-full h-full object-contain" />
        )}

        {appState.status === 'processing' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white font-semibold animate-pulse">Designing your look...</p>
          </div>
        )}
      </div>

      {/* Controls Section */}
      <div className="bg-gray-900 border-t border-gray-800 p-4 pb-8 space-y-4 rounded-t-2xl -mt-4 relative z-20 shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold text-lg">Select Style</h3>
          <button onClick={reset} className="text-xs text-gray-400 hover:text-white underline">
            Start Over
          </button>
        </div>

        {/* Shoe Grid */}
        <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-60 pb-4">
          {currentShoes.map((shoe) => (
            <button
              key={shoe.id}
              onClick={() => setSelectedShoe(shoe)}
              disabled={appState.status === 'processing'}
              className={`
                relative flex flex-col items-center p-2 rounded-xl border-2 transition-all
                ${selectedShoe?.id === shoe.id 
                  ? 'border-indigo-500 bg-gray-800 shadow-indigo-500/20 shadow-lg scale-105' 
                  : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-full mb-2 ${shoe.thumbnailColor} shadow-inner`}></div>
              <span className="text-[10px] text-center font-medium text-gray-300 leading-tight">
                {shoe.name}
              </span>
              {selectedShoe?.id === shoe.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleTryOn}
          disabled={!selectedShoe || appState.status === 'processing'}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all
            ${!selectedShoe || appState.status === 'processing'
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 active:scale-95'
            }
          `}
        >
          {appState.status === 'complete' ? 'Try Another Style' : 'Virtual Try-On'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      {appState.status === 'camera' && (
        <Camera 
          onCapture={handleCapture} 
          onClose={() => setAppState({ status: 'idle' })} 
        />
      )}

      {appState.status === 'idle' && (
        <>
          {renderHeader()}
          {renderHero()}
        </>
      )}

      {(appState.status === 'review' || appState.status === 'processing' || appState.status === 'complete' || appState.status === 'error') && 
        renderReviewAndSelect()
      }

      {appState.status === 'error' && (
         <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-xl z-50 animate-bounce">
            {appState.errorMessage}
            <button onClick={() => setAppState(prev => ({ ...prev, status: 'review' }))} className="ml-4 font-bold underline">Dismiss</button>
         </div>
      )}
    </div>
  );
};

export default App;