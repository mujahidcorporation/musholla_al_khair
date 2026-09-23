/* =====================================================
   CONFIG
===================================================== */

const DATA_PATH = "data/";



/* =====================================================
   DATA
===================================================== */

let kegiatanData = [];
let programData = [];
let galeriData = [];

let currentKegiatanCategory = "SEMUA";
let currentProgramCategory = "SEMUA";
let currentGaleriCategory = "SEMUA";



/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initBackTop();

    initModal();

    loadKegiatan();

    loadProgram();

    loadGaleri();

});



/* =====================================================
   NAVBAR
===================================================== */

function initNavbar() {

    const navbar =
        document.getElementById("navbar");

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



/* =====================================================
   KEGIATAN
===================================================== */

async function loadKegiatan() {

    const container =
        document.getElementById("kegiatanContainer");

    try {

        const response =
            await fetch(
                DATA_PATH + "kegiatan.json"
            );

        if (!response.ok) {

            throw new Error(
                "kegiatan.json tidak ditemukan"
            );

        }


        kegiatanData =
            await response.json();


        createCategoryButtons(
            kegiatanData,
            "kegiatanFilter",
            category => {

                currentKegiatanCategory =
                    category;

                renderKegiatan();

            }
        );


        renderKegiatan();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat kegiatan.
            </div>
        `;

    }

}



/* =====================================================
   RENDER KEGIATAN
===================================================== */

function renderKegiatan() {

    const container =
        document.getElementById(
            "kegiatanContainer"
        );


    let data = kegiatanData;


    if (
        currentKegiatanCategory !== "SEMUA"
    ) {

        data = data.filter(item =>
            item.kategori ===
            currentKegiatanCategory
        );

    }


    if (!data.length) {

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
                        onerror="
                            this.src='assets/no-image.jpg'
                        "
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

                        <i
                            class="fa-solid fa-arrow-right">
                        </i>

                    </button>

                </div>

            </article>

        `).join("");

}



/* =====================================================
   OPEN KEGIATAN
===================================================== */

function openKegiatan(id) {

    const item =
        kegiatanData.find(
            data => data.id === id
        );

    if (!item) return;


    openModal({

        image: item.gambar,

        category: item.kategori,

        date: item.tanggal,

        title: item.judul,

        content: item.isi

    });

}



/* =====================================================
   PROGRAM
===================================================== */

async function loadProgram() {

    const container =
        document.getElementById(
            "programContainer"
        );


    try {

        const response =
            await fetch(
                DATA_PATH + "program.json"
            );


        if (!response.ok) {

            throw new Error(
                "program.json tidak ditemukan"
            );

        }


        programData =
            await response.json();


        createCategoryButtons(
            programData,
            "programFilter",
            category => {

                currentProgramCategory =
                    category;

                renderProgram();

            }
        );


        renderProgram();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat program.
            </div>
        `;

    }

}



/* =====================================================
   RENDER PROGRAM
===================================================== */

function renderProgram() {

    const container =
        document.getElementById(
            "programContainer"
        );


    let data = programData;


    if (
        currentProgramCategory !== "SEMUA"
    ) {

        data = data.filter(item =>
            item.kategori ===
            currentProgramCategory
        );

    }


    if (!data.length) {

        container.innerHTML = `
            <div class="loading">
                Tidak ada program.
            </div>
        `;

        return;

    }


    container.innerHTML =
        data.map(item => {

            const isDonasi =
                item.donasi &&
                item.donasi.aktif;


            return `

                <article
                    class="
                        data-card
                        ${isDonasi
                            ? "donation-program"
                            : ""}
                    ">


                    <div class="card-image">

                        <img
                            src="${item.gambar}"
                            alt="${item.judul}"
                            loading="lazy"
                            onerror="
                                this.src='assets/no-image.jpg'
                            "
                        >


                        ${
                            isDonasi
                            ? `
                                <span
                                    class="
                                        donation-badge
                                    ">

                                    <i
                                        class="
                                            fa-solid
                                            fa-heart
                                        ">
                                    </i>

                                    Donasi

                                </span>
                              `
                            : ""
                        }

                    </div>


                    <div class="card-body">

                        <span class="card-category">
                            ${item.kategori}
                        </span>


                        <span class="card-date">
                            ${item.periode || ""}
                        </span>


                        <h3>
                            ${item.judul}
                        </h3>


                        <p>
                            ${item.deskripsi}
                        </p>


                        ${
                            isDonasi

                            ? `

                                <button
                                    class="
                                        read-more
                                        donation-button
                                    "
                                    onclick="
                                        openDonasi(
                                            ${item.id}
                                        )
                                    ">

                                    Donasi Sekarang

                                    <i
                                        class="
                                            fa-solid
                                            fa-qrcode
                                        ">
                                    </i>

                                </button>

                              `

                            : `

                                <button
                                    class="read-more"
                                    onclick="
                                        openProgram(
                                            ${item.id}
                                        )
                                    ">

                                    Selengkapnya

                                    <i
                                        class="
                                            fa-solid
                                            fa-arrow-right
                                        ">
                                    </i>

                                </button>

                              `
                        }

                    </div>

                </article>

            `;

        }).join("");

}



/* =====================================================
   OPEN PROGRAM
===================================================== */

function openProgram(id) {

    const item =
        programData.find(
            data => data.id === id
        );

    if (!item) return;


    openModal({

        image: item.gambar,

        category: item.kategori,

        date: item.periode || "",

        title: item.judul,

        content: item.isi

    });

}



/* =====================================================
   OPEN DONASI
===================================================== */

function openDonasi(id) {

    const item =
        programData.find(
            data => data.id === id
        );


    if (!item || !item.donasi) return;


    const donasi =
        item.donasi;


    const target =
        Number(donasi.target) || 0;


    const terkumpul =
        Number(donasi.terkumpul) || 0;


    let percentage = 0;


    if (target > 0) {

        percentage =
            Math.round(
                (terkumpul / target) * 100
            );

    }


    if (percentage > 100) {

        percentage = 100;

    }


    openModal({

        image: donasi.qr,

        category: "PENGGALANGAN DANA",

        date: item.periode,

        title: item.judul,

        content: `

            <div class="donation-detail">

                <p>
                    ${item.deskripsi}
                </p>


                <div
                    class="donation-amount">

                    <div>

                        <small>
                            Dana Terkumpul
                        </small>

                        <strong>
                            Rp ${formatRupiah(
                                terkumpul
                            )}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Target
                        </small>

                        <strong>
                            Rp ${formatRupiah(
                                target
                            )}
                        </strong>

                    </div>

                </div>


                <div
                    class="detail-progress">

                    <div
                        class="detail-progress-bar">

                        <div
                            style="
                                width:${percentage}%
                            ">
                        </div>

                    </div>


                    <strong>
                        ${percentage}%
                    </strong>

                </div>


                <div
                    class="qr-detail">

                    <img
                        src="${donasi.qr}"
                        alt="QR Donasi">

                    <h4>
                        Scan QR untuk Berdonasi
                    </h4>

                    <p>
                        Silakan scan QR Code
                        menggunakan aplikasi
                        pembayaran yang mendukung.
                    </p>

                </div>


                <div
                    class="bank-detail">

                    <small>
                        Transfer Manual
                    </small>

                    <strong>
                        ${donasi.bank}
                    </strong>

                    <div class="bank-number">

                        <span>
                            ${donasi.rekening}
                        </span>

                        <button
                            onclick="
                                copyRekening(
                                    '${donasi.rekening}'
                                )
                            ">

                            <i
                                class="
                                    fa-regular
                                    fa-copy
                                ">
                            </i>

                        </button>

                    </div>

                    <small>
                        a.n. ${donasi.atas_nama}
                    </small>

                </div>

            </div>

        `

    });

}



/* =====================================================
   GALERI
===================================================== */

async function loadGaleri() {

    const container =
        document.getElementById(
            "galeriContainer"
        );


    try {

        const response =
            await fetch(
                DATA_PATH + "galeri.json"
            );


        if (!response.ok) {

            throw new Error(
                "galeri.json tidak ditemukan"
            );

        }


        galeriData =
            await response.json();


        createCategoryButtons(
            galeriData,
            "galeriFilter",
            category => {

                currentGaleriCategory =
                    category;

                renderGaleri();

            }
        );


        renderGaleri();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Gagal memuat galeri.
            </div>
        `;

    }

}



/* =====================================================
   RENDER GALERI
===================================================== */

function renderGaleri() {

    const container =
        document.getElementById(
            "galeriContainer"
        );


    let data = galeriData;


    if (
        currentGaleriCategory !== "SEMUA"
    ) {

        data = data.filter(item =>
            item.kategori ===
            currentGaleriCategory
        );

    }


    container.innerHTML =
        data.map(item => `

            <div
                class="gallery-item"
                onclick="
                    openGallery('${item.gambar}')
                ">

                <img
                    src="${item.gambar}"
                    alt="${item.judul}"
                    loading="lazy"
                    onerror="
                        this.src='assets/no-image.jpg'
                    "
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



/* =====================================================
   CATEGORY FILTER
===================================================== */

function createCategoryButtons(
    data,
    containerId,
    callback
) {

    const container =
        document.getElementById(
            containerId
        );


    const categories = [
        "SEMUA",
        ...new Set(
            data.map(item => item.kategori)
        )
    ];


    container.innerHTML =
        categories.map(
            (category, index) => `

                <button
                    class="
                        filter-btn
                        ${index === 0
                            ? "active"
                            : ""}
                    "
                    data-category="${category}">

                    ${category}

                </button>

            `
        ).join("");


    container
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    container
                        .querySelectorAll(
                            ".filter-btn"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    callback(
                        button.dataset.category
                    );

                }
            );

        });

}



/* =====================================================
   MODAL
===================================================== */

function initModal() {

    document
        .getElementById("modalClose")
        .addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById("modalOverlay")
        .addEventListener(
            "click",
            closeModal
        );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();

            }

        }
    );

}



function openModal(data) {

    document.getElementById(
        "modalImage"
    ).src = data.image;


    document.getElementById(
        "modalCategory"
    ).textContent = data.category;


    document.getElementById(
        "modalDate"
    ).textContent = data.date;


    document.getElementById(
        "modalTitle"
    ).textContent = data.title;


    document.getElementById(
        "modalContent"
    ).innerHTML = data.content;


    document
        .getElementById("detailModal")
        .classList.add("show");


    document.body.style.overflow =
        "hidden";

}



function closeModal() {

    document
        .getElementById("detailModal")
        .classList.remove("show");


    document.body.style.overflow =
        "";

}



/* =====================================================
   GALLERY
===================================================== */

function openGallery(image) {

    openModal({

        image: image,

        category: "GALERI",

        date: "",

        title: "Dokumentasi Musholla Al Khair",

        content: ""

    });

}



/* =====================================================
   COPY REKENING
===================================================== */

function copyRekening(rekening) {

    navigator.clipboard
        .writeText(rekening)
        .then(() => {

            alert(
                "Nomor rekening berhasil disalin."
            );

        })
        .catch(() => {

            alert(
                "Nomor rekening: " +
                rekening
            );

        });

}



/* =====================================================
   RUPIAH
===================================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID"
    ).format(number);

}



/* =====================================================
   BACK TO TOP
===================================================== */

function initBackTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}