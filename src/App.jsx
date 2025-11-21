import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, FileText, Send, Lightbulb, Newspaper, LogIn, Mail, X, DollarSign, TrendingUp, Zap, ArrowRight, BookOpen } from 'lucide-react';

const BimaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [forwardComment, setForwardComment] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [sendingIdea, setSendingIdea] = useState(false);

  // 1. Custom Storage Handler (for Vercel/Local consistency)
  const storage = typeof window !== 'undefined' && window.storage ? window.storage : {
    set: (key, value, silent = false) => {
      try {
        localStorage.setItem(key, value);
      } catch(e) {
        console.log('Storage not available');
      }
    }
  };

  const storeUserData = async (email) => {
    try {
      await storage.set('user:' + email, JSON.stringify({
        email: email,
        signUpDate: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }));
    } catch (error) {
      console.log('Storage not available');
    }
  };

  const handleLogin = () => {
    if (loginEmail && loginEmail.includes('@')) {
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      setShowLogin(false);
      setLoginEmail('');
      setActiveTab('assessment');
      storeUserData(loginEmail);
    } else {
      alert('Please enter a valid email address');
    }
  };

  // 2. Working Email/Idea Sender (using Formspree)
  const handleForwardComment = async () => {
    if (!forwardComment.trim()) {
      alert('Please write your idea before sending');
      return;
    }

    setSendingIdea(true);

    try {
      // Store locally (as discussed for data persistence)
      const ideaId = 'idea:' + Date.now();
      await storage.set(ideaId, JSON.stringify({
        from: userEmail || 'Anonymous',
        idea: forwardComment,
        timestamp: new Date().toISOString()
      }), true);
      
      // Send email via Formspree
      const response = await fetch('https://formspree.io/f/xnnqbbwa', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail || 'Anonymous User',
          message: forwardComment,
          _subject: 'New Idea from Bima User'
        })
      });

      if (response.ok) {
        alert('Got it! Your idea is on my desk. Will reply within 48 hours.');
        setForwardComment('');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something broke. Email me directly: teslasam658@gmail.com');
    } finally {
      setSendingIdea(false);
    }
  };

  const handleSubscribe = async () => {
    if (subscribeEmail && subscribeEmail.includes('@')) {
      try {
        await storage.set('subscriber:' + subscribeEmail, JSON.stringify({
          email: subscribeEmail,
          subscribedDate: new Date().toISOString()
        }), true);
      } catch (error) {
        console.log('Storage not available');
      }
      alert('You are in. Updates coming soon.');
      setSubscribeEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pb-20">
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Shield className="text-white" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Let's start</h2>
              </div>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              5 minutes to see your personalized protection. No commitment.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Your Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!loginEmail}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Continue
              </button>
          </div>
        </div>
        </div>
      )}
      
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Shield className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Bima</h1>
                <p className="text-xs text-blue-200">Trust Infrastructure</p>
              </div>
              <span className="hidden sm:inline-block text-white/50 text-xs ml-4 border border-white/10 px-2 py-1 rounded-full">
                **Infrastructure, Not Platform**
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {userEmail.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-white">{userEmail}</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* UX/UI REDESIGN: Hero Section with Conviction */}
            <div className="text-center space-y-6 py-12">
              <div className="inline-block bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Built after losing $120k to a client + $30k to a freelancer
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-in">
                Why doesn't this<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">already exist?</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                We build the **Trust Infrastructure** that lets freelancers access big enterprise contracts without fear.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-2xl flex items-center gap-2 transform hover:scale-105"
                >
                  Access Enterprise Work
                  <ArrowRight size={20} />
                </button>
                <div className="text-sm text-blue-300">
                  5 mins · Portable Trust · No Commitment
                </div>
              </div>
            </div>

            {/* UX/UI REDESIGN: Metrics and Value */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">2.5% - 5.5%</div>
                <div className="text-blue-200">Of project value (The Trust Fee)</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">5-10x</div>
                <div className="text-blue-200">Bigger contracts now possible</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">48 hours</div>
                <div className="text-blue-200">Average claim resolution</div>
              </div>
            </div>

            {/* UX/UI REDESIGN: The Problem with Personality */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">The Problem: It's About Blame, Not Money</h2>
              <div className="space-y-4 text-blue-100 text-lg">
                <p>
                  A company will pay an agency $50,000 without thinking twice. But they'll stress for weeks about hiring a $15,000 freelancer.
                </p>
                <p className="text-xl font-semibold text-white pt-4">
                  Why? Nobody gets fired for hiring the big agency. But hire a freelancer who messes up? **That's on you.**
                </p>
                <p className="text-cyan-300 font-semibold">
                  Freelancers aren't locked out of big contracts because they can't do the work. They're locked out because the person hiring them is **scared of looking bad.**
                </p>
              </div>
            </div>

            {/* UX/UI REDESIGN: Explicit Coverage and Messaging Fix */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center mb-8">We Provide Portable Trust. Not Promises.</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="text-red-400" size={24} />
                    For Freelancers: Access to Scale
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">Client Payment Default</div>
                        <div className="text-blue-200 text-sm">We pay you within 48 hours if they ghost or refuse payment.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">Scope Creep Disputes</div>
                        <div className="text-blue-200 text-sm">Mediation and protection against demands for unpaid extra work.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="text-red-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">We Do Not Cover:</div>
                        <div className="text-blue-200 text-sm">Subjective preference issues (e.g., "I don't like the color").</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="text-purple-400" size={24} />
                    For Enterprises: Guaranteed Quality
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">Non-Delivery / Poor Quality</div>
                        <div className="text-blue-200 text-sm">Full refund if the freelancer fails to deliver the promised work.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">Missed Deadlines</div>
                        <div className="text-blue-200 text-sm">Compensation for significant project delays beyond agreed terms.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="text-red-400 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="text-white font-semibold">We Do Not Cover:</div>
                        <div className="text-blue-200 text-sm">Disputes over personal style or creative direction.</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-500/30">
                    <p className="text-sm text-purple-200 italic">
                      **Example:** A \$10K project is insured for **\$250 to \$550**. That's the price of a risk-free talent upgrade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* UX/UI REDESIGN: Credit Card Analogy - Trust Signal */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Think of it like Credit Cards in 1950</h2>
              <div className="space-y-4 text-blue-100">
                <p>
                  Credit cards made trust <span className="text-cyan-300 font-semibold">portable</span>. A store didn't need to trust you personally—they trusted the system.
                </p>
                <p className="text-lg text-white font-semibold pt-2">
                  That's what we're building for the freelance world. Not a marketplace. Just **infrastructure** that makes trust travel.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">This is for the 5% who want the 5-10x leap.</h2>
              <div className="space-y-3 text-blue-200">
                <p className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  <span>If you're only targeting $2k projects on a platform.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>If you want to say **YES** to your next \$40K enterprise contract.</span>
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 py-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white">
                Remove the Risk. Unlock the Opportunity.
              </h2>
              <p className="text-blue-200 text-lg">
                5 minutes. No commitment. Just see how it works.
              </p>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-2xl inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">Your 5-Minute Access Key</h2>
              <p className="text-blue-200 text-lg">
                Calculate your personalized premium and unlock enterprise access
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Calculate Your Trust Profile</h3>
                <p className="text-blue-200">
                  Your answers generate the algorithm that calculates your risk and price.
                </p>
              </div>

              <a
                href="https://forms.gle/qfApmZJEWteQhvYE7"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-center hover:from-blue-700 hover:to-cyan-700 mb-6 transition-all shadow-lg text-lg"
              >
                Start Assessment →
              </a>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <p className="text-yellow-200 font-semibold mb-3">We'll ask about the trust elements:</p>
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Your freelance experience and quality history</li>
                  <li>• Average project value (to determine exposure)</li>
                  <li>• What level of protection allows you to confidently quote 5x higher</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-white font-semibold mb-2">After you submit:</p>
                  <p className="text-blue-200 text-sm">
                    We'll email you at <strong className="text-white">{userEmail}</strong> with your personalized premium and next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forward' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <Lightbulb className="text-yellow-400 flex-shrink-0" size={36} />
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">Your Ideas Shape Bima</h2>
                  <p className="text-blue-200">
                    Upwork, Fiverr, Freelancer - they never asked what YOU wanted. Every feature request here goes directly to my inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">What should we build next?</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    Your idea, feedback, or feature request
                  </label>
                  <textarea
                    value={forwardComment}
                    onChange={(e) => setForwardComment(e.target.value)}
                    placeholder="Examples: Contract templates, client verification, escrow integration... Anything. I read every message."
                    rows={8}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-cyan-500 focus:outline-none resize-none transition-all text-white placeholder-blue-300"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-blue-300">
                      {forwardComment.length} characters
                    </div>
                    <div className="text-xs text-blue-300">
                      From: {userEmail || 'Anonymous'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleForwardComment}
                  disabled={!forwardComment.trim() || sendingIdea}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  {sendingIdea ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send to Sam (Founder)
                    </>
                  )}
                </button>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-green-400 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-200 space-y-1">
                      <div><strong className="text-white">Goes to:</strong> teslasam658@gmail.com</div>
                      <div><strong className="text-white">Stored:</strong> Your idea is saved locally</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whatsIn' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Newspaper className="text-blue-400" size={36} />
                <h2 className="text-3xl font-bold text-white">Building in Public</h2>
              </div>
              <p className="text-blue-200">
                Updates and the real story of building infrastructure for freelancers
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="text-xs text-blue-400 mb-3">Nov 15, 2024</div>
                <h3 className="text-xl font-bold text-white mb-3">Lost $120k. Built This.</h3>
                <p className="text-blue-200 leading-relaxed">
                  After losing $120,000 to a client who disappeared, I knew something had to change. Today, I'm building the trust infrastructure that should have existed from day one.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-3">Get Updates</h3>
                <p className="text-blue-200 mb-4">
                  New features, real numbers, and what's working
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 bg-white/5 border-2 border-white/10 rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-blue-300"
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around py-2">
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
    </div>
  );
};

export default BimaApp;
