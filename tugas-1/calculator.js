const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("=== Kalkulator Sederhana ===");
  console.log("1. Penjumlahan (+)");
  console.log("2. Pengurangan (-)");
  console.log("3. Perkalian (*)");
  console.log("4. Pembagian (/)");
  console.log("5. Keluar");

  rl.question("Pilih operasi (1-5): ", (choice) => {
    // Handle user's choice
    switch (choice) {
        case "1":
            performOperation("+");
            break;
        case "2":
            performOperation("-");
            break;
        case "3":
            performOperation("*");
            break;
        case "4":
            performOperation("/");
            break;
        case "5":
            console.log("Terima kasih telah menggunakan kalkulator sederhana!");
            rl.close();
            break;
        default:
            console.log("Pilihan tidak valid. Silakan coba lagi.");
            showMenu();
            break;
    }
  });
}

function performOperation(operator) {
  rl.question("Masukkan angka pertama: ", (num1) => {
    rl.question("Masukkan angka kedua: ", (num2) => {
      const result = simpleCalculator(parseFloat(num1), parseFloat(num2), operator);
      console.log(`Hasil dari ${num1} ${operator} ${num2} = ${result}`);
      showMenu(); // Show the menu again after the operation
    });
  });
}

function simpleCalculator(num1, num2, operator) {
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            throw new Error('Operator tidak valid');
    }
    return result;
}

// Start the calculator
showMenu();