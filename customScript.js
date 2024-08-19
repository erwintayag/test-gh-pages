console.log("This is a custom script from GH...");
// debugger;

// Toggle the details fields
function fnSetDetailsFieldsDisplay(isDisplay) {
    let display = isDisplay ? 'block' : 'none';
    document.getElementById("newPassword").style.display = display;
    document.getElementById("reenterPassword").style.display = display;
    document.getElementById("givenName").style.display = display;
    document.getElementById("surname").style.display = display;
    document.getElementById("continue").style.display = display;
}

// // Show the username and password fields after verification
// function showPasswordFields() {
//     document.getElementById("newPassword").style.display = "block";
//     document.getElementById("reenterPassword").style.display = "block";
// }

fnSetDetailsFieldsDisplay(false);

// Hook into the verification process
document.getElementById("email_ver_but_verify").addEventListener("click", function() {
    // Assuming the verification is successful
    fnSetDetailsFieldsDisplay(true);
});

document.getElementById("email_ver_but_edit").addEventListener("click", function() {
    // Assuming the verification is successful
    hidePasswordFields(false);
});

