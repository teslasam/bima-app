// ... (Lines 1 to 549 are unchanged)

        {activeTab === 'whatsIn' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            {/* ... (content for whatsIn tab) ... */}
            </div>
          </div>
        )}
      </main> // <-- CORRECTED: Closing the <main> tag here.

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around py-2">
            {/* ... (Navigation Buttons) ... */}
            <button
              onClick={() => setActiveTab('home')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'home' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400')}
            >
              <Shield size={20} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab('assessment')}
                className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'assessment' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400')}
              >
                <FileText size={20} />
                <span className="text-xs font-medium">Assess</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('forward')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'forward' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400')}
            >
              <Lightbulb size={20} />
              <span className="text-xs font-medium">Ideas</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsIn')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'whatsIn' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400')}
            >
              <BookOpen size={20} />
              <span className="text-xs font-medium">Log</span>
            </button>
          </div>
        </div>
      </nav>
    </div> // <-- CORRECTED: Closing the main surrounding <div> here.
  );
};

export default BimaApp;
