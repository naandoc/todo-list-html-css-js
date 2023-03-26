const iptAddTarefa = document.querySelector(".input-add-tarefa");
const fieldTarefasAdicionadas = document.querySelector(".inserted-tasks ul");
const btnAddTarefa = document.querySelector(".btnAddTarefa");
const fieldEditaTarefa = document.querySelector(".field-edita-tarefa");
const fieldAddTarefa = document.querySelector(".add-tarefa");

let tarefaSelecionada;
let listaDeTarefas = [];

const criaElemento = element => document.createElement(element);

const criaLi = () => {
    const li = criaElemento("li");
    return li;
}

const criaButton = (text, classe) => {
    const btnApagaTarefaCriada = criaElemento("button");
    btnApagaTarefaCriada.innerText = text;
    btnApagaTarefaCriada.classList.add(classe);
    return btnApagaTarefaCriada;
}

const fieldEditarTarefa = () => {
    const divEditaTarefa = criaElemento("div");
    divEditaTarefa.classList.add("input-edita-tarefa");

    const labelEditaTarefa = `<label for="edita-tarefa">Editar tarefa</label>`;

    const inputEditaTerefa = criaElemento("input");
    inputEditaTerefa.setAttribute("type", "text");
    inputEditaTerefa.id = "edita-tarefa";

    divEditaTarefa.innerHTML = labelEditaTarefa;
    divEditaTarefa.appendChild(inputEditaTerefa);

    return divEditaTarefa;
}

const adicionaTarefa = (valorInput) => {
    if (valorInput) {
        const li = criaLi();
        const p = criaElemento("p");
        const btnApagarTarefaCriada = criaButton("Apagar", "btn-apaga-tarefa");
        const btnConcluiTarefa = criaButton("Concluir", "btn-conclui-tarefa");
        const btnEditaTarefa = criaButton("Editar", "btn-edita-tarefa");
        const buttonsContainer = criaElemento("div");
        buttonsContainer.classList.add("buttons-container");

        p.innerText = valorInput;
        li.appendChild(p);

        buttonsContainer.appendChild(btnApagarTarefaCriada);
        buttonsContainer.appendChild(btnConcluiTarefa);
        buttonsContainer.appendChild(btnEditaTarefa);

        li.appendChild(buttonsContainer);

        fieldTarefasAdicionadas.appendChild(li);

        iptAddTarefa.value = "";
        iptAddTarefa.focus();

        salvaListaDeTarefas();
    }
}

const concluiTatera = e => {
    e.parentNode.parentNode.classList.toggle("task-done");
    //  e.setAttribute("disabled", "");
    //  e.nextElementSibling.setAttribute("disabled", "");
}

const apagaTarefa = e => {
    e.parentNode.parentNode.remove();
    salvaListaDeTarefas();
}

const editaTarefa = e => {
    if (!e.parentNode.parentNode.classList.contains("task-done")) {
        tarefaSelecionada = e.parentNode.previousElementSibling;

        fieldTarefasAdicionadas.style.display = "none";
        fieldAddTarefa.classList.add("hide");
        fieldEditaTarefa.classList.remove("hide");

        const btnEditaTarefa = document.querySelector(".btn-add-tarefa-editada");

        btnEditaTarefa.addEventListener("click", () => {
            const iptEditaTarefa = document.querySelector(".edita-tarefa");
            const listaTarefas = document.querySelectorAll("li>p");

            if (iptEditaTarefa.value) {
                for (let index in listaTarefas) {
                    if (listaTarefas[index].innerText == tarefaSelecionada.innerText) {
                        listaTarefas[index].innerText = iptEditaTarefa.value;
                    }
                }

                fieldTarefasAdicionadas.style.display = "flex";
                fieldAddTarefa.classList.remove("hide");
                fieldEditaTarefa.classList.add("hide");

                iptEditaTarefa.value = "";

                salvaListaDeTarefas();
            }
        })
    }
}

const salvaListaDeTarefas = () => {
    const tarefas = document.querySelectorAll("li>p");
    let tarefasSalvas = [];

    for (let values of tarefas) {
        tarefasSalvas.push(values.innerText);
    }

    listaDeTarefas = tarefasSalvas;

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("minhaLista", tarefasJson);
}

const carregaLista = () => {
    const listaSalva = localStorage.getItem("minhaLista");
    const listaSalvaJson = JSON.parse(listaSalva);
    
    for (let values of listaSalvaJson) {
        adicionaTarefa(values);
    }
}


// ------------------------- Eventos ---------------------------------

window.load = carregaLista();

iptAddTarefa.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        adicionaTarefa(iptAddTarefa.value);
    }
});

document.addEventListener("click", e => {
    const target = e.target;

    if (target.classList.contains("btnAddTarefa")) {
        adicionaTarefa(iptAddTarefa.value);
    }

    if (target.classList.contains("btn-conclui-tarefa")) {
        concluiTatera(target);
    }

    if (target.classList.contains("btn-apaga-tarefa")) {
        apagaTarefa(target);
    }

    if (target.classList.contains("btn-edita-tarefa")) {
        editaTarefa(target);
    }

});




