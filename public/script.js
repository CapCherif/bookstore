var templates = {
    "home": `
        <div id="home">
            <h1>A propos de cette application -BookStore- :</h1>
            <p>Ceci est un projet pour étudiant qui vise à appliquer les connaissances en HTML, CSS et Javascript.</p>
            <p>Cette application permet d'enregistrer, de supprimer et de filtrer des livres.</p>
        </div>
    `,
    "nouveau":`
        <form id="addform">
            <h2>Ajouter un nouveau livre :</h2>
            <div class="champ">
                <label for="titre">Titre</label>
                <input type="text" placeholder="..." id="titre" required>
            </div>
            <div class="champ">
                <label for="auteur">Auteur</label>
                <input type="text" placeholder="..." id="auteur" required>
            </div>
            <div class="champ">
                <label for="date">Date de sortie</label>
                <input type="text" placeholder="..." id="date" required>
            </div>
            <div class="champ">
                <label for="description">Description</label>
                <textarea  id="description" required></textarea>
            </div>
            <button>Valider</button>
            <div class="success">Enregistrement réussi.</div>
        </form>
    `,
    "recents":`<div>
                <h1>Récents :</h1>
                <div id="res"></div>
             </div>`,
    "filtrer":`
        <div id="filtrer">
            <p>Rechercher par titre / auteur</p>
            
            <input type="text" id="value">
            <select  id="filtre">
                <option value="titre">Titre</option>
                <option value="auteur">Auteur</option>
            </select>

            <button onclick="Rechercher()">Rechercher</button>
        </div>
        <div id="res">

        </div>
    `
}
var books = [
    {
        "id":"1",
        "titre":"L'alchimiste",
        "auteur":"Paulo Coelho",
        "date":"2001",
        "description":"....."
    },
    {
        "id":"2",
        "titre":"The Lord of the ring, the followship",
        "auteur":"JK Tolkien",
        "date":"2000",
        "description":"....."
    }
]
function BuildBooks(books){
    var t = ``
    if(books.length == 0){
        t += "<p>Aucun livre .</p>"
    }
    else{
        books.forEach((book)=>{
            t += `
    
            <div class="book">
                <h3>${book.titre}</h3>
                <p>Par : ${book.auteur}</p>
                <div>
                    <i onclick="SeeDetail('${book.id}')" class="fa-solid fa-bars"></i>
                </div>
            </div>
            `
        })
    }
    
    document.querySelector('#res').innerHTML = t;
}
function ChangeTemplate(name){
    document.querySelector('#container').innerHTML = templates[name]
    if(name == "recents"){
        // affiche les 5 derniers livres
        BuildBooks(books.slice(0,5))
    }
    else if(name == "nouveau"){
        document.querySelector('#addform button').addEventListener('click', function(e){
            e.preventDefault()
            var titre = document.querySelector('#titre').value
            var auteur = document.querySelector('#auteur').value
            var description = document.querySelector('#description').value
            var date = document.querySelector('#date').value

            books.unshift({id:"book"+Date.now(),titre, auteur, date, description})

            document.querySelector('#titre').value = ""
            document.querySelector('#auteur').value = ""
            document.querySelector('#description').value = ""
            document.querySelector('#date').value = ""

            document.querySelector('.success').style.display = "block"
            setTimeout(() => {
                document.querySelector('.success').style.display = "none"
            }, 3000);
        })
    }
    
}


function SeeDetail(id){
    books.forEach((book)=>{
        if(book.id == id){
            document.querySelector('#container').innerHTML = `
    
            <div id="detail">
                <h2>Détail : </h2>
                <p>Titre : <strong>${book.titre}</strong> </p>
                <p>Auteur :<strong>${book.auteur}</strong></p>
                <p>Description :<strong>${book.description}</strong> </p>
                <p>Date de sortie : <strong>${book.date}</strong></p>
                <i class="fas fa-trash" onclick="DeleteBook('${book.id}')"></i>
                <div class="success">Suppression réussie.</div>
            </div>
            `
        }
    })
    
}

function DeleteBook(id){
    books.forEach((book, i)=>{
        if(book.id == id){
            books.splice(i, 1)

        }
    })
    document.querySelector('.success').style.display = "block"
    setTimeout(() => {
        ChangeTemplate('recents')
    }, 2000);
}



function Rechercher(){
    var filtre = document.querySelector('#filtre').value
    var value = document.querySelector('#value').value


    var res = []
    books.forEach((book)=>{
        if(book[filtre].toLowerCase().indexOf(value.toLowerCase()) != -1){
            res.push(book)
        }
    })

    BuildBooks(res)
}