# kanban board

Simple Kanban board app builded with VueJS.

## Features

I wanted to do a basic kanban board with few features. I made a focus on UX to make the easiest app for the users.

- Lists management
- Tasks management
- FR/EN translation
- Tasks drag and drop
- Show how much tasks are in list: if there is more than 5 tasks in tab, a visual alert will be shown
- Cleaned shortcut: remove all tasks in the list
- Protected list: if a list is protected, you cannot clean it, remove it, drag the tasks or drop them inside the list
- All data are stored in localStorage. If you refresh the app, your tasks will be restored. Language preferences are saved too

## Live demo

https://kanban.arthurbaron.fr/

I have published live demo on my website with Firebase.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

## Unit tests

I added basic unit tests. It does not coverage the entire app, because I wanted to render the app the most quickly I could. Cover all the app will be a non-sense because there is no critical maintainability aspect.

| File      | % Stmts | % Branch | % Funcs | % Lines |
| --------- | ------- | -------- | ------- | ------- |
| All files | 73.33   | 60       | 63.41   | 73.03   |

More details with `yarn coverage` command.

### Test

```
yarn test
```

### Test watch

```
yarn test:watch
```

### Coverage

```
yarn coverage
```
