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
      setError("Error verifying the  Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">
        Verify Certificate
      </h1>

      <div className="card bg-slate-800 shadow-xl p-6 w-full max-w-lg rounded-lg">
        <label className="block text-lg font-semibold mb-2 text-white">
          Enter Certificate ID:
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="e.g., 123e4567"
        />
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {error && <p className="text-red-300 mt-3 text-center">{error}</p>}

        {certificateData && (
          <div className="mt-6 p-4 bg-amber-500 border-l-4 border-green-500 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700">
              Certificate Verified ✅
            </h2>
            <p>
              <strong>Name:</strong> {certificateData.name}
            </p>
            <p>
              <strong>Email:</strong> {certificateData.email}
            </p>
            <p>
              <strong>Certificate Type:</strong>{" "}
              {certificateData.certificateType
                ? certificateData.certificateType
                : "N/A"}
            </p>
            <p>
              <strong>Unique ID:</strong> {certificateData.uniqueId}
            </p>
            <p>
              <strong>Date Issued:</strong>{" "}
              {certificateData.issuedAt
                ? new Date(certificateData.issuedAt).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Display QR Code if available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
