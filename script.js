const ourAnswers = [
  "lebron",
  "kobe",
  "pokemon",
  "simpsons",
  "jedi",
  "matrix",
  "trudeau",
  "trump",
  "seinfeld",
  "drake",
  "raptors",
  "joker",
  "inception",
  "soccer",
  "karaoke",
  "fishing",
  "mini golf",
  "speed walking",
  "hackathon",
  "rapper",
  "canada",
  "homework",
  "knitting",
  "chef",
  "monopoly",
  "poker",
  "payday",
  "coffee",
  "drowning",
  "racing",
  "scuba diving",
  "boxing",
  "reading",
  "messi",
  "skydiving",
  "basketball",
  "eminem",
  "disco",
  "breakdance",
  "baking",
  "weed",
  "ice fishing",
  "winter",
  "surfing",
  "bitcoin",
  "stocks",
  "ufc",
  "wwe",
  "concert",
  "gollum",
];

// grab a random answer from our array
// each array item has an index #, so we generate a random # between 0 and the array length
// then we pull that answer from the array with our random index #

ourAnswer = ourAnswers[Math.floor(Math.random() * ourAnswers.length)];
console.log(ourAnswer);

axios
  .get(
    `https://api.giphy.com/v1/gifs/search?api_key=lb0AoRDXWhAPC7TD9WjVdMMTC3h5CBat&q=${ourAnswer}&limit=4`
    // this will get the first 4 gif objects associated with ourAnswer
  )
  .then((result) => {
    // instead of getting all first 4 objects in their entirty, just store their URLs in a variable array by looping through
    console.log(result);
    result.data.data.forEach((gif) => {
      createGif(gif.images.downsized_large.url); //this will create the 4 gifs that come. the function is defined below
    });
    addBorder();
  })
  .catch((error) => {
    console.log(error);
  });

const heroContainer = document.querySelector(".hero__container");

function createGif(url) {
  const gifImage = document.createElement("img");
  gifImage.classList.add("hero__gif");
  gifImage.setAttribute("src", url);
  heroContainer.appendChild(gifImage);
}

// Take the user input and check if it is equal to our answer

const formInput = document.querySelector("#answer__form");
formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  let userAnswer = event.target.answerSubmisson.value;
  console.log(userAnswer);

  userAnswer = userAnswer.toLowerCase();
  console.log(userAnswer);

  /// Instead of alert use DOM to create a hidden box with (correct/incorrect affirmation gif)

  /// every time the user submits, generate a new random number between 1-20 to be used an an index
  // if correct answer search for a url path correct and grab a random index
  // else same thing but for  parameter wrong

  if (userAnswer === ourAnswer) {
    // alert("You are correct!") // correct path api request
    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?api_key=lb0AoRDXWhAPC7TD9WjVdMMTC3h5CBat&tag=correct` //correct gifs
      )
      .then((result) => {
        // call display correctness function
        console.log(result);
        answerURL = result.data.data.images.downsized_large.url;
        console.log(answerURL);
        createBlowUpGif(answerURL);

        const answerQuestion = document.querySelector(".answer__question");
        answerQuestion.innerText = `Correct! The answer is *${ourAnswer}*`;

        // Resets the answer field to be blank after user submits their answer
        event.target.answerSubmisson.value = "";
      });
  } else {
    // alert("You suck! Try again!"); // wrong path api request
    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?api_key=lb0AoRDXWhAPC7TD9WjVdMMTC3h5CBat&tag=incorrect` //incorrect gifs
      )
      .then((result) => {
        // call displayanswerGIF function
        console.log(result);
        answerURL = result.data.data.images.downsized_large.url;
        console.log(answerURL);
        createBlowUpGif(answerURL);
        event.target.answerSubmisson.value = "";
      });

    addBorder();
  }
});

// below is the function that temporarily displays a hidden container with a gif depending on the user correct/incorrect/give up answer

const responseGif = document.querySelector(".hero__response");

function createBlowUpGif(gifUrl) {
  responseGif.setAttribute("src", gifUrl);
  responseGif.setAttribute("style", "display: flex");
  setTimeout(() => {
    responseGif.setAttribute("style", "display: none");
  }, 5000);
}

// this section is if the user gives up and wants the answer

const answerReveal = document.querySelector("#revealAnswer");

answerReveal.addEventListener("click", (event) => {
  event.preventDefault();

  axios
    .get(
      `https://api.giphy.com/v1/gifs/random?api_key=lb0AoRDXWhAPC7TD9WjVdMMTC3h5CBat&tag=yousuck`//you suck gifs
    )
    .then((result) => {
      // call displayanswerGIF function
      console.log(result);
      answerURL = result.data.data.images.downsized_large.url;
      console.log(answerURL);
      createBlowUpGif(answerURL);

      /// this part displays the answer where the question originally was

      const answerQuestion = document.querySelector(".answer__question");
      answerQuestion.innerText = `You gave up? Pathetic. The answer was *${ourAnswer}*`;
    });
});

// below is code to set a different border color for each of the 4 gifs

function addBorder() {
  const gifArray = document.querySelectorAll(".hero__gif");
  // console.log(gifArray)
  gifArray.forEach((gif, index) => {
    if (index === 0) {
      gif.classList.add("hero__gif--blue");
    }
    if (index === 1) {
      gif.classList.add("hero__gif--hotPink");
    }
    if (index === 2) {
      gif.classList.add("hero__gif--pink");
    }
    if (index === 3) {
      gif.classList.add("hero__gif--purple");
    }
  });
}