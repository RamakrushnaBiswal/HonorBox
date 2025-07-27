# HonorBox Frontend
An open-source, responsive, and interactive frontend for HonorBox, a platform for generating and verifying digital certificates. Built with React, Tailwind CSS, Framer Motion, and OGL for stunning visuals.

## ✨ Features
- ✔️ Generate Certificates: Instant creation of certificates with customizable backgrounds.
- 🔍 Verify Certificates: Validate certificates via unique ID lookup.
- 🌈 DarkVeil Visuals: Real-time GLSL-powered canvas background.
- 🔒 Google OAuth: Secure login flow.
- 📱 Responsive Design: Seamless experience on all devices.

## 🛠 Tech Stack
- Frontend: React, Vite, Tailwind CSS, DaisyUI, Framer Motion
- Rendering: OGL (WebGL) with custom GLSL shaders
- Auth: @react-oauth/google, JWT Decode
- Utilities: QRCode, Axios
- Routing: React Router v7

## ⚙️ Getting Started

- Clone the repository
```bash
git clone https://github.com/<username>/HonorBox.git
cd HonorBox/frontend
```

- Install dependencies
```bash
npm install
```

- Run in development mode
```bash
npm run dev
```

- Open in browser
Navigate `http://localhost:5173` 

## Project Structure
```bash
frontend/
├── public/                 # Static assets (logo)
├── src/
│   ├── components/         # React components
│   │   ├── About.jsx       # About page
│   │   ├── DarkVeil.jsx    # WebGL background canvas
│   │   ├── Generate.jsx    # Certificate generation 
|   |   ├── custom.css      # Additional styles
form
│   │   ├── Home.jsx        # Landing page
│   │   ├── Navbar.jsx      # Navigation bar with Google login
│   │   ├── Verify.jsx      # Certificate verification form
│   │   ├── NotFound.jsx    # 404 page
│   │   └── Footer.jsx      # Site footer
│   ├── App.jsx             # Main app & routing
│   ├── App.css             
│   ├── index.css           
│   └── main.jsx            # Entry point
│   
(ignored)
├── index.html              # HTML template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts
|   Command       |   Description                 |
|-----------------|-------------------------------|
|`npm run dev`    |Start development server (Vite)|
|`npm run build`  |     Build for production      |
|`npm run preview`|   Preview production build    |
|`npm run lint`   |   Lint code with ESLint       |

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
- Fork the repo
- Create a feature branch (git checkout -b feature/my-feature)
- Commit your changes (git commit -m 'Add feature')
- Push to branch (git push origin feature/my-feature)
- Open a Pull Request

Please ensure that your code follows existing conventions and is linted.

## 📜 License
This project is MIT licensed. See the LICENSE in the root repository.