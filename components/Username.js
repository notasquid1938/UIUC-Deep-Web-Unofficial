import React, { useState, useEffect } from "react";
import styles from "../styles/Username.module.css";

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "white",
  "gray",
  "brown",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "indigo",
  "aqua",
  "silver",
  "gold",
  "maroon",
  "navy",
  "olive",
  "plum",
  "turquoise",
  "violet",
];

const animals = [
  "lion",
  "tiger",
  "bear",
  "elephant",
  "giraffe",
  "fly",
  "kangaroo",
  "zebra",
  "hippo",
  "leopard",
  "rhino",
  "penguin",
  "crocodile",
  "koala",
  "gorilla",
  "cheetah",
  "panda",
  "kangaroo",
  "squirrel",
  "ostrich",
  "peacock",
  "raccoon",
  "unicorn",
  "dolphin",
  "toucan",
];

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const generateRandomUsername = () => {
    const randomColor = capitalizeFirstLetter(
      colors[Math.floor(Math.random() * colors.length)]
    );
    const randomAnimal = capitalizeFirstLetter(
      animals[Math.floor(Math.random() * animals.length)]
    );
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return randomColor + randomAnimal + randomNumber;
  };
  
  const isValidUsernameFormat = (username) => {
    const pattern = /^[A-Z][a-z]+[A-Z][a-z]+\d{9}$/;
    return pattern.test(username);
  };
  
  const Username = () => {
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      const storedUsername = localStorage.getItem("generatedUsername");
  
      if (storedUsername && isValidUsernameFormat(storedUsername)) {
        setUsername(storedUsername);
      } else {
        const generatedUsername = generateRandomUsername();
        setUsername(generatedUsername);
        localStorage.setItem("generatedUsername", generatedUsername);
      }
    }, []);
  
    return (
      <div className={styles.usernameContainer}>
        <div className={styles.usernameBox}>
          <p className={styles.username}>{username}</p>
        </div>
      </div>
    );
  };
  
  export { Username };
