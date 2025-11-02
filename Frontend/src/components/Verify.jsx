import { useState } from "react";
import DarkVeil from "./DarkVeil";
import LoadingSpinner from "./LoadingSpinner";

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
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }} className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-white drop-shadow-lg tracking-tight">Verify Certificate</h1>
        <div className="w-full max-w-lg rounded-2xl bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-2xl p-8 flex flex-col gap-4">
          <label className="block text-lg font-semibold mb-2 text-white/90">Enter Certificate ID:</label>
          <input
            type="text"
            className="input input-bordered w-full bg-white/80 text-gray-900 font-semibold rounded-lg focus:ring-2 focus:ring-blue-400"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="e.g., 123e4567"
          />
          <button
            className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-lg font-extrabold font-[Inter] shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : "Verify"}
          </button>
          {error && <p className="text-red-400 mt-3 text-center font-semibold">{error}</p>}
          {certificateData && (
            <div className="mt-6 p-6 bg-white/80 rounded-xl shadow-lg border-l-4 border-green-500 animate-fade-in-up">
              <h2 className="text-xl font-bold text-green-700 mb-2">Certificate Verified ✅</h2>
              <div className="text-gray-800 font-semibold space-y-1">
                <p><strong>Name:</strong> {certificateData.name}</p>
                <p><strong>Email:</strong> {certificateData.email}</p>
                <p><strong>Certificate Type:</strong> {certificateData.certificateType ? certificateData.certificateType : "N/A"}</p>
                <p><strong>Unique ID:</strong> {certificateData.uniqueId}</p>
                <p><strong>Date Issued:</strong> {certificateData.issuedAt ? new Date(certificateData.issuedAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
