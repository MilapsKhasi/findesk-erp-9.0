
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) navigate('/companies');
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // Since email confirmation is OFF, we expect a session immediately
        if (data.session) {
          navigate('/companies');
        } else {
          // Fallback just in case confirmation is actually on or session didn't auto-start
          setError("Account created. Please try logging in.");
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm bg-primary rounded-[10px] p-2 animate-in zoom-in-95 duration-700 border border-slate-200/20 shadow-none">
        
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            {isLogin ? 'Findesk Prime' : 'Join Findesk'}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            {isLogin ? 'Sign in to your workspace' : 'Create your business account'}
          </p>
        </div>

        <div className="bg-white rounded-[10px] p-6 pb-10 shadow-none">
          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] rounded-[10px] font-semibold animate-shake text-center">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-900 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-slate-200 rounded-[10px] outline-none focus:border-slate-400 font-medium text-slate-900 transition-all placeholder:text-slate-300 text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-900 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-slate-200 rounded-[10px] outline-none focus:border-slate-400 font-medium text-slate-900 transition-all placeholder:text-slate-300 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[10px] font-bold bg-primary text-slate-900 hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50 text-xs tracking-[0.15em] border border-transparent active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : (isLogin ? 'LOG IN' : 'GET STARTED')} 
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="w-full text-center text-[10px] text-slate-400 font-medium"
              >
                {isLogin ? (
                  <>New to Findesk? <span className="text-link font-bold uppercase ml-1">Create Account</span></>
                ) : (
                  <>Already registered? <span className="text-link font-bold uppercase ml-1">Log In</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
