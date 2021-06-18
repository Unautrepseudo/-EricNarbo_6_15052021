import { handleForm } from './form-modal.js';
import { handleSlider } from './slider.js';

//UI
const singleContentContainer = document.querySelector(
  '.single-content-container'
);
const likes = document.querySelectorAll('.likes');
const herosInfos = document.querySelector('.hero-infos');
const heroImg = document.querySelector('.hero-img');
const getUrlId = document.location.search.slice(4);
const sum = document.querySelector('.sum');
const rate = document.querySelector('.rate');
const getLikes = [];

/*************
   GET DATAS
**************/
const data = async () => {
  let response = await fetch('./data.json');
  let dataBase = await response.json();
  return dataBase;
};
const getDataById = async () => {
  let { media, photographers } = await data();
  let dataById = {
    infos: [],
    medias: [],
  };

  dataById.medias = media.filter((item) =>
    item.photographerId === +getUrlId ? true : false
  );

  dataById.infos = photographers.filter((photographer) =>
    photographer.id === +getUrlId ? true : false
  );

  return dataById;
};
//////////////SHOW DATAS////////////////////

const singleCardElement = (name, city, country, tags, tagline) => {
  return `
      <div class="single-card">
        <div class="name-container">
          <h1>${name}</h1>
          <button class='contact-btn'>Contactez-moi</button>
        </div>
        <div class="sc-location">
          <span class="city">${city}</span>
          <span class="country">${country}</span>
        </div>
        <span class="tagline">${tagline}</span>
        <div class="sc-tags-container">
          ${tags
            .map((tag) => {
              return `
              <span class="tag" data-id="${tag}">#${tag}</span>`;
            })
            .join('')}
        </div>
      </div>
    `;
};
const displaySingleInfo = async () => {
  let data = await getDataById();
  data.infos.map(({ name, city, country, tags, tagline }) => {
    herosInfos.innerHTML = singleCardElement(
      name,
      city,
      country,
      tags,
      tagline
    );
  });
  heroImg.setAttribute(
    'src',
    `./assets/img/idPhotos/${data.infos[0].portrait}`
  );
  heroImg.setAttribute('alt', `${data.name}`);
  handleForm(data);
};

const displayMedias = async (sortedMedias = null) => {
  let data = await getDataById();
  let medias;
  sortedMedias === null ? (medias = data.medias) : (medias = sortedMedias);

  let singleName = data.infos[0].name;
  medias.map(({ title, image, likes, id, video }) => {
    let numLike = +likes;
    let isImg = image ? true : false;
    singleContentContainer.innerHTML += `
      <div class="sc-card">
        <div id='${id}' class="img-container">
        ${
          isImg
            ? `
            <img
              src="./assets/img/${singleName}/${image}"
              value="${title}"
              alt="${title}"
            />`
            : `
            <video
              src="./assets/img/${singleName}/${video}"
              value="${title}"
              alt="${title}"
            />`
        }
        </div>
        <div class="sc-card-footer">
          <span class="sc-card-title">${title}</span>
          <div class="likes-container">
            <span class="likes" value="${numLike}"> ${numLike} </span><i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    `;
    getLikes.push(numLike);
  });
  handleSlider();
  sumLikes(data);
  addLikes();
};
displaySingleInfo();
displayMedias();

////////////////////////////HANDLE LIKES///////////////
const sumLikes = (data) => {
  let price = data.infos[0].price;

  const totalLikes = getLikes.reduce((total, item) => {
    total += item;
    return total;
  }, 0);

  sum.innerText = totalLikes;
  rate.innerText = `${price} euros/jours`;
};

const addLikes = () => {
  const likesContainer = document.querySelectorAll('.likes-container');
  let updateslikes = document.querySelectorAll('.likes');

  likesContainer.forEach((like, i) => {
    let isLiked = false;
    like.addEventListener('click', () => {
      if (!isLiked) {
        updateslikes[i].innerText = +updateslikes[i].innerText + 1;
        updateslikes[i].style.marginRight = '5px';
        updateslikes[i].style.cursor = 'pointer';
        isLiked = true;
        sum.innerText = +sum.innerText + 1;
      }
    });
  });
};

////////////////
//DROPDOWn MENU
////////
const chevron = document.querySelector('.chevron-down');
const dropdownMenu = document.querySelector('.dropdown-menu');
const byPopularity = document.querySelector('.by-popularity');
const byDate = document.querySelector('.by-date');
const byTitle = document.querySelector('.by-title');
const selectors = document.querySelectorAll('[class^="by"] ');

chevron.addEventListener('click', () => {
  chevron.classList.toggle('toggle-chevron');
  dropdownMenu.classList.toggle('show-dropdown');
});

//Sort by
const sortBy = async () => {
  let data = await getDataById();

  let newMediasArray = data.medias;

  let mediaByPopularity = () =>
    newMediasArray.sort((a, b) => b.likes - a.likes);
  let mediaByDate = () =>
    newMediasArray.sort((a, b) => {
      let tempA = Date.parse(a.date);
      let tempB = Date.parse(b.date);
      return +tempB - +tempA;
    });

  let mediaByTitle = () =>
    newMediasArray.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;

      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    });

  let sortByMethods = {
    bypopularity: mediaByPopularity(),
    bydate: mediaByDate(),
    bytitle: mediaByTitle(),
  };

  // selectors.forEach((selector) => {
  //   selector.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     singleContentContainer.innerHTML = '';
  //     let getValue = selector.getAttribute('value');

  //     if (getValue === 'bypopularity') {
  //       displayMedias(sortByMethods.bypopularity);
  //     }
  //   });
  // });

  byPopularity.addEventListener('click', (e) => {
    e.preventDefault();
    singleContentContainer.innerHTML = '';
    displayMedias(mediaByPopularity());
  });
  byDate.addEventListener('click', (e) => {
    e.preventDefault();
    singleContentContainer.innerHTML = '';
    displayMedias(mediaByDate());
  });
  byTitle.addEventListener('click', (e) => {
    e.preventDefault();
    singleContentContainer.innerHTML = '';
    displayMedias(mediaByTitle());
  });
};
sortBy();
