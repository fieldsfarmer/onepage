The webpage used in my personal website :-)

Use the following commands in your vagrant development environment to get this up and running
```bash
git clone https://github.com/uiuc-web-programming/mp1_starter.git
cd mp1_starter
npm install
bower install
grunt
```

You should edit the following:
- `public/index.html` - all files in the `public` folder will be served by the server
- `sass` folder - all sass files here will be compiled to `public/css/styles.css`
- `js` folder - all javascript files here will be uglified and put in `public/js/script.js`
