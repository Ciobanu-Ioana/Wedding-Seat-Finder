let guests = [];
let loading = true;

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + page).classList.remove('hidden');
}

async function loadGuests() {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzZlEJS8REg4PVICg35izUt7qrw3OF7MU-tQfBmLNlyzG0IfZBmSXpqwW3P1V_Lkkz4yw/exec");
    const data = await res.json();
    guests = data.guests;
    loading = false;

    document.getElementById("splash").classList.add("fade-out");
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 800);
}
loadGuests();

function liveSearch() {
    const q = document.getElementById("searchName").value.toLowerCase();
    const output = document.getElementById("results");

    if (loading) {
        output.innerHTML = "Se încarcă numele...";
        return;
    }

    if (!q) {
        output.innerHTML = "";
        return;
    }

    const matches = guests.filter(g => g.name.toLowerCase().includes(q));

    if (matches.length === 0) {
        output.innerHTML = "Niciun nume găsit.";
        return;
    }

    let html = "";
    matches.forEach(item => {
        html += `<div>${item.name} | Masa ${item.table}</div>`;
    });
    output.innerHTML = html;
}

document.addEventListener('focusout', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.zoom = "1";
    }, 100);
});

let menuIndex = 0;

const menuImages = [
    "images/meniu-mancare.png",
    "images/meniu-bauturi.png"
];

function updateDots() {
    document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
    document.getElementById("dot" + menuIndex).classList.add("active");
}

function showMenuImage() {
    document.getElementById("menuImage").src = menuImages[menuIndex];
    updateDots();
}

function nextMenu() {
    menuIndex = (menuIndex + 1) % menuImages.length;
    showMenuImage();
}

function prevMenu() {
    menuIndex = (menuIndex - 1 + menuImages.length) % menuImages.length;
    showMenuImage();
}