document.getElementById("submitButton").addEventListener("click", function() {
    const passcode = document.getElementById("passcodeInput").value;
    if (passcode === "0001") {
        window.location.href = "delete_history.html";
    } else {
        window.location.href = "index.html";
    }

});
