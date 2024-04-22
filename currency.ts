#! /usr/bin/env node

interface ExchangeRates {
    [key: string]: number;
}

const exchangeRates: ExchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 109.50,
    PKR: 174.15 // Exchange rate as of a certain date
};

async function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): Promise<number> {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
        throw new Error('Invalid currency');
    }

    // Convert amount to base currency (USD)
    const baseAmount = amount / fromRate;

    // Convert base currency to target currency
    return baseAmount * toRate;
}

async function main() {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'PKR']; // Available currencies
    const fromCurrency = await selectCurrency('Select source currency:', currencies);
    const toCurrency = await selectCurrency('Select target currency:', currencies.filter(c => c !== fromCurrency));
    const amount = await getAmount();

    try {
        const result = await convertCurrency(amount, fromCurrency, toCurrency);
        console.log(`${amount} ${fromCurrency} is approximately ${result.toFixed(2)} ${toCurrency}`);
    } catch (error) {
        console.error(error);
    }
}

async function selectCurrency(message: string, currencies: string[]): Promise<string> {
    console.log(message);
    console.log('Available currencies:');
    currencies.forEach((currency, index) => console.log(`${index + 1}. ${currency}`));

    const response = await getUserInput('Enter the number corresponding to the currency: ');
    const selectedIndex = parseInt(response, 10) - 1;

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= currencies.length) {
        console.error('Invalid selection. Please select a number from the list.');
        return selectCurrency(message, currencies);
    }

    return currencies[selectedIndex];
}

async function getAmount(): Promise<number> {
    const response = await getUserInput('Enter the amount to convert: ');
    const amount = parseFloat(response);

    if (isNaN(amount) || amount <= 0) {
        console.error('Invalid amount. Please enter a valid number.');
        return getAmount();
    }

    return amount;
}

async function getUserInput(message: string): Promise<string> {
    process.stdout.write(message);
    return new Promise(resolve => {
        process.stdin.once('data', data => {
            resolve(data.toString().trim());
        });
    });
}

main();
