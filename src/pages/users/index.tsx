import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link as ChackraLink } from "@chakra-ui/react";

import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, isError } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefetchUser(userId: string) {

        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`user/${userId}`);

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes
        })
    }

    return (
        <Box>
            <Header />

            <Flex w='100%' my='16' maxWidth={1480} mx='auto' px='16'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8' >
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading
                            size='lg'
                            fontWeight='normal'
                        >
                            Usuários

                            {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
                        </Heading>

                        <Link href={'/users/create'} passHref >
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Criar novo usuário
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify='center'>
                            <Spinner />
                        </Flex>
                    ) : isError ? (
                        <Flex>
                            <Text>Ocorreu um erro ao buscar pelos usuários, por favor tente novamente.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme='whiteAlpha'>
                                <Thead>
                                    <Tr>
                                        <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                            <Checkbox colorScheme='pink' />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}

                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {data.users.map(user => (
                                        <Tr>
                                            <Td px={['4', '4', '6']}>
                                                <Checkbox colorScheme='pink' />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <ChackraLink color='purple.500' onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                        <Text fontWeight='bold'>{user.name}</Text>
                                                    </ChackraLink>
                                                    <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && <Td>{user.created_at}</Td>}
                                            <Td>
                                                {isWideVersion && (
                                                    <Button
                                                        as='a'
                                                        size='sm'
                                                        fontSize='sm'
                                                        colorScheme='purple'
                                                        leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                                                    >
                                                        Editar
                                                    </Button>
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}

                                </Tbody>
                            </Table>
                        </>
                    )}

                    <Pagination
                        totalCountOfRegisters={20}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </Box>
            </Flex>
        </Box>
    )
}