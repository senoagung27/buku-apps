import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { openDB } from 'idb'

export const useShoppingStore = defineStore('shopping', () => {
    const items = ref([])
    const dbPromise = openDB('shopping-list-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('items')) {
                db.createObjectStore('items', { keyPath: 'id' })
            }
        },
    })

    // Helper to check if date is today
    const isToday = (timestamp) => {
        const date = new Date(timestamp)
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    // Active list: All undone items + Done items created today
    const currentItems = computed(() => {
        return items.value.filter(item => !item.isDone || isToday(item.createdAt))
    })

    // History list: Done items created before today
    const historyItems = computed(() => {
        return items.value
            .filter(item => item.isDone && !isToday(item.createdAt))
            .sort((a, b) => b.createdAt - a.createdAt) // Newest first
    })

    // Group current items by category
    const itemsByCategory = computed(() => {
        const grouped = {}
        currentItems.value.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = []
            }
            grouped[item.category].push(item)
        })
        return grouped
    })

    // Group history by date
    const historyByDate = computed(() => {
        const grouped = {}
        historyItems.value.forEach(item => {
            const dateKey = new Date(item.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            })
            if (!grouped[dateKey]) {
                grouped[dateKey] = []
            }
            grouped[dateKey].push(item)
        })
        return grouped
    })
    // Helper: match keyword as whole word (prevents "bayam" matching "ayam")
    const matchesKeyword = (text, keyword) => {
        const regex = new RegExp(`(^|\\s|\\d)${keyword}($|\\s|\\d)`, 'i')
        return regex.test(text)
    }

    // Enhanced category detection with icons
    const detectCategory = (name) => {
        const lower = name.toLowerCase()

        const categories = [
            {
                name: 'Sayuran & Buah',
                icon: '🥬',
                keywords: ['sayur', 'bayam', 'kangkung', 'sawi', 'wortel', 'tomat', 'cabe', 'bawang', 'brokoli', 'kol', 'timun', 'buncis', 'jeruk', 'apel', 'pisang', 'mangga', 'anggur', 'semangka', 'melon', 'buah', 'alpukat', 'jambu', 'salak', 'pepaya']
            },
            {
                name: 'Daging & Protein',
                icon: '🍗',
                keywords: ['ayam', 'daging', 'ikan', 'sapi', 'kambing', 'telur', 'sosis', 'nugget', 'bakso', 'udang', 'cumi', 'tongkol', 'lele', 'tahu', 'tempe', 'sarden', 'protein', 'kornet']
            },
            {
                name: 'Bahan Pokok',
                icon: '🍚',
                keywords: ['beras', 'minyak', 'gula', 'garam', 'tepung', 'roti', 'mie', 'pasta', 'bihun', 'soun', 'kecap', 'saus', 'santan', 'bumbu', 'micin', 'royco', 'masako', 'kaldu', 'margarin', 'mentega']
            },
            {
                name: 'Minuman',
                icon: '🧃',
                keywords: ['susu', 'kopi', 'teh', 'jus', 'air', 'sirup', 'soda', 'yakult', 'yogurt', 'minum', 'aqua', 'galon']
            },
            {
                name: 'Makanan Ringan',
                icon: '🍪',
                keywords: ['snack', 'chiki', 'keripik', 'biskuit', 'coklat', 'permen', 'kacang', 'wafer', 'jajan', 'roti']
            },
            {
                name: 'Rumah Tangga',
                icon: '🏠',
                keywords: ['sabun', 'shampoo', 'odol', 'sikat', 'tisu', 'deterjen', 'pewangi', 'pembersih', 'spons', 'plastik', 'kresek', 'baterai', 'lampu', 'korek']
            },
            {
                name: 'Kesehatan',
                icon: '💊',
                keywords: ['obat', 'vitamin', 'masker', 'betadine', 'plester', 'hansaplast', 'tolak angin', 'minyak kayu putih', 'autocare']
            }
        ]

        for (const cat of categories) {
            if (cat.keywords.some(k => matchesKeyword(lower, k))) {
                return { name: cat.name, icon: cat.icon }
            }
        }

        return { name: 'Lainnya', icon: '📦' }
    }

    const getSpecificIcon = (name, categoryIcon) => {
        const lower = name.toLowerCase()
        const iconMap = {
            'telur': '🥚',
            'ayam': '🍗',
            'daging': '🥩',
            'sapi': '🐄',
            'ikan': '🐟',
            'tongkol': '🐟',
            'lele': '🐟',
            'sarden': '🥫',
            'tahu': '🧊',
            'tempe': '🍘',
            'beras': '🍚',
            'roti': '🍞',
            'susu': '🥛',
            'keju': '🧀',
            'kopi': '☕',
            'teh': '🍵',
            'jus': '🧃',
            'galon': '🪣',
            'air': '💧',
            'apel': '🍎',
            'pisang': '🍌',
            'anggur': '🍇',
            'jeruk': '🍊',
            'semangka': '🍉',
            'cabe': '🌶️',
            'wortel': '🥕',
            'tomat': '🍅',
            'jagung': '🌽',
            'mie': '🍜',
            'bayam': '🥬',
            'es krim': '🍦',
            'coklat': '🍫',
            'permen': '🍬',
            'kue': '🍰',
            'sabun': '🧼',
            'shampoo': '🧴',
            'sikat': '🪥',
            'odol': '🪥',
            'tisu': '🧻',
            'obat': '💊'
        }

        let bestMatch = null
        for (const [key, icon] of Object.entries(iconMap)) {
            // Use regex to find position of whole-word match
            const regex = new RegExp(`(^|\\s|\\d)${key}`, 'i')
            const match = lower.match(regex)
            if (match) {
                const pos = match.index
                if (!bestMatch || pos < bestMatch.pos) {
                    bestMatch = { icon, pos }
                }
            }
        }
        return bestMatch ? bestMatch.icon : categoryIcon
    }

    const loadItems = async () => {
        const db = await dbPromise
        items.value = await db.getAll('items')
    }

    const addItem = async (input) => {
        if (!input || !input.trim()) return

        const lines = input.split(/\n+/).map(l => l.trim()).filter(l => l.length > 0)

        const db = await dbPromise
        const tx = db.transaction('items', 'readwrite')

        for (const name of lines) {
            const categoryData = detectCategory(name)
            const newItem = {
                id: crypto.randomUUID(),
                name: name,
                category: categoryData.name,
                categoryIcon: categoryData.icon,
                icon: getSpecificIcon(name, categoryData.icon),
                isDone: false,
                createdAt: Date.now()
            }
            tx.store.put(newItem)
            items.value.push(newItem)
        }

        await tx.done
    }

    const toggleItem = async (id) => {
        const db = await dbPromise
        const item = items.value.find(i => i.id === id)
        if (item) {
            item.isDone = !item.isDone
            // Use structuredClone or JSON to strip proxy for IDB
            await db.put('items', JSON.parse(JSON.stringify(item)))
        }
    }

    const deleteItem = async (id) => {
        const db = await dbPromise
        await db.delete('items', id)
        items.value = items.value.filter(i => i.id !== id)
    }

    const clearAll = async () => {
        const db = await dbPromise
        const tx = db.transaction('items', 'readwrite')
        await tx.store.clear()
        await tx.done
        items.value = []
    }

    return {
        items,
        itemsByCategory,
        historyByDate,
        loadItems,
        addItem,
        toggleItem,
        deleteItem,
        clearAll,
        detectCategory // Exported for potential use in UI
    }
})
