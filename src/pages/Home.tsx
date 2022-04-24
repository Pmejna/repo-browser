import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/common/Search";
import { formatDate } from "../helpers/formatDate";

const Home: FunctionComponent = () => {

    const params = useLocation();
    const [urlParams] = useState(params.search.substring(1));
        
    const {colorMode} = useColorMode();

    const tableColumns = [
        {
            Header: "Name", 
            accessor: "name"
        },
        {
            Header: "Owner", 
            accessor: "owner"
        },
        {
            Header: "Stars", 
            accessor: "stars"
        },
        {
            Header: "Link", 
            accessor: "link",
            Cell: (e: any) => <a rel="noreferrer" target="_blank" href={e.value}>Click</a>
        },
        {
            Header: "Created At", 
            accessor: "created_at"
        },
    ];

    const tableRows = (item: any) => ({
        name: item.name,
        owner: item.owner.login,
        stars: item.stargazers_count,
        created_at: formatDate(item.created_at),
        link: item.html_url
    });

    return ( 
        <Box marginTop="1rem" paddingX={{sx: "2rem", md: "5rem"}}>
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
                    Enter github repository name and wait for results
                </Text>
            </Box>
            <Box >
                <Search searchTermFromURL={urlParams} searchContext="repositories" tableRows={tableRows} tableColumns={tableColumns}/>
            </Box>
        </Box>
     );
}
 
export default Home;