import { Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/common/Search";
import SearchHeader from "../components/common/SearchHeader";
import { formatDate } from "../helpers/formatDate";

const Home: FunctionComponent = () => {

    const params = useLocation();
    const [urlParams] = useState(params.search.substring(1));
        

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
            
            <Box >
                <SearchHeader 
                    title="Search for specific GitHub repository" 
                    subtitle="Enter github repository name and wait for results" 
                />
                <Search 
                    searchTermFromURL={urlParams} 
                    searchContext="repositories" 
                    tableRows={tableRows} 
                    tableColumns={tableColumns}
                />
            </Box>
        </Box>
     );
}
 
export default Home;