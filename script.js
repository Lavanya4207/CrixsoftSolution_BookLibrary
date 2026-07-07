let books = JSON.parse(localStorage.getItem("books")) || [
{
title:"Java Programming",
author:"James Gosling",
category:"Programming",
pages:450,
date:"2026-07-01",
image:"https://covers.openlibrary.org/b/id/8231996-L.jpg",
borrowed:false
},
{
title:"Python Basics",
author:"Guido van Rossum",
category:"Programming",
pages:380,
date:"2026-07-02",
image:"https://covers.openlibrary.org/b/id/10521270-L.jpg",
borrowed:false
},
{
title:"Harry Potter",
author:"J. K. Rowling",
category:"Fiction",
pages:500,
date:"2026-07-03",
image:"https://covers.openlibrary.org/b/id/7984916-L.jpg",
borrowed:false
},
{
title:"The Alchemist",
author:"Paulo Coelho",
category:"Fiction",
pages:250,
date:"2026-07-04",
image:"https://covers.openlibrary.org/b/id/8108691-L.jpg",
borrowed:false
}
];

let history = JSON.parse(localStorage.getItem("history")) || [];

saveData();
displayBooks();
displayHistory();

function saveData(){
localStorage.setItem("books",JSON.stringify(books));
localStorage.setItem("history",JSON.stringify(history));
}

function displayBooks(){

let list=document.getElementById("bookList");

list.innerHTML="";

books.forEach((book,index)=>{

list.innerHTML+=`

<tr>

<td>

<img src="${book.image}" onerror="this.src='https://via.placeholder.com/60x80?text=Book'">

</td>

<td>${book.title}</td>

<td>${book.author}</td>

<td>${book.category}</td>

<td class="${book.borrowed?'borrowed':'available'}">

${book.borrowed?'Borrowed':'Available'}

</td>

<td>${book.pages}</td>

<td>${book.date}</td>

<td>

<button class="borrow-btn"
onclick="borrowBook(${index})">

${book.borrowed?'Return':'Borrow'}

</button>

<button class="edit-btn"
onclick="editBook(${index})">

Edit

</button>

<button class="delete-btn"
onclick="deleteBook(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function addBook(){

let title=document.getElementById("title").value;

let author=document.getElementById("author").value;

let category=document.getElementById("category").value;

let pages=document.getElementById("pages").value;

let date=document.getElementById("date").value;

let image=document.getElementById("image").value;

if(title==""||author==""||category==""){

alert("Please fill all fields");

return;

}

if(image==""){

image="https://via.placeholder.com/60x80?text=Book";

}

books.push({

title,

author,

category,

pages,

date,

image,

borrowed:false

});

saveData();

displayBooks();

document.getElementById("title").value="";
document.getElementById("author").value="";
document.getElementById("category").value="";
document.getElementById("pages").value="";
document.getElementById("date").value="";
document.getElementById("image").value="";

}

function borrowBook(index){

books[index].borrowed=!books[index].borrowed;

if(books[index].borrowed){

history.push("Borrowed : "+books[index].title);

}
else{

history.push("Returned : "+books[index].title);

}

saveData();

displayBooks();

displayHistory();

}

function editBook(index){

let title=prompt("Book Title",books[index].title);

let author=prompt("Author",books[index].author);

let category=prompt("Category",books[index].category);

if(title && author && category){

books[index].title=title;

books[index].author=author;

books[index].category=category;

saveData();

displayBooks();

}

}

function deleteBook(index){

if(confirm("Delete this book?")){

books.splice(index,1);

saveData();

displayBooks();

}

}

function displayHistory(){

let h=document.getElementById("historyList");

h.innerHTML="";

history.forEach(item=>{

h.innerHTML+=`<li>${item}</li>`;

});

}

function searchBook(){

let value=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#bookList tr");

rows.forEach(row=>{

if(row.innerText.toLowerCase().includes(value)){

row.style.display="";

}
else{

row.style.display="none";

}

});

}