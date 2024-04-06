import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Formik.css';

const schema = yup
  .object({
    name: yup.string().required('Ім’я є обов’язковим'),
    email: yup
      .string()
      .email('Введіть дійсну електронну адресу')
      .required('Електронна пошта є обов’язковою'),
    password: yup
      .string()
      .min(6, 'Пароль має містити мінімум 6 символів')
      .required('Пароль є обов’язковим'),
  })
  .required();

export default function Formik() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label className="label">Ім'я</label>
        <input {...register('name')} className="input" />
        <p className="error-message">{errors.name?.message}</p>
      </div>
      <div className="form-group">
        <label className="label">Електронна пошта</label>
        <input {...register('email')} className="input" />
        <p className="error-message">{errors.email?.message}</p>
      </div>
      <div className="form-group">
        <label className="label">Пароль</label>
        <input type="password" {...register('password')} className="input" />
        <p className="error-message">{errors.password?.message}</p>
      </div>
      <button type="submit" className="submit-button">
        Відправити
      </button>
    </form>
  );
}
