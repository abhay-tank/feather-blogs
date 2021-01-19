# Feather Frontend using React, Redux

### Feather blogs is CRA with backend as [Feather API Server](https://github.com/abhay-tank/feather-api.git) with user authentication, react routing and react redux.

# Centralised state and Redux

- ### Seperate states are maintained for storing auth/user data and blogs data with the help of reducers. Auth state is maintained by authReducer and Blogs state is maintained by blogReducer.

- ### Action generators are used to dispatch main actions which involves middlewares where as helper or util actions such as loading and error are dispatched directly.

- ### All the actions are listed inside auth.actions and blogs.actions respectively.

- ### Redux thunk is used for creating middlewares where async API calls to Feather Server are made.

# Routing

- #### Home `/`
- #### Sign Up `/signUp`
- #### Sign In `/signIn`
- #### Verify User Account `/auth/verifyUserAccount/:authToken`
- #### Blogs **Protected Route** `/blogs`
- #### Blog **Protected Route** `/blogs/:blogId`
- #### Create Blog **Protected Route** `/createBlog`

# Project Directory Structure

```
.
├── package.json
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── assets
│   │   └── images
│   │       ├── avatar.png
│   │       ├── create-blog.svg
│   │       ├── feather-logo.svg
│   │       ├── home-bg.svg
│   │       ├── icons
│   │       │   ├── blogs.svg
│   │       │   ├── create-blog.svg
│   │       │   ├── enter.svg
│   │       │   ├── feather-alt.svg
│   │       │   ├── feather.svg
│   │       │   ├── home.svg
│   │       │   ├── logo.svg
│   │       │   ├── logout.svg
│   │       │   └── user.svg
│   │       ├── loading.svg
│   │       ├── sign-in.svg
│   │       ├── sign-up.svg
│   │       └── verify.svg
│   ├── components
│   │   ├── error
│   │   │   ├── error.jsx
│   │   │   └── error.module.scss
│   │   ├── loading
│   │   │   ├── loading.jsx
│   │   │   └── loading.module.scss
│   │   └── navbar
│   │       ├── navbarComponent.jsx
│   │       └── navbarComponent.module.scss
│   ├── configuration
│   │   └── config.js
│   ├── index.js
│   ├── index.scss
│   ├── models
│   │   ├── AuthError.js
│   │   ├── Blog.js
│   │   └── User.js
│   ├── pages
│   │   ├── Blog
│   │   │   ├── Blog.jsx
│   │   │   └── Blog.module.scss
│   │   ├── Blogs
│   │   │   ├── Blogs.jsx
│   │   │   └── Blogs.module.scss
│   │   ├── CreateBlog
│   │   │   ├── CreateBlog.jsx
│   │   │   └── CreateBlog.module.scss
│   │   ├── Home
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePage.module.scss
│   │   ├── SignIn
│   │   │   ├── SignInPage.jsx
│   │   │   └── SignInPage.module.scss
│   │   ├── SignUp
│   │   │   ├── SignUpPage.jsx
│   │   │   └── SignUpPage.module.scss
│   │   └── VerifiyUser
│   │       ├── VerifyUser.jsx
│   │       └── VerifyUser.module.scss
│   ├── redux
│   │   ├── actionsGenerator
│   │   │   └── actions.generator.js
│   │   ├── constants
│   │   │   ├── auth.actions.js
│   │   │   └── blogs.actions.js
│   │   ├── middlewares
│   │   │   ├── authentication.js
│   │   │   └── blogs.js
│   │   ├── reducers
│   │   │   ├── auth.reducer.js
│   │   │   ├── blogs.reducer.js
│   │   │   └── root.reducer.js
│   │   └── store
│   │       └── store.js
│   ├── reportWebVitals.js
│   ├── router
│   │   ├── ProtectedRoute.jsx
│   │   └── router.jsx
│   └── _theme.scss
└── yarn.lock
```

# Run project

```bash
yarn start
```

## Project is composed with [reduxDevTools](https://github.com/zalmoxisus/redux-devtools-extension) for state tracking.

### Project is hosted at [Feather Blogs](https://feather-blogs.herokuapp.com/).
