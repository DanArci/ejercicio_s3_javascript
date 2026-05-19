let lista = document.getElementById('lista')
let storage = localStorage
let notas = []

function cargar2() {
    for (const key in storage) {
        if (!Object.hasOwn(storage, key)) continue;
        let contenido = JSON.parse(storage[key]);
        let descripcion = contenido[0]
        let status = contenido[1]        
        let id = key.replace(/ /g,"_")
        notas.push([])
    }
}




function agregar(titulo, descripcion) {
    localStorage.setItem(titulo,JSON.stringify(descripcion))
    cargar()
}

function cargar() {
    lista.innerHTML = ""
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

cargar()
// agregar("Tercera prueba de notas",["Esto se debe agregar y actualizar enseguida en el html", true])

