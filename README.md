# What To Watch - SPA

A Single Page Application developed by [Beatriz Perez](https://github.com/beatriz-perez) using React.

- Trello board: [join WTW trello board](https://trello.com/invite/b/6vu1AH4D/6b9ddcb9b22acd1688b9fc1ebf9efcc7/whattowatch-final-project)
- Presetation: [slides](https://prezi.com/view/W2P8p1bzWLVGQ1dabvAl/)

## SPA documentation

## 1. Description of the project

WhatToWatch is an application where logedin users can create lists to share with friends and colleages.

Users can explore and discover Movies and Series, add them to lists and invite other users to participate in those lists. Check watched/unwatched items and like or unlike them.
They can also follow other users and lists to keep track of their new discoveries.

Movies and series can be liked and marked as watched, which guives the app information to create rankings and help users find what's on trend today on the movies and series pages.

## 2. Wireframes

![work wireframes and user stories](./src/images/wireframess-userstories.jpeg)

## 3. Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Dependencies:

- animate.css
- axios
- node-sass
- npm
- react-router-dom

## 4. Technologies Used

- App building:React + JXS
- Styling: sass
- API calls: axios

## 5. Components and Pages structure

The WhatToWatch application has several types of components:

- Page components: main components organizing the information shonw in each of the routes.
- Layout components: componets to handle the common structure of similar pages.
- Content components: details, lists and cards to show information.
- Authentication: wrapper components to share authentication information throgout the app avoiding props drilling.

## 6. Demo

![Demo](./src/images/demo.gif)

## 7. Future Work

An interesting feature to implement in the future could be keeping track of watched episodes in series.
Rating watchItems and adding comments (spoilers aside) would be great too. And being able to navigate to items with the same actors or directors.

## 8. Resources

WhatToWatch data base grows as users explore more and more titles. Every time a new title is discovered by a user it is added to our system, and to do so the app get new items from **IMDb API**.
You can find their documentation [here](https://imdb-api.com/api).

Other helpful resources have been libraries like [animate.css](https://animate.style/), the [codepen](https://codepen.io/trending) community and our good friend [stackoverflow](https://stackoverflow.com/).
