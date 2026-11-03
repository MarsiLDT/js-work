interface SupplierContact {
    email?: string;
    phone?: string;
}

interface Supplier {
    name: string;
    country: string;
    contact?: SupplierContact;
}

interface Product {
    readonly id: number;
    name: string;
    category: string;
    price: number;
    isAvailable: boolean;
    tags: string[];
    supplier: Supplier;
    description?: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Mechanical keyboard",
        category: "Peripherals",
        price: 4590,
        isAvailable: true,
        tags: ["keyboard", "mechanical", "office"],
        supplier: {
            name: "InputPro",
            country: "Germany",
            contact: { email: "sales@inputpro.de", phone: "+49 30 123456" },
        },
        description: "Compact mechanical keyboard with hot-swap switches.",
    },
    {
        id: 2,
        name: "Wireless mouse",
        category: "Peripherals",
        price: 1490,
        isAvailable: true,
        tags: ["mouse", "wireless"],
        supplier: {
            name: "InputPro",
            country: "Germany",
            contact: { email: "sales@inputpro.de" },
        },
    },
    {
        id: 3,
        name: "27\" Monitor",
        category: "Displays",
        price: 12990,
        isAvailable: false,
        tags: ["monitor", "27-inch", "ips"],
        supplier: {
            name: "ViewTech",
            country: "Poland",
        },
        description: "IPS monitor with 144 Hz refresh rate.",
    },
    {
        id: 4,
        name: "USB-C Hub",
        category: "Accessories",
        price: 2990,
        isAvailable: true,
        tags: ["usb-c", "hub", "adapter"],
        supplier: {
            name: "ConnectLab",
            country: "Netherlands",
            contact: { phone: "+31 20 987654" },
        },
    },
    {
        id: 5,
        name: "Laptop stand",
        category: "Accessories",
        price: 1990,
        isAvailable: false,
        tags: ["stand", "aluminium", "ergonomic"],
        supplier: {
            name: "DeskMate",
            country: "Poland",
            contact: { email: "hello@deskmate.pl", phone: "+48 22 111222" },
        },
        description: "Adjustable aluminium stand for 13–17 inch laptops.",
    },
    {
        id: 6,
        name: "Noise-cancelling headphones",
        category: "Audio",
        price: 8990,
        isAvailable: true,
        tags: ["audio", "headphones", "anc"],
        supplier: {
            name: "SoundWave",
            country: "Sweden",
            contact: { email: "support@soundwave.se" },
        },
    },
];

const availableProducts: Product[] = products.filter(
    (product) => product.isAvailable
);
console.log(availableProducts);

const productNames: string[] = products.map((product) => product.name);
console.log(productNames);

function findProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
}

const found = findProductById(3);
if (found !== undefined) {
    console.log(found.name, found.price);
} else {
    console.log("Товар не найден");
}

const notFound = findProductById(999);
if (notFound !== undefined) {
    console.log(notFound.name);
} else {
    console.log("Товар с id=999 не найден");
}

for (const product of products) {
    if (product.description !== undefined) {
        console.log(`${product.name}: ${product.description}`);
    } else {
        console.log(`${product.name}: описание отсутствует`);
    }
}

for (const product of products) {
    const supplier = product.supplier;
    const prefix = `${product.name} → ${supplier.name} (${supplier.country})`;

    if (supplier.contact !== undefined) {
        const { email, phone } = supplier.contact;
        const emailPart = email !== undefined ? `email: ${email}` : "email: —";
        const phonePart = phone !== undefined ? `phone: ${phone}` : "phone: —";
        console.log(`${prefix}: ${emailPart}, ${phonePart}`);
    } else {
        console.log(`${prefix}: контактные данные отсутствуют`);
    }
}

products[0].price = 4290;
console.log(products[0].name, products[0].price);