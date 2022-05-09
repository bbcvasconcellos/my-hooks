# my_hooks

This project contains a collection of custom hooks. The purpose of this project
is to ease and speed up development by avoiding writing frequently used code
from scratch every time for `react`.

## Stack used

This project is developed using the following stack:

- [React](https://reactjs.org/docs/getting-started.html).
- [TypeScript](https://www.typescriptlang.org/docs/).

## Getting started

1. Clone this repository; write the following command in your terminal:

- `git clone` https://github.com/bbcvasconcellos/my-hooks.git

2. Let´s now install any packages with the following commands:

- with npm: `npm i` or `npm install`
- with yarn: `yarn`

3. Go to the src folder, then open the hooks folder. In this folder you should see a list of files whose each contain a different hook. Feel free to use them as you like, or to send any suggestion and collaborate!

### List of Hooks

- _useAuth:_ hook to obtain user access Authorization based on login credentials. Intended to be used to determine which routes the user has access to.
- _useFetch:_ hook to fetch data from an api, useful to speedup writing fetch or axios function from scratch everytime an api call is needed.
- _useWidth:_ hook to responsively obtain the screen width, useful for responsive development.
- _useFile:_ hook to save files which can be use for further validations prior to submission to the backend. 
<bold>e.g.<bold/> I use it in my work in to save an user's file, and to validate later on whether its format is accepted, or if the file is empty; in those cases it returns an error(boolean) which can be treated by the developer the way he/she wants to.
