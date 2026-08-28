const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ageClassifications = {
    "Anak-anak": 0,
    "Remaja": 0,
    "Dewasa": 0,
    "Lansia": 0
}

console.log('--- Program Klasifikasi Umur ---');
console.log('Masukkan umur satu per satu (pisahkan dengan Enter).');
console.log('Ketik "selesai" untuk melihat hasil.\n');

function askForAge() {
    rl.question("Masukkan umur: ", (input) => {
        if (input.toLowerCase() === "selesai") {
            showResults();
            rl.close();
            return;
        }

        const age = parseInt(input, 10);
        if (isNaN(age) || age < 0) {
            console.log("Input tidak valid. Harap masukkan angka.");
            askForAge();
            return;
        } else {
            if (age <= 13) {
                ageClassifications["Anak-anak"]++;
            } else if (age <= 18) {
                ageClassifications["Remaja"]++;
            } else if (age <= 60) {
                ageClassifications["Dewasa"]++;
            } else {
                ageClassifications["Lansia"]++;
            }
            console.log(`Umur ${age} telah diklasifikasikan.`);
        }
        askForAge();
    });
}

function showResults() {
    console.log("\n--- Hasil Klasifikasi Umur ---");
    console.log(`Anak-anak: ${ageClassifications["Anak-anak"]}`);
    console.log(`Remaja: ${ageClassifications["Remaja"]}`);
    console.log(`Dewasa: ${ageClassifications["Dewasa"]}`);
    console.log(`Lansia: ${ageClassifications["Lansia"]}`);
}

askForAge();