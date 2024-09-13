/*
 * Original: https://github.com/stevenxzhou-zz/B2C-Samples/blob/master/Email-Verification-Automatic-Redirect.js
 */

var applyB2CAddOns = function() {

    var verifyCodeBtn = document.querySelector(".verifyButton");
    var defaultBtn = document.querySelector(".defaultButton");
    var changeEmailBtn = document.querySelector(".editButton");
    var cancelBtn = document.querySelector("#cancel");
    var continueBtn = document.querySelector("#continue");
    var sendCodeBtn = document.querySelector("#email_ver_but_send");
    var txtReadOnlyEmail = document.querySelector("#readonlyEmail");

    // populate the fields with decoded values
    decodeDefaultValuesFromQueryParams();

    // `txtReadOnlyEmail` is only available in the User details page where the Continue button SHOULD be available.
    if (continueBtn && txtReadOnlyEmail === 'undefined') {
        continueBtn.style.display = "none";
    } else {
        continueBtn.style.display = "block";
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

    if ($element) {
        // Overriding following two methods so that we can detect the failure calling these two methods.
        $element.onError = function (code, message, isSendingQuietly) {
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
    }
    
    // Adding auto submission once found it is a email verification page.
    if (verifyCodeBtn) {
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
    }
    

    function decodeDefaultValuesFromQueryParams() {
        // page controls
        var txtFirstName = document.querySelector("#givenName");
        var txtLastName = document.querySelector("#surname");
        var ddlCountryCode = document.querySelector("#inputCountryCode");
        var txtPhoneNumber = document.querySelector("#inputPhoneNumber");
    
        // get the query params
        // window.SETTINGS - https://learn.microsoft.com/en-us/azure/active-directory-b2c/javascript-and-page-layout?pivots=b2c-custom-policy
        var remoteUrl = new URL(window.SETTINGS.remoteResource);
        var queryParams = remoteUrl.searchParams;

        if (queryParams) {
            try {
                if (txtFirstName && queryParams.has('first_name')) {
                     txtFirstName.value = atob(queryParams.get('first_name'));
                }
    
                if (txtLastName && queryParams.has('last_name')) {
                    txtLastName.value = atob(queryParams.get('last_name'));
                }
    
                if (txtPhoneNumber && queryParams.has('phone_number')) {
                    txtPhoneNumber.value = atob(queryParams.get('phone_number'));
                }
    
                if (ddlCountryCode && queryParams.has('country_code')) {
                    var decodedCountryCode = atob(queryParams.get('country_code'));
                    ddlCountryCode.selectedIndex = ddlCountryCode.querySelector("option[value='" + decodedCountryCode + "']").index;
                }
            } catch (error) {
                console.error("Error while decoding query params: " + error);
            }
        }
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
