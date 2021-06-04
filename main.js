const nav = document.querySelector('nav');
const photographersContainer = document.querySelector(
  '.profil-cards-container'
);

const data = async () => {
  const dataBase = await fetch('./data.json')
    .then((response) => response.json())
    .then((json) => json);

  showPhotographers(dataBase.photographers);
  tagsListMenu(dataBase);
  handleTags(dataBase);
  getMediabyPhotographer(dataBase);
};
/*************
   HOME-PAGE
**************/
//// photographes

const showPhotographers = (photographers) => {
  photographers.forEach(
    ({ name, id, city, country, tags, tagline, price, portrait }) => {
      photographersContainer.innerHTML += `
        <div class="profil-card" data-card="${id}">
         <a href="./single.html">
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
            <div class="pc-tags-container">
            ${tags
              .map((tag) => {
                return `<span class="tag" data-id="${tag}">#${tag}</span>`;
              })
              .join('')}
            </div>
          </a>
        </div>
      `;
    }
  );
};

//////tags

const tagsListMenu = ({ photographers }) => {
  let tagsArray = [];
  photographers.forEach(({ tags }) => {
    tags.forEach((tag) => {
      tagsArray.push(tag);
    });
  });
  const uniqueTagsArray = [...new Set(tagsArray.map((tag) => tag))];
  uniqueTagsArray.map((tag) => {
    nav.innerHTML += `<span class='tag' data-id="${tag}">#${tag}</span>`;
  });
};

/// filter by tagName
const handleTags = ({ photographers }) => {
  let tags = document.querySelectorAll('.tag');
  tags.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      const currentTargetData = e.currentTarget.dataset.id;

      filterbyTag(photographers, currentTargetData);
    });
  });
};

const filterbyTag = (photographers, currentTargetData) => {
  let filteredPhotographers = [];
  photographers.filter((photographer) => {
    photographer.tags.forEach((tag) => {
      if (tag === currentTargetData) {
        filteredPhotographers.push(photographer);
      }
    });
  });
  photographersContainer.innerHTML = '';
  showPhotographers(filteredPhotographers);
};

/*************
   SINGLE-PAGE
**************/
//DATA
const getMediabyPhotographer = ({ media, photographers }) => {
  const profilCards = document.querySelectorAll('.profil-card');
  const profilData = {
    infos: [],
    medias: [],
  };

  profilCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      let cardId = e.currentTarget.dataset.card;
      mediaById(cardId, media);
      photographerById(cardId, photographers);
      sessionStorage.setItem('profil_array', JSON.stringify(profilData));
    });
  });

  const mediaById = (cardId, media) => {
    let singleMedia = [];
    media.filter((item) => {
      if (item.photographerId === +cardId) {
        singleMedia.push(item);
      } else {
        profilData.medias.length = 0;
      }
    });

    singleMedia.map((single) => {
      profilData.medias.push(single);
    });
  };

  const photographerById = (cardId, photographers) => {
    let artist = [];

    photographers.filter((item) => {
      if (item.id === +cardId) {
        artist.push(item);
      } else {
        profilData.infos.length = 0;
      }
    });
    artist.forEach((person) => {
      profilData.infos.push(person);
      console.log(profilData);
    });
  };
};
data();
