import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: '20px', width: '100%', maxWidth: '500px' }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          Форма Регістрації
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { margin: '10px', width: '100%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Ім'я"
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Електронна пошта"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: '100%' }}
          >
            Відправити
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
