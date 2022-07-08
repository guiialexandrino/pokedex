import Utils from './utils.js';

//variaveis globais

let pokemonToSearch = 1;
let selectedPokemon = {
  id: '',
  nome: '',
  identificacao: '',
  tipo: [],
  foto: '',
  altura: '',
  peso: '',
  especie: '',
  habilidade: [],
  stats: {},
  desc: '',
};
let pokes = [];
let results = [];
let selectHtml = '';

let loading = document.querySelector('.loading');
const select = document.getElementById('selectPokemon');
const handleButton = document.getElementById('submit');
const input = document.getElementById('searchInput');

// adiciona eventos

select.addEventListener('change', mudouPoke);
handleButton.addEventListener('click', buscaPoke);

// funcões

async function getPokes() {
  loading.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=351`)
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

async function getCaracteristicas() {
  loading.style.display = 'block';

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonToSearch}`)
    .then((data) => {
      return data.json();
    })
    .then((info) => {
      //altera info poke selecionado

      selectedPokemon.desc = info.flavor_text_entries[8].flavor_text;
      document.querySelector('#desc').innerHTML = selectedPokemon.desc.replace(
        /\n/g,
        ' ',
      );

      selectedPokemon.especie = info.genera.find((item) => {
        if (item.language.name === 'en') return item.genus;
      }).genus;

      document.querySelector('#especie').innerHTML =
        selectedPokemon.especie.split('Pokémon')[0];
    });
}

async function getInformacoesGerais() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToSearch}`)
    .then((data) => {
      return data.json();
    })
    .then((info) => {
      //turn off loading
      setTimeout(() => {
        loading.style.display = 'none';
      }, 300);

      //altera info poke selecionado
      selectedPokemon.id = info.id;
      selectedPokemon.nome = info.name;

      selectedPokemon.foto =
        info.sprites.other['official-artwork'].front_default;
      document.querySelector('#foto').src = selectedPokemon.foto;
      document.querySelector('#fotoMobile').src = selectedPokemon.foto;

      selectedPokemon.identificacao = `#${info.id} - ${
        info.name[0].toUpperCase() + info.name.substring(1, info.name.length)
      }`;
      document.querySelector('#num_nome').innerHTML =
        selectedPokemon.identificacao;

      selectedPokemon.tipo = info.types.map((item) => {
        return item.type.name;
      });
      document.querySelector('#tipo').innerHTML = Utils.retornaTipos(
        selectedPokemon.tipo,
      );
      //muda cor da mainColor
      document.documentElement.style.setProperty(
        '--mainColor',
        Utils.retornaCodigoCorDoTipo(selectedPokemon.tipo[0]),
      );

      selectedPokemon.altura = info.height / 10 + 'm';
      document.querySelector('#altura').innerHTML = selectedPokemon.altura;

      selectedPokemon.peso = info.weight / 10 + ' kgs';
      document.querySelector('#peso').innerHTML = selectedPokemon.peso;

      selectedPokemon.habilidade = info.abilities.map((item) => {
        return item.ability.name;
      });
      document.querySelector('#habilidade').innerHTML =
        Utils.retornaHabilidades(selectedPokemon.habilidade);

      selectedPokemon.stats.hp = info.stats[0].base_stat;
      document.querySelector('#hp').value = selectedPokemon.stats.hp;

      selectedPokemon.stats.ataque = info.stats[1].base_stat;
      document.querySelector('#ataque').value = selectedPokemon.stats.ataque;

      selectedPokemon.stats.defesa = info.stats[2].base_stat;
      document.querySelector('#defesa').value = selectedPokemon.stats.defesa;

      selectedPokemon.stats.ataqueE = info.stats[3].base_stat;
      document.querySelector('#ataqueE').value = selectedPokemon.stats.ataqueE;

      selectedPokemon.stats.defesaE = info.stats[4].base_stat;
      document.querySelector('#defesaE').value = selectedPokemon.stats.defesaE;

      selectedPokemon.stats.velocidade = info.stats[5].base_stat;
      document.querySelector('#velocidade').value =
        selectedPokemon.stats.velocidade;
    });
}

function mudouPoke() {
  document.querySelector('.noResult').style.display = 'none';
  input.value = '';

  pokemonToSearch = select.options[select.selectedIndex].value;

  getCaracteristicas();
  getInformacoesGerais();
}

function buscaPoke() {
  event.preventDefault();
  document.querySelector('.noResult').style.display = 'none';

  const result = pokes.find((pokemon) => {
    let name = pokemon.label.split(' ')[2];
    return name.toUpperCase() === input.value.toUpperCase();
  });

  if (result) {
    pokemonToSearch = result.value;
    select.selectedIndex = result.value - 1;
    getCaracteristicas();
    getInformacoesGerais();
    input.value = '';
  } else document.querySelector('.noResult').style.display = 'block';
}

function limpaBuscaNaoEncontrada() {
  document.querySelector('.noResult').style.display = 'none';
}

// chama métodos

getPokes();
getCaracteristicas();
getInformacoesGerais();
