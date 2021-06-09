interface FormDataType {
  entries: () =>  IterableIterator<[string, FormDataEntryValue]>;
}

const handleSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement) as unknown as FormDataType;
  const nonEmptyFields: Record<string, FormDataEntryValue> = {};

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldValue) {
      nonEmptyFields[fieldName] = fieldValue;
    }
  }

  console.log('заполненные поля формы:', nonEmptyFields);
  e.preventDefault();
}

const handleFormSubmit = () => {
  const form: HTMLFormElement = document.forms[0];

  if (!form) {
    console.log('на странице нет доступных форм');

    return;
  }

  form.addEventListener('submit', handleSubmit);
};

export default handleFormSubmit;