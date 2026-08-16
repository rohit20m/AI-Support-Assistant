const caseInput = document.getElementById("caseInput");
const characterCount = document.getElementById("characterCount");

const analyzeButton = document.getElementById("analyzeButton");

const category = document.getElementById("category");
const priority = document.getElementById("priority");
const cause = document.getElementById("cause");
const suggestions = document.getElementById("suggestions");


// ==============================
// CHARACTER COUNTER
// ==============================

caseInput.addEventListener("input", function () {
    characterCount.textContent = caseInput.value.length;
});


// ==============================
// ANALYZE CASE
// ==============================

analyzeButton.addEventListener("click", async function () {

    const caseText = caseInput.value.trim().toLowerCase();
    console.log(caseText);

    // Check whether user entered something

    if (caseText === "") {
        alert("Please enter a support case first.");
        return;
    }


    const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            case: caseText
        })
    });

    const result = await response.json();

    category.textContent = result.category;
    priority.textContent = result.priority;

    cause.textContent = result.cause;

    suggestions.innerHTML = "";

    result.suggestions.forEach(function (suggestion) {
        const li = document.createElement("li");
        li.innerHTML = `<span>✓</span> ${suggestion}`;
        suggestions.appendChild(li);
    });

    // // ==============================
    // // RTM PROJECT CASE
    // // ==============================

    // if ( caseText.includes("rtm") || caseText.includes("project"))
    // {
    //     category.textContent = "Project / Configuration";
    //     priority.textContent = "Medium";
    //     cause.textContent = "The case appears to be related to an RTM project or configuration activity. Further investigation is required to identify the specific project component involved.";

    //     suggestions.innerHTML = `

    //         <li>
    //             <span>✓</span>
    //             Verify the RTM project configuration.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check whether the project is active and properly configured.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Review recent configuration changes.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check application logs for related errors.
    //         </li>

    //     `;

    // }


    // // ==============================
    // // STORE CLOSING CASE
    // // ==============================

    // else if (
    //     caseText.includes("close store") ||
    //     caseText.includes("closing store") ||
    //     caseText.includes("store closing")
    // ) {

    //     category.textContent = "Store Management";

    //     priority.textContent = "High";

    //     cause.textContent =
    //         "The issue may be related to store status, configuration, or user permissions required to complete the store closing process.";


    //     suggestions.innerHTML = `

    //         <li>
    //             <span>✓</span>
    //             Verify the current store status.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check the user's permissions.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Review the store configuration.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check recent system or configuration changes.
    //         </li>

    //     `;

    // }


    // // ==============================
    // // PERMISSION CASE
    // // ==============================

    // else if (
    //     caseText.includes("permission") ||
    //     caseText.includes("access") ||
    //     caseText.includes("login")
    // ) {

    //     category.textContent = "User Access";

    //     priority.textContent = "High";

    //     cause.textContent =
    //         "The issue may be related to user permissions, profile configuration, or authentication settings.";


    //     suggestions.innerHTML = `

    //         <li>
    //             <span>✓</span>
    //             Verify the user's profile and permissions.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Confirm that the required access is assigned.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check whether the user account is active.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Review recent permission changes.
    //         </li>

    //     `;

    // }


    // // ==============================
    // // DEFAULT CASE
    // // ==============================

    // else {

    //     category.textContent = "General Support";
    //     priority.textContent = "Medium";
    //     cause.textContent = "The case requires further investigation. More information may be needed to determine the root cause.";


    //     suggestions.innerHTML = `

    //         <li>
    //             <span>✓</span>
    //             Collect additional information from the user.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Check recent application changes.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Review relevant system logs.
    //         </li>

    //         <li>
    //             <span>✓</span>
    //             Escalate the case if the issue persists.
    //         </li>

    //     `;

    // }

});

// ==============================
// PAGE NAVIGATION
// ==============================

const pageLinks = document.querySelectorAll(".page-link");

const contentPages = document.querySelectorAll(".content-page");

const overviewContent = document.querySelectorAll(
    ".main-content > .top-header, .main-content > .metrics-grid, .main-content > .dashboard-grid"
);


pageLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const pageName = link.dataset.page;


        // Hide overview

        overviewContent.forEach(function (section) {
            section.style.display = "none";
        });


        // Hide all additional pages

        contentPages.forEach(function (page) {
            page.style.display = "none";
        });


        // Show selected page

        const selectedPage =
            document.getElementById(pageName + "Page");

        selectedPage.style.display = "block";


        // Remove active state

        document.querySelectorAll(".nav-item").forEach(function (item) {
            item.classList.remove("active");
        });


        // Add active state

        link.classList.add("active");

    });

});

// ==============================
// OVERVIEW NAVIGATION
// ==============================

const overviewLink = document.querySelector(
    '.nav-item:first-child'
);


overviewLink.addEventListener("click", function (event) {

    event.preventDefault();


    // Show overview

    overviewContent.forEach(function (section) {
        section.style.display = "";
    });


    // Hide additional pages

    contentPages.forEach(function (page) {
        page.style.display = "none";
    });


    // Active state

    document.querySelectorAll(".nav-item").forEach(function (item) {
        item.classList.remove("active");
    });

    overviewLink.classList.add("active");

});

// ==============================
// DARK / LIGHT MODE
// ==============================

const themeToggle = document.getElementById("themeToggle");

const themeText = document.getElementById("themeText");

const themeIcon = document.getElementById("themeIcon");


themeToggle.addEventListener("change", function () {

    document.body.classList.toggle(
        "light-mode",
        themeToggle.checked
    );


    if (themeToggle.checked) {

        themeText.textContent = "Light Mode";
        themeIcon.textContent = "☀️";

    } else {

        themeText.textContent = "Dark Mode";
        themeIcon.textContent = "🌙";

    }

});