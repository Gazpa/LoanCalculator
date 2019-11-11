This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## App description

Simple app to calculate loans and credits for a user to pick. It displays a few inputs in order to calculate the values for monthly payments. (Limit 4 hours)

### Possible improvement with a little bit more time

If I had some more time I would have:

- Add testing with jest and enzyme
- Change a lot the styles, now they look bad
- Limit the amount of decimals floats display
- Messages to make the interface friendlier, for example when no data is displayed
- Add sass
- Ordering the imports, changing also the root folder reference
- Maybe use `useReducer` instead of multiple states in the `App` component

### Technical choices

I've only used `create-react-app` since the task is simple and does not need complex state management, user authentication, app navigation, libraries for API calls, etc...
