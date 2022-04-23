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









