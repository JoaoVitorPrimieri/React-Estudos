import { useForm } from 'react-hook-form';

import type { LoginFormValues } from './login.types';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../../api/authentication/authentication';

const useLogin = () => {
  const schema = yup.object({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória'),
  });

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin = methods.handleSubmit(async (data) => {
    try {
      const response = await login(data);

      console.log(response);
    } catch (err: any) {
      console.log(err);
    }
  });

  return {
    methods,
    handleLogin,
  };
};

export default useLogin;
