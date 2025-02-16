# Real-Time Chat App

A **real-time chat application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with **WebSockets (Socket.io)** for instant messaging. The app allows users to send **text messages and images** in real-time.  

---

## 🚀 Features
### **Real-Time Messaging**
- Uses **Socket.io** for instant, **bi-directional** communication.
- **Messages update in real-time** without refreshing the page.

### **Image Sharing**
- Users can **send images up to 10MB**.
- Images are stored in **Cloudinary** and loaded dynamically.

### **WebSockets for Real-Time Updates**
- **Instant message delivery** using **Socket.io**.
- Users can see **who is online in real-time**.

### **Authentication & Authorization**
- **JWT-based authentication** for secure access.
- **Google OAuth & Email/Password login**.

### **Modern UI with Dark Mode**
- Fully responsive **dark mode UI** using **Tailwind CSS + DaisyUI**.

---

##  Tech Stack
### **Frontend:**
- **React.js** + Vite ⚡  
- **Zustand** (State Management)  
- **Socket.io-client** (Real-Time Communication)  
- **Tailwind CSS + DaisyUI** (UI Components)  

### **Backend:**
- **Node.js + Express.js** (Server)  
- **MongoDB + Mongoose** (Database)  
- **Socket.io** (WebSockets)  
- **Cloudinary** (Image Storage)  

---

## Installation Guide
### 🔧 **1. Clone the Repository**
```sh
git clone https://github.com/kirigaya07/Chat_App.git
cd Chat_App
```

### **2. Backend Setup**
```sh
cd backend
npm install
npm run dev
```
- Create a `.env` file and add:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
PORT = 5001
JWT_SECRET = your_jwt_secret
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = coudinary_api_key
CLOUDINARY_API_SECRET = your_api_secret

```
###  **3. Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

##  API Endpoints

- Authentication
  - `POST /auth/register` → User Signup
  - `POST /auth/login` → User Login

- Messages
  - `GET /messages/:userId` → Fetch Messages
  - `POST /messages/send/:userId` → Send Encrypted Message
- Real-Time WebSockets
  - `newMessage` → Receive New Messages Instantly
  - `getOnlineUsers` → Update Online Users List

## Future Improvments
- End-to-End Encryption (E2EE) using **AES-256** & **RSA-2048**
- Voice & Video Calls using WebRTC
- File Sharing with Encryption
- File Sharing & Cloud Storage Integration
- Multi-Device Sync for Persistent Chats
