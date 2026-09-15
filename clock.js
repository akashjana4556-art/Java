function updateClock() {

    // Get system date and time
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();


    // Calculate hour hand angle
    const hourAngle =
        ((hours % 12) * 30) +
        (minutes * 0.5);


    // Calculate minute hand angle
    const minuteAngle =
        (minutes * 6) +
        (seconds * 0.1);


    // Calculate second hand angle
    const secondAngle =
        (seconds * 6) +
        (milliseconds * 0.006);


    // Move hour hand
    document.getElementById("hourHand").style.transform =
        `translateX(-50%) rotate(${hourAngle}deg)`;


    // Move minute hand
    document.getElementById("minuteHand").style.transform =
        `translateX(-50%) rotate(${minuteAngle}deg)`;


    // Move second hand
    document.getElementById("secondHand").style.transform =
        `translateX(-50%) rotate(${secondAngle}deg)`;
}


// Start clock
updateClock();


// Update clock continuously
setInterval(updateClock, 50);
