let temp = ''  // variavel para temperatura
let cidade = ''  // variavel para cidade
const res = document.querySelector('#res')  // resposta que aparece na tela (informação)
const hora = new Date().getHours()  // pega a hora
const min = new Date().getMinutes()  // pega o minuto
const body = document.querySelector('body')  // pega o body
const foto = document.querySelector('#foto')  // pega a imagem

function atualizarTemp() {

    // Aparece quando recarrega a pagina
    res.innerHTML = 'Carregando...'
    
    // fetch faz uma requisição para uma API. No caso 'URL'
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-20.81&longitude=-49.38&current_weather=true')
    

    // Espera a resposta chegar. E Converte a resposta em JSON.
    .then(response => response.json()) 
    
    .then(data => {
    
    // Pega a temperatura. 'Math.round' serve para arrendondar o numero quebrado.
    temp = Math.round(data.current_weather.temperature)
    

    // chama a função novamente
    atualizarHora()
    
    })

    // Usa-se para caso a resposta não chegue ou se estiver errada
    .catch(() => {
        
        res.innerHTML =
        'Erro ao carregar temperatura'
    
    })

}

function atualizarCidade() {
    
    //Só pega latitude e longitude.
    navigator.geolocation.getCurrentPosition((posicao) => {

        // Conversão
        const lat = posicao.coords.latitude
        const lon = posicao.coords.longitude

        // Faz a requisição para uma API e conversa com ela
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)

        .then(response => response.json())
        .then(data => {

            // Pega a localização das cidades, bairros e etc.
            cidade = 
                data.address.city ||
                data.address.town ||
                data.address.village

        })

        // Caso dê erro
        .catch(() => {   
            
            res.innerHTML = 
            'Cidade não encontrada'
        
        })

    })
}

function atualizarHora() {

    // variavel da cidade
    const localiza = `${cidade} <i class="fa-solid fa-location-dot"></i></p>` 

    // adiciona zero na frente da hr e min
    if (hora < 10) {
        hora = '0' + hora 
    }

    if (min < 10) {
        min = '0' + min
    }
    

    // condições e mudanças de temas do dia

    if (hora <= 5) {   // Madrugada

        res.innerHTML = 
        `<p class="locate">
        ${localiza}
        </p>

        <hr>

        <p>
        ${hora}:${min} | <i class="fa-solid fa-cloud-moon"></i> ${temp}°
        </p>`

        body.style.backgroundImage = 'linear-gradient(90deg, rgba(39, 39, 39, 0.829), rgba(0, 0, 0, 0.925))'
        foto.src = 'https://img.freepik.com/fotos-premium/trafego-urbano_271102-52.jpg'
           
        
    } else if (hora < 12) {   // Manhã
        
        res.innerHTML = 
        `<p class="locate">
        ${localiza}
        </p>

        <hr>

        <p>
        ${hora}:${min} | <i class="fa-solid fa-sun"></i> ${temp}°
        </p>`
        
        body.style.backgroundImage = 'linear-gradient(90deg, rgb(148, 194, 390), rgb(265, 229, 200))'
        foto.src = 'https://img.freepik.com/fotos-gratis/vista-inspiradora-da-luz-da-manha_23-2148851773.jpg'


    } else if (hora >= 12 && hora < 18) {   // Tarde
        
        res.innerHTML = 
        `<p class="locate">
        ${localiza}
        </p>
        
        <hr>

        <p>
        ${hora}:${min} | <i class="fa-solid fa-cloud-sun"></i> ${temp}°
        </p>`
        
        body.style.backgroundImage = 'linear-gradient(90deg, rgba(189, 91, 56, 0.911), rgb(85, 43, 10))'
        foto.src = 'https://videocdn.cdnpk.net/videos/0028826a-b358-50da-914d-6f12d070953b/horizontal/thumbnails/small.jpg'


    } else if (hora >= 18) {   // Noite
        
        res.innerHTML =
        `<p class="locate">
        ${cidade} <i class="fa-solid fa-location-dot"></i>
        </p>

        <hr>

        <p>
        ${hora}:${min} | <i class="fa-solid fa-moon"></i> ${temp}°
        </p>`
        
        body.style.backgroundImage = 'linear-gradient(90deg, rgb(1, 1, 18), rgb(56, 56, 85))'
        foto.src = 'https://media.istockphoto.com/id/1154975453/pt/foto/estaiadas-bridge-night-aerial-view-s%C3%A3o-paulo-brazil-business-center-financial-center-great.jpg?s=612x612&w=0&k=20&c=n35iXQqYHNJT2AfL9nOpQ-TDM_nsJyJhI8-lRKD_3aw='
    }
    
}


// Chama as funções
atualizarHora()
setInterval(atualizarHora, 1000) // Atualiza a hora cada 1s.
atualizarTemp()
setInterval(atualizarTemp, 600000) // Atualiza a temperatura a cada 6 minutos.
atualizarCidade()