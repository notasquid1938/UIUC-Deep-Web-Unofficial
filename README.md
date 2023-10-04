## Welcome

This is the repo for UIUC's Unofficial Dark Web page. Intended for hosting on TOR, however it can also be hosted on the clearnet if you want higher traffic and less privacy for users.

uiuc2vjgvhjqbbuo37ckym4atsejqxxbr4lgacpmxbmnz2ka6wjeqdyd.onion

## Website Architecture

Uses MongoDB to store forum posts, replies, and live chat messages. Yes, this could probably be done better using an SQL database, but I'm very familiar with Mongo so it'll have to do. I invite anyone to rewrite all of this for an SQL database, preferably using Postgres, if you are so inclined.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:80](http://localhost:80) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


