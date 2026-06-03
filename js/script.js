const res = document.querySelector('#res')
let temp = ''
let cidade = ''
function atualizarTemp() {
    res.innerHTML = 'Carregando...'
    
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-20.81&longitude=-49.38&current_weather=true') // fetch faz uma requisição para uma API. No caso 'URL'
    
    .then(response => response.json()) // Espera a resposta chegar. E Converte a resposta em JSON.
    
    .then(data => {

    temp = Math.round(data.current_weather.temperature) // Pega a temperatura. 'Math.round' serve para arrendondar o numero quebrado.
    
    })

    .catch(() => { // Usa-se para caso a resposta não chegue ou se estiver errada
        
        res.innerHTML =
        'Erro ao carregar temperatura'
    
    })

}

function atualizarCidade() {
    navigator.geolocation.getCurrentPosition((posicao) => { //Só pega latitude e longitude.

        const lat = posicao.coords.latitude
        const lon = posicao.coords.longitude

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)  // Faz a requisição para uma API e conversa com ela

        .then(response => response.json())
        .then(data => {

            // Pega a localização das cidades, bairros e etc.
            cidade = 
                data.address.city ||
                data.address.town ||
                data.address.village

        })

        .catch(() => {
            
            res.innerHTML = 
            'Cidade não encontrada'
        
        })

    })
}

function atualizarHora() {
    var hora = new Date().getHours()
    var min = new Date().getMinutes()
    var res = document.querySelector('#res')
    var b = document.querySelector('body')
    var img = document.querySelector('#ft')

    if (min < 10) { 
        min = '0' + min // Adicionar 0 na frente do minuto
    }

    if (hora <= 5) {
        res.innerHTML = 
        `<p>Agora são ${hora}:${min} | <i class="fa-solid fa-cloud-moon"></i> ${temp}°</p>`
            b.style.backgroundImage = 'linear-gradient(90deg, rgba(39, 39, 39, 0.829), rgba(0, 0, 0, 0.925))'
            img.innerHTML = '<img src="https://img.freepik.com/fotos-premium/trafego-urbano_271102-52.jpg" alt="foto" class="foto">'
            
    } else if (hora < 12) {
        res.innerHTML = 
        `<p>Agora são ${hora}:${min} | <i class="fa-solid fa-sun"></i> ${temp}°</p>`
            b.style.backgroundImage = 'linear-gradient(90deg, rgb(148, 194, 390), rgb(265, 229, 200))'
            img.innerHTML = '<img src="https://img.freepik.com/fotos-gratis/vista-inspiradora-da-luz-da-manha_23-2148851773.jpg" alt="foto" class="foto">'

    } else if (hora >= 12 && hora < 18) {
        res.innerHTML = 
        `<p>Agora são ${hora}:${min} | <i class="fa-solid fa-cloud-sun"></i> ${temp}°</p>`
            b.style.backgroundImage = 'linear-gradient(90deg, rgba(189, 91, 56, 0.911), rgb(85, 43, 10))'
            img.innerHTML = '<img src="https://videocdn.cdnpk.net/videos/0028826a-b358-50da-914d-6f12d070953b/horizontal/thumbnails/small.jpg" alt="foto" class="foto">'

    } else if (hora >= 18) {
        res.innerHTML =
        `<p class="locate">${cidade} <i class="fa-solid fa-location-dot"></i></p><hr>
        <p>
        ${hora}:${min}
        | <i class="fa-solid fa-sun"></i> ${temp}°</p>`
            b.style.backgroundImage = 'linear-gradient(90deg, rgb(1, 1, 18), rgb(56, 56, 85))'
            img.innerHTML = '<img src="https://media.istockphoto.com/id/1154975453/pt/foto/estaiadas-bridge-night-aerial-view-s%C3%A3o-paulo-brazil-business-center-financial-center-great.jpg?s=612x612&w=0&k=20&c=n35iXQqYHNJT2AfL9nOpQ-TDM_nsJyJhI8-lRKD_3aw=" alt="foto" class="foto">'
    }
}

setInterval(atualizarHora, 1000) // Atualiza a hora cada 1s.
setInterval(atualizarTemp, 600000) // Atualiza a temperatura a cada 6 min.

// Chama as funções
atualizarHora()
atualizarTemp()
atualizarCidade()