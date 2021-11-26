<h1 align="center">Welcome to KASA App 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/suretrustng" target="_blank">
    <img alt="Twitter: suretrustng" src="https://img.shields.io/twitter/follow/suretrustng.svg?style=social" />
  </a>
</p>

<p>
This is a frontend web development project to demonstrate technical prowess to interact with Kisi REST API and build a complex UI. Technologies used includes React, Redux, Material UI, and Kisi JS Client — https://www.npmjs.com/package/kisi-client.
</p>

### Details

- Retrieve a list of groups for the user.
- Show the list of locks associated with a group.
- Implement assigning a new lock to the group.
- Implement de-assigning an assigned lock of the group.

### Backend

[Kisi API](https://api.kisi.io/docs#/) is consumed throughout.

### [Live Demo](https://naughty-albattani-4f74a2.netlify.app/)


### Local Setup

After cloning, run the following commands:

```
npm install
npm start
```

Create a `.env` file and copy the contents of `.env.sample` into it. Add the value of your own kisi email and password.
```
REACT_APP_EMAIL=mykisi@email.com
REACT_APP_PASSWORD=KisiPassword
```

### Running Tests

Tests are added using React Testing Library and Jest, to see the tests, run using:

```
npm run test
```
## Improvements I'd love to make

- Add search feature since the groups and doors have a limit of 5/page for better user experience.
- Filter out chosen doors from select options when creating a new door, this way, a user does not click an already added door. React-select could help with this out of the box.
- I'd love to add active class to the left dashboard menu so as to recognize the current page.
- I'd love to improve the test coverage.
