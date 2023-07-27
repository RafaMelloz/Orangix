fetch('https://api.themoviedb.org/3/movie/popular?api_key=2786063ea7d6f28dd0543df266513da4&language=pt-BR', {
    method: 'GET',
})
.then(response => response.json())
.then(function(json) {
    // const movieId = json.results[0].id;
    var catalogo = document.querySelector('.catalogo');

    json.results.map((val)=>{
        catalogo.innerHTML+=`
                <div class="tamanho-poster">
                    <div class="posterFilme" style="background-image:url(https://image.tmdb.org/t/p/w500/`+ val.poster_path + `)"></div>
                    <div class="controllers-poster">
                        <h4 style="text-align:center;font-size: 20px;" class="font-logo">`+ val.title + `</h4>
                        <div class="flex-arr">
                        <span>` + val.vote_average + `/10 <i class="fa fa-star" aria-hidden="true" style="color:yellow"></i></span>
                        <button class="btn-poster" data-bs-toggle="modal" data-bs-target="#modalFilme`+ val.id + `">Saiba mais</button>
                        </div>
                    </div>
                </div>

                <div class="modal fade center" id="modalFilme`+ val.id + `" tabindex="-1" aria-labelledby="ModalFilmeLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content dark-modal">
                            <div class="modal-header" style="background-image:url(https://image.tmdb.org/t/p/w500/`+ val.backdrop_path + `)"></div>
                            <div class="modal-body">
                                <h1 style="font-size:26px">`+val.title+`</h1>
                                <p>`+ val.overview+`</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-poster" data-bs-dismiss="modal" style="margin:0 auto">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })

    //FILTROS

    const filter = document.getElementById('pesquisa') // Pega o valor do input
    const posters = document.querySelectorAll('.tamanho-poster') // Pega o o filme
    
    filter.addEventListener('input', filtroFilmes);

    function filtroFilmes() {
        if (filter.value != '') {
            for (let poster of posters) {

                let title = poster.querySelector('.controllers-poster h4') // pega o titulo do filme
                title = title.textContent.toLocaleLowerCase();      // passa o titulo para minusculo
                let filterText = filter.value.toLocaleLowerCase();  // passa o valor do input para minusculo

                if (!title.includes(filterText)) {  // se o valor do titulo não for igual ao do filtro ele some
                    poster.style.display = "none";
                }else{
                    poster.style.display = "flex";  // se for ele continua
                }
            }
        } else {
            for (let poster of posters){
                poster.style.display ="flex"
            }
        }
    }

    // fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2786063ea7d6f28dd0543df266513da4&language=pt-BR`)
    //     .then(response => response.json())
    //     .then(function (movieJson) {
    //         for (const movie of movieJson.results) {
    //             const videoKey = movie.key;
    //             const videoUrl = `https://www.youtube.com/embed/${videoKey}`;
    //             const iframe = document.createElement('iframe');
    //             iframe.src = videoUrl;
    //             document.getElementById('meu-video').appendChild(iframe);
    //         }
    //     });
})


