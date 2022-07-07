import { pokes } from './pokelist.js';

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

async function getInformacoesGerais() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToSearch}`)
    .then((data) => {
      return data.json();
    })
    .then((info) => {
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
      document.querySelector('#tipo').innerHTML = retornaTipos(
        selectedPokemon.tipo,
      );
      //muda cor da mainColor
      document.documentElement.style.setProperty(
        '--mainColor',
        retornaCodigoCorDoTipo(selectedPokemon.tipo[0]),
      );

      selectedPokemon.altura = info.height / 10 + 'm';
      document.querySelector('#altura').innerHTML = selectedPokemon.altura;

      selectedPokemon.peso = info.weight / 10 + ' kgs';
      document.querySelector('#peso').innerHTML = selectedPokemon.peso;

      selectedPokemon.habilidade = info.abilities.map((item) => {
        return item.ability.name;
      });
      document.querySelector('#habilidade').innerHTML = retornaHabilidades(
        selectedPokemon.habilidade,
      );

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

async function getCaracteristicas() {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonToSearch}`)
    .then((data) => {
      return data.json();
    })
    .then((info) => {
      selectedPokemon.desc = info.flavor_text_entries[8].flavor_text;
      document.querySelector('#desc').innerHTML = selectedPokemon.desc.replace(
        /\n/g,
        '<br/>',
      );

      selectedPokemon.especie = info.genera.find((item) => {
        if (item.language.name === 'en') return item.genus;
      }).genus;

      document.querySelector('#especie').innerHTML =
        selectedPokemon.especie.split('Pokémon')[0];
    });
}

function retornaTipos(array) {
  let html = '';
  array.forEach((item) => {
    html += `<span style="color: ${mudaCorTexto(
      item,
    )}; background-color: ${retornaCodigoCorDoTipo(
      item,
    )} !important">${traduzNomeTipo(item)}</span>`;
  });
  return html;
}

function traduzNomeTipo(item) {
  if (item == 'electric') return 'Elétrico';
  if (item == 'normal') return 'Normal';
  if (item == 'fire') return 'Fogo';
  if (item == 'grass') return 'Grama';
  if (item == 'poison') return 'Veneno';
  if (item == 'water') return 'Water';
  if (item == 'psychic') return 'Psíquico';
  if (item == 'fairy') return 'Fada';
  if (item == 'ground') return 'Terra';
  if (item == 'steel') return 'Metal';
  if (item == 'bug') return 'Inseto';
  if (item == 'fighting') return 'Lutador';
  if (item == 'rock') return 'Pedra';
  if (item == 'dragon') return 'Dragão';
  if (item == 'flying') return 'Voador';
  if (item == 'ice') return 'Gelo';
  if (item == 'ghost') return 'Fantasma';
}

function retornaCodigoCorDoTipo(item) {
  if (item == 'electric') return 'rgba(254, 225, 103, 1)';
  if (item == 'normal') return 'rgba(246, 153, 181, 0.8)';
  if (item == 'fire') return 'rgba(243, 42, 42, 0.8)';
  if (item == 'grass') return 'rgba(128, 240, 129, 0.8)';
  if (item == 'poison') return 'rgba(197, 153, 246, 0.8)';
  if (item == 'water') return 'rgba(0, 183, 211, 0.9)';
  if (item == 'psychic') return 'rgba(116, 14, 142, 0.8)';
  if (item == 'fairy') return 'rgba(225, 68, 178, 0.8)';
  if (item == 'ground') return 'rgba(102, 57, 17, 0.8)';
  if (item == 'steel') return 'rgba(189, 187, 184, 0.8)';
  if (item == 'bug') return 'rgba(214, 249, 123, 0.8)';
  if (item == 'fighting') return 'rgba(186, 173, 146, 0.8)';
  if (item == 'rock') return 'rgba(67, 66, 65, 0.8)';
  if (item == 'dragon') return 'rgba(193, 203, 251, 0.8)';
  if (item == 'flying') return 'rgba(193, 249, 251, 0.8)';
  if (item == 'ice') return 'rgba(103, 243, 241, 0.8)';
  if (item == 'ghost') return 'rgba(80, 12, 176, 0.8)';
}

function mudaCorTexto(item) {
  if (
    item == 'fire' ||
    item == 'psychic' ||
    item == 'ground' ||
    item == 'rock' ||
    item == 'ghost'
  )
    return 'white';
  return 'black';
}

function retornaHabilidades(array) {
  let html = '';
  array.forEach((item) => {
    html += `<span>${
      item[0].toUpperCase() + item.substring(1, item.length)
    }</span><br/>`;
  });
  return html;
}

getInformacoesGerais();
getCaracteristicas();

const select = document.getElementById('selectPokemon');

function mudouPoke() {
  pokemonToSearch = select.options[select.selectedIndex].value;

  getInformacoesGerais();
  getCaracteristicas();
}

select.addEventListener('change', mudouPoke);
