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
  const dataBase = await fetch('../data.json')
    .then((response) => response.json())
    .then((json) => json);

  getDataById(dataBase);
  displaySingleInfo(getDataById(dataBase));
  displayMedias(getDataById(dataBase));
};
data();

const getDataById = ({ media, photographers }) => {
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
const displaySingleInfo = (data) => {
  data.infos.map(
    ({ name, id, city, country, tags, tagline, price, portrait }) => {
      herosInfos.innerHTML = `
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
    }
  );
  heroImg.setAttribute(
    'src',
    `./assets/img/idPhotos/${data.infos[0].portrait}`
  );
  handleForm(data);
};

const displayMedias = (data) => {
  singleContentContainer.innerHTML = '';
  let singleName = data.infos[0].name;
  data.medias.map(({ title, image, likes, id, video }) => {
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
              alt="une belle image"
            />`
            : `
            <video
              src="./assets/img/${singleName}/${video}"
              value="${title}"
              alt="une belle video"
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
// displayMedias(medias);

////////////////////////////HANDLE LIKES///////////////
//total likes container
const sumLikes = (data) => {
  let price = data.infos[0].price;

  const totalLikes = getLikes.reduce((total, item) => {
    total += item;
    return total;
  }, 0);

  sum.innerText = totalLikes;
  rate.innerText = `${price} euros/jours`;
};

// add likes
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

//////////////////
//SORTBY
////////

// const newMediasArray = data();
// const toto = newMediasArray.slice();
// const mediaByTitle = newMediasArray.sort((x, y) => {
//   if (x.title.toLowerCase() < y.title.toLowerCase()) return -1;

//   if (x.title.toLowerCase() > y.title.toLowerCase()) return 1;
// });

// const mediaByDate = newMediasArray.sort((a, b) => {
//   let tempA = Date.parse(a.date);
//   let tempB = Date.parse(b.date);
//   return tempB - tempA;
// });
// const mediaByPopularity = newMediasArray.sort((a, b) => b.likes - a.likes);

// byPopularity.addEventListener('click', () => {
//   displayMedias(mediaByPopularity);
// });
// byDate.addEventListener('click', () => {
//   displayMedias(medias);
// });
// byTitle.addEventListener('click', () => {
//   displayMedias(mediaByTitle);
// });

// console.log(mediaByDate);

////////////////dropdown menu
const chevron = document.querySelector('.chevron-down');
const dropdownMenu = document.querySelector('.dropdown-menu');
const byPopularity = document.querySelector('.by-popularity');
const byDate = document.querySelector('.by-date');
const byTitle = document.querySelector('.by-title');

chevron.addEventListener('click', () => {
  chevron.classList.toggle('toggle-chevron');
  dropdownMenu.classList.toggle('show-dropdown');
});
