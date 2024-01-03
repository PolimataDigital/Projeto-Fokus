const html= document.querySelector('html');
const focoBotao=document.querySelector('.app__card-button--foco');
const botaoTempoCurto=document.querySelector('.app__card-button--curto');
const botaoTempoLongo=document.querySelector('.app__card-button--longo');
const imagem= document.querySelector('.app__image');
const texto=document.querySelector('.app__title');
const todosBotoes= document.querySelectorAll('.app__card-button');
const musicaBotao= document.querySelector('#alternar-musica');// Como isso aqui é um ID, eu devo colocar a # para achar ele corretamente.
const musica= new Audio ('./sons/luna-rise-part-one.mp3');



musica.loop=true; //Aqui estou atribuindo a propriedade loop ao aúdio, ou seja depois que ela acabar ela vai tocar de novo e de novo..
musicaBotao.addEventListener('change',()=>{//O change é usado para quando queremos manipular um checkbox, porque ele é mais apropriado para isso pois ele entende marcar e desmarcar um checkbox.
    if(musica.paused){// se a música estiber pausada, você vai tocar ela, se não estiver, pode pausar a música.
        musica.play();
    }else{
        musica.pause();
    }
});

focoBotao.addEventListener('click', ()=>{   
    tempoDecorridoSegundos=1500;
    alterarContexto('foco');
    focoBotao.classList.add('active');//Usando o método próprio para trabalhar com classes do css. Com a propriedade add ele vai adicionar a classe 'active' toda vez que eu clicar.
});

botaoTempoCurto.addEventListener('click',()=>{
    tempoDecorridoSegundos= 300 ;
    alterarContexto('descanso-curto');
    botaoTempoCurto.classList.add('active');

});

botaoTempoLongo.addEventListener('click',()=>{
    tempoDecorridoSegundos= 900; 
    alterarContexto('descanso-longo');
    botaoTempoLongo.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();//Chamando a função para mudar o tempo em cada contexto do código
    todosBotoes.forEach(function(elementosDoArray){//forEach é uma função de callback que é uma função que é passa como argumento para uma outra função. 
        elementosDoArray.classList.remove('active');
    })
    html.setAttribute('data-contexto',contexto)
    imagem.setAttribute('src',`imagens/${contexto}.png`);
    switch (contexto) {
        case "foco": 
            texto.innerHTML= ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            texto.innerHTML= ` Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
            break;
        case "descanso-longo":
            texto.innerHTML= ` Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`    
        default:
            break;
    }

}

//Temporizador e sons//
const startPauseBotao= document.querySelector('#start-pause');
let tempoDecorridoSegundos=1500;
const somDoTempoEsgotado = new Audio ('./sons/beep.mp3');// som do tempo se esgotando.
const somDoTempoPausa = new Audio ('./sons/pause.mp3');//Som de pausar o tempo.
const somDoTempoInicar = new Audio ('./sons/play.wav');//Som de começar o tempo.


const contagemRegressiva = () =>{
    if(tempoDecorridoSegundos <= 0){//Verificação para parar o código quando o contador chegar a zero.
        somDoTempoEsgotado.play();//Chamando a função e passando a propriedade play para ela tocar a música.
        alert('Tempo esgotado!');
        resetarTemporizador();//Chamando a função responsável por zerar o contador. Devo chamar ela antes de tudo.
        somDoTempoEsgotado.pause();
        return;//Isso aqui eu já vi antes, o return faz parar o código.
    }
    tempoDecorridoSegundos-= 1;// Abreviação de : "tempoDecorrisoSegundos = tempoDeocorridoSegundos - 1;"
    mostrarTempo(); 
    
}

const botaoInicarOuPausar = document.querySelector('#start-pause span');//Mudando a palavra escrita conforme estiver pausada ou não.Quero mudar o span do html, então eu posso referenciar o pai dela e o próprio span
const logoPausaOuIniciar= document.querySelector('.app__card-primary-butto-icon');//Logo pequena de pause ou do play.
let intervalo=null;// Começa com null porque vou ter difetentes tipos de intervalo, vou atribuir depois.
function iniciarOuPausar (){//Esse método ele é muito interessante porque ele é funciona em um determinado perído de tempo, e ele funciona de uma forma bem simples.
    if(intervalo){// Verifica se tem algum valor ou não, se tiver algum valor o código abaixo será feito;
        resetarTemporizador();
        somDoTempoPausa.play();//Aqui é a condição se ele estiver já com o tempo rolando, então só vou apertar o botão de dar pause e o som do pause acontece.
        return;//método de pausa feito.
    }
    intervalo = setInterval(contagemRegressiva, 1000);//Ele recebe dois parâmetros, um é qual função você deseja realizar e a outra é o tempo que você quer realizar essa função, e ele recebe o valor do tempo em milisegundos.
    somDoTempoInicar.play();// Aqui é o começo da função, não tem nenhum valor definido e então ele só vai tocar o som do ínicio.
    botaoInicarOuPausar.textContent='Pausar';//Aqui estou usando a propriedade textContent para mudar a tag span, mas não vou alterar o html em si, somente o texto mesmo.
    logoPausaOuIniciar.setAttribute(`src`,`imagens/pause.png`);//mudando a log quando aperta para começar.
}

//Eventos do botão start
startPauseBotao.addEventListener('click',iniciarOuPausar);

//FUNÇÃO PARA RESETAR O TEMPORIZADOR
function resetarTemporizador(){
    clearInterval(intervalo);//Esse método interrompe o método intervalo.
    botaoInicarOuPausar.textContent='Começar';//Quando o tempo for resetado, a tag span vai voltar para a palavra 'começar'
    logoPausaOuIniciar.setAttribute(`src`,`imagens/play_arrow.png`);//mudando a logo quando reseta
    intervalo=null;// aqui eu quero resetar de novo o intervalo para zero.
}


//Tempo em segundos aparecendo na tela.
const tempoNaTela = document.querySelector('#timer');
function mostrarTempo (){
    const tempo = new Date (tempoDecorridoSegundos * 1000)//Estou instanciando um objeto Date que já tem várias propriedades para formatar o tempo.
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit',second: '2-digit'});//a variável 'tempo', vai receber um método que representa o tempo em formato de string.
    // const tempo = tempoDecorridoSegundos;// uma variável que é igual uma outra variável
    tempoNaTela.innerHTML= `${tempoFormatado}`;//Vai ser inserido dentro do timer o que está acontecendo no tempoDecorridoSegundos.    
}
mostrarTempo();
