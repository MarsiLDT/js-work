const productName: string = "Wireless mouse";
let unitPrice: number = 2500;
let quantity: number = 3;
const discountPercent: number = 10;

const output = document.querySelector("#result");

if (unitPrice < 0 || quantity < 1) {
    const message = "Ошибка: цена не может быть отрицательной, а количество должно быть не меньше 1.";
    if (output !== null) {
        output.textContent = message;
    }
    console.log(message);
} else {
    const total = unitPrice * quantity;
    const discountedTotal = total * (1 - discountPercent / 100);

    if (output !== null) {
        output.textContent = `${productName}: ${discountedTotal} руб. (скидка ${discountPercent}%)`;
    }

    console.log(`${productName}: ${discountedTotal} руб. (скидка ${discountPercent}%)`);
}