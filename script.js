const hadithContent = document.getElementById("random-hadith");
const generateBtn = document.querySelector(".dice-button");

function getRandomNumber() {
    return Math.floor(Math.random() * 4930) + 1;
}

async function fetchHadith() {
    const response = await fetch(`https://hadis-api-id.vercel.app/hadith/muslim/${getRandomNumber()}`);
    const data = await response.json();
    hadithContent.textContent = `"${data.arab}"`;
}

fetchHadith();

generateBtn.addEventListener("click", fetchHadith);
