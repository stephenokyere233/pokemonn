const display = document.querySelector(".display");

const renderData = (data) => {
  console.log(data);
  data.forEach((item) => {
    display.innerHTML += `<div class="pokemonCard">
       <img src='${item?.sprites.front_default}' />
             <p>${item.name}</p>
     </div>`;
  });
};
const getSinglePokeData = async (endpoint) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    console.log("Couldn't fetch");
  }
};

const getPokemonData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then((res) => res.json())
    .then((data) => {
      const promises = data.results.map((item) => {
        return getSinglePokeData(item.url);
      });
      return Promise.all(promises);
    })
    .then((pokemonDetails) => {
      renderData(pokemonDetails);
    })
    .catch((err) => {
      console.error(err);
    });
};

getPokemonData();
