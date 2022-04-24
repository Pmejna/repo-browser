import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface SearchHeaderProps {
    title: string;
    subtitle: string;
}
 
const SearchHeader: FunctionComponent<SearchHeaderProps> = ({title, subtitle}) => {
    const {colorMode} = useColorMode();

    return ( 
        <Box marginBottom="0.8rem">
            <Text 
                as="h1" 
                fontSize="4xl" 
                fontWeight="bold" 
                color={colorMode === 'dark' ? 'blue.400' : 'blue.900'}
            >
                {title}
            </Text>
            <Text 
                as="p" 
                fontSize="md" 
                fontWeight="light"
            >
                {subtitle}
            </Text>
        </Box>
     );
}
 
export default SearchHeader;