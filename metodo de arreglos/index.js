const nuevaTareaInput = document.querySelector("input");
const tbody = document.querySelector("tbody");
const ul = document.querySelector("ul");
const btn = document.querySelector("button");

const tareas = [];

btn.addEventListener("click", () => {
    const { value: nuevaTarea } = nuevaTareaInput;
    if(nuevaTarea) {
        addTask(nuevaTarea);
        refresh();  
    } else{
        alert("debe escribir una tarea");
    }
})

const addTask = (nuevaTarea) => {
    const id = Math.floor(Math.random() * 99);
    const tarea = {
        id,
        tarea: nuevaTarea,
        check: false,
    };

    tareas.push(tarea);
    nuevaTareaInput.value = "";
};

const fillTableRow =({ id, tarea, check }) => {
    result();
    const row = `
    <tr>
        <td>${id}</td>
        <td>${tarea}</td>
        <td class="x-delete">
           <input onchange="checkInput(${id})" ${check ? "checked" : ""} type="checkbox" />
        <span onclick="deleteTask(${id})">❌</span>
        </td>
    </tr>
     `;

     return row;

};

const fillTable =() => {
    let rowsTesting = `
    <tr>
      <td>sin</td>
      <td>trabajo</td>
    </tr>
    `;

    try{
        console.log("tareas", tareas);
        let rows = tareas.map(fillTableRow).join("");
        console.log("rows", rows);
        if(!rows){
            rows = rowsTesting;
    }
    tbody.innerHTML = rows;
    } catch (error) {
        console.error(error);
    }
} ;

const result = () => {
    const objetosTrue = tareas.filter((e) => e.check === true);
    const li = `
    <li>Total: <span id="total">${tareas.length}</span></li>
    <li>Realizadas: <span id="realizadas">${objetosTrue.length}</span></li>
    <li>Pendientes: <span id="pendientes">${tareas.length - objetosTrue.length}</span></li>
`
ul.innerHTML = li;
}

const checkInput = (id) => {
   const result = tareas.find((e) => e.id === id);
   if(result.check) {
    result.check = false
   } else{
    result.check = true
   }  
   refresh()
};


const deleteTask = (id) => {
    const decision = confirm("estas seguro de borrar?");
    if(decision){
        const index = tareas.findIndex((e) => e.id === id);
        tareas.splice(index, 1);
        refresh();
    }
};

const refresh = () => {
    fillTable();

};
