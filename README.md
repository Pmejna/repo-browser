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

I believe this is a good project baseline. I might implement Redux if I will find a use for it.

## How to use this project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## My process journal

This app is a simple project. Some of the libraries might be an overkill, but might be helpful to speed up the development process.
