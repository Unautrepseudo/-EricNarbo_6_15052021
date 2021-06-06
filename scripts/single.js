//UI
const singleContentContainer = document.querySelector(
  '.single-content-container'
);
const likes = document.querySelectorAll('.likes');

const herosInfos = document.querySelector('.hero-infos');
const heroImg = document.querySelector('.hero-img');
let getLikes = [];
const profilData = JSON.parse(sessionStorage.getItem('profil_array'));

const { infos, medias } = profilData;

const displaySingleInfo = () => {
  infos.map(({ name, id, city, country, tags, tagline, price, portrait }) => {
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
  });
  heroImg.setAttribute('src', `./assets/img/idPhotos/${infos[0].portrait}`);
};
displaySingleInfo();

const displayMedia = () => {
  let singleName = infos[0].name;
  medias.map(({ title, image, likes, id }) => {
    const numLike = +likes;
    singleContentContainer.innerHTML += `
      <div class="sc-card">
        <div id='${id}' class="img-container">
          <img src="./assets/img/${singleName}/${image}" alt="une belle image" />
        </div>
        <div class="sc-card-footer">
          <span class="sc-card-title">${title}</span>
          <div class="likes-container">
            <span class="likes"> ${numLike} </span><i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    `;
    getLikes.push(numLike);
  });
};
displayMedia();

const reduceLikes = () => {
  const container = document.querySelector('.total-likes-container');
  const sum = document.querySelector('.sum');
  const rate = document.querySelector('.rate');
  let price = infos[0].price;

  const totalLikes = getLikes.reduce((total, item) => {
    total += item;
    return total;
  }, 0);

  sum.innerText = totalLikes;
  rate.innerText = `${price} euros/jours`;
};
reduceLikes();

///////////////
//FORM
///////////////
const modalForm = document.querySelector('.modal-form');

const form = document.querySelector('form');
const inputs = document.querySelectorAll('.form-input');
const closeForm = document.querySelector('.close-form-btn');
const btnSubmit = document.querySelector('.btn-submit');
const btnContact = document.querySelector('.contact-btn');

//toggle form
closeForm.addEventListener('click', () => {
  modalForm.style.display = 'none';
});

btnContact.addEventListener('click', () => {
  modalForm.style.display = 'flex';
});

//get form data

const getFormData = () => {
  const data = {
    prenom: null,
    nom: null,
    email: null,
    message: null,
  };

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      let inputId = input.getAttribute('id');
      data[inputId] = input.value;
    });
    console.log(data);
  });
};
getFormData();
