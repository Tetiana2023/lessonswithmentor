//console.log("hellow!!");
const loadBtn = document.querySelector(".load-button");
const characterList = document.querySelector(".js-list");
let page = 1;

loadBtn.addEventListener("click", changePage);

function changePage() {
  page += 1;
  loadAPI(page)
    .then((res) => {
      renderCharacterList(res.docs);
      if (res.page === res.pages) {
        loadBtn.hidden = true;
      }
      // hidden- це вбудований атрибут і тому до нього звертаємося напряму
      // а якщо це дата-атрибут то через removeAtribute
      //   loadBtn.hidden = false;
    })
    .catch(console.log);
}

function loadAPI(page = 1) {
  const options = {
    headers: {
      Authorization: "Bearer KDSbyg2-bj-iEjwCrhbV",
    },
  };

  return fetch(
    `https://the-one-api.dev/v2/character?limit=200&page=${page}`,
    options
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    console.log(res);
    return res.json();
  });
}
loadAPI()
  .then((res) => {
    renderCharacterList(res.docs);
    // hidden- це вбудований атрибут і тому до нього звертаємося напряму
    // а якщо це дата-атрибут то через removeAtribute
    loadBtn.hidden = false;
  })
  .catch(console.log);

function renderCharacterList(arrObj) {
  const list = arrObj
    .map(({ name, race }) => {
      return `<li class="">
<h2>${name}</h2>
<p>${race}</p>
</li>`;
    })
    .join("");

  characterList.insertAdjacentHTML("beforeend", list);
}
