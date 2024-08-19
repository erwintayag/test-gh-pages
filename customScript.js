$(document).ready(function () {
    console.log("this is a custom script from GH...");
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
    document.getElementById("verifyButton").addEventListener("click", function() {
        // Assuming the verification is successful
        showPasswordFields();
    });
}



