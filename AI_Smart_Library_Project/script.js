let books =
JSON.parse(localStorage.getItem("books")) || [

{
    id:1,
    title:"Atomic Habits",
    author:"James Clear",
    genre:"Self-help",
    mood:"Motivational",
    rating:5,
    favorite:false
},

{
    id:2,
    title:"Harry Potter",
    author:"J.K Rowling",
    genre:"Fantasy",
    mood:"Adventure",
    rating:5,
    favorite:true
}

];

const bookGrid =
document.getElementById("bookGrid");

function saveBooks(){

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );
}

function addBook(){

    const title =
    document.getElementById("title").value;

    const author =
    document.getElementById("author").value;

    const genre =
    document.getElementById("genre").value;

    const mood =
    document.getElementById("mood").value;

    const rating =
    document.getElementById("rating").value;

    if(!title || !author){

        alert("Please fill all fields");

        return;
    }

    books.push({

        id:Date.now(),

        title,
        author,
        genre,
        mood,
        rating,

        favorite:false
    });

    saveBooks();

    renderBooks();

    updateStats();
}

function renderBooks(filteredBooks = books){

    bookGrid.innerHTML = "";

    filteredBooks.forEach(book => {

        const card =
        document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `

            <h3>${book.title}</h3>

            <p><b>Author:</b> ${book.author}</p>

            <p><b>Genre:</b> ${book.genre}</p>

            <p><b>Mood:</b> ${book.mood}</p>

            <p><b>Rating:</b> ⭐ ${book.rating}</p>

            <div class="book-actions">

                <button onclick="favoriteBook(${book.id})">

                    ${book.favorite ? "★ Favorite" : "☆ Favorite"}

                </button>

                <button onclick="deleteBook(${book.id})">

                    Delete

                </button>

            </div>
        `;

        bookGrid.appendChild(card);
    });
}

function deleteBook(id){

    books =
    books.filter(book => book.id !== id);

    saveBooks();

    renderBooks();

    updateStats();
}

function favoriteBook(id){

    books = books.map(book => {

        if(book.id === id){

            book.favorite =
            !book.favorite;
        }

        return book;
    });

    saveBooks();

    renderBooks();

    updateStats();
}

document
.getElementById("searchInput")
.addEventListener("keyup", function(){

    const value =
    this.value.toLowerCase();

    const filtered =
    books.filter(book =>

        book.title.toLowerCase().includes(value) ||

        book.author.toLowerCase().includes(value) ||

        book.genre.toLowerCase().includes(value)
    );

    renderBooks(filtered);
});

function updateStats(){

    document.getElementById(
        "totalBooks"
    ).innerText = books.length;

    const fav =
    books.filter(book => book.favorite);

    document.getElementById(
        "favoriteCount"
    ).innerText = fav.length;
}

function askAI(){

    const input =
    document.getElementById("assistantInput");

    const chat =
    document.getElementById("assistantChat");

    const message =
    input.value;

    if(!message) return;

    chat.innerHTML += `

        <div class="user-msg">
            ${message}
        </div>
    `;

    let response =
    generateAI(message);

    setTimeout(() => {

        chat.innerHTML += `

            <div class="bot-msg">
                ${response}
            </div>
        `;

        chat.scrollTop =
        chat.scrollHeight;

    },1000);

    input.value = "";
}

function generateAI(msg){

    msg = msg.toLowerCase();

    if(msg.includes("fantasy")){

        return `
        Recommended Fantasy Books:
        <br><br>

        • Harry Potter
        <br>
        • Lord of the Rings
        <br>
        • Mistborn
        `;
    }

    if(msg.includes("romance")){

        return `
        Romantic Recommendations ❤️
        <br><br>

        • Pride and Prejudice
        <br>
        • It Ends With Us
        `;
    }

    if(msg.includes("technology")){

        return `
        Technology Recommendations 🤖
        <br><br>

        • Clean Code
        <br>
        • AI Basics
        `;
    }

    return `
    AI Recommendation Engine Activated ⚡
    `;
}

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

    document.body.classList.toggle("light");
});

new Chart(
document.getElementById("genreChart"),

{
    type:"doughnut",

    data:{

        labels:[
            "Fantasy",
            "Romance",
            "Sci-Fi",
            "Technology",
            "Self-help"
        ],

        datasets:[{

            data:[12,8,6,10,15],

            borderWidth:1
        }]
    }
});

new Chart(
document.getElementById("ratingChart"),

{
    type:"bar",

    data:{

        labels:[
            "1 Star",
            "2 Star",
            "3 Star",
            "4 Star",
            "5 Star"
        ],

        datasets:[{

            label:"Ratings",

            data:[1,3,6,14,30],

            borderWidth:1
        }]
    }
});

renderBooks();
updateStats();