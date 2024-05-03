document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submitButton").addEventListener("click", function() {
        const passcodeInput = document.getElementById("passcodeInput").value;
        // Clean password input to prevent against XSS and SQL injections
        var sanitizedInput = passcodeInput.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        chrome.storage.local.get('pin', function(result) {
            if (sanitizedInput === result.pin) {
                window.location.href = "delete_history.html";
            } else {
                alert("Thank you for your feedback!"); // malicious user, thank for feedback but don't show secret page
                window.location.reload();
            }
        });
    });
});