export const handleForm = (data) => {
  const modalForm = document.querySelector('.modal-form');
  const formName = document.querySelector('.form-photographer');
  const btnSubmit = document.querySelector('.btn-submit');

  const closeForm = document.querySelector('.close-form-btn');
  const btnContact = document.querySelector('.contact-btn');
  const singleName = data.infos[0].name;
  const form = document.querySelector('form');
  const inputs = document.querySelectorAll('.form-input');
  const submitedData = {
    prenom: null,
    nom: null,
    email: null,
    message: null,
  };
  //toggle form
  closeForm.addEventListener('click', () => {
    modalForm.style.display = 'none';
  });

  btnContact.addEventListener('click', () => {
    modalForm.style.display = 'flex';
    formName.innerText = singleName;
  });
  //submit
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      let inputId = input.getAttribute('id');
      submitedData[inputId] = input.value;
    });
    console.log(submitedData);

    modalForm.style.display = 'none';
    form.reset();
  });
};
