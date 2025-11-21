import React, { useState } from 'react';
import { Shield, TrendingUp, DollarSign, Users, Clock, CheckCircle, AlertTriangle, BarChart3, Calculator, FileText, Send, Lightbulb, Newspaper, LogIn, Mail, X, Menu } from 'lucide-react';

const BimaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [forwardComment, setForwardComment] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [blogPosts] = useState([
    {
      id: 1,
      date: 'Nov 15, 2024',
      title: 'Introducing Bima - Your Freelance Safety Net',
      content: 'After losing $120,000 to a client who disappeared, I knew something had to change. Today, we\'re building the insurance platform freelancers deserve. Welcome to Bima.'
    },
    {
      id: 2,
      date: 'Nov 10, 2024',
      title: 'Why Traditional Insurance Fails Freelancers',
      content: 'Traditional insurers don\'t understand our world. They want tax returns, stable income proof, and months of paperwork. We\'re different. We understand that one bad month doesn\'t define your career.'
    }
  ]);

  const handleLogin = () => {
    if (loginEmail && loginEmail.includes('@')) {
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      setShowLogin(false);
      setLoginEmail('');
      setActiveTab('assessment');
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleForwardComment = () => {
    if (forwardComment.trim()) {
      const emailData = {
        from: userEmail || 'Anonymous',
        comment: forwardComment,
        timestamp: new Date().toISOString()
      };
      
      console.log('Sending to teslasam658@gmail.com:', emailData);
      
      // Simulate email sending
      setTimeout(() => {
        alert('Thank you! Your idea has been sent. Together we\'re building the future of freelance protection.');
        setForwardComment('');
      }, 500);
    } else {
      alert('Please write your idea before sending');
    }
  };

  const handleSubscribe = () => {
    if (subscribeEmail && subscribeEmail.includes('@')) {
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
        <h1 className="text-4xl font-bold mb-4">
          Protect Every <span className="text-blue-600">Freelance Project</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Dual-sided insurance that eliminates financial risk for freelancers and clients. 
          Get paid on time, deliver with confidence, and build lasting relationships.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600">Risk Reduction</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">48h</div>
            <div className="text-sm text-gray-600">Claim Resolution</div>
          </div>
        </div>

        <button 
          onClick={() => setShowLogin(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
        >
          <LogIn size={20} />
          Get Started Now
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Everything You Need to Work Safely</h2>
        
        <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Dual-Sided Protection</h3>
              <p className="text-gray-600">
                Comprehensive insurance covering both freelancers and clients against 
                project risks, payment defaults, and quality disputes.
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
              <h3 className="font-bold text-lg mb-2">48-Hour Claims</h3>
              <p className="text-gray-600">
                Lightning-fast claim processing with AI-powered assessment. 
                Get your money back quickly when projects go wrong.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-purple-200 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Smart Contracts</h3>
              <p className="text-gray-600">
                Automated milestone tracking and payment releases based on 
                deliverable verification and mutual agreement.
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
        <h2 className="text-2xl font-bold mb-2">Your Assessment</h2>
        <p className="text-gray-700">
          Complete this Google Form so we can create your personalized protection plan
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-blue-600" size={32} />
          </div>
          <h3 className="font-bold text-lg mb-2">Complete Your Profile</h3>
          <p className="text-sm text-gray-600 mb-4">
            We'll use your answers to calculate your personalized premium and coverage
          </p>
        </div>

        <a
          href="https://forms.gle/qfApmZJEWteQhvYE7"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-center hover:bg-blue-700 mb-4 transition-colors"
        >
          Open Assessment Form →
        </a>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>What we'll ask:</strong> Your freelance experience, average project value, 
            client ratings, biggest fears, and what protection means to you. Takes ~5 minutes.
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-sm mb-1">After you submit:</p>
            <p className="text-sm text-gray-700">
              We'll email you (at {userEmail}) with your personalized algorithm, premium calculation, 
              and next steps to get protected.
            </p>
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
            <h2 className="text-2xl font-bold mb-2">Forward Engineering Comments</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ever noticed how Upwork, Fiverr, and Freelancer never ask what YOU want? 
              They build features, ship them, and we just... accept it. For years, I've wanted 
              a platform that actually listens. So here it is.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🤔</span>
            <div className="flex-1">
              <p className="font-bold text-sm">Why don't platforms ask us?</p>
              <p className="text-xs text-gray-600">
                Because they're building for investors, not users. We're different.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded p-3 text-xs text-gray-700">
            <strong>The meme:</strong> Platforms be like "Here's a feature nobody asked for!" 
            Meanwhile freelancers: "Can we just get paid on time?" 😅
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Your Ideas Shape Bima</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              What feature do you NEED? What's missing? What would make this perfect?
            </label>
            <textarea
              value={forwardComment}
              onChange={(e) => setForwardComment(e.target.value)}
              placeholder="E.g., 'I need contract templates,' 'Add client verification,' 'Escrow would be amazing,' 'What about health insurance?'..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none transition-colors"
            />
            <div className="text-xs text-gray-500 mt-1">
              {forwardComment.length} characters
            </div>
          </div>

          <button
            onClick={handleForwardComment}
            disabled={!forwardComment.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            <Send size={20} />
            Send to Sam (Founder)
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-600 justify-center">
            <Mail size={14} />
            <span>Goes directly to teslasam658@gmail.com</span>
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
          <h2 className="text-2xl font-bold">What's In</h2>
        </div>
        <p className="text-gray-700 text-sm">
          Updates, new features, and the story of building insurance that actually works for freelancers
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
          <h3 className="font-bold mb-2">More updates coming...</h3>
          <p className="text-sm text-gray-700 mb-3">
            Subscribe via email to get notified when we ship new features based on YOUR feedback.
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
        </div>
      </div>
    </div>
  );

  const HowItWorksPage = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">My Story (And Maybe Yours Too)</h2>
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
          Since launching Bima's prototype, I've gone from scared-to-quote-high to confidently closing 
          $50K+ projects. Why? Because I know I'm protected. That confidence shows. Clients trust me more. 
          I can focus on great work instead of worrying about payment.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <p className="font-bold text-blue-900 mb-2">My Results in 18 Months:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
              <span>$120K in annual revenue (first six-figure year)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
              <span>Zero payment defaults (because clients know they're covered too)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
              <span>Sleep soundly knowing every project is protected</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h3 className="font-bold text-xl mb-4">How It Works</h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold mb-2">Sign Up & Get Assessed</h4>
              <p className="text-sm text-gray-600">
                Enter your email, complete a quick Google Form about your freelance experience. 
                We analyze your risk profile and email you a personalized algorithm.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold mb-2">Get Your Premium</h4>
              <p className="text-sm text-gray-600">
                Based on your data, we calculate your fair premium (typically 2.5%-5.5% of project value). 
                No hidden fees. No surprises. Just transparent pricing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold mb-2">Activate Protection</h4>
              <p className="text-sm text-gray-600">
                For each project, pay your premium and both you AND your client are covered. 
                Smart contracts track milestones automatically.
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
                If the client doesn't pay: we pay you within 48 hours. If you don't deliver: 
                client gets refunded. Everyone plays fair when there's protection.
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
          freelance career you deserve.
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


export default BimaApp;
