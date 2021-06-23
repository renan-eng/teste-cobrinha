let canvas = document.getElementById('snake'); // snake é o id do meu canvas no HTML
let contex = canvas.getContext('2d');
let box = 32; // tamanho de cada pixel na tela
let snake = [];
let score=0;

//criando o array da cobria e sua posição inicial
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
// criando direção que a cobrinha pode se movimentar
let direction = "right";
//cria o fundo de tela do jogo com a cor verde claro com tamanho de 512x512 (16*32)
function crairBG(){
    contex.fillStyle = "rgb(96, 174, 223)";
    contex.fillRect(0, 0, 16 * box, 16 * box);
}
// cria a cobrinha com a cor verde e posição icial x,y
function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        contex.fillStyle = "rgb(0, 255, 0)";
        contex.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// cria a comida na cor vermelha em pontos aletórios dentro da nossa canvas
function drawFood(){  
        contex.fillStyle = "rgb(255, 0, 0)";
        contex.fillRect(food.x, food.y, box, box);     
    }


// puxa do HTML o evento keydown que ocorre quando um tecla é pressioanda e chama a função update
document.addEventListener('keydown', update); 

function update(event){
    // o código 37 corresponde a tecla esquerda (left)
    // o código 38 corresponde a tecla pra cima (up)
    // o código 39 corresponde a tecla direta (right)
    // o código 40 corresponde a tecla pra baixo (down)
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// função que define o paramêtro de colisão e para o jogo exibe Game Over
function colision() {
    for (i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim de jogo: obrigado por jogar!');
        }
    }
}

function drawScore() {
    contex.font = "20px Arial";
    contex.fillStyle = "#ffffff";
    contex.fillText("Placar: "+ score, 8, 20);               
           
} 

// função que irá inicializar o jogo
function iniciarJogo(){    
    // faz a cobrinha reaparecer na tela caso ela passe dos limtes do canvas
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    colision();
    
    crairBG();    
    criarCobrinha();
    drawFood();// CORRIGIR: ao adicionar o drawFood() a cobrinha para de se mechar e a comida nao é desenhada na tela
    drawScore();
    
    // setar posição incial da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; // a direita soma 1 pixel no sentido de x
    if(direction == "left") snakeX -= box; // a esqueda subtrai 1 pixel (plano cartesiano xy)
    if(direction == "up") snakeY -= box; // para cima subtrai 1 pixel no sentido de y
    if(direction == "down") snakeY += box; // para baixo soma 1 pixel
    
    //define o crescimento da Snake conforme a posição da comida
    if (snakeX != food.x || snakeY != food.y){
        snake.pop();// retira o ultimo elemento do array Snake
    }
    else{ //que a snake esta na posição da comida, entao irá atualizar as coordenadas de X e Y para comida
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score=score+10;
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);   
 
}
// a cada 100ms a função inciarJogo é atualizada permitindo que o jogo rode sem travamento
let jogo = setInterval(iniciarJogo, 100);
