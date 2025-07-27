# SayRight – Frontend (Pronunciation App)

This is the **React + TypeScript** frontend for the SayRight web application — a dynamic tool for improving English pronunciation through interactive word exploration, real-time recording, and AI-powered feedback.

---

## 🌐 Overview

- 🎧 Record your pronunciation and get instant feedback powered by AI
- 🧠 Practice words by category, difficulty, or language
- 📈 Track your attempts and progress
- 🌍 Multi-language interface (English, Spanish, Polish)
- 🔐 Authentication with Firebase (email and Google)
- ☁️ Cloud storage of pronunciation attempts via Cloudinary
- 💡 Friendly UI with animated transitions and responsive design

---

## 📁 Project Structure

```plaintext
src/
├── auth/              # Login, Register, Google Sign-In
├── components/        # Reusable components (modals, switchers, widgets)
├── contexts/          # User context for auth state
├── features/record/   # Recorder widget (record, replay, send)
├── firebase/          # Firebase config and auth
├── hooks/             # Custom React hooks (e.g. useRecorder)
├── i18n/              # Multilingual support (EN, ES, PL)
├── layout/            # Header, Footer
├── pages/             # Main views (home, dashboard, details, contact, etc.)
├── services/          # API communication layer
├── types/             # TypeScript interfaces
├── utils/             # Utility functions (e.g. uploadAudio)
├── App.tsx            # Root component
└── main.tsx           # App entry point
```

## 🚀 Key Features

### 🧾 Word List & Details

#### `WordList.tsx`
- Displays paginated word results
- Supports filtering by category and difficulty
- Includes search functionality and page navigation

#### `WordDetails.tsx`
- Displays full word details
- Enables real-time pronunciation recording
- Submits audio for AI feedback and scoring
- Shows attempt history with delete and progress tracking

---

### 🔊 Recording & Feedback

- Record pronunciation via microphone  
- Upload audio to **Cloudinary**  
- Receive transcription and feedback via backend (**AssemblyAI + LLM**)  
- Save pronunciation attempts  
- Mark words as `mastered` or `practice`

---

### 📋 Pages

- `/` — Main landing page  
- `/dashboard` — explore page 
- `/words` — Paginated word list  
- `/words/:id` — Full word detail with recording  
- `/record` — Standalone recording view  
- `/login`, `/register`, `/logout` — Authentication  
- `/contact`, `/privacy-policy`, `/about` — Informational static pages

---

### 🌍 Internationalization (i18n)

Supported languages:

- 🇬🇧 English (`en`)
- 🇪🇸 Spanish (`es`)
- 🇵🇱 Polish (`pl`)

Includes automatic language detection and manual override via `LanguageSwitcher.tsx`.

---

### 🧪 Technologies Used

- **React + TypeScript**
- **Tailwind CSS**
- **React Router**
- **Firebase Auth** (Email + Google)
- **Cloudinary** (for audio storage)
- **AssemblyAI + LLM feedback** (via backend)
- **i18next** (for multilingual support)

---

### ✨ Acknowledgments

This app is part of the **SayRight** project — created to help English learners build clarity and confidence in their speech through practical, interactive feedback.

---
