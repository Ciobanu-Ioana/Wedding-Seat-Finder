let guests = [];
let loading = true;

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + page).classList.remove('hidden');
}

async function loadGuests() {
    const cached = localStorage.getItem("guests");
    let useCache = false;

    if (cached) {
        const parsed = JSON.parse(cached);
        guests = parsed;
        useCache = true;
    }

    const res = await fetch("https://script.google.com/macros/s/AKfycbzBKRHNiZGefdZ0pkOY1Vda7amH7bWmLStOF56aH3cwAvajINx-RjxMLKs1MZ7qZVhKuQ/exec");
    const data = await res.json();

    if (!useCache || JSON.stringify(guests) !== JSON.stringify(data.guests)) {
        guests = data.guests;
        localStorage.setItem("guests", JSON.stringify(guests));
    }
    
    loading = false;
}

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    setTimeout(() => {
        document.getElementById("splash").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("splash").style.display = "none";
            document.getElementById("app").classList.remove("hidden");
        }, 300);
    }, 200);

    loadGuests();
}

function liveSearch() {
    const searchInput = document.getElementById("searchName");
    const q = searchInput.value.toLowerCase().trim();
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

    output.innerHTML = matches.length
        ? matches.map(i => `<div>${i.name} | Masa ${i.table}</div>`).join("")
        : "Niciun nume găsit.";

    // if (matches.length === 0) {
    //     output.innerHTML = "Niciun nume găsit.";
    //     return;
    // }
    //
    // let html = "";
    // matches.forEach(item => {
    //     html += `<div>${item.name} | Masa ${item.table}</div>`;
    // });
    // output.innerHTML = html;
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
    "images/meniu-bauturi.png",
    "images/meniu-coktail.png"
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