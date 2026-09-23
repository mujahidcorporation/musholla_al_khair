/* =========================================
   CONFIG
========================================= */

const DATA_PATH = "data/";


/* =========================================
   GLOBAL DATA
========================================= */

let kegiatanData = [];
let programData = [];
let galeriData = [];

let currentKegiatanCategory = "SEMUA";
let currentProgramCategory = "SEMUA";
let currentGaleriCategory = "SEMUA";



/* =========================================
   INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initBackTop();

    loadKegiatan();

    loadProgram();

    loadGaleri();

});



/* =========================================
   NAVBAR
========================================= */

function initNavbar() {

    const navbar = document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

            });

        });

}



/* =========================================
   LOAD KEGIATAN
========================================= */

async function loadKegiatan() {

    const container =
        document.getElementById("kegiatanContainer");

    try {

        const response =
            await fetch(DATA_PATH + "kegiatan.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil kegiatan.json");
        }

        kegiatanData = await response.json();

        createCategoryButtons(
            kegiatanData,
            "kegiatanFilter",
            category => {

                currentKegiatanCategory = category;

                renderKegiatan();

            }
        );

        renderKegiatan();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat data kegiatan.
            </div>
        `;

    }

}



/* =========================================
   RENDER KEGIATAN
========================================= */

function renderKegiatan() {

    const container =
        document.getElementById("kegiatanContainer");

    let data = kegiatanData;

    if (currentKegiatanCategory !== "SEMUA") {

        data = data.filter(item =>
            item.kategori === currentKegiatanCategory
        );

    }


    if (data.length === 0) {

        container.innerHTML = `
            <div class="loading">
                Tidak ada kegiatan.
            </div>
        `;

        return;

    }


    container.innerHTML =
        data.map(item => `

            <article class="data-card">

                <div class="card-image">

                    <img
                        src="${item.gambar}"
                        alt="${item.judul}"
                        loading="lazy"
                        onerror="this.src='assets/no-image.jpg'"
                    >

                </div>


                <div class="card-body">

                    <span class="card-category">
                        ${item.kategori}
                    </span>

                    <span class="card-date">
                        ${item.tanggal}
                    </span>

                    <h3>
                        ${item.judul}
                    </h3>

                    <p>
                        ${item.deskripsi}
                    </p>

                    <button
                        class="read-more"
                        onclick="openKegiatan(${item.id})">

                        Baca Selengkapnya

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            </article>

        `).join("");

}



/* =========================================
   OPEN KEGIATAN
========================================= */

function openKegiatan(id) {

    const item =
        kegiatanData.find(data => data.id === id);

    if (!item) return;


    document.getElementById("modalImage").src =
        item.gambar;

    document.getElementById("modalCategory").textContent =
        item.kategori;

    document.getElementById("modalDate").textContent =
        item.tanggal;

    document.getElementById("modalTitle").textContent =
        item.judul;

    document.getElementById("modalContent").innerHTML =
        item.isi;


    document
        .getElementById("detailModal")
        .classList.add("show");

    document.body.style.overflow = "hidden";

}



/* =========================================
   LOAD PROGRAM
========================================= */

async function loadProgram() {

    const container =
        document.getElementById("programContainer");

    try {

        const response =
            await fetch(DATA_PATH + "program.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil program.json");
        }

        programData = await response.json();

        createCategoryButtons(
            programData,
            "programFilter",
            category => {

                currentProgramCategory = category;

                renderProgram();

            }
        );

        renderProgram();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat data program.
            </div>
        `;

    }

}



/* =========================================
   RENDER PROGRAM
========================================= */

function renderProgram() {

    const container =
        document.getElementById("programContainer");

    let data = programData;


    if (currentProgramCategory !== "SEMUA") {

        data = data.filter(item =>
            item.kategori === currentProgramCategory
        );

    }


    container.innerHTML =
        data.map(item => `

            <article class="data-card">

                <div class="card-image">

                    <img
                        src="${item.gambar}"
                        alt="${item.judul}"
                        loading="lazy"
                        onerror="this.src='assets/no-image.jpg'"
                    >

                </div>


                <div class="card-body">

                    <span class="card-category">
                        ${item.kategori}
                    </span>

                    <h3>
                        ${item.judul}
                    </h3>

                    <p>
                        ${item.deskripsi}
                    </p>

                    <button
                        class="read-more"
                        onclick="openProgram(${item.id})">

                        Selengkapnya

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            </article>

        `).join("");

}



/* =========================================
   OPEN PROGRAM
========================================= */

function openProgram(id) {

    const item =
        programData.find(data => data.id === id);

    if (!item) return;


    document.getElementById("modalImage").src =
        item.gambar;

    document.getElementById("modalCategory").textContent =
        item.kategori;

    document.getElementById("modalDate").textContent =
        item.periode || "";

    document.getElementById("modalTitle").textContent =
        item.judul;

    document.getElementById("modalContent").innerHTML =
        item.isi;


    document
        .getElementById("detailModal")
        .classList.add("show");

    document.body.style.overflow = "hidden";

}



/* =========================================
   LOAD GALERI
========================================= */

async function loadGaleri() {

    const container =
        document.getElementById("galeriContainer");

    try {

        const response =
            await fetch(DATA_PATH + "galeri.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil galeri.json");
        }

        galeriData = await response.json();


        createCategoryButtons(
            galeriData,
            "galeriFilter",
            category => {

                currentGaleriCategory = category;

                renderGaleri();

            }
        );


        renderGaleri();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat data galeri.
            </div>
        `;

    }

}



/* =========================================
   RENDER GALERI
========================================= */

function renderGaleri() {

    const container =
        document.getElementById("galeriContainer");


    let data = galeriData;


    if (currentGaleriCategory !== "SEMUA") {

        data = data.filter(item =>
            item.kategori === currentGaleriCategory
        );

    }


    container.innerHTML =
        data.map(item => `

            <div
                class="gallery-item"
                onclick="openGallery('${item.gambar}')">

                <img
                    src="${item.gambar}"
                    alt="${item.judul}"
                    loading="lazy"
                    onerror="this.src='assets/no-image.jpg'"
                >

                <div class="gallery-overlay">

                    <h3>
                        ${item.judul}
                    </h3>

                    <span>
                        ${item.kategori}
                    </span>

                </div>

            </div>

        `).join("");

}



/* =========================================
   CREATE CATEGORY FILTER
========================================= */

function createCategoryButtons(
    data,
    containerId,
    callback
) {

    const container =
        document.getElementById(containerId);


    const categories = [
        "SEMUA",
        ...new Set(
            data.map(item => item.kategori)
        )
    ];


    container.innerHTML =
        categories.map((category, index) => `

            <button
                class="filter-btn ${index === 0 ? "active" : ""}"
                data-category="${category}">

                ${category}

            </button>

        `).join("");


    container
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                container
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                callback(
                    button.dataset.category
                );

            });

        });

}



/* =========================================
   GALLERY POPUP
========================================= */

function openGallery(image) {

    const modal =
        document.getElementById("detailModal");

    document.getElementById("modalImage").src =
        image;

    document.getElementById("modalCategory")
        .textContent = "";

    document.getElementById("modalDate")
        .textContent = "";

    document.getElementById("modalTitle")
        .textContent = "";

    document.getElementById("modalContent")
        .innerHTML = "";

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}



/* =========================================
   CLOSE MODAL
========================================= */

document
    .getElementById("modalClose")
    .addEventListener("click", closeModal);


document
    .getElementById("modalOverlay")
    .addEventListener("click", closeModal);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


function closeModal() {

    document
        .getElementById("detailModal")
        .classList.remove("show");

    document.body.style.overflow = "";

}



/* =========================================
   BACK TO TOP
========================================= */

function initBackTop() {

    const button =
        document.getElementById("backTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}