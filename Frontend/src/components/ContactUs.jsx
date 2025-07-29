import { useState } from 'react';
import Footer from "./Footer";

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
       if (res.ok && data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
         setStatus(data.error || 'Unknown error');
  console.error('Form submission failed:', data.error || 'Unknown error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','email','subject'].map(field => (
          <input
            key={field}
            name={field}
            type={field==='email'?'email':'text'}
            placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
            required
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}
        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          required
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {status==='loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
      {status==='sent' && <p className="mt-4 text-green-600">Thanks! We’ll be in touch.</p>}
      {typeof status === 'string' && status !== 'loading' && status !== 'sent' && (
  <p className="mt-4 text-red-600">{status}</p>
)}
    </div>
    <Footer />
    </>
  );
}
