# Simple Github Repository Browser
This project is (as the title suggests) a simple Github Repository Browser.
I have used create-react-app to start this project. Currently it install the version 18.0.0 of React.
The first thing I did was to step down to the version 17.0.2. The reason for this is that I am aware
of some incompatibilities between many libraries/dependencies with react v 18.0.0. To avoid further issues
I have used the version 17.0.2.

## Libraries/dependencies
I selected the following libraries/dependencies for this project:

* [react](https://reactjs.org/) - main library for this SPA
* Typescript (for type checking)
* [react-router-dom v6](https://reactrouter.com/) - the routing library, as the app might get bigger it gives a lot of options has useful build-in hooks
* [chakra-ui](https://chakra-ui.com/) - My main choice for styling, build-in dark/light mode, good selection of components, it use @emotion/core. I am familiar as well with MaterialUI and StyledComponents. But I gave a go this one.
* [swr](https://swr.now.sh/) - the library I used to help with data fetching from the API. Supports session storage and caching data
* [react-table](https://react-table.js.org/) - my selection for the table pagination, sorting and filtering. Lot of options, tons of hooks to implement if needed in the future. 
* [react-icons](https://react-icons.github.io/) - a great icon library to jumpstart the project with. 

This app is a simple project. Some of the libraries might be an overkill, but might be helpful to speed up the development process.
I believe this is a good project baseline. 

## Other decisions
* State: at this point state will be allocated inside the Search component. Any state related to the API might be shared
between the components and pages using SWR hooks. I might implement redux store and reducers to handle the state if I find a use for it.

## Live preview
Open [https://voluble-begonia-3f1bed.netlify.app/](https://voluble-begonia-3f1bed.netlify.app/)

## How to use this project

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## My process journal

Down Below is my journal for this project. You can see the process I took, also I would like to justify some of my decisions.

* My first step was to create template layout - it can be easily modified to suit the needs of the project.
  The layout is set inside of the react Route in App.tsx, thanks to Outlet all children passed down this Route can be rendered within it.
  It is a simple wrapper consisting of a header with title and dark/light mode button.

* At the moment only Home page is implemented. The Home page is the main page of the app. Inside of it should be a search bar with a button and a table with the results.

* Next step will be implement swr and create the hook for data fetching.

I needed fetcher function, and hooks.ts file for our custom swr hook.

My fetcher look like this:
```
export default function fetcher(url: string, data = undefined) {
    return fetch(`${url}`, {
        method: 'GET',
        body: JSON.stringify(data),
    }
    ).then((res) => {
        if (res.status > 399 && res.status < 200) {
            throw new Error();
        }
        return res.json()
    }).catch((e) => {
        throw new Error();
    })
}
```

The hook:
``` 
import useSWR from "swr"
import fetcher from "./fetcher"

export const useRepoSearch  = (query: string) => {
    const {data, error} = useSWR(`https://api.github.com/search/repositories?${query}`, fetcher)
    return {
        data: (data as any) || [],
        isLoading: !data && !error,
        isError: error
    }
}
```

* I added two methods to the search component: 'handleSearch' and 'handleSubmit'. handleSearch is used in the input element to extract e.target.value of input and handleSubmit is triggered by button to update query and by that activate the swr hook.

* As I received the data from the API I needed to display them in the table. I used react-table as a library to paginate and
sort the data. I used chakra-ui code examples (pagination, and sorting) to implement the table. Then I styled the table to suit
the style of the app.

* The official react-table documentation requested to use useMemo for the table data memoizing. 
I created header data with accessors:

```
const columns = useMemo(() => [
    {Header: "Name", accessor: "name"},
    {Header: "Owner", accessor: "owner"},
    {Header: "Stars", accessor: "stars"},
    {Header: "Created At", accessor: "created_at"},
], []);
```

also the data coming into the table as an object using accessors as a keys:

```
const tableData = useMemo(() => {
    if (data && data.items) {
    return data.items.map((item: any) => {
        return {
            name: item.name,
            owner: item.owner.login,
            stars: item.stargazers_count,
            created_at: item.created_at
        }
    })} else {
        return [];
    }
    }, [data])
```
* If there will be an error, or no results the Search component should show the message. Else it should show the table.

* The next important feature is to update url address with the query elements.
In the Home page I added the reactRouter hook and useState: 
```
const params = useLocation();
const [urlParams, setUrlParams] = useState(params.search.substring(1));
```
I am passing the urlParams to the Search component as a prop:

```
<Box >
    <Search searchTermFromURL={urlParams}/>
</Box>
```

Inside of the Search component I initialize the searchTerm with it. This way when page is opened with params in the url it will search
for the query:

```
const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
```

* Now is time to implement the search functionality without a button I removed the SearchButton and I used the debounce function to limit the number of requests to the API.
The debounce function is firing up in the useEffect hook, triggered by searchTerm. This way the page will load the data in the
initial load and when the user types something in the search bar it will fire up the debounce function and wait for 350ms.
My use effect:
```
useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        handleSubmit();
        }, 350)
    
        return () => clearTimeout(delayDebounceFn)
    
}, [searchTerm]);
```

* In the meantime I realized that my swr calls are still triggered when the user types the previous query. 
First I created the SWRConfig wrapper in the index.tsx file. Then based on official swr documentation I created localStorageProvider.
And implemented that in the SWRConfig. I added two more helpful options to the config:

```
<SWRConfig value={{ provider: localStorageProvider, revalidateIfStale: false, revalidateOnFocus: false }}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
</SWRConfig>
```

This way the data will be fetched from the localStorage if it is there. And no additional request will be made to the API.

* next I tidied up the code a little bit. I removed as well warnings which could cause an issue with the CI (missing dependencies in useEffect, value never used and so on...).

* Last but not least I fixed a bug with API calls being called after every keystroke. Added the useMemo wrapper to handleSubmit.
  I adjusted as well some mobile styles.

* I have changed the callback interval in the 500ms as the 350 was too small in the mobile UX.
Another thing to improve the UX was to add the delete button to the input field on the right side.

* I added the global styles to the theme, changed scrollbar look, and added custom faicon.

* At this point there is one important feature to implement: adding the sorting params to the url. And consuming them in the Search component. 
In the end I din't find the use for Redux or other state management. If the app grow and will need more features I might consider
using useReducer or useContext. 

## My thoughts and future improvements

So far this was fun project to work on. I worked first time with react-table and couple of other small libraries.

There is a few important bits missing: 

I haven't used the environment variables. I could see couple of use cases:
* there might be multiple url's patterns.
* there might be a need to use the API keys.
* some features might be different in the dev mode and in the production mode. (implementing recaptcha for example) 

Unit Testing is missing (Jest)
I could use more types accross the board.

Features I would like to add:
* sorted table would stay the same after refresh/reload. I would add the params to the url.
* github profile search. 
* github profile preview. 
* github profile account activity comparison.
