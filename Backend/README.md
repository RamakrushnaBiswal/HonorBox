# 🎓 HonorBox Backend
A robust certificate generation and verification system built with Node.js, Express, and MongoDB. This backend service supports:
- ✅ Dynamic certificate generation with QR codes
- 📩 Certificate delivery via email
- 🔒 Google Authentication integration
- 🖼️ Image upload and retrieval
- 🔍 Certificate verification through web and API

## 📁 Project Structure
```bash
/Backend
│
├── config/                  # DB configuration
├── controllers/            # Logic for certificate & image processing
├── models/                 # Mongoose schemas
├── routes/                 # RESTful API endpoints
├── index.js                # Entry point
├── .env                    # Environment variables (not pushed)
├── package.json
└── README.md
```

## 🚀 Features
### 🏷️ Certificate API: 
- Generate certificate with name, email, and type
- Send certificate to email as an attachment
- Verify certificate via unique QR code
- Frontend-friendly HTML verification view
- Fetch all certificates

### 🖼️ Image API
- Upload and store images as base64 strings
- Retrieve uploaded images

### 👤 Auth API
Google Auth user registration & lookup

## 🔌 API Endpoints
### 🎓 Certificate Routes

| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| POST   | `/api/generate`               | Generate a new certificate       |
| POST   | `/api/send-certificate`       | Send certificate via email       |
| GET    | `/api/certificates`           | Get all certificates             |
| GET    | `/api/verify/:uniqueId`       | Verify certificate via API       |
| GET    | `/api/certificate/:uniqueId`  | Verify certificate (HTML view)   |


### 🖼️ Image Routes

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| POST   | `/api/images/upload-image`    | Upload image             |
| GET    | `/api/images/get-images`      | Retrieve uploaded images |

### 🔐 Auth Route

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| POST   | `/auth/user`  | Register or validate Google user   |


## Tech Stack
| Node.js / Express.js | Backend API framework   |
| MongoDB / Mongoose   | NoSQL Database and ORM  |
|       Joi            |    Schema validation    |
|      QRCode          |    QR code generation   |
|     Nodemailer       |      Email service      |
|      Multer          |   File upload handling  |
|    Google OAuth      | Social login integration|


## 🛠️ Installation & Usage
- Clone the repo
```bash
git clone https://github.com/RamakrushnaBiswal/HonorBox.git
cd HonorBox/Backend
```

- Install dependencies
```bash
npm install
``` 

- Start the server
```bash
node index.js
The backend should now be running on http://localhost:5000
```

## 💡 Example Certificate Payload
```json
POST /api/generate
{
  "name": "John Doe",
  "email": "john@example.com",
  "certificateType": "Excellence"
}
```

## 📬 Example Email Sending Payload
```json
POST /api/send-certificate
{
  "email": "john@example.com",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## 📃 License
This project is licensed under the MIT License.
