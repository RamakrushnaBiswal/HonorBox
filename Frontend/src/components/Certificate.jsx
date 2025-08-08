import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaShare, FaEye, FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import DarkVeil from "./DarkVeil";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/certificates`);
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || cert.certificateType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    setShowModal(true);
  };

  const handleDownload = async (cert) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/certificate/${cert.uniqueId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${cert.uniqueId}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  const handleShare = async (cert) => {
    const shareUrl = `${BACKEND_URL}/api/certificate/${cert.uniqueId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificate - ${cert.name}`,
          text: `Check out this certificate for ${cert.name}`,
          url: shareUrl
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("Certificate link copied to clipboard!");
    }
  };

  const getCertificateColor = (type) => {
    switch (type) {
      case "Participation": return "from-blue-500 to-blue-600";
      case "Completion": return "from-green-500 to-green-600";
      case "Excellence": return "from-purple-500 to-purple-600";
      case "Achievement": return "from-orange-500 to-orange-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getCertificateIcon = (type) => {
    switch (type) {
      case "Participation": return "🎯";
      case "Completion": return "✅";
      case "Excellence": return "🏆";
      case "Achievement": return "⭐";
      default: return "📜";
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }} className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-4">
              Certificate Management
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              View, manage, and share all your generated certificates in one place
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] rounded-2xl p-6 mb-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search certificates by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="all">All Types</option>
                  <option value="Participation">Participation</option>
                  <option value="Completion">Completion</option>
                  <option value="Excellence">Excellence</option>
                  <option value="Achievement">Achievement</option>
                </select>
                <button
                  onClick={() => window.location.href = '/generate'}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <FaPlus />
                  New Certificate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Certificates Grid */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-white/80 mt-4">Loading certificates...</p>
            </motion.div>
          ) : filteredCertificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-bold text-white mb-2">No certificates found</h3>
              <p className="text-white/80 mb-6">Create your first certificate to get started</p>
              <button
                onClick={() => window.location.href = '/generate'}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Create Certificate
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${getCertificateIcon(cert.certificateType)}`}></div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                        <p className="text-white/60 text-sm">{cert.email}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCertificateColor(cert.certificateType)} text-white`}>
                      {cert.certificateType}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="font-semibold">ID:</span>
                      <span className="font-mono">{cert.uniqueId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="font-semibold">Created:</span>
                      <span>{new Date(cert.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewCertificate(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white hover:scale-105 transition-transform"
                    >
                      <FaDownload />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:scale-105 transition-transform"
                    >
                      <FaShare />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Certificate Modal */}
        {showModal && selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[rgba(30,30,40,0.98)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Certificate Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm">Name</label>
                    <p className="font-semibold">{selectedCertificate.name}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Email</label>
                    <p className="font-semibold">{selectedCertificate.email}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Certificate Type</label>
                    <p className="font-semibold">{selectedCertificate.certificateType}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Unique ID</label>
                    <p className="font-mono font-semibold">{selectedCertificate.uniqueId}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Created Date</label>
                    <p className="font-semibold">{new Date(selectedCertificate.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Status</label>
                    <p className="font-semibold text-green-400">✓ Valid</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDownload(selectedCertificate)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white hover:scale-105 transition-transform"
                  >
                    <FaDownload />
                    Download Certificate
                  </button>
                  <button
                    onClick={() => handleShare(selectedCertificate)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:scale-105 transition-transform"
                  >
                    <FaShare />
                    Share Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
