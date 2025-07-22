/* eslint-disable no-unused-vars */
import { useState, useRef,useEffect } from "react";
import QRCode from "qrcode";

const Generate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [certificateType, setCertificateType] = useState("Participation");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null); // Store uploaded image
  const [uploadedImage, setUploadedImage] = useState("");

  const canvasRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchLatestImage();
  }, []);

  const fetchLatestImage = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/get-images`);
      const data = await response.json();
      if (response.ok) {
        setUploadedImage(data.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching latest image:", error);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setMessage("");

    const certificateData = { name, email, certificateType };

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateData),
      });

      const data = await response.json();

      if (response.ok) {
        setUniqueId(data.certificate.uniqueId);
        setMessage(`Certificate generated successfully! ID: ${data.certificate.uniqueId}`);

        const certLink = `${BACKEND_URL}/api/certificate/${data.certificate.uniqueId}`;
        
        // Generate QR Code
        QRCode.toDataURL(certLink, { width: 120 })
          .then((qrCodeUrl) => {
            setQrCodeUrl(qrCodeUrl);
            generateCanvasCertificate(qrCodeUrl, data.certificate.uniqueId);
          })
          .catch((err) => console.error("QR Code Generation Error:", err));

        // Open Modal
        document.getElementById("certificate-modal")?.showModal();
      } else {
        setMessage(data.message || "Failed to generate certificate.");
      }
    } catch (error) {
      setMessage("Error generating certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const generateCanvasCertificate = (qrUrl, certId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    // Background
    if (backgroundImage) {
      const bgImage = new Image();
      bgImage.src = backgroundImage;
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        drawCertificateText(ctx, qrUrl,certId);
      };
    } else {
      // Default background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawCertificateText(ctx, qrUrl,certId);
    }
  };

  const drawCertificateText = (ctx, qrUrl,certId) => {
    ctx.fillStyle = "#000";
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Certificate of ${certificateType}`, 400, 200);

    ctx.font = "50px Arial bold italic";
    ctx.fillStyle="#004aad";
    ctx.fillText(name, 400, 320);

    ctx.font = "16px Arial";
    ctx.fillText("Congratulations on your achievement!", 400, 500);

    ctx.font = "16px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText(`ID: ${certId}`, 20, 580);

    if (qrUrl) {
      const qrImage = new Image();
      qrImage.crossOrigin = "anonymous";
      qrImage.src = qrUrl;
      qrImage.onload = () => {
        ctx.drawImage(qrImage, 660, 460, 100, 100);
      };
    }
  };

  const handleSendCertificate = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");

    try {
      const response = await fetch(`${BACKEND_URL}/api/send-certificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, image }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Certificate sent successfully!");
        setTimeout(() => {
          document.getElementById("certificate-modal")?.close();
        }, 1000);
        
        // Reset fields
        setName("");
        setEmail("");
        setCertificateType("Participation");
        setMessage("");
        setUniqueId("");
      } else {
        alert(data.message || "Failed to send certificate.");
      }
    } catch (error) {
      alert("Error sending certificate. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Generate <span className="text-gradient">Certificate</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Create professional certificates for your events, courses, and achievements.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200 p-8 animate-fade-in">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the recipient's full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the recipient's email address"
              />
            </div>

            {/* Certificate Type */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Certificate Type
              </label>
              <select
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-neutral-900 bg-white"
                value={certificateType}
                onChange={(e) => setCertificateType(e.target.value)}
              >
                <option value="Participation">Participation</option>
                <option value="Completion">Completion</option>
                <option value="Excellence">Excellence</option>
                <option value="Achievement">Achievement</option>
              </select>
            </div>

            {/* Background Upload */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Certificate Background (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  onChange={handleBackgroundUpload}
                />
              </div>
            </div>

            {/* Uploaded Image Preview */}
            {uploadedImage && (
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">Current Background:</h3>
                <img 
                  src={uploadedImage} 
                  alt="Certificate background" 
                  className="w-full max-w-sm h-32 object-cover rounded-lg border shadow-sm mx-auto" 
                />
              </div>
            )}

            {/* Generate Button */}
            <button 
              onClick={handleGenerate} 
              disabled={loading || !name || !email}
              className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl shadow-lg btn-hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                  </svg>
                  <span>Generating Certificate...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Generate Certificate</span>
                </span>
              )}
            </button>

            {/* Success Message */}
            {message && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Certificate Preview Modal */}
        <dialog id="certificate-modal" className="modal">
          <div className="modal-box max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">Certificate Preview</h2>
              <p className="text-neutral-600">Review your certificate before sending</p>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-6">
              <canvas ref={canvasRef} className="w-full border border-neutral-300 rounded-lg shadow-sm"></canvas>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button 
                onClick={handleSendCertificate}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg shadow-sm btn-hover-scale focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Send Certificate
              </button>
              <form method="dialog">
                <button className="px-6 py-3 text-sm font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors duration-200">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Generate;
