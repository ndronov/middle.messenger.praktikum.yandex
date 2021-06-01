const handleSubmit = (e) => {
  const formData = new FormData(e.target);
  const nonEmptyFields = {};

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldValue) {
      nonEmptyFields[fieldName] = fieldValue;
    }
  }

  console.log('заполненные поля формы:', nonEmptyFields);
  e.preventDefault();
}

const handleFormSubmit = () => {
  const form = document.forms[0];

  if (!form) {
    console.log('на странице нет доступных форм');

    return;
  }

  form.addEventListener('submit', handleSubmit);
};

export default handleFormSubmit;
