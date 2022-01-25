let body = document.querySelector("body");
let maindiv = document.getElementById("maindiv");
let home_bg_image = document.getElementById("home_bg_image");
//fetching the movie data

async function searchMovie() {
  const movieinput = document.getElementById("movieinput").value;
  const url_1 = `https://www.omdbapi.com/?s=${movieinput}&apikey=c62882e5`;

  let res = await fetch(url_1);
  let data = await res.json();
  return data.Search;
}

//displaying fetched data

async function displaymovies() {
  home_bg_image.style.display = "none";
  try {
    const data = await searchMovie();
    maindiv.innerHTML = "";

    data.map(async function (movie) {
      const url_2 = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=c62882e5`;
      let out = await fetch(url_2);
      let ratingdata = await out.json();

      let image = document.createElement("img");
      image.setAttribute("src", movie.Poster);
      let title = document.createElement("h3");
      title.textContent = movie.Title;
      let year = document.createElement("h5");
      year.textContent = `Released - ${ratingdata.Released}`;
      let genre = document.createElement("h5");
      genre.textContent = `Genre - ${ratingdata.Genre}`;
      let rating = document.createElement("h5");
      rating.textContent = `Rating - ${ratingdata.imdbRating} / 10`;
      let detaildiv = document.createElement("div");
      detaildiv.setAttribute("id", "detaildiv");
      let subdiv = document.createElement("div");
      subdiv.setAttribute("id", "subdiv");
      let reclogo = document.createElement("img");
      reclogo.setAttribute("src", "images/recommended.png", "id", "reclogo");

      detaildiv.append(title, year, genre, rating);
      subdiv.append(reclogo, detaildiv, image);
      maindiv.append(subdiv);
      body.style.backgroundColor = "#36454F";

      if (ratingdata.imdbRating > 8.5) {
        reclogo.style.display = "block";
      }
    });
  } catch (error) {
    maindiv.innerHTML = "";
    let image = document.createElement("img");
    image.setAttribute("id", "err_img");
    image.setAttribute(
      "src",
      "https://cdn.dribbble.com/users/381530/screenshots/3949858/404.gif"
    );
    maindiv.append(image);
    body.style.backgroundColor = "#f0f0f0";
  }
}
