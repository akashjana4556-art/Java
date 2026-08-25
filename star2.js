for (let i = 5; i >= 1; i--) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "* ";
    }
    console.log(row);
}


let num = 153;
let original = num;
let sum = 0;

while (num > 0) {
    let digit = num % 10;
    sum = sum + (digit * digit * digit);
    num = Math.floor(num / 10);
}

if (sum === original) {
    console.log(original + " is an Armstrong number");
} else {
    console.log(original + " is not an Armstrong number");
}



