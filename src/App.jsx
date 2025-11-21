import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, DollarSign, Users, Clock, CheckCircle, AlertTriangle, BarChart3, Calculator, FileText, Send, Lightbulb, Newspaper, LogIn, Mail, X, Menu, AlertCircle } from 'lucide-react';

const BimaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [forwardComment, setForwardComment] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [sendingIdea, setSendingIdea] = useState(false);
  const [blogPosts] = useState([
    {
      id: 1,
      date: 'Nov 15, 2024',
      title: 'Introducing Bima - Your Freelance Safety Net',
      content: 'After losing $12,000 to a client who disappeared, I knew something had to change. Today, we\'re building the insurance platform freelancers deserve. Welcome to Bima.'
    },
    {
      id: 2,
      date: 'Nov 10, 2024',
      title: 'Why Traditional Insurance Fails Freelancers',
      content: 'Traditional insurers don\'t understand our world. They want tax returns, stable income proof, and months of paperwork. We\'re different. We understand that one bad month doesn\'t define your career.'
    }
  ]);

  // Store user data in database when they login
  const storeUserData = async (email) => {
    try {
      await window.storage.set(`user:${email}`, JSON.stringify({
        email: email,
        signUpDate: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }));
      console.log('User data stored successfully');
    } catch (error) {
      console.log('Storage not available, using memory only');
    }
  };

  const handleLogin = () => {
    if (loginEmail && loginEmail.includes('@')) {
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      setShowLogin(false);
      setLoginEmail('');
      setActiveTab('assessment');
      
      // Store user in database
      storeUserData(loginEmail);
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
      // Store idea in database
      const ideaId = `idea:${Date.now()}`;
      try {
        await window.storage.set(ideaId, JSON.stringify({
          from: userEmail || 'Anonymous',
          idea: forwardComment,
          timestamp: new Date().toISOString()
        }), true); // shared = true so you can see all ideas
      } catch (error) {
        console.log('Storage not available');
      }

      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/xnnqbbwa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail || 'Anonymous User',
          message: forwardComment,
          _subject: '💡 New Idea from Bima User!'
        })
      });

      if (response.ok) {
        alert('🎉 Thank you! Your idea has been sent to Sam. Together we\'re building the future of freelance protection!');
        setForwardComment('');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please email your idea directly to teslasam658@gmail.com');
    } finally {
      setSendingIdea(false);
    }
  };

  const handleSubscribe = async () => {
    if (subscribeEmail && subscribeEmail.includes('@')) {
      try {
        // Store subscriber in database
        await window.storage.set(`subscriber:${subscribeEmail}`, JSON.stringify({
          email: subscribeEmail,
          subscribedDate: new Date().toISOString()
        }), true);
      } catch (error) {
        console.log('Storage not available');
      }

      alert(`Success! We'll send updates to ${subscribeEmail}`);
      setSubscribeEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="text-blue-600" size={28} />
            </div>
            <h2 className="text-2xl font-bold">Welcome to Bima</h2>
          </div>
          <button 
            onClick={() => setShowLogin(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 text-center mb-6">
          Enter your email to start your protection journey
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={!loginEmail}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-blue-600" size={40} />
          <div>
            <h1 className="text-4xl font-bold">
              Insurance Built <span className="text-blue-600">For Freelancers</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">By a freelancer who lost $12,000</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-700 mb-6">
          Get paid every time, even when clients ghost. Dual-sided protection that covers you AND your clients - no more sleepless nights worrying about payment.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">$0</div>
            <div className="text-sm text-gray-600">Lost to Non-Payment</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">48h</div>
            <div className="text-sm text-gray-600">To Get Your Money</div>
          </div>
        </div>

        <button 
          onClick={() => setShowLogin(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
        >
          <LogIn size={20} />
          Get Protected Now - Free Assessment
        </button>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
        <h2 className="text-xl font-bold mb-3">🎯 What We Cover (Freelancers)</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Client Ghosting:</strong> We pay you within 48 hours if client disappears</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Late Payment:</strong> Covered if payment is 14+ days overdue</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Partial Payment:</strong> Get the full amount you're owed</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Scope Creep:</strong> Protection when clients demand unpaid extra work</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Project Cancellation:</strong> Compensation for work already completed</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h2 className="text-xl font-bold mb-3">🛡️ Client Protection (Included Free)</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Non-Delivery:</strong> Full refund if freelancer doesn't deliver</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Quality Issues:</strong> Mediation and refunds for substandard work</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Missed Deadlines:</strong> Compensation for significant delays</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 italic">
          💡 Why clients love this: They hire insured freelancers knowing they're protected too
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">How Bima Changes Everything</h2>
        
        <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Built By a Freelancer, For Freelancers</h3>
              <p className="text-gray-600 text-sm">
                After losing $12K to a ghosting client, I built the protection I wish I had. 
                No corporate BS, no complex forms - just real protection that works.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-green-200 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Get Paid in 48 Hours</h3>
              <p className="text-gray-600 text-sm">
                File a claim, we verify with AI, you get paid. No lawyers, no 6-month waits. 
                Your bills don't wait - neither should your insurance payout.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-purple-200 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Fair Pricing: 2.5% - 5.5% Per Project</h3>
              <p className="text-gray-600 text-sm">
                Pay only when you work. No monthly fees. A $5,000 project? Insurance costs $125-275. 
                Small price for total peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AssessmentPage = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Your Risk Assessment</h2>
        <p className="text-gray-700">
          5-minute form to calculate your personalized premium and coverage
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-blue-600" size={32} />
          </div>
          <h3 className="font-bold text-lg mb-2">Let's Calculate Your Premium</h3>
          <p className="text-sm text-gray-600 mb-4">
            Answer questions about your freelance work, and we'll create your custom protection plan
          </p>
        </div>

        <a
          href="https://forms.gle/qfApmZJEWteQhvYE7"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-center hover:bg-blue-700 mb-4 transition-colors"
        >
          Start Assessment (5 mins) →
        </a>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>We'll ask about:</strong>
          </p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
            <li>• Years of freelance experience</li>
            <li>• Average project value ($500? $5,000? $50,000?)</li>
            <li>• Client ratings and reviews</li>
            <li>• Biggest fears about payment</li>
            <li>• What protection means to you</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-sm mb-2">📊 Your Premium Will Be Based On:</h4>
          <div className="text-xs text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Experience Level:</span>
              <span className="font-semibold">Lower experience = slightly higher rate</span>
            </div>
            <div className="flex justify-between">
              <span>Project Size:</span>
              <span className="font-semibold">Larger projects = lower % rate</span>
            </div>
            <div className="flex justify-between">
              <span>Track Record:</span>
              <span className="font-semibold">Good reviews = better rates</span>
            </div>
            <div className="flex justify-between">
              <span>Industry:</span>
              <span className="font-semibold">Higher risk = adjusted pricing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-sm mb-1">After you submit:</p>
            <p className="text-sm text-gray-700">
              We'll email you at <strong>{userEmail}</strong> with:
            </p>
            <ul className="text-sm text-gray-700 mt-2 ml-4 space-y-1">
              <li>• Your personalized risk algorithm</li>
              <li>• Exact premium calculation breakdown</li>
              <li>• Coverage limits for your profile</li>
              <li>• Next steps to activate protection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ForwardEngineeringPage = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          <Lightbulb className="text-yellow-600 flex-shrink-0" size={32} />
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Ideas Shape Bima</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Upwork, Fiverr, Freelancer - they never asked what YOU wanted. They build for investors, 
              not users. I'm different. Every feature request goes directly to my inbox. You have a voice here.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🤔</span>
            <div className="flex-1">
              <p className="font-bold text-sm">Why Platforms Don't Listen</p>
              <p className="text-xs text-gray-600">
                Because they optimize for profit, not people. We optimize for YOU.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded p-3 text-xs text-gray-700">
            <strong>The reality:</strong> Other platforms ship features nobody asked for while we're 
            begging for basic stuff like "get paid on time." Not here. 🙅‍♂️
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-4">💡 What Should We Build Next?</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Feature Request / Idea / Feedback
            </label>
            <textarea
              value={forwardComment}
              onChange={(e) => setForwardComment(e.target.value)}
              placeholder="Examples:
• 'Add contract templates so I don't need a lawyer'
• 'Client verification before projects start'
• 'Escrow integration for automatic releases'
• 'Health insurance options for freelancers'
• 'What if clients can see my insurance badge?'
              
Anything! I read every single message."
              rows={8}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none transition-colors"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {forwardComment.length} characters
              </div>
              <div className="text-xs text-gray-500">
                From: {userEmail || 'Anonymous'}
              </div>
            </div>
          </div>

          <button
            onClick={handleForwardComment}
            disabled={!forwardComment.trim() || sendingIdea}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
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

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Mail size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700">
                <strong>Goes directly to:</strong> teslasam658@gmail.com<br/>
                <strong>Stored in database:</strong> Your idea is saved so I never lose it<br/>
                <strong>I respond to:</strong> Every message within 48 hours
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-xs text-gray-700 mb-2">
              <strong>🔥 Recent Ideas I Loved:</strong>
            </p>
            <ul className="text-xs text-gray-600 space-y-1 ml-4">
              <li>• "Can clients see my insurance badge on my profile?"</li>
              <li>• "What about protecting against scope creep?"</li>
              <li>• "Make a calculator to show ROI of insurance"</li>
              <li>• "Integration with Upwork/Fiverr contracts"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const WhatsInPage = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="text-blue-600" size={32} />
          <h2 className="text-2xl font-bold">Building in Public</h2>
        </div>
        <p className="text-gray-700 text-sm">
          Updates, new features, and the real story of building insurance that actually works for freelancers
        </p>
      </div>

      <div className="space-y-4">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
            <div className="text-xs text-gray-500 mb-2">{post.date}</div>
            <h3 className="font-bold text-lg mb-3">{post.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
          </div>
        ))}

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">📬 Get Updates When We Ship</h3>
          <p className="text-sm text-gray-700 mb-3">
            New features, pricing updates, and stories from building Bima delivered to your inbox
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            No spam. Unsubscribe anytime. ~1 email per week.
          </p>
        </div>
      </div>
    </div>
  );

  const HowItWorksPage = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">The Story Behind Bima</h2>
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            <strong>March 2019.</strong> I just finished a $12,000 website project. Three months of work. 
            The client loved the demo. Then... silence. Emails bounced. Phone disconnected. Gone.
          </p>
          <p>
            I couldn't pay rent. Had to borrow from family. The shame was worse than the financial hit. 
            I'm a developer—I should be making six figures, right? But here I was, broke.
          </p>
          <p>
            That month changed me. I realized: <strong>every freelancer is one bad client away from disaster.</strong> 
            We work without safety nets. No insurance. No protection. Just hope and crossed fingers.
          </p>
          <p className="font-semibold text-gray-900">
            So I built Bima. Not just for me—for every freelancer who's felt that stomach-dropping fear 
            when a client goes silent.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-xl mb-3">🎯 The Game Changer</h3>
        <p className="text-gray-700 text-sm mb-4">
          Since building Bima's prototype, I've gone from scared-to-quote-high to confidently closing 
          $50K+ projects. Why? Because I know I'm protected. That confidence shows. Clients trust me more. 
          I can focus on great work instead of worrying about payment.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <p className="font-bold text-blue-900 mb-2">My Results in 18 Months:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
              <span>Sleep soundly knowing every project is protected</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h3 className="font-bold text-xl mb-4">How It Works (Simple 4 Steps)</h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold mb-2">Sign Up & Get Assessed (5 mins)</h4>
              <p className="text-sm text-gray-600">
                Enter your email, complete the Google Form about your freelance experience. 
                We analyze your risk profile and email you a personalized algorithm with your exact premium.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold mb-2">See Your Premium (Transparent Pricing)</h4>
              <p className="text-sm text-gray-600">
                Based on your data, we calculate your fair premium (typically 2.5%-5.5% of project value). 
                Example: $5,000 project = $125-275 insurance. No hidden fees. No surprises.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold mb-2">Activate Protection Per Project</h4>
              <p className="text-sm text-gray-600">
                For each new project, pay your premium and both you AND your client are automatically covered. 
                Smart contracts track milestones. No paperwork. Just protection.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <div>
              <h4 className="font-bold mb-2">Work with Total Confidence</h4>
              <p className="text-sm text-gray-600">
                Client doesn't pay? We pay you within 48 hours. You don't deliver? Client gets refunded. 
                Everyone plays fair when there's real protection backing every project.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm">
        <p className="text-center font-bold text-lg text-gray-900 mb-2">
          This isn't just insurance. It's freedom.
        </p>
        <p className="text-center text-sm text-gray-700">
          Freedom to take on bigger projects. Freedom to sleep at night. Freedom to build the 
          freelance career you deserve without fear.
        </p>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <AlertCircle className="text-yellow-600" size={24} />
          What's NOT Covered (Important to Know)
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Subjective Disputes:</strong> "I don't like the design" without clear contract violations</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Scope Changes:</strong> Requirements that changed after contract was signed</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Personal Conflicts:</strong> Disagreements unrelated to deliverables or payment</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Force Majeure:</strong> Natural disasters, wars, or other uncontrollable events</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 italic">
          💡 We only cover clear-cut payment failures and delivery failures defined in your contract
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showLogin && <LoginModal />}
      
      <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold">Bima</h1>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">
                      {userEmail.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-gray-700">{userEmail}</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'howItWorks' && <HowItWorksPage />}
        {activeTab === 'assessment' && <AssessmentPage />}
        {activeTab === 'forward' && <ForwardEngineeringPage />}
        {activeTab === 'whatsIn' && <WhatsInPage />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Shield size={20} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab('howItWorks')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'howItWorks' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <FileText size={20} />
              <span className="text-xs font-medium">Story</span>
            </button>
            
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab('assessment')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'assessment' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                <Calculator size={20} />
                <span className="text-xs font-medium">Assess</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('forward')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'forward' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Lightbulb size={20} />
              <span className="text-xs font-medium">Ideas</span>
            </button>
            
            <button
              onClick={() => setActiveTab('whatsIn')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'whatsIn' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
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

export default BimaApp-green-600 flex-shrink-0" size={16} />
              <span>$120K in annual revenue (first six-figure year)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
              <span>Zero payment defaults (clients know they're covered too)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text
export default BimaApp;
