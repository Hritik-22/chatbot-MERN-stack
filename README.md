# 🧠 AI Chatbot – MERN Stack Project

## 📌 Project Overview

This is a full-stack AI-powered chatbot application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and integrated with **Google Gemini API** for intelligent conversational capabilities.

### 🌟 Key Features

- 💬 **AI Chat Interface** using Gemini API  
- 🧪 **10 Free Message Trials** without login  
- 🔐 **OAuth2 Authentication** (Google Login)  
- 🕓 **Chat History Tracking** (Post-login)  
- 📜 **Persistent User Sessions**  
- 💾 **MongoDB Storage** for user data and chat history  

---

## 🧱 Tech Stack

| Layer         | Technology                |
|---------------|---------------------------|
| Frontend      | React.js, Material UI     |
| Backend       | Node.js, Express.js       |
| AI Integration| Gemini API (Google)       |
| Authentication| OAuth2 (Google OAuth)     |
| Database      | MongoDB (Mongoose ODM)    |
| State Management | Context API            |
| Routing       | React Router              |

---

## 🔐 Authentication Flow

- Users can interact with the chatbot **up to 10 times** without logging in.
- Once the limit is reached, they are prompted to **log in with Google**.
- Post-login:
  - The user's previous conversations are **retrieved and displayed**.
  - New chats are **persistently stored** in the database.

### OAuth2 (Google) Integration
- Secured via Google OAuth2.
- Upon successful login, a secure session or JWT is issued.
- Each user is uniquely identified via their Google account.

---

## 💡 Functional Modules

### 1. **Frontend**
- Built using **React.js + Material UI**
- Chat UI mimics **ChatGPT / Deepseek /gemini style UX**
- Uses `fetch` or `axios` to communicate with backend routes
- Responsive design for mobile & desktop 

### 2. **Backend**
- Express.js API routes:
  - `/api/v1/chatbot`: Handles prompts and responses via Gemini API
  - `/api/v1/login`: OAuth2 login and token handling
  - `/api/v1/history`: Fetches past chat logs

### 3. **Database (MongoDB)**
- **User Schema**: Stores Google ID, email, profile info  
- **Chat Schema**: Stores prompt-response pairs with timestamps and user association  

---




### 2. Setup Environment Variables

Create `.env` in `/server`:
```
PORT=5000
MONGODB_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 4. Run the App

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start
```

---

## 📷 Demo Screenshots

> 💬 Chat Interface  
> 🔐 Login with Google  
> 📜 Chat History

---
![Screenshot (96)](https://github.com/user-attachments/assets/af173473-d764-48b4-90cc-e80d90a60aac)
![Screenshot (97)](https://github.com/user-attachments/assets/279475ab-e177-4b60-932e-d62cb63a7fbe)
![Screenshot (98)](https://github.com/user-attachments/assets/7bd30da9-e759-4fd8-a501-f1addb36a675)
![Screenshot (99)](https://github.com/user-attachments/assets/5d9d6838-942c-4bfa-a3e2-4ee7fbbccafc)
![Screenshot (100)](https://github.com/user-attachments/assets/e31e3bce-a1a8-4a89-8969-0a07fd4a364b)
![Screenshot (101)](https://github.com/user-attachments/assets/c3477e01-54f0-4ed0-8019-d3381742f226)



> Built by Ritik Dubey  
>  [Website](https:www.ritik.top) | [GitHub](https://github.com/Hritik-22)
