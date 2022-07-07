let pokes = [];
let results = [];
let selectHtml = '';

async function getPokes() {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=151`)
    .then((data) => {
      return data.json();
    })
    .then((info) => {
      results = info.results;
    })
    .then(() => {
      for (let x = 0; x < results.length; x++) {
        pokes.push({
          value: x + 1,
          label: `#${x + 1} - ${
            results[x].name[0].toUpperCase() +
            results[x].name.substring(1, results[x].name.length)
          }`,
        });
      }

      pokes.forEach((poke) => {
        selectHtml += `<option value="${poke.value}">${poke.label}</option>`;
      });

      const select = document.getElementById('selectPokemon');
      select.innerHTML = selectHtml;
    });
}

getPokes();

export { pokes };
