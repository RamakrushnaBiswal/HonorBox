/* eslint-disable no-unused-vars */
import { useState } from "react";

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleVerify = async () => {
    setError("");
    setCertificateData(null);
    setLoading(true);

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/verify/${certificateId}`
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCertificateData(data);
      } else {
        setError(data.message || "Certificate not found.");
      }
    } catch (err) {
      setError("Error verifying the certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Verify <span className="text-gradient">Certificate</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Enter a certificate ID to verify its authenticity and view details.
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200 p-8 mb-8 animate-fade-in">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Certificate ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors duration-200 text-neutral-900 placeholder-neutral-500 pr-12"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., 123e4567)"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || !certificateId.trim()}
              className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 rounded-xl shadow-lg btn-hover-scale focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                  </svg>
                  <span>Verifying...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Verify Certificate</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Verification Failed</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Details */}
        {certificateData && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-soft animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-800">Certificate Verified!</h2>
                <p className="text-green-700">This certificate is authentic and valid.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Recipient Name</label>
                  <p className="text-lg font-semibold text-neutral-900 mt-1">{certificateData.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Email Address</label>
                  <p className="text-lg text-neutral-700 mt-1">{certificateData.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Certificate Type</label>
                  <p className="text-lg text-neutral-900 mt-1 capitalize">
                    {certificateData.certificateType || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Certificate ID</label>
                  <p className="text-lg font-mono text-neutral-900 mt-1 break-all bg-white px-3 py-2 rounded-lg border">
                    {certificateData.uniqueId}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Issue Date</label>
                  <p className="text-lg text-neutral-700 mt-1">
                    {certificateData.issuedAt
                      ? new Date(certificateData.issuedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-green-800 uppercase tracking-wide">Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-green-700">Active & Valid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="mt-8 pt-6 border-t border-green-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 text-sm font-semibold text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200"
                >
                  Print Details
                </button>
                <button 
                  onClick={() => {
                    setCertificateData(null);
                    setCertificateId("");
                  }}
                  className="px-6 py-3 text-sm font-semibold text-neutral-600 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-colors duration-200"
                >
                  Verify Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">How Certificate Verification Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-1">Enter ID</h4>
              <p className="text-blue-700">Input the unique certificate ID provided with your certificate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-1">Verify</h4>
              <p className="text-blue-700">Our system checks the certificate against our secure database</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-1">Confirm</h4>
              <p className="text-blue-700">View detailed certificate information and validity status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
