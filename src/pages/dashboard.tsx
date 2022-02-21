import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        labels: {
            format: 'dd/MM',
        },
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '09/02',
            '10/02',
            '11/02',
            '12/02',
            '13/02',
            '14/02',
            '15/02',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
};

const series = [
    {
        name: 'series1', data: [31, 120, 10, 28, 61, 18, 109]
    }
];

export default function Dashboard() {
    return (
        <Flex direction='column' h='100vh'>
            <Header />

            <Flex w='100%' my='16' maxWidth={1480} mx='auto' px='16'>
                <Sidebar />

                <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignItems='flex-start' pb='16'>
                    <Box
                        p={[ '6', '8' ]}
                        bg='gray.800'
                        borderRadius={8}
                        pb='4'
                    >
                        <Text fontSize='lg' mb='4'>Commits da semana</Text>
                        <Chart options={options} series={series} type='area' height={160} />
                    </Box>

                    <Box
                        p={[ '6', '8' ]}
                        bg='gray.800'
                        borderRadius={8}
                        pb='4'
                    >
                        <Text fontSize='lg' mb='4'>Pull requests da semana</Text>
                        <Chart options={options} series={series} type='area' height={160} />
                    </Box>

                    <Box
                        p={[ '6', '8' ]}
                        bg='gray.800'
                        borderRadius={8}
                        pb='4'
                    >
                        <Text fontSize='lg' mb='4'>Testes da semana</Text>
                        <Chart options={options} series={series} type='area' height={160} />
                    </Box>

                    <Box
                        p={[ '6', '8' ]}
                        bg='gray.800'
                        borderRadius={8}
                        pb='4'
                    >
                        <Text fontSize='lg' mb='4'>Issues semana</Text>
                        <Chart options={options} series={series} type='area' height={160} />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}