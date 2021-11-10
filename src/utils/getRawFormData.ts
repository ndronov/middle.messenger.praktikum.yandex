const getRawFormData = (e: Event): FormData => {
  const form = e.target as HTMLFormElement;

  return new FormData(form);
};

export default getRawFormData;
