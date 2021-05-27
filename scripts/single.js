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
        <h1>${name}</h1>
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
  console.log(infos.portrait);
};
displaySingleInfo();
