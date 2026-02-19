# Buku Apps 🛒

Buku Apps is a modern, intelligent shopping list application designed to make your grocery runs smoother and more organized. Built with simplicity and performance in mind, it features smart categorization, offline capabilities, and a beautiful mobile-first design.

## ✨ Features

- **Smart Categorization**: Automatically groups items by category (e.g., *Sayuran*, *Daging*, *Minuman*) as you type.
- **Intelligent Icons**: Recognizes specific items (like *Kentang* 🥔, *Pepaya* 🥭, *Ayam Geprek*) and assigns custom icons.
- **Dark Mode**: Fully supported dark theme for a comfortable viewing experience in any light.
- **Persistent History**: Keeps track of your purchase history, allowing you to easily re-add items.
- **Search Functionality**: Quickly find items in your list or history with a sticky, persistent search bar.
- **Clean Copy**: Copy your list to the clipboard as a clean, text-only format—perfect for sharing via WhatsApp or purchase.
- **Offline Capable**: Works offline using PWA technologies and local storage (IndexedDB).
- **Modern UI**: Styled with **Shadcn UI** principles for a consistent, accessible, and professional look.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Database**: [IDB](https://github.com/jakearchibald/idb) (IndexedDB wrapper)
- **Icons**: [Heroicons](https://heroicons.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/senoagung27/buku-apps.git
    cd buku-apps
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📱 Usage

1.  **Add Items**: Type an item name (e.g., "Bayam", "Susu", "Roti") in the chat bar at the bottom and press Enter or the Send button.
2.  **Toggle Items**: Tap an item to mark it as bought (moved to the bottom/history).
3.  **Search**: Use the search bar at the top to filter items.
4.  **Delete**: Tap the trash icon on an item to remove it, or use "Hapus Semua" to clear the list.
5.  **Copy**: Tap the copy icon in the header to get a shareable text list.

## 📄 License

This project is licensed under the ISC License.