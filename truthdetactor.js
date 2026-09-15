function detectTruth() {

    let question = document.getElementById("question").value;

    if (question.trim() === "") {
        alert("Please enter a question!");
        return;
    }

    // Hide previous result
    document.getElementById("answerBox").style.display = "none";

    // Show loading
    document.getElementById("loading").style.display = "block";

    document.getElementById("result").innerText = "ANALYZING...";
    document.getElementById("percentage").innerText = "0%";

    // Fake scanning animation
    let percentage = 0;

    let scanner = setInterval(function () {

        percentage += Math.floor(Math.random() * 10) + 1;

        if (percentage >= 100) {
            percentage = 100;
            clearInterval(scanner);
        }

        document.getElementById("percentage").innerText =
            percentage + "%";

    }, 100);

    // Show result after 2 seconds
    setTimeout(function () {

        document.getElementById("loading").style.display = "none";

        let randomNumber = Math.random();

        let result;
        let message;

        if (randomNumber < 0.5) {

            result = "✅ TRUTH";
            message = "The detector thinks this statement is TRUE.";

        } else {

            result = "❌ LIE";
            message = "The detector thinks this statement is FALSE.";

        }

        document.getElementById("result").innerText = result;

        document.getElementById("answer").innerText = result;

        document.getElementById("message").innerText = message;

        document.getElementById("answerBox").style.display = "block";

    }, 2200);
}