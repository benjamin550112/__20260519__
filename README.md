# AI 會議記錄生成與翻譯工具 (AI Meeting Assistant)

這是一個基於 **React 19 (Vite) + Node.js (Express)** 與 **Google Gemini API** 的全端會議記錄自動整理與翻譯工具。本專案已完全通用化，可無縫部屬至任何雲端主機平台（如 Render, Railway, Zeabur, VPS）或以 Docker 容器化運行。

---

## 🌟 功能特點

- **快速會議整理**：貼上會議逐字稿即可自動提取「主題」、「時間」、「與會者」。
- **結構化總結**：精準提煉 3-5 個會議重點，條理清晰。
- **待辦事項 (Action Items)**：明確劃分代辦清單與負責人，便於後續追蹤。
- **專業英文翻譯**：一鍵將整理好的會議記錄翻譯成高品質、商務級英文。
- **極速流暢體驗**：搭載 Tailwind CSS v4 與 Motion 動態視覺，提供優雅的使用體驗。

---

## 🛠️ 技術棧 (Tech Stack)

- **前端 (Frontend)**：React 19、Vite 6、Tailwind CSS v4、Motion、Lucide React、React Markdown
- **後端 (Backend)**：Node.js、Express、tsx (開發運行)、esbuild (生產打包)
- **AI 引擎 (AI Engine)**：Google GenAI SDK (`@google/genai`) 支援的 `gemini-2.5-flash`

---

## 🚀 本地快速啟動 (Local Development)

### 前置需求
- 已安裝 **Node.js** (建議 v18 以上版本)
- 已取得 **Gemini API 金鑰** (可至 [Google AI Studio](https://aistudio.google.com/) 免費申請)

### 步驟說明
1. **安裝依賴套件**：
   ```bash
   npm install
   ```

2. **設定環境變數**：
   將專案目錄下的 `.env` 檔案打開，並將您的金鑰填入：
   ```env
   GEMINI_API_KEY="您的_GEMINI_API_KEY"
   PORT=3000
   GEMINI_MODEL="gemini-2.5-flash"
   ```

3. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```
   啟動後，在瀏覽器打開 `http://localhost:3000` 即可使用！

---

## 📦 生產打包與部署 (Production & Deployment)

專案採用 Express 後端直接託管 React 前端靜態資源的設計，僅需打包成一個執行檔即可輕鬆部署。

### 1. 本地構建測試 (Local Build)
在本地進行打包測試：
```bash
npm run build
```
此指令會：
- 透過 Vite 打包前端網頁至 `dist/` 目錄。
- 透過 esbuild 打包後端伺服器為單一檔案 `dist/server.cjs`。

打包完成後，可使用以下指令啟動生產環境：
```bash
npm run start
```

---

## ☁️ 雲端平台部署指南 (Cloud Deployment Guide)

本專案支援一鍵部署至多個主流平台：

### 方案 A：部屬至 Render (強烈推薦，免費首選)
1. 註冊並登入 [Render](https://render.com/)。
2. 點擊 **New** -> **Web Service**，並連結您的 GitHub 專案。
3. 進行以下設定：
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. 在 **Environment Variables** 區塊中新增環境變數：
   - `GEMINI_API_KEY` = `(您的 Gemini API Key)`
   - `NODE_ENV` = `production`
5. 點擊 **Deploy Web Service** 即可完成部署！

### 方案 B：部屬至 Railway 或 Zeabur
1. 建立新專案並匯入 GitHub 儲存庫。
2. 平台會自動識別 `package.json` 中的 `build` 與 `start` 指令。
3. 在專案設定的 **Variables / Environment** 內新增：
   - `GEMINI_API_KEY` = `(您的 Gemini API Key)`
4. 平台會自動分配 Port 並自動部署上線。

### 方案 C：VPS 或 Docker 自建伺服器
您可以利用專案中的產物，編寫簡單的 Dockerfile 進行部署：
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/server.cjs"]
```
*(注意：在構建 Docker Image 之前，需先在 CI/CD 或本地執行過 `npm run build` 以產生 `dist` 資料夾)*
