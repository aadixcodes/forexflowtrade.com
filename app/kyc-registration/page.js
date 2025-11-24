
'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, Upload } from 'lucide-react';
import Link from 'next/link';
import axios from 'utils/axios.js'

const KycRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    phone: '',
    email: '',
    
    // KYC Info
    aadharNumber: '',
    panNumber: '',
    aadharPhoto: null,
    panPhoto: null,
    userPhoto: null,
    
    // Bank Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    
    // Terms
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    }
    
    if (step === 2) {
      if (!formData.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
      if (!formData.panNumber.trim()) newErrors.panNumber = 'PAN number is required';
      if (!formData.aadharPhoto) newErrors.aadharPhoto = 'Aadhar photo is required';
      if (!formData.panPhoto) newErrors.panPhoto = 'PAN photo is required';
      if (!formData.userPhoto) newErrors.userPhoto = 'User photo is required';
    }
    
    if (step === 3) {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
      if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
      if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
      if (!formData.branchName.trim()) newErrors.branchName = 'Branch name is required';
      if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // console.log('Form submitted:', formData);
      // Add your form submission logic here
      console.log("FormData ::", formData)  

      const response = await axios.post('/user/register', formData)
      console.log("Response ::", response)
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#D0E2D2] flex items-center justify-center relative overflow-hidden pt-20 pb-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#43B852] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-[#0E1F1B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 md:w-72 md:h-72 bg-[#43B852] rounded-full blur-3xl opacity-70"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-4xl mx-4 my-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-[#0E1F1B] p-4">
          <div className="flex justify-between items-center text-white relative">
            {/* Progress line */}
            <div className="absolute top-4 left-16 right-16 h-1 bg-[#D0E2D2]">
              <div 
                className="h-full bg-[#43B852] transition-all duration-300 ease-in-out" 
                style={{ 
                  width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' 
                }}
              ></div>
            </div>
            
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-[#43B852]' : 'bg-[#D0E2D2]'}`}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : (
                    <Circle className={`h-5 w-5 ${step === stepNumber ? 'text-white' : 'text-[#0E1F1B]'}`} />
                  )}
                </div>
                <span className="text-xs mt-1">
                  {stepNumber === 1 && 'Personal'}
                  {stepNumber === 2 && 'KYC'}
                  {stepNumber === 3 && 'Bank'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0E1F1B] mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#43B852] mb-4">Personal Information</h3>
                
                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#43B852] hover:bg-[#0E1F1B] text-white py-2 px-6 rounded-xl flex items-center disabled:opacity-50"
                    disabled={!formData.name || !formData.phone || !formData.email}
                  >
                    Next <ChevronRight className="ml-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: KYC Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#43B852] mb-4">KYC Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      placeholder="Enter your Aadhar number"
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                      required
                    />
                    {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">PAN Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="Enter your PAN number"
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                      required
                    />
                    {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">Aadhar Card Photo</label>
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-[#D0E2D2] rounded-xl cursor-pointer hover:bg-[#D0E2D2]/10">
                      <Upload className="h-5 w-5 text-[#43B852] mb-1" />
                      <span className="text-xs text-center text-[#0E1F1B]">
                        {formData.aadharPhoto ? formData.aadharPhoto.name : 'Upload Aadhar'}
                      </span>
                      <input
                        type="file"
                        name="aadharPhoto"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                        required
                      />
                    </label>
                    {errors.aadharPhoto && <p className="text-red-500 text-xs mt-1">{errors.aadharPhoto}</p>}
                  </div>

                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">PAN Card Photo</label>
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-[#D0E2D2] rounded-xl cursor-pointer hover:bg-[#D0E2D2]/10">
                      <Upload className="h-5 w-5 text-[#43B852] mb-1" />
                      <span className="text-xs text-center text-[#0E1F1B]">
                        {formData.panPhoto ? formData.panPhoto.name : 'Upload PAN'}
                      </span>
                      <input
                        type="file"
                        name="panPhoto"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                        required
                      />
                    </label>
                    {errors.panPhoto && <p className="text-red-500 text-xs mt-1">{errors.panPhoto}</p>}
                  </div>

                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">Your Photo</label>
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-[#D0E2D2] rounded-xl cursor-pointer hover:bg-[#D0E2D2]/10">
                      <Upload className="h-5 w-5 text-[#43B852] mb-1" />
                      <span className="text-xs text-center text-[#0E1F1B]">
                        {formData.userPhoto ? formData.userPhoto.name : 'Upload Photo'}
                      </span>
                      <input
                        type="file"
                        name="userPhoto"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                        required
                      />
                    </label>
                    {errors.userPhoto && <p className="text-red-500 text-xs mt-1">{errors.userPhoto}</p>}
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#D0E2D2] hover:bg-[#0E1F1B] text-[#0E1F1B] hover:text-white py-2 px-6 rounded-xl flex items-center"
                  >
                    <ChevronLeft className="mr-1 h-5 w-5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#43B852] hover:bg-[#0E1F1B] text-white py-2 px-6 rounded-xl flex items-center disabled:opacity-50"
                    disabled={!formData.aadharNumber || !formData.panNumber || !formData.aadharPhoto || !formData.panPhoto || !formData.userPhoto}
                  >
                    Next <ChevronRight className="ml-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Bank Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#43B852] mb-4">Bank Details</h3>
                
                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Enter your bank name"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                </div>

                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    placeholder="Enter account holder name"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.accountHolderName && <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="Enter your account number"
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                      required
                    />
                    {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-[#0E1F1B] text-sm mb-1">IFSC Code</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter bank IFSC code"
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                      required
                    />
                    {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[#0E1F1B] text-sm mb-1">Branch Name</label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="Enter branch name"
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2]"
                    required
                  />
                  {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
                </div>

                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                      className="h-5 w-5 rounded border-[#D0E2D2] text-[#43B852] focus:ring-[#43B852] cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-[#0E1F1B]">
                      I agree to the <Link href="/terms" className="text-[#43B852] hover:underline">Terms & Conditions</Link>
                    </label>
                  </div>
                  {errors.agreedToTerms && <p className="text-red-500 text-xs ml-2">{errors.agreedToTerms}</p>}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#D0E2D2] hover:bg-[#0E1F1B] text-[#0E1F1B] hover:text-white py-2 px-6 rounded-xl flex items-center"
                  >
                    <ChevronLeft className="mr-1 h-5 w-5" /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#43B852] hover:bg-[#0E1F1B] text-white py-2 px-6 rounded-xl flex items-center disabled:opacity-50"
                    disabled={!formData.bankName || !formData.accountHolderName || !formData.accountNumber || !formData.ifscCode || !formData.branchName || !formData.agreedToTerms}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-[#0E1F1B]">
            Already have an account? <Link href="/login" className="text-[#43B852] hover:underline">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycRegistration;