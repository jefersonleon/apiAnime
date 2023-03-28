const form = document.getElementById('anime-form');
window.onload = function () {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impedir que o formulário seja enviado

    // Obter o valor do campo de entrada do usuário
    const input = document.getElementById('anime-input').value;

    // Construir a URL da API usando o valor do campo de entrada
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${input}`;

    // Fazer uma solicitação para a API usando o método fetch
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Limpar div "anime-info"
        const animeInfo = document.getElementById('anime-info');
        animeInfo.innerHTML = '';
        
        console.log(data.data);

        // Verificar se a propriedade "data.results" existe
        if (data ) {
            
          // Criar elementos HTML para cada resultado retornado
          data.data.forEach(anime => {
            const title = document.createElement('h2');
            const description = document.createElement('p');
            const image = document.createElement('img');

            // Preencher elementos HTML com os dados do anime
            title.innerText = anime.title;
            description.innerText = anime.synopsis;
            image.src = anime.images.jpg.image_url;

            // Adicionar elementos HTML ao div "anime-info"
            animeInfo.appendChild(title);
            animeInfo.appendChild(description);
            animeInfo.appendChild(image);
          });
        } else {
          // Caso "data.results" não exista ou não tenha resultados, exibir uma mensagem de erro
          const errorText = document.createElement('p');
          errorText.innerText = 'Não foram encontrados resultados para a sua pesquisa.';
          animeInfo.appendChild(errorText);
        }
      })
      .catch(error => console.error(error));
  });
}
/*
const form = document.getElementById('anime-form');

window.onload = function() {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impedir que o formulário seja enviado

    // Obter o valor do campo de entrada do usuário
    const input = document.getElementById('anime-input').value;

    // Construir a URL da API usando o valor do campo de entrada
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${input}`;

    // Fazer uma solicitação para a API usando o método fetch
    fetch(apiUrl)
      .then(response => response.json())
      .then(async data => {
        // Limpar div "anime-info"
        const animeInfo = document.getElementById('anime-info');
        animeInfo.innerHTML = '';

        // Verificar se a propriedade "data.results" existe
        if (data.data) {

          // Criar elementos HTML para cada resultado retornado
          for (const anime of data.data) {
            const title = document.createElement('h2');
            const description = document.createElement('p');
            const image = document.createElement('img');

            // Preencher elementos HTML com os dados do anime
            title.innerText = anime.title;
            description.innerText = anime.synopsis;
            image.src = anime.images.jpg.large_image_url;

            // Traduzir a sinopse para português usando a API do Google Translate
            const translatedSynopsis = await translateText(anime.synopsis, 'en', 'pt');
            description.innerText = translatedSynopsis;

            // Adicionar elementos HTML ao div "anime-info"
            animeInfo.appendChild(title);
            animeInfo.appendChild(description);
            animeInfo.appendChild(image);
          }
        } else {
          // Caso "data.results" não exista ou não tenha resultados, exibir uma mensagem de erro
          const errorText = document.createElement('p');
          errorText.innerText = 'Não foram encontrados resultados para a sua pesquisa.';
          animeInfo.appendChild(errorText);
        }
      })
      .catch(error => console.error(error));
  });
}

async function translateText(text, sourceLang, targetLang) {
  const apiKey = 'sua-chave-de-api-do-google-translate';
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    }),
  });
  const data = await response.json();
  return data.data.translations[0].translatedText;
}
*/