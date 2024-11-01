let currentTextIndex = 0;
let currentImageIndex = 0;

// Seleciona todos os elementos de texto e imagem
const texts = document.querySelectorAll('.text-carousel p');
const images = document.querySelectorAll('.image-carousel img');

// Mostra o texto e imagem atuais
function showText(index) {
    texts.forEach((text, i) => {
        text.classList.toggle('active', i === index);
    });
}

function showImage(index) {
    images.forEach((image, i) => {
        image.classList.toggle('active', i === index);
    });
}

// Inicializa o carrossel
showText(currentTextIndex);
showImage(currentImageIndex);

// Funções para mudar o texto e imagem
function changeCarousel(index) {
    currentTextIndex = (index + texts.length) % texts.length; // Garante que o índice não fique negativo
    currentImageIndex = (index + images.length) % images.length; // Garante que o índice não fique negativo
    showText(currentTextIndex);
    showImage(currentImageIndex);
}

// Função para arrastar
let startX = 0;
let isDragging = false;

function handleDragStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX; // Posição inicial do toque
    isDragging = true; // Inicia a arrastada
    e.preventDefault(); // Previne comportamento padrão
}

function handleDragMove(e) {
    if (!isDragging) return; // Ignora se não estiver arrastando
    e.preventDefault(); // Previne comportamento padrão durante o arrasto
}

function handleDragEnd(e) {
    if (!isDragging) return; // Ignora se não estiver arrastando

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX; // Posição final do toque
    const dragDistance = endX - startX; // Distância arrastada

    isDragging = false; // Finaliza a arrastada

    // Verifica a distância arrastada para mudar texto/imagem
    if (dragDistance < -50) {
        changeCarousel(currentTextIndex + 1); // Arrastou para a esquerda
    } else if (dragDistance > 50) {
        changeCarousel(currentTextIndex - 1); // Arrastou para a direita
    }
}

// Adiciona eventos de arrasto para o carrossel de texto e imagem
const carousels = [document.querySelector('.text-carousel'), document.querySelector('.image-carousel')];

carousels.forEach(carousel => {
    carousel.addEventListener('touchstart', handleDragStart);
    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('touchmove', handleDragMove);
    carousel.addEventListener('mousemove', handleDragMove);
    carousel.addEventListener('touchend', handleDragEnd);
    carousel.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('mouseleave', handleDragEnd);
});

// Previne a seleção de texto
document.addEventListener('selectstart', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
});

// Funções de controle de áudio
function playAudio(audioId) {
    const audio = document.getElementById(audioId);
    audio.play().catch(error => {
        console.error("Erro ao tentar tocar o áudio:", error);
    });
}

function pauseAudio(audioId) {
    const audio = document.getElementById(audioId);
    audio.pause();
}

function setAudioProgress(audioId, value) {
    const audio = document.getElementById(audioId);
    audio.currentTime = (audio.duration * value) / 100; // Ajusta o tempo atual com base na barra de progresso
}

// Atualiza a barra de progresso enquanto o áudio toca
document.querySelectorAll('audio').forEach(audioElement => {
    audioElement.addEventListener('timeupdate', () => {
        const progressBar = document.querySelector(`input[onchange*="${audioElement.id}"]`);
        const value = (audioElement.currentTime / audioElement.duration) * 100;
        if (progressBar) {
            progressBar.value = value;
        }
    });
});


function playAudio(audioId) {
    const audio = document.getElementById(audioId);
    audio.play();
}

function pauseAudio(audioId) {
    const audio = document.getElementById(audioId);
    audio.pause();
}

function setAudioProgress(audioId, value) {
    const audio = document.getElementById(audioId);
    audio.currentTime = (audio.duration * value) / 100; // Atualiza o tempo de reprodução
}
