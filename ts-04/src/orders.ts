interface OrderItem {
    id: number;
    title: string;
    unitPrice: number;
    quantity: number;
}

interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    discountPercent?: number;
}

type PriceFormatter = (value: number) => string;

const orders: Order[] = [
    {
        id: 101,
        customer: "Иван Петров",
        items: [
            { id: 1, title: "Клавиатура", unitPrice: 3500, quantity: 1 },
            { id: 2, title: "Мышь", unitPrice: 1200, quantity: 2 }
        ]
    },
    {
        id: 102,
        customer: "Анна Смирнова",
        items: [
            { id: 3, title: "Монитор", unitPrice: 25000, quantity: 1 },
            { id: 4, title: "Кабель HDMI", unitPrice: 800, quantity: 3 }
        ],
        discountPercent: 10
    },
    {
        id: 103,
        customer: "Сергей Иванов",
        items: [
            { id: 5, title: "Ноутбук", unitPrice: 65000, quantity: 1 },
            { id: 6, title: "Коврик для мыши", unitPrice: 600, quantity: 1 },
            { id: 7, title: "Флешка 64GB", unitPrice: 1500, quantity: 2 }
        ],
        discountPercent: 5
    }
];

function calculateItemTotal(item: OrderItem): number {
    return item.unitPrice * item.quantity;
}

function calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

function applyDiscount(subtotal: number, percent: number = 0): number {
    if (percent < 0 || percent > 100) {
        throw new Error("Скидка должна быть в пределах от 0 до 100%");
    }
    return subtotal - (subtotal * percent / 100);
}

function formatPrice(value: number, currency: string = "RUB"): string {
    return `${value.toFixed(2)} ${currency}`;
}

function formatOrder(order: Order, formatter: PriceFormatter = formatPrice): string {
    const subtotal = calculateSubtotal(order.items);
    const total = applyDiscount(subtotal, order.discountPercent);

    return `Заказ #${order.id} | Покупатель: ${order.customer} | Итого: ${formatter(total)}`;
}

function selectItems(items: OrderItem[], predicate: (item: OrderItem) => boolean): OrderItem[] {
    return items.filter(predicate);
}

const isExpensiveItem = (item: OrderItem): boolean => item.unitPrice > 2000;
const isQuantityMoreThanOne = (item: OrderItem): boolean => item.quantity > 1;

console.log("=== СВОДКИ ПО ЗАКАЗАМ ===");
orders.forEach(order => {
    console.log(formatOrder(order));
});

console.log("\n=== ДЕМОНСТРАЦИЯ КАСТОМНОГО ФОРМАТТЕРА ===");
const customFormatter: PriceFormatter = (value) => `${value.toFixed(2)} руб.`;
console.log(formatOrder(orders[1], customFormatter));

console.log("\n=== РАБОТА С ПОЗИЦИЯМИ ЗАКАЗА (на примере заказа #101) ===");
const currentOrderItems = orders[0].items;

const expensiveItems = selectItems(currentOrderItems, isExpensiveItem);
console.log("Позиции дороже 2000:", expensiveItems.map(i => i.title));

const bulkItems = selectItems(currentOrderItems, isQuantityMoreThanOne);
console.log("Позиции с количеством > 1:", bulkItems.map(i => i.title));

const allItemTitles: string[] = currentOrderItems.map(item => item.title);
console.log("\nМассив названий всех позиций заказа #101:", allItemTitles);

console.log("\n=== ПОИСК ПОЗИЦИИ ===");
const searchId = 2;
const foundItem = currentOrderItems.find(item => item.id === searchId);

if (foundItem !== undefined) {
    console.log(`Найдена позиция с ID ${searchId}: ${foundItem.title}`);
} else {
    console.log(`Позиция с ID ${searchId} не найдена.`);
}

const missingItem = currentOrderItems.find(item => item.id === 999);
if (missingItem !== undefined) {
    console.log(`Найдена позиция: ${missingItem.title}`);
} else {
    console.log("Позиция с ID 999 не найдена (корректно обработан undefined).");
}