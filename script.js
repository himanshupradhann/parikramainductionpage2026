const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbybB-PwxWSDh47bIitp24FAGF1NFCOY4ikCOjUunVgp0iW16BLaplS8cSNgiqZK32Pqtg/exec";

const form = document.getElementById("inductionForm");
const submitBtn = document.getElementById("submitBtn");
const statusDiv = document.getElementById("statusMessage");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    statusDiv.className = "";
    statusDiv.textContent = "";

    const name = document.getElementById("name").value.trim();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const subsystem1 = document.getElementById("subsystem1").value;
    const subsystem2 = document.getElementById("subsystem2").value;
    const primaryGoal = document.getElementById("primaryGoal").value.trim();
    const howHeard = document.getElementById("howHeard").value;

    /* ---------------------------
       Validation
    ---------------------------- */

    const rollRegex = /^\d{3}[A-Za-z]{2}\d{4}$/;
    const phoneRegex = /^(?:\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!rollRegex.test(rollNumber)) {
        showError("Please enter a valid Roll Number (Example: 123AB4567)");
        return;
    }

    if (!phoneRegex.test(phoneNumber)) {
        showError("Please enter a valid Indian Phone Number.");
        return;
    }

    if (!emailRegex.test(email)) {
        showError("Please enter a valid Email Address.");
        return;
    }

    if (subsystem1 === subsystem2 && subsystem2 !== "") {
        showError("Primary and Secondary Subsystems cannot be the same.");
        return;
    }

    const formData = {

        name,
        rollNumber,
        phoneNumber,
        email,
        subsystem1,
        subsystem2,
        primaryGoal,
        howHeard

    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";

    statusDiv.className = "";
    statusDiv.textContent = "Submitting your application...";

    const params = new URLSearchParams();
    params.append("data", JSON.stringify(formData));

    fetch(SCRIPT_URL, {

        method: "POST",
        body: params

    })

    .then(res => res.json())

    .then(data => {

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submit Application";

        if (data.status === "success") {

            statusDiv.className = "success";
            statusDiv.textContent = data.message;

            form.reset();

        }

        else {

            showError(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submit Application";

        showError("Something went wrong. Please try again later.");

    });

});

/* --------------------
   Helper Functions
--------------------- */

function showError(message){

    statusDiv.className = "error";
    statusDiv.textContent = message;

}