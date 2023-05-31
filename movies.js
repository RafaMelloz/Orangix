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
                        <h4 style="text-align:center;font-size: 14px;">`+ val.title + `</h4>
                        <div class="flex-arr">
                        <button class="btn-dark" data-bs-toggle="modal" data-bs-target="#modalFilme`+ val.id + `">Saiba mais</button>
                        <span>` + val.vote_average + `/10 <i class="fa fa-star" aria-hidden="true" style="color:yellow"></i></span>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="modalFilme`+ val.id + `" tabindex="-1" aria-labelledby="ModalFilmeLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content dark-modal">
                            <div class="modal-header" style="background-image:url(https://image.tmdb.org/t/p/w500/`+ val.backdrop_path + `)"></div>
                            <div class="modal-body">
                                <h1 style="font-size:26px">`+val.title+`</h1>
                                <p>`+ val.overview+`</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-dark" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })

    //FILTROS

    const filter = document.getElementById('pesquisa')
    const posters = document.querySelectorAll('.tamanho-poster')
    
    filter.addEventListener('input', filtroFilmes);

    function filtroFilmes() {
        if (filter.value != '') {
            for (let poster of posters) {
                let title = poster.querySelector('.controllers-poster h4')
                title = title.textContent.toLocaleLowerCase();
                let filterText = filter.value.toLocaleLowerCase();

                if (!title.includes(filterText)) {
                    poster.style.display = "none"
                }else{
                    poster.style.display = "block"
                }
            }
        } else {
            for (let poster of posters){
                poster.style.display ="block"
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


