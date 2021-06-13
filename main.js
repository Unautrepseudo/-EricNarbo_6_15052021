const nav = document.querySelector('nav');
const photographersContainer = document.querySelector(
  '.profil-cards-container'
);

let lulu;

const getData = async () => {
  let response = await fetch('./data.json');
  let data = await response.json();
  let photographers = await data.photographers;
  return photographers;
};

/*************
   HOME-PAGE
**************/
//// photographes

const showPhotographers = async (data = null) => {
  let photographers;
  data === null ? (photographers = await getData()) : (photographers = data);
  photographersContainer.innerHTML = '';

  photographers.forEach((photographer) => {
    const { name, id, city, country, tags, tagline, price, portrait } =
      photographer;
    photographersContainer.innerHTML += `
        <div class="profil-card" data-card="${id}">
          <a href="./single.html?id=${id}">
              <div class="pc-header">
                <img src="./assets/img/idPhotos/${portrait}" alt="" />
                <h2>${name}</h2>
              </div>
              <div class="pc-info-container">
                <div class="pc-location">
                  <span class="city">${city}</span>
                  <span class="country">${country}</span>
                </div>
                <span class="tagline">${tagline}</span>
                <span class="price">${price}euros/jour</span>
              </div>
          </a>
            <div class="pc-tags-container">
            ${tags
              .map((tag) => {
                return `<span class="tag" data-id="${tag}" onClick='onTagClick()'>#${tag}</span>`;
              })
              .join('')}
            </div>
        </div>
      `;
  });
};

//////tags
const ShowTagsMenu = async () => {
  const photographers = await getData();
  let tagsArray = [];

  photographers.forEach(({ tags }) => {
    tags.forEach((tag) => {
      tagsArray.push(tag);
    });
  });
  const uniqueTagsArray = [...new Set(tagsArray.map((tag) => tag))];
  uniqueTagsArray.map((tag) => {
    nav.innerHTML += `<span class='tag' data-id="${tag}" onClick='onTagClick()'>#${tag}</span>`;
  });
};

const getTagElements = async (filteredPhotographer = null) => {
  // return document.querySelectorAll('.tag');
  // filteredPhotographer !=null
  //   ? showPhotographers(filteredPhotographer)
  //   : await showPhotographers();
  if (filteredPhotographer) {
    return document.querySelectorAll('.tag');
  } else {
    return document.querySelectorAll('.tag');
  }
};

const onTagClick = async () => {
  let tags = await getTagElements();
  let photographers = await getData();

  let tagName;

  tags.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      tagName = e.currentTarget.dataset.id;
      filter(tagName, photographers);
    });
  });
};

const filter = async (tagName, photographers) => {
  let showedPhotographers = await showPhotographers();

  let filteredPhotographers = [];
  photographers.filter((photographer) => {
    photographer.tags.filter((tag) => {
      if (tag === tagName) {
        filteredPhotographers.push(photographer);
      }
    });
  });
  if (filteredPhotographers) {
    showPhotographers(filteredPhotographers);
    getTagElements(filteredPhotographers);
  } else {
    showPhotographers(showedPhotographers);
    getTagElements(photographers);
  }
};

getData();
ShowTagsMenu();
showPhotographers();
getTagElements();
onTagClick();
