'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../components/AuthContext';
import { User, GraduationCap, Building2, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null); // 'individual', 'student', 'business'
  const [formData, setFormData] = useState({
    university: '',
    major: '',
    companyName: '',
    industry: '',
    jobTitle: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setTimeout(() => setStep(2), 300);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Filter out empty fields and include the role
      const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ''));
      cleanData.userType = role;

      await completeOnboarding(cleanData);
      // AuthContext will handle navigation to '/'
    } catch (error) {
      console.error("Error saving onboarding details:", error);
      alert("Something went wrong saving your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <img src="/logo.png?v=3" alt="Mozara" className="h-8 w-auto object-contain" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#E1E0CC] mb-3">
            Welcome to Mozara
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Let's customize your experience. How will you be using our platform?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <RoleCard 
                icon={User} 
                title="Individual" 
                description="Personal projects and individual tracking." 
                selected={role === 'individual'}
                onClick={() => handleRoleSelect('individual')}
              />
              <RoleCard 
                icon={GraduationCap} 
                title="Student" 
                description="Academic research and university projects." 
                selected={role === 'student'}
                onClick={() => handleRoleSelect('student')}
              />
              <RoleCard 
                icon={Building2} 
                title="Business Owner" 
                description="Managing teams, vendors, and cash flow." 
                selected={role === 'business'}
                onClick={() => handleRoleSelect('business')}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[#101010] border border-[#E1E0CC]/10 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <button 
                onClick={() => setStep(1)} 
                className="text-xs text-gray-500 hover:text-[#E1E0CC] uppercase tracking-wider mb-8 flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {role === 'student' && (
                  <>
                    <InputField label="University / College" name="university" value={formData.university} onChange={handleInputChange} required />
                    <InputField label="Major / Field of Study" name="major" value={formData.major} onChange={handleInputChange} />
                  </>
                )}

                {role === 'business' && (
                  <>
                    <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Industry" name="industry" value={formData.industry} onChange={handleInputChange} />
                      <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
                    </div>
                  </>
                )}

                {role === 'individual' && (
                  <InputField label="Primary Purpose" name="purpose" value={formData.purpose} onChange={handleInputChange} placeholder="e.g. Freelancing, Personal Finance" required />
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-4 w-full bg-[#E1E0CC] text-black font-semibold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RoleCard({ icon: Icon, title, description, selected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 ${
        selected 
          ? 'bg-[#E1E0CC]/10 border-[#E1E0CC] scale-105 shadow-[0_0_30px_rgba(225,224,204,0.1)]' 
          : 'bg-[#101010] border-[#E1E0CC]/10 hover:border-[#E1E0CC]/40 hover:bg-[#1a1a1a]'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${selected ? 'bg-[#E1E0CC] text-black' : 'bg-[#222] text-[#E1E0CC]'}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-medium text-[#E1E0CC] mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function InputField({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label} {required && <span className="text-[#635bff]">*</span>}
      </label>
      <input 
        required={required}
        className="bg-black/50 border border-[#E1E0CC]/20 rounded-xl px-4 py-3 text-[#E1E0CC] focus:outline-none focus:border-[#635bff] transition-colors w-full"
        {...props}
      />
    </div>
  );
}
