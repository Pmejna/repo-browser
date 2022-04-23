import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Search from "../components/common/Search";

const Home: FunctionComponent = () => {
        
    const {colorMode} = useColorMode();
    return ( 
        <Box marginTop="1rem" paddingX={{sm: "1rem", md: "5rem"}}>
            <Box marginBottom="0.8rem">
                <Text 
                    as="h1" 
                    fontSize="4xl" 
                    fontWeight="bold" 
                    color={colorMode === 'dark' ? 'blue.400' : 'blue.900'}
                >
                    Search for specific GitHub repository
                </Text>
                <Text 
                    as="p" 
                    fontSize="md" 
                    fontWeight="light"
                >
                    Enter github repository name and click search to get results
                </Text>
            </Box>
            <Box >
                <Search />
            </Box>
        </Box>
     );
}
 
export default Home;