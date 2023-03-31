import { useState } from 'react';

const formUse = (values) => {
  const [form, setForm] = useState(values);

  const onChangeHandler = (e) => {
    setForm((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };


  return {
    form,
    onChangeHandler,
  };
};

export default formUse;