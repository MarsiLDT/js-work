
const productNames: string[] = ["Wireless mouse", "Mechanical keyboard", "Monitor 27\"", "USB-C Hub", "Webcam"];

const prices: number[] = [2500, 4500.50, 18990, 3200.99, 5400];

const availability: boolean[] = [true, true, false, true, false];

const productRows: [string, number, boolean][] = [
["Wireless mouse", 2500, true],
["Mechanical keyboard", 4500.50, true],
["Monitor 27\"", 18990, false],
["USB-C Hub", 3200.99, true],
["Webcam", 5400, false]
];

const availableProducts = productRows.filter(product => product[2] === true);

const productLabels = availableProducts.map(product => `${product[0]} — ${product[1]} руб.`);

const totalAvailableSum = availableProducts.reduce((sum, product) => sum + product[1], 0);

function printStatistics(labels: string[], totalSum: number): void {
console.log("=== ДОСТУПНЫЕ ТОВАРЫ ===");
labels.forEach(label => console.log(`- ${label}`));
console.log(`========================`);
console.log(`Итоговая стоимость доступных товаров: ${totalSum.toFixed(2)} руб.`);
}

printStatistics(productLabels, totalAvailableSum);

console.log("\n=== ПРОВЕРКА ЦЕН ИЗ СТРОК ===");
function validatePriceFromString(input: string): number | null {
const parsedNumber = Number(input);

if (!Number.isFinite(parsedNumber)) {
console.log(`Ошибка: "${input}" не является корректным числом.`);
return null;
}

if (parsedNumber < 0) {
console.log(`Ошибка: цена не может быть отрицательной ("${input}").`);
return null;
}

return parsedNumber;
}

console.log("Результат для '1500':", validatePriceFromString("1500"));
console.log("Результат для 'not a price':", validatePriceFromString("not a price"));
console.log("Результат для '-500':", validatePriceFromString("-500"));


function stopProgram(message: string): never {
throw new Error(message);
}

// stopProgram("Критическая ошибка каталога: база данных недоступна"); 