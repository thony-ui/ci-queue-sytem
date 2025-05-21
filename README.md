# 🛠️ Mini CI System (Node.js + TypeScript)

A minimal Continuous Integration (CI) system built with Node.js, TypeScript, BullMQ, and Redis.

This app listens for webhook events. It clones the repo, runs tests, and prints build logs.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/thony-ui/ci-queue-system.git
cd ci-queue-system
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Redis Server

Make sure you have Redis installed. If not, install via:

```bash
brew install redis        # macOS
sudo apt install redis    # Ubuntu/Debian
```

Then start Redis:

```bash
redis-server
```

### 4. Start the App

Start the API server

```bash
npm run dev
```

---

## 🧪 Trigger a CI Job

### Option 1: cURL

```bash
curl -X POST http://localhost:3000/ci/webhook \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/your-user/your-repo.git", "branch": "main"}'
```

### Option 2: Postman

* **POST**: `http://localhost:3000/ci/webhook`
* **Body (JSON)**:

```json
{
  "repoUrl": "https://github.com/your-user/your-repo.git",
  "branch": "main"
}
```

---

## ✅ Example Output

```bash
[CI Worker] Starting job 42
[CI] Cloning https://github.com/your-user/your-repo.git
[CI] Running tests...
[CI] Build passed!
```

---

## 📂 .env

```env
PORT=3000
REDIS_HOST=127.0.0.1
WORKDIR=./builds
```

---

## 📦 Tech Stack

* Node.js + TypeScript
* Express.js
* BullMQ (Redis-based job queue)
* simple-git
* child_process (`npm install`, `npm test`)


