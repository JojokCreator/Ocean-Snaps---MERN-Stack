# Ocean-Snaps---MERN-Stack-Site

## Overview

A MERN full stack app using MongoDB, Express, React and Node.js. The app has a full authentication system built from scratch along with google login. It allows users to post photos, comment and like them. It uses REDUX and pagination along with conditional rendering to display things dependant on a users status.

### Features

- **Create Posts** - User is able to create photo posts that are added to the site. 
- **Post Comments** - Users are able to post comments on the site.
- **Like Posts** - Users are able to like posts.
- **Featured Posts** - Featured Posts are displayed in a each post details page.
- **Responsive** - Site is fully responsive.  

### Links

- Live Site URL: [Deployed on Netlify](https://ocean-snaps.netlify.app/)
- Backend is hosted on Heroku

## My process

### Built with
- [React.JS](https://reactjs.org/) - JavaScript library 
- [MongoDB](https://mongodb.com/) - Document-oriented database program
- [Material UI](https://mui.com/) - Component library
- Media queries


### What I learned

- **Redux**
How to use redux actions, store and reducers to create a simple and predictable state used across the whole application.
  
- **Pagination**
Add numbers to identify the sequential number of the pages. I used to skip and limit in the backend to reduce the size of data in the database into pages that are returned to the front end. 
  
- **MongoDB & Mongoose**
I used Mongoose to manage relationships between data and provide a schema validation.

```bash const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
```

