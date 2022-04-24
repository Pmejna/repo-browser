import { ChakraProvider} from '@chakra-ui/react';
import {theme} from './theme/theme';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Home from './pages/Home';
import FindUser from './pages/FindUser';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
          <Routes>
            <Route path="/">
              <Route element={<LayoutWrapper><Outlet /></LayoutWrapper>} path="/">
                <Route index element={<Home />} />
                <Route path="/users" element={<FindUser />} />
              </Route>
            </Route>
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;
