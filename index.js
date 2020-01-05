// Add a new document with an auto generated id.
const addDoc = (title, author, pub) => {
    let addDoc = db.collection('books').add({
        title: title,
        author: author,
        published: pub,
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
    })
}
let booksRef = db.collection('books')

const deleteBook = (id) => {
    booksRef.doc(id).delete()
}

const updateAuthor = (key, element) => {
    if(key==13) booksRef.doc(element.id).update({author:element.innerHTML})
}

let allBooksRef = document.querySelector('.all-books')

booksRef.orderBy('title').onSnapshot(snapshot => {
    console.log(`Received doc snapshot: ${snapshot}`)
    allBooksRef.innerHTML = ''
    snapshot.docs.forEach(doc => {
        let data = doc.data()
        allBooksRef.innerHTML += `<article id=${doc.id}>
                              <img onClick="deleteBook('${doc.id}')" class='delete' src='https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-trash.svg'>
                              <h2>${data.title}</h2>
                              <h3>${data.published}</h3>
                              <div contenteditable="true" id=${doc.id} onKeydown="updateAuthor(event.keyCode, this)">${data.author}</div>
                              </article>`
    })
}, err => {
    console.log(`Encountered error: ${err}`)
})


const submit = document.querySelector('#submit')

submit.addEventListener('click', () => {
    addDoc(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        document.querySelector('#published').value,
    )
})