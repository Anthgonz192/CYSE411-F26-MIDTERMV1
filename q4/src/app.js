// CYSE 411 Exam Application (SECURE VERSION)

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;

/* -------------------------
   Validation Helper
-------------------------- */

function validateProfile(data) {
    if (typeof data !== "object" || data === null) {
        return null;
    }

    const { username, notifications } = data;

    if (typeof username !== "string") {
        return null;
    }

    if (!Array.isArray(notifications)) {
        return null;
    }
    const cleanNotifications = notifications.filter(n => typeof n === "string");

    return {
        username: username,
        notifications: cleanNotifications
    };
}

/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let parsed;

    try {
        parsed = JSON.parse(text);
    } catch (e) {
        alert("Invalid JSON format.");
        return;
    }

    const profile = validateProfile(parsed);

    if (!profile) {
        alert("Invalid profile data.");
        return;
    }

    currentProfile = profile;
    renderProfile(profile);
}

/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");
        li.textContent = n;

        list.appendChild(li);
    }
}

/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    if (!currentProfile) {
        alert("No profile to save.");
        return;
    }

    try {
 
        localStorage.setItem("profile", JSON.stringify(currentProfile));
        alert("Session saved");
    } catch (e) {
        alert("Failed to save session.");
    }
}

function loadSession() {

    const stored = localStorage.getItem("profile");

    if (!stored) {
        alert("No saved session found.");
        return;
    }

    let parsed;

    try {
        parsed = JSON.parse(stored);
    } catch (e) {
        alert("Corrupted session data.");
        return;
    }

    const profile = validateProfile(parsed);

    if (!profile) {
        alert("Invalid session data.");
        return;
    }

    currentProfile = profile;
    renderProfile(profile);
}