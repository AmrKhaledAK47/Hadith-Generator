const hadithsContainer = document.querySelector('.hadiths-container');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const pageNumbers = document.querySelector('.page-numbers');

const urlParams = new URLSearchParams(window.location.search);
const book = urlParams.get('book');
let currentPage = 1;
const hadithsPerPage = 20;

async function fetchHadiths(page) {
  const response = await fetch(`https://hadis-api-id.vercel.app/hadith/${book}?page=${page}&limit=${hadithsPerPage}`);
  const data = await response.json();
  displayHadiths(data.items);
  updatePagination(data.total);
}

function displayHadiths(hadiths) {
  hadithsContainer.innerHTML = '';
  hadiths.forEach(hadith => {
    const hadithDiv = document.createElement('div');
    hadithDiv.classList.add('hadith');
    hadithDiv.innerHTML = `
      <p class="hadith-number ">حَدِيْث ${hadith.number}</p>
      <blockquote class="hadith-text">
        <p>${hadith.arab}</p>
      </blockquote>
    `;
    hadithsContainer.appendChild(hadithDiv);
  });
}

function updatePagination(totalHadiths) {
  const totalPages = Math.ceil(totalHadiths / hadithsPerPage);
  pageNumbers.textContent = `${currentPage} / ${totalPages}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchHadiths(currentPage);
  }
});

nextPageBtn.addEventListener('click', () => {
  currentPage++;
  fetchHadiths(currentPage);
});

fetchHadiths(currentPage);
