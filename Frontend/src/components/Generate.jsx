import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import DarkVeil from "./DarkVeil";

const Generate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [certificateType, setCertificateType] = useState("Participation");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");

  const canvasRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchLatestImage();
  }, [fetchLatestImage]); // ✅ Correct usage

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchLatestImage = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/get-images`);
      const data = await response.json();
      if (response.ok) {
        setUploadedImage(data.imageUrl);
      }
    } catch {
      console.error("Error fetching latest image.");
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
        setMessage(`Certificate generated successfully! ID: ${data.certificate.uniqueId}`);

        const certLink = `${BACKEND_URL}/api/certificate/${data.certificate.uniqueId}`;
        QRCode.toDataURL(certLink, { width: 120 })
          .then((qrCodeUrl) => {
            generateCanvasCertificate(qrCodeUrl, data.certificate.uniqueId);
          })
          .catch(() => {
            console.error("QR Code Generation Error");
          });

        document.getElementById("certificate-modal")?.showModal();
      } else {
        setMessage(data.message || "Failed to generate certificate.");
      }
    } catch {
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

    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Certificate of ${certificateType}`, 400, 200);
      ctx.font = "50px Arial bold italic";
      ctx.fillStyle = "#004aad";
      ctx.fillText(name, 400, 320);
      ctx.font = "16px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Congratulations on your achievement!", 400, 500);
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

    if (backgroundImage) {
      const bgImage = new Image();
      bgImage.src = backgroundImage;
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        draw();
      };
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
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

        setName("");
        setEmail("");
        setCertificateType("Participation");
        setMessage("");
      } else {
        alert(data.message || "Failed to send certificate.");
      }
    } catch {
      alert("Error sending certificate. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "visible" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div style={{ position: "relative", zIndex: 1 }} className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-white drop-shadow-lg tracking-tight">
          Generate Certificate
        </h1>
        <div className="w-full max-w-md rounded-2xl bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-2xl p-8 flex flex-col gap-4">
          <label className="text-lg font-semibold text-white/90">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter recipient's name"
            className="input input-bordered w-full bg-white/80 text-gray-900 font-semibold rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="text-lg font-semibold text-white/90">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter recipient's email"
            className="input input-bordered w-full bg-white/80 text-gray-900 font-semibold rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="text-lg font-semibold text-white/90">Certificate Type:</label>
          <select
            value={certificateType}
            onChange={(e) => setCertificateType(e.target.value)}
            className="select select-bordered w-full bg-white/80 text-gray-900 font-semibold rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="Participation">Participation</option>
            <option value="Completion">Completion</option>
            <option value="Excellence">Excellence</option>
            <option value="Achievement">Achievement</option>
          </select>

          <label className="text-lg font-semibold text-white/90">Upload Certificate Background:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="file-input file-input-bordered w-full"
          />

          {uploadedImage && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-white/90">Uploaded Image:</h2>
              <img src={uploadedImage} alt="Uploaded" className="w-64 h-64 rounded-lg border shadow-md" />
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-lg font-extrabold font-[Inter] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            {loading ? "Generating..." : "Generate Certificate"}
          </button>

          {message && <p className="text-green-400 mt-4 text-center font-semibold">{message}</p>}
        </div>

        <dialog id="certificate-modal" className="modal">
          <div className="modal-box">
            <h2 className="text-2xl font-bold text-center mb-4">Certificate Preview</h2>
            <canvas ref={canvasRef} className="w-full border"></canvas>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleSendCertificate}>Send</button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Generate;
