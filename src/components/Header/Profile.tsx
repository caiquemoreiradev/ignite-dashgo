import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align='center' >
            {showProfileData && (
                <Box mr='4' textAlign='right'>
                    <Text>Caique Moreira</Text>
                    <Text>caiquemoreiradev@gmail.com</Text>
                </Box>
            )}
            <Avatar size='md' name='Caique Moreira' src='https://github.com/caiquemoreiradev.png' />
        </Flex>
    )
}