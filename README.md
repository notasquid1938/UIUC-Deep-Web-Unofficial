## Welcome

![Screenshot 2023-10-04 175236](https://github.com/notasquid1938/UIUC-Deep-Web-Unofficial/assets/99005612/77a845ec-2b8d-4322-9800-4fcb8685e483)

This is the repo for UIUC's Unofficial Dark Web page. I'd love to say that I'm hosting this on Tor right now out of the outmost respect for user privacy, however its actually because I'm currently at university so I can't port foward and self host this on the clearnet. I've found that hosting this on Tor is a great way to avoid local network restrictions.

uiuc2vjgvhjqbbuo37ckym4atsejqxxbr4lgacpmxbmnz2ka6wjeqdyd.onion

## Website Architecture

Uses MongoDB to store forum posts, replies, and live chat messages. Yes, this could probably be done better using an SQL database, but I'm very familiar with Mongo so it'll have to do. I invite anyone to rewrite all of this for an SQL database, preferably using Postgres, if you are so inclined.

## Self-Hosting Instructions

1. Install MongoDB and set up a database called "UIUC-Tor" with two collections: "Messages" and "Posts"
2. Donwload Tor if you haven't already done so and edit your torrc file to add these two lines:
   HiddenServiceDir C:\Users\yourwebsitefolder
   HiddenServicePort 80 127.0.0.1:80
3. Make sure Tor is running as a service 
4. When you restart your server or Tor services the folder you set as the HiddensServiceDir should now have some new stuff in it including a hostname (your onion link) and two encryption files proving you own this onion link
5. Clone the github repo into your HiddenServiceDir
6. Install NodeJS and run npm install to get all the modules needed for the website
7. Finally, run "npm run dev" and the website should now be visible in your localhost:80 or by going to your hostname in Tor
8. Celebrate!
