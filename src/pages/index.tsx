import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Form/Input";
import { useRouter } from "next/router";
import { Logo } from "../components/Header/Logo";

type SignInFormData = {
  email: string;
  password: string;
}

const sigInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sigInFormSchema)
  });

  const errors = formState.errors;

  const handleLogin: SubmitHandler<SignInFormData> = async (values) => {

    await new Promise(resolve => setTimeout(resolve, 2000));

    router.push('/dashboard');

    console.log(values)
  }

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >

      <Flex flexDirection='column'>
        <Logo />

        <Text>A sua plataforma de gestão</Text>
      </Flex>

      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDirection='column'
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack spacing='4'>

          <Input
            name='email'
            type='email'
            label='email'
            error={errors.email}
            {...register('email')}
          />
          <Input
            name='password'
            type='password'
            error={errors.password}
            label='password'
            {...register('password')}
          />

        </Stack>

        <Button
          type="submit"
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
