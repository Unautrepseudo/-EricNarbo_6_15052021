//UI
const singleContentContainer = document.querySelector(
  '.single-content-container'
);
const herosInfos = document.querySelector('.hero-infos');
const heroImg = document.querySelector('.hero-img');

const profilData = JSON.parse(sessionStorage.getItem('profil_array'));

const { infos, medias } = profilData;

const displaySingleInfo = () => {
  infos.map(({ name, id, city, country, tags, tagline, price, portrait }) => {
    herosInfos.innerHTML = `
      <div class="single-card">
        <div class="name-container">
          <h1>${name}</h1>
          <button>Contactez-moi</button>
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
  });
  heroImg.setAttribute('src', `./assets/img/idPhotos/${infos[0].portrait}`);
};
displaySingleInfo();

const displayMedia = () => {
  let singleName = infos[0].name;
  medias.map(({ title, image, likes, id }) => {
    const like = +likes;
    console.log(like);
    singleContentContainer.innerHTML += `
      <div class="sc-card">
        <div id='${id}' class="img-container">
          <img src="./assets/img/${singleName}/${image}" alt="une belle image" />
        </div>
        <div class="sc-card-footer">
          <span class="sc-card-title">${title}</span>
          <div class="likes-container">
            <span class="likes"> ${like} </span><i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    `;
  });
};
displayMedia();

const likesIncrement = (num) => {
  const likes = document.querySelectorAll('.likes');
  likes.forEach((like) => {
    this.innerHTML = num++;
  });
};
