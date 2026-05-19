let lista = document.getElementById('lista')
let storage = localStorage

function agregar(titulo, descripcion) {
    localStorage.setItem(titulo,JSON.stringify(descripcion))
}

console.log(storage);


function content() {
    for (const key in storage) {
        if (!Object.hasOwn(storage, key)) continue;
        let contenido = JSON.parse(storage[key]);
        let descripcion = contenido[0]
        let status = contenido[1]        
        let id = key.replace(/ /g,"_")
        lista.innerHTML += `
            <li id=${id} status=${status}>
                <h2>${key}</h2>
                <p>${descripcion}</p>
            </li>`
    }
}

content()

