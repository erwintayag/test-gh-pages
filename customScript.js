var applyB2CAddOns = function() {

    var verifyCodeBtn = document.querySelector(".verifyButton");
    var defaultBtn = document.querySelector(".defaultButton");
    var changeEmailBtn = document.querySelector(".editButton");
    var cancelBtn = document.querySelector("#cancel");
    var continueBtn = document.querySelector("#continue");
    var sendCodeBtn = document.querySelector("#email_ver_but_send");

    // populate the fields with decoded values
    decodeDefaultValuesFromQueryParams();

    // Make sure always remove the continue button if it exists.
    if (continueBtn) {
        continueBtn.remove();
    }

    // Make sure always remove the default button if it exists.
    if (defaultBtn) {
        defaultBtn.remove();
    }

    if (sendCodeBtn && changeEmailBtn.style.display === "none") {
        sendCodeBtn.style.display = "block";
    }

    var readyToRedirect = false;
    $element.confirm = function() {
        readyToRedirect = true;
    };

    var failedToRedirect = false;

    // Overriding following two methods so that we can detect the failure calling these two methods.
    $element.onError = function(code, message, isSendingQuietly) {
        if (isSendingQuietly) {
            $diags.sendQuietDiagnostics(code, message);
        } else {
            $diags.sendDiagnostics(code, message);
        }
        failedToRedirect = true;
        return false;
    }

    // Sets error message and shows it to the user.
    $element.setAndShowErrorMessage = function (id, msg) {
        var $id = $("#" + id);

        if (msg) {
            $id.text(msg);
        }

        // Add the aria attributes and tabindex allowing the message to receive focus
        $id.attr({ "role": "alert", "aria-live": "polite", "aria-hidden": "false", "tabindex": "1" }).css("display", "block");

        failedToRedirect = true;
    }

    // Adding auto submission once found it is a email verification page.
    verifyCodeBtn.onclick = function() {

        failedToRedirect = false;
        readyToRedirect = false;

        // Continue the page once email is validated.
        var verifyInterval = setInterval(function() {
            if ($element.verificationInfo.email.confirmation.success) {
                clearInterval(verifyInterval);
                $element.verify();
                cancelBtn.style.display = "none";
                changeEmailBtn.style.display = "none";
            }
        }, 50);

        // Confirm the page for redirect once server side validate is passed.
        var confirmInterval = setInterval(function() {
            if (readyToRedirect) {
                clearInterval(confirmInterval);
                clearInterval(failedInterval);
                $i2e.redirectToServer("confirmed");
            }
        }, 50);

        // Confirm the page for redirect once server side validate is passed.
        var failedInterval = setInterval(function() {
            if (failedToRedirect) {
                clearInterval(failedInterval);
                cancelBtn.style.display = "inline-block";
                changeEmailBtn.style.display = "inline-block";
            }
        }, 50);
    }

    function decodeDefaultValuesFromQueryParams() {
        // inputs
        var firstName = document.querySelector("#givenName");
        var lastName = document.querySelector("#surname");
        var countryCode = document.querySelector("#inputCountryCode");
        var phoneNumber = document.querySelector("#inputPhoneNumber");
    
        var queryParams = new URLSearchParams(window.location.search);
        var firstNameValue = queryParams.get('first_name');
        if (firstNameValue) {
            // firstName.value = decodeURIComponent(firstNameValue);
            console.log("test:" + firstNameValue);
            firstName.value = decodeURIComponent(firstNameValue);
        }
    
        // if (firstName) {
        //     firstName.value = atob(firstName.value);
        // }
    }
};

(function onPageReady() {
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                applyB2CAddOns();
                clearInterval(intervalHandle);
            }
        }, 50);
}());
