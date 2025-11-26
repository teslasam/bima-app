import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, FileText, Send, Lightbulb, Newspaper, LogIn, Mail, X, DollarSign, TrendingUp, Zap, ArrowRight } from 'lucide-react';

// 🔥 REPLACE THESE WITH YOUR ACTUAL VALUES FROM SUPABASE
const SUPABASE_URL = 'https://wsxnoitgeotpvnrcyyeg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzeG5vaXRnZW90cHZucmN5eWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzEyNTMsImV4cCI6MjA3OTYwNzI1M30.hbItDRVoSaQL_OxofbPDHQT1zRLynSufpRzuFTMKLig';

const BimaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [forwardComment, setForwardComment] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [sendingIdea, setSendingIdea] = useState(false);
  const [dbStatus, setDbStatus] = useState('checking');

  // Helper function to call Supabase REST API
  const supabaseQuery = async (table, method = 'GET', body = null, params = '') => {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
      throw new Error('Please update SUPABASE_URL and SUPABASE_ANON_KEY in the code');
    }

    const url = `${SUPABASE_URL}/rest/v1/${table}${params}`;
    console.log('Making request to:', url);
    console.log('Method:', method);
    console.log('Body:', body);

    const options = {
      method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };

    if (body && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Supabase error ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Response data:', result);
    return result;
  };

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  const checkDatabaseConnection = async () => {
    try {
      await supabaseQuery('users', 'GET', null, '?select=count');
      setDbStatus('connected');
    } 
  };

  const handleLogin = async () => {
    if (loginEmail && loginEmail.includes('@')) {
      try {
        console.log('Attempting login for:', loginEmail);
        
        // Check if user exists - Fix: use proper URL encoding
        const encodedEmail = encodeURIComponent(loginEmail);
        const existingUsers = await supabaseQuery('users', 'GET', null, `?email=eq."${encodedEmail}"&select=*`);
        console.log('Existing users:', existingUsers);

        if (existingUsers && existingUsers.length > 0) {
          // Update last_active
          console.log('Updating existing user...');
          await supabaseQuery('users', 'PATCH', {
            last_active: new Date().toISOString()
          }, `?email=eq."${encodedEmail}"`);
        } else {
          // Create new user - simpler approach
          console.log('Creating new user...');
          const newUser = await supabaseQuery('users', 'POST', [{
            email: loginEmail,
            last_active: new Date().toISOString()
          }]);
          console.log('User created:', newUser);
        }

        console.log('Login successful!');
        setIsLoggedIn(true);
        setUserEmail(loginEmail);
        setShowLogin(false);
        setLoginEmail('');
        setActiveTab('assessment');
      } catch (error) {
        console.error('Login error details:', error);
        alert('Error: ' + error.message + '\n\nCheck browser console for details.');
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleForwardComment = async () => {
    if (!forwardComment.trim()) {
      alert('Please write your idea before sending');
      return;
    }

    setSendingIdea(true);

    try {
      // Save to database - Fix: wrap in array
      await supabaseQuery('ideas', 'POST', [{
        user_email: userEmail || 'Anonymous',
        idea: forwardComment,
        status: 'pending'
      }]);

      // Send email via Formspree
      const response = await fetch('https://formspree.io/f/xnnqbbwa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
      alert('Saved to database but email failed. I still got your idea!');
      setForwardComment('');
    } finally {
      setSendingIdea(false);
    }
  };

  const handleSubscribe = async () => {
    if (subscribeEmail && subscribeEmail.includes('@')) {
      try {
        await supabaseQuery('subscribers', 'POST', [{
          email: subscribeEmail,
          is_active: true
        }]);

        alert('You are in. Updates coming soon.');
        setSubscribeEmail('');
      } catch (error) {
        console.error('Subscribe error:', error);
        if (error.message.includes('409')) {
          alert('You are already subscribed!');
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {dbStatus === 'error' && (
        <div className="bg-red-500 text-white px-4 py-2 text-center text-sm font-semibold">
          ⚠️ Database not connected. Update SUPABASE_URL and SUPABASE_ANON_KEY in the code.
        </div>
      )}

      {dbStatus === 'connected' && (
        <div className="bg-green-500 text-white px-4 py-2 text-center text-sm font-semibold">
          ✓ Database connected successfully!
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Shield className="text-white" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Let's start</h2>
              </div>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              5 minutes to see your personalized premium. No commitment.
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!loginEmail}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20 sticky top-0 z-10">
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
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 text-sm bg-white bg-opacity-10 px-4 py-2 rounded-xl backdrop-blur-sm">
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
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700"
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
            <div className="text-center space-y-6 py-12">
              <div className="inline-block bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Built after losing $120k to a client + $30k to a freelancer
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Why doesn't this
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">already exist?</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Enterprises want freelancers. Freelancers want enterprise work.
                <br />
                But there's no infrastructure connecting them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 flex items-center gap-2"
                >
                  Get Your Premium
                  <ArrowRight size={20} />
                </button>
                <div className="text-sm text-blue-300">
                  5 mins · No commitment · See how it works
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">48 hours</div>
                <div className="text-blue-200">Average claim resolution</div>
              </div>

              <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">2.5-5.5%</div>
                <div className="text-blue-200">Of project value</div>
              </div>

              <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">5-10x</div>
                <div className="text-blue-200">Bigger contracts possible</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 from-opacity-10 to-cyan-500 to-opacity-10 border border-blue-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
              <div className="space-y-4 text-blue-100 text-lg">
                <p>A company will pay an agency $50,000 without thinking twice.</p>
                <p>But they will stress for weeks about hiring a $15,000 freelancer.</p>
                <p className="text-xl font-semibold text-white pt-4">
                  Why? It's not about the money. It's about who gets blamed if things go wrong.
                </p>
                <p>Nobody gets fired for hiring the big agency. But hire a freelancer who messes up? That's on you.</p>
                <p className="text-cyan-300 font-semibold">
                  Freelancers aren't locked out of big contracts because they can't do the work.
                  <br />
                  They're locked out because the person hiring them is scared of looking bad.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 from-opacity-10 to-orange-500 to-opacity-10 border border-yellow-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Think of it like credit cards in 1950</h2>
              <div className="space-y-4 text-blue-100">
                <p>Before credit cards, you could only buy from people who trusted you personally. Trust was local.</p>
                <p>
                  Credit cards made trust <span className="text-cyan-300 font-semibold">portable</span>. 
                  Suddenly, a store didn't need to trust you - they trusted the system.
                </p>
                <p className="text-lg text-white font-semibold pt-2">
                  That's what we're building for freelance work.
                </p>
                <p>
                  Not another platform. Not a marketplace. Just <span className="text-cyan-300 font-semibold">infrastructure</span> that makes trust travel.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 from-opacity-20 to-emerald-500 to-opacity-20 border border-green-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  LAUNCHING THIS MONTH
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Freelancer Protection Starter Kit
                </h2>
                <p className="text-blue-200 text-lg mb-6">
                  Everything you need to protect yourself before full insurance launches
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">Anti-Scam Contract Template</div>
                      <div className="text-blue-300 text-sm">Legal protection from day one</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">Payment Milestone Structure</div>
                      <div className="text-blue-300 text-sm">Never work for free again</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">AI Bima Agent (WhatsApp)</div>
                      <div className="text-blue-300 text-sm">Automated follow-ups & reminders</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">Invoice Enforcement System</div>
                      <div className="text-blue-300 text-sm">Get paid on time, every time</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">Bad Client Prevention Guide</div>
                      <div className="text-blue-300 text-sm">Spot red flags before signing</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-green-500 border-opacity-20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold">30-Min Onboarding Call</div>
                      <div className="text-blue-300 text-sm">Personal setup with Sam</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Zap className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <div className="text-yellow-200 text-sm">
                    <span className="font-semibold">Bonus:</span> Early access to full insurance when it launches + locked-in early adopter premium rate
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 inline-flex items-center gap-2"
                >
                  Get Your Starter Kit
                  <ArrowRight size={20} />
                </button>
                <p className="text-blue-300 text-sm mt-3">
                  5 minutes to qualify · Delivered within 48 hours
                </p>
              </div>
            </div>
{activeTab === 'assessment' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-purple-500 from-opacity-20 to-pink-500 to-opacity-20 border border-purple-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">Get Your Starter Kit</h2>
              <p className="text-blue-200 text-lg">
                Everything you need to protect yourself this month, delivered in 48 hours
              </p>
            </div>

            <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Get Your Starter Kit</h3>
                <p className="text-blue-200">
                  Answer 5 minutes of questions, get your protection toolkit
                </p>
              </div>

              <div className="bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-xl p-6 mb-6">
                <div className="text-white font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={20} />
                  You'll receive this month:
                </div>
                <div className="grid gap-2 text-sm text-blue-200">
                  <div>✓ Anti-scam contract template</div>
                  <div>✓ Payment milestone structure</div>
                  <div>✓ AI Bima agent (WhatsApp)</div>
                  <div>✓ Invoice enforcement sequence</div>
                  <div>✓ Bad client prevention guide</div>
                  <div>✓ 30-min onboarding call with Sam</div>
                </div>
              </div>

              
                href="https://forms.gle/qfApmZJEWteQhvYE7"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-center hover:from-green-700 hover:to-emerald-700 mb-6 text-lg"
              >
                Start Assessment →
              </a>

              <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl p-6">
                <p className="text-yellow-200 font-semibold mb-3">We'll ask about:</p>
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Your freelance experience & typical projects</li>
                  <li>• Current protection gaps you're facing</li>
                  <li>• Payment issues you've encountered</li>
                  <li>• What you need most right now</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-white font-semibold mb-2">After you submit:</p>
                  <p className="text-blue-200 text-sm mb-3">
                    We'll email you at <strong className="text-white">{userEmail}</strong> within 48 hours with:
                  </p>
                  <div className="text-blue-200 text-sm space-y-1 ml-4">
                    <div>• Your complete starter kit (contracts, templates, guides)</div>
                    <div>• WhatsApp AI agent setup link</div>
                    <div>• Calendar link to book your 30-min onboarding call</div>
                    <div>• Early access pricing for full insurance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'forward' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-500 from-opacity-20 to-orange-500 to-opacity-20 border border-yellow-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <Lightbulb className="text-yellow-400 flex-shrink-0" size={36} />
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">Your Ideas Shape Bima</h2>
                  <p className="text-blue-200">
                    Upwork, Fiverr - they never asked what YOU wanted. Every request here goes directly to my inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">What should we build next?</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    Your idea, feedback, or feature request
                  </label>
                  <textarea
                    value={forwardComment}
                    onChange={(e) => setForwardComment(e.target.value)}
                    placeholder="Contract templates, client verification, escrow... Anything. I read every message."
                    rows={8}
                    className="w-full px-4 py-3 bg-white bg-opacity-5 border-2 border-white border-opacity-10 rounded-xl focus:border-cyan-500 focus:outline-none resize-none text-white placeholder-blue-300"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-blue-300">{forwardComment.length} characters</div>
                    <div className="text-xs text-blue-300">From: {userEmail || 'Anonymous'}</div>
                  </div>
                </div>

                <button
                  onClick={handleForwardComment}
                  disabled={!forwardComment.trim() || sendingIdea}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sendingIdea ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send to Sam
                    </>
                  )}
                </button>

                <div className="bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-green-400 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-200 space-y-1">
                      <div><strong className="text-white">Goes to:</strong> teslasam658@gmail.com</div>
                      <div><strong className="text-white">Saved to database:</strong> Never lost</div>
                      <div><strong className="text-white">Response:</strong> Within 48 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whatsIn' && (
          <div className="space-y-6 pb-20 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 from-opacity-20 to-purple-500 to-opacity-20 border border-blue-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Newspaper className="text-blue-400" size={36} />
                <h2 className="text-3xl font-bold text-white">Building in Public</h2>
              </div>
              <p className="text-blue-200">Updates and the real story of building infrastructure</p>
            </div>

            <div className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-6">
              <div className="text-xs text-blue-400 mb-3">Nov 15, 2024</div>
              <h3 className="text-xl font-bold text-white mb-3">Lost $120k. Built This.</h3>
              <p className="text-blue-200 leading-relaxed">
                After losing $120,000 to a client who disappeared, then $30k to a poor freelancer, 
                I knew something had to change. Building the trust infrastructure that should have existed from day one.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 from-opacity-10 to-emerald-500 to-opacity-10 border border-green-500 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">Get Updates</h3>
              <p className="text-blue-200 mb-4">New features, real numbers, what's working</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-white bg-opacity-5 border-2 border-white border-opacity-10 rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-blue-300"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 bg-opacity-90 backdrop-blur-md border-t border-white border-opacity-10">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveTab('home')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'home' ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'text-gray-400')}
            >
              <Shield size={20} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab('assessment')}
                className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'assessment' ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'text-gray-400')}
              >
                <FileText size={20} />
                <span className="text-xs font-medium">Assess</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('forward')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'forward' ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'text-gray-400')}
            >
              <Lightbulb size={20} />
              <span className="text-xs font-medium">Ideas</span>
            </button>
            
            <button
              onClick={() => setActiveTab('whatsIn')}
              className={'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ' + (activeTab === 'whatsIn' ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'text-gray-400')}
            >
              <Newspaper size={20} />
              <span className="text-xs font-medium">Updates</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BimaApp;
