let list = document.getElementById('task-list')
let form = document.getElementById('task-form')
let storage = localStorage

function add_note(title, description) { 
    localStorage.setItem(title,JSON.stringify(description))
    storage = localStorage
    load_localStorage(storage)
}

function load_localStorage(storage) {
    const filter = document.querySelector('input[name="task-filter"]:checked').value
    list.innerHTML = ""
    let html = ""
    for (const key in storage) {
        // hasOwnProperty es un metodo que devuelve true si el objeto tiene la propiedad especificada, en este caso key, y false si no la tiene. Esto es para evitar iterar sobre propiedades heredadas del prototipo de localStorage.
        if (!Object.hasOwn(storage, key)) continue;

        let content = JSON.parse(storage[key]);
        let description = content[0]
        let status = content[1]
        let id = key.replace(/ /g,"_")

        if (filter === 'pending' && status) continue
        if (filter === 'completed' && !status) continue

        // Aca se usa un operador ternario para asignar la clase completed al li si el status es true, y si no, no asignarle ninguna clase
        html += `
            <li id="${id}" data-key="${key}" status="${status}" class="${status ? 'completed' : ''}">
                <h2>${key}</h2>
                <p>${description}</p>
                <label class="completed-checkbox">
                    <input type="checkbox" class="completed-input" id="completed-${id}" value="completed" ${status ? 'checked' : ''}>
                    <span class="completed-label">Completed</span>
                </label>
                <button class="delete-task" type="button">Delete</button>
            </li>`
    }

    list.innerHTML = html
    
    list.querySelectorAll('.completed-input').forEach((checkbox) => {
        const element = checkbox.closest('li')
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                element.classList.add('completed')
            } else {
                element.classList.remove('completed')
            }
            // dataset es un objeto que contiene todos los atributos data- del elemento, en este caso data-key
            // dataset se podria traducir como data-
            const taskKey = element.dataset.key
            // Agarra el nombre de la tarea, lo busca en el localStorage y lo guarda en la variable contenido
            const content = JSON.parse(localStorage.getItem(taskKey))
            // Modifica el segundo elemento del array contenido, que es el status de la tarea, con el valor del checkbox
            content[1] = this.checked
            // Guarda el contenido modificado en el localStorage, convirtiendolo a string con Json.stringify
            localStorage.setItem(taskKey, JSON.stringify(content))
        })
    })

    list.querySelectorAll('.delete-task').forEach((button) => {
        button.addEventListener('click', function() {
            const element = this.closest('li')
            const taskKey = element.dataset.key
            localStorage.removeItem(taskKey)
            // elimina el elemento del DOM
            element.remove()
        })
    })
}
        
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const title = document.getElementById('task-tittle').value
    const description = document.getElementById('task-input').value
    let nota = [`${description}`, false]
    add_note(title, nota)
});

document.querySelectorAll('input[name="task-filter"]').forEach((radio) => {
    radio.addEventListener('change', () => load_localStorage(storage))
})

load_localStorage(storage)