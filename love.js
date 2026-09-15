function calculateLove() {

    let name1 = document.getElementById("name1").value.trim();
    let name2 = document.getElementById("name2").value.trim();

    // Check names
    if (name1 === "" || name2 === "") {

        alert("Please enter both names ❤️");

        return;
    }

    // Generate random love percentage
    let love = Math.floor(Math.random() * 41) + 60;

    // Show percentage
    document.getElementById("percentage").innerText =
        love + "%";

    let message = "";
    let details = "";

    if (love >= 90) {

        message = "💖 Perfect Match!";
        details = name1 + " ❤️ " + name2 +
            " — You two are made for each other!";

    } 
    else if (love >= 80) {

        message = "💕 Amazing Love!";
        details = name1 + " ❤️ " + name2 +
            " — Your relationship looks very strong!";

    } 
    else if (love >= 70) {

        message = "💗 Great Match!";
        details = name1 + " ❤️ " + name2 +
            " — There is a beautiful connection!";

    } 
    else {

        message = "💘 Good Match!";
        details = name1 + " ❤️ " + name2 +
            " — Give your love some more time!";
    }

    document.getElementById("message").innerText =
        message;

    document.getElementById("details").innerText =
        details;

    // Display result
    document.getElementById("result").style.display =
        "block";
}