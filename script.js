let currentPage = 1

async function goBack() {
  if (currentPage == 1) return
  currentPage--
  await request()
}

async function goForward() {
  currentPage++
  await request()
}

async function request() {
  const url = `https://stranger-things-api.fly.dev/api/v1/characters?page=${currentPage}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url);
    const result = await response.json();
    generateCharacters(result)
  } catch (error) {
    console.error(error);
  }
}

function generateCharacters(characterList) {
  if (!characterList.length) return currentPage--
  const charactersSection = document.createElement("section")
  document.getElementById('charactersList').remove()
  charactersSection.id = "charactersList"
  document.getElementById('list').appendChild(charactersSection)
  characterList.forEach((character) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.width = "10em";
    cardDiv.style.height = "20em";
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = character.photo;
    img.style.width = "100%"
    img.style.height = "10rem"
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = character.name;
    cardDiv.appendChild(img);
    cardBodyDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardBodyDiv);
    if (!character.photo || !character.name) return
    document.getElementById('charactersList').appendChild(cardDiv)
  })
}