const botaoTarefa = document.querySelector('.app__button--add-task'); //botão adicionar tarefa.
const adicionarTarefaFormulario = document.querySelector('.app__form-add-task');//Aparição do forumulário.


botaoTarefa.addEventListener('click',()=>{
   adicionarTarefaFormulario.classList.toggle('hidden');
})