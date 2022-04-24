import { Button, useColorMode } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface MenuButtonProps {
    link: string;
    text: string;
}
 
const MenuButton: FunctionComponent<MenuButtonProps> = (props) => {
    const {colorMode} = useColorMode();

    return ( 
        <Link to={props.link}>
            <Button
                sx={{
                    color: `${colorMode === "dark" ? "gray.300": "gray.200"}`,
                    '&:hover': {
                        color: `${colorMode === "dark" ? "gray.100": "gray.700"}`,
                        backgroundColor: `${colorMode === "dark" ? "blue.400": "blue.200"}`
                    },
                    backgroundColor: `${colorMode === "dark" ? "blue.700": "blue.700"}`,
                    border: `1px solid ${colorMode === "dark" ? "gray.100": "gray.900"}`,
                    borderRadius: '5px',
                    padding: '8px 20px',
                }}
            >
                {props.text}
            </Button>
        </Link>
     );
}
 
export default MenuButton;