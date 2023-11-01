// indicando as constantes ou variaveis que serao usadas
const FORMULARIO = document.getElementById('formulario');
const ENTRADA = document.getElementById('entrada');
const TAREFAS = document.getElementById('tarefas');

const CACHE = JSON.parse(localStorage.getItem('tarefas')); // pegar as tarefas e guardar numa lista

if(CACHE){ // verificar se tem tarefas na memoria
    CACHE.forEach(cache => { // laço de repetição forEach
        adicionar_tarefas(cache) // adicona tarefa ao cache (ou seja, para a parte de baixo)
    });
};

// para usar a entrada usando ENTER!
FORMULARIO.addEventListener('submit', (e) => {
    e.preventDefault() // previne que o enter atualize e perca as tarefas da pagina
    // console.log(e) // para ver de deu certo o submit
    
    adicionar_tarefas() // adicionar tarefas após o enter
});

function adicionar_tarefas(tarefa){
    // para mandar a tarefa para baixo quando clicar o enter
    let tarefa_entrada = ENTRADA.value

    if(tarefa){
        tarefa_entrada = tarefa.text 
    }
    
    if(tarefa_entrada){
        const ELEMENTO_TAREFA = document.createElement('li') // cria um novo elemento

        if(tarefa && tarefa.completed){
            ELEMENTO_TAREFA.classList.add('completada')
        } // indica tbm tarefa completada (todos os codigos juntos para mostar que esta completa)
        ELEMENTO_TAREFA.innerText = tarefa_entrada
        TAREFAS.appendChild(ELEMENTO_TAREFA)//adicionar uma criança, ou seja, adicinar outra constante
        
        ELEMENTO_TAREFA.addEventListener('click', () => {
            ELEMENTO_TAREFA.classList.toggle('completada')
            atualizar_local_storage() // faz com que o click traçe com tracinho na tarefa indicando que esta completa
        });

        ELEMENTO_TAREFA.addEventListener('contextmenu', (e) => {
            e.preventDefault() // previne ele de fazer algo que nao é para fazer(sendo aqui nao mostrar o menu dentro do to do list)
            ELEMENTO_TAREFA.remove() // remove a tarefa da tela
            atualizar_local_storage() // atualiza a pagina
        });

        ENTRADA.value = '' // para esvaziar o campo de escrever, deixando la em baixo da escrita
        atualizar_local_storage() // quando atualizar a pagina nao apagar as tarefas ja adicionadas
    }
};

function atualizar_local_storage(){
    const ITENS_TAREFAS = document.querySelectorAll('li') // pega todos que forem LI
    const tarefas = [] //lista
    ITENS_TAREFAS.forEach((element) => {
        tarefas.push({ // dicionario dentro de uma lista
            text: element.innerText, // este tbm o mesmo de baixo
            completed: element.classList.contains('completada') // indica de a tarefa esta ou nao completada
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // coloca no application do inspector indicando se foi ou nao completada a tarefa com true e false
};