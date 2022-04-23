import { Box, Button, Input, InputGroup, InputLeftElement, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent, useState} from "react";
import {MdSearch} from 'react-icons/md';

interface SearchProps {
}
 
const Search: FunctionComponent<SearchProps> = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    console.log(searchTerm);
    
    const {colorMode} = useColorMode();

    return ( 
        <Box>
            <Box>
                <form>
                    <InputGroup width={"100%"}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<MdSearch color='gray.300' />}
                        />
                        <Input 
                            type='text' 
                            placeholder='Search Github repositories'
                            onChange={(e) => handleSearch(e)}
                        />
                        <Button 
                            type="submit" 
                            bg="green.600" 
                            sx={{
                                width: "120px",
                                marginLeft: "20px",
                                backgroundColor: `${colorMode === "dark" ? "blue.900": "blue.100"}`,
                                "&:hover": {
                                    color: "gray.100",
                                    backgroundColor: "blue.400"
                                }
                            }}
                        >
                            <Text>Search</Text>
                        </Button>
                    </InputGroup>
                </form>
            </Box>
            <Box overflowX="auto">
                Table
            </Box>
        </Box>
     );
}
 
export default Search;