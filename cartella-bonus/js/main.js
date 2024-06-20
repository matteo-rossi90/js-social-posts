
/*Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 - Leggiamo per bene il nostro array di oggetti che rappresentano ciascun post, così da capire bene i dati come sono strutturati;
Milestone 2 - Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
Milestone 3 - Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. 
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.*/

/* BONUS
1) Formattare le date in formato italiano (gg/mm/aaaa)
2) Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
3) Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Individuare il contenitore dove è collocato il post in HTML
const container = document.querySelector("#container");

// Array contenente l'elenco di oggetti che corrispondono ai post
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Array per tenere traccia dei like aggiornati
const updatedLikes = posts.map(post => ({
    id: post.id,
    likes: post.likes
    })
);

// Estrarre gli oggetti dell'array
posts.forEach((post) => {

    //convertire la data in formato gg/mm/aa
    const newDate = formatDate(post.created);

    // Creare gli elementi di markup
    let markupElement = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${newDate}</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image">
                <img src="${post.media}" alt="${post.author.name}">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button" href="#" data-postid="${post.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div>
            </div>
        </div>
    `;
    // Stampare in DOM i vari post
    container.innerHTML += markupElement;
});

// Individuare i pulsanti "Mi piace" della lista (ora che sono stati aggiunti al DOM)
const likeButtons = document.querySelectorAll(".js-like-button");

// Creare evento per fare in modo che al click del pulsante "Mi Piace" il colore del testo cambi e aumenti il numero di like
likeButtons.forEach(button => {
    button.addEventListener('click', 
        
        function (event) {
        event.preventDefault();

        // Cambiare colore del pulsante
        button.classList.toggle("like-button--liked");

        // Trovare l'elemento counter corrispondente
        const postId = button.getAttribute("data-postid");
        const likeCounter = document.querySelector(`#like-counter-${postId}`);

        // Trovare il post nell'array updatedLikes
        const post = updatedLikes.filter(post => post.id === parseInt(postId))[0];

        // Incrementare il numero di like
        if (button.classList.contains("like-button--liked")) {
            post.likes++;
        }

        // Aggiornare il contenuto dell'elemento
        likeCounter.textContent = post.likes;

        // Log dell'array updatedLikes per conferma
        console.log(updatedLikes);
    });
});

//FUNZIONI//

//funzione che converte il formato data in gg/mm/aaaa
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; //il sistema parte da 0, per cui + 1 serve per aggiungere
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
