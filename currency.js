#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 109.50,
    PKR: 174.15 // Exchange rate as of a certain date
};
function convertCurrency(amount, fromCurrency, toCurrency) {
    return __awaiter(this, void 0, void 0, function () {
        var fromRate, toRate, baseAmount;
        return __generator(this, function (_a) {
            fromRate = exchangeRates[fromCurrency];
            toRate = exchangeRates[toCurrency];
            if (!fromRate || !toRate) {
                throw new Error('Invalid currency');
            }
            baseAmount = amount / fromRate;
            // Convert base currency to target currency
            return [2 /*return*/, baseAmount * toRate];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var currencies, fromCurrency, toCurrency, amount, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currencies = ['USD', 'EUR', 'GBP', 'JPY', 'PKR'];
                    return [4 /*yield*/, selectCurrency('Select source currency:', currencies)];
                case 1:
                    fromCurrency = _a.sent();
                    return [4 /*yield*/, selectCurrency('Select target currency:', currencies.filter(function (c) { return c !== fromCurrency; }))];
                case 2:
                    toCurrency = _a.sent();
                    return [4 /*yield*/, getAmount()];
                case 3:
                    amount = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, convertCurrency(amount, fromCurrency, toCurrency)];
                case 5:
                    result = _a.sent();
                    console.log("".concat(amount, " ").concat(fromCurrency, " is approximately ").concat(result.toFixed(2), " ").concat(toCurrency));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function selectCurrency(message, currencies) {
    return __awaiter(this, void 0, void 0, function () {
        var response, selectedIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(message);
                    console.log('Available currencies:');
                    currencies.forEach(function (currency, index) { return console.log("".concat(index + 1, ". ").concat(currency)); });
                    return [4 /*yield*/, getUserInput('Enter the number corresponding to the currency: ')];
                case 1:
                    response = _a.sent();
                    selectedIndex = parseInt(response, 10) - 1;
                    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= currencies.length) {
                        console.error('Invalid selection. Please select a number from the list.');
                        return [2 /*return*/, selectCurrency(message, currencies)];
                    }
                    return [2 /*return*/, currencies[selectedIndex]];
            }
        });
    });
}
function getAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var response, amount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserInput('Enter the amount to convert: ')];
                case 1:
                    response = _a.sent();
                    amount = parseFloat(response);
                    if (isNaN(amount) || amount <= 0) {
                        console.error('Invalid amount. Please enter a valid number.');
                        return [2 /*return*/, getAmount()];
                    }
                    return [2 /*return*/, amount];
            }
        });
    });
}
function getUserInput(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            process.stdout.write(message);
            return [2 /*return*/, new Promise(function (resolve) {
                    process.stdin.once('data', function (data) {
                        resolve(data.toString().trim());
                    });
                })];
        });
    });
}
main();
