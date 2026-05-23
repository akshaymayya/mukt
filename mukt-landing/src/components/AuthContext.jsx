import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user || null);
      })
      .catch((err) => {
        console.error("Supabase session load error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // Listen for auth changes
    let subscription;
    try {
      const res = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        if (event === 'SIGNED_IN') {
          setShowThankYou(true);
          setTimeout(() => setShowThankYou(false), 5000);
        }
      });
      subscription = res?.data?.subscription;
    } catch (err) {
      console.error("Supabase auth listener setup error:", err);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/'
      }
    });
    if (error) console.error("Error signing in:", error);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut, loading }}>
      {!loading && children}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[9999] bg-black/90 border border-[#E1E0CC]/20 text-[#E1E0CC] px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-4 w-max max-w-[90vw]"
          >
            <div className="bg-[#E1E0CC]/10 p-2 rounded-full">
              <span className="text-xl leading-none">🎉</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Welcome aboard!</h4>
              <p className="text-xs text-[#E1E0CC]/70">Thank you for being a part of Mozara.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
