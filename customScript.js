console.log("This is a custom script from GH...");
debugger;
// Hide the username and password fields initially
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("email").style.display = "block";
    document.getElementById("newPassword").style.display = "none";
    document.getElementById("reenterPassword").style.display = "none";
    document.getElementById("continueButton").style.display = "none";
});

// Show the username and password fields after verification
function showPasswordFields() {
    document.getElementById("newPassword").style.display = "block";
    document.getElementById("reenterPassword").style.display = "block";
    document.getElementById("continueButton").style.display = "block";
}

// Hook into the verification process
document.getElementById("email_ver_but_send").addEventListener("click", function() {
    // Assuming the verification is successful
    showPasswordFields();
});
