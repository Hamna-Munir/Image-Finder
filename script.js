
const accessKey = "YOUR_UNSPLASH_ACCESS_KEY";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const sectionTitle = document.getElementById("section-title");

const aboutModal = document.getElementById("about-modal");

let page = 1;
let keyword = "";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// SEARCH FUNCTION
async function searchImages(query = keyword) {
    keyword = query || searchBox.value;
    if (!keyword) return;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();

    if (page === 1) searchResult.innerHTML = "";

    data.results.forEach(img => {
        const image = document.createElement("img");
        image.src = img.urls.small;
        image.onclick = () => saveFavorite(img.urls.small);
        searchResult.appendChild(image);
    });

    showMoreBtn.style.display = "block";
}

// FAVORITES
function saveFavorite(img) {
    if (!favorites.includes(img)) {
        favorites.push(img);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to Favorites ❤️");
    }
}

// NAV FUNCTIONS
function home() {
    sectionTitle.innerText = "Home";
    page = 1;
    searchImages("nature");
}

function explore() {
    sectionTitle.innerText = "Explore";
    page = 1;
    searchImages("trending");
}

function trending() {
    sectionTitle.innerText = "Trending";
    page = 1;
    searchImages("popular");
}

function gallery() {
    sectionTitle.innerText = "Favorites";
    searchResult.innerHTML = "";
    favorites.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        searchResult.appendChild(image);
    });
    showMoreBtn.style.display = "none";
}

function collections(cat) {
    sectionTitle.innerText = cat;
    page = 1;
    searchImages(cat);
}

// ABOUT MODAL
function openAbout() {
    aboutModal.style.display = "block";
}

function closeAbout() {
    aboutModal.style.display = "none";
}

// EVENTS
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    page = 1;
    sectionTitle.innerText = "Search Results";
    searchImages(searchBox.value);
});

showMoreBtn.onclick = () => {
    page++;
    searchImages();
};

// DEFAULT LOAD
home();
function goHome() {
    searchBox.value = "";
    page = 1;
    sectionTitle.innerText = "Home";
    searchImages("nature");
}


// Mobile hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
