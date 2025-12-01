'use strict';

// Variables globales de UI
var formularioJugador;
var inputNombreJugador;
var errorNombreJugador;
var textoJugadorActual;
var textoNivelActual;
var textoPuntajeActual;
var botonesColor;
var botonReiniciar;
var botonRanking;
var modalGameOver;
var mensajeGameOver;
var botonModalReiniciar;
var modalRanking;
var botonCerrarModalRanking;
var botonOrdenarPorPuntaje;
var botonOrdenarPorFecha;
var idIntervaloSecuencia = null;

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', function () {
    formularioJugador = document.getElementById('formulario-jugador');
    inputNombreJugador = document.getElementById('nombre-jugador');
    errorNombreJugador = document.getElementById('error-nombre-jugador');
    textoJugadorActual = document.getElementById('jugador-actual');
    textoNivelActual = document.getElementById('nivel-actual');
    textoPuntajeActual = document.getElementById('puntaje-actual');
    botonesColor = document.querySelectorAll('.boton-color');
    botonReiniciar = document.getElementById('boton-reiniciar');
    botonRanking = document.getElementById('boton-ranking');
    modalGameOver = document.getElementById('modal-game-over');
    mensajeGameOver = document.getElementById('mensaje-game-over');
    botonModalReiniciar = document.getElementById('boton-modal-reiniciar');
    modalRanking = document.getElementById('modal-ranking');
    botonCerrarModalRanking = document.getElementById('cerrar-modal-ranking');
    botonOrdenarPorPuntaje = document.getElementById('ordenar-por-puntaje');
    botonOrdenarPorFecha = document.getElementById('ordenar-por-fecha');

    // Eventos
    formularioJugador.addEventListener('submit', manejarSubmitJugador);
    botonReiniciar.addEventListener('click', reiniciarPartidaActual);
    botonRanking.addEventListener('click', function () {
        mostrarModal(modalRanking);
    });

    botonCerrarModalRanking.addEventListener('click', function () {
        ocultarModal(modalRanking);
    });

    botonModalReiniciar.addEventListener('click', function () {
        reiniciarPartidaActual();
        ocultarModal(modalGameOver);
    });

    botonOrdenarPorPuntaje.addEventListener('click', function () {
        
    });

    botonOrdenarPorFecha.addEventListener('click', function () {
        
    });

    inicializarEventosBotonesColor();
});

// Formularios / validaciones
function manejarSubmitJugador(evento) {
    evento.preventDefault();

    var nombre = inputNombreJugador.value;
    nombre = nombre.trim();

    if (!validarNombreJugador(nombre)) {
        mostrarErrorNombre('El nombre debe tener al menos 3 caracteres.');
        return;
    }

    limpiarErrorNombre();
    iniciarNuevoJuego(nombre);
    actualizarDatosEnPantalla();
    reproducirSecuencia();
}

function validarNombreJugador(nombre) {
    if (!nombre || nombre.length < 3) {
        return false;
    }

    var patron = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]+$/;
    return patron.test(nombre);
}

function mostrarErrorNombre(mensaje) {
    if (errorNombreJugador) {
        errorNombreJugador.textContent = mensaje;
    }
}

function limpiarErrorNombre() {
    mostrarErrorNombre('');
}

// Botones de colores
function inicializarEventosBotonesColor() {
    if (!botonesColor) {
        return;
    }

    var i;
    for (i = 0; i < botonesColor.length; i += 1) {
        (function (boton) {
            boton.addEventListener('click', function () {
                var color = boton.getAttribute('data-color');
                manejarClickColor(color);
            });
        })(botonesColor[i]);
    }
}

function manejarClickColor(color) {
    iluminarBotonColor(color);
    var resultado = registrarJugadaJugador(color);

    if (resultado.tipo === 'no-permitido') {
        return;
    }
    if (resultado.tipo === 'error') {
        actualizarDatosEnPantalla();
        mostrarModalGameOver(resultado);
        return;
    }
    actualizarDatosEnPantalla();

    if (resultado.tipo === 'ronda-completa') {
        agregarNuevoColor();
        actualizarDatosEnPantalla();

        setTimeout(function () {
            reproducirSecuencia();
        }, 800);
    }
}

// Mostrar secuencia del juego
function reproducirSecuencia() {
    var secuencia = obtenerSecuenciaJuego();
    var indice = 0;

    if (idIntervaloSecuencia !== null) {
        clearInterval(idIntervaloSecuencia);
        idIntervaloSecuencia = null;
    }

    idIntervaloSecuencia = setInterval(function () {
        if (indice >= secuencia.length) {
            clearInterval(idIntervaloSecuencia);
            idIntervaloSecuencia = null;

            comenzarTurnoJugador();
            return;
        }

        var color = secuencia[indice];
        iluminarBotonColor(color);
        indice += 1;
    }, 800);
}

function iluminarBotonColor(color) {
    var selector = '.boton-color[data-color="' + color + '"]';
    var boton = document.querySelector(selector);

    if (!boton) {
        return;
    }

    boton.classList.add('boton-color-activo');

    setTimeout(function () {
        boton.classList.remove('boton-color-activo');
    }, 400);
}

// Actualizar datos en pantalla
function actualizarDatosEnPantalla() {
    if (textoJugadorActual) {
        var nombre = obtenerNombreJugador();
        textoJugadorActual.textContent = nombre || '---';
    }

    if (textoNivelActual) {
        textoNivelActual.textContent = obtenerNivelActual();
    }

    if (textoPuntajeActual) {
        textoPuntajeActual.textContent = obtenerPuntajeActual();
    }
}

/* Modales */
function mostrarModal(modalElemento) {
    if (!modalElemento) {
        return;
    }

    modalElemento.classList.add('modal-visible');
    modalElemento.setAttribute('aria-hidden', 'false');
}

function ocultarModal(modalElemento) {
    if (!modalElemento) {
        return;
    }

    modalElemento.classList.remove('modal-visible');
    modalElemento.setAttribute('aria-hidden', 'true');
}

function mostrarModalGameOver(resultado) {
    var mensaje = 'Te has equivocado en la secuencia.';

    if (resultado && typeof resultado.puntaje === 'number') {
        mensaje += ' Puntaje final: ' + resultado.puntaje +
            '. Nivel alcanzado: ' + resultado.nivel + '.';
    }

    if (mensajeGameOver) {
        mensajeGameOver.textContent = mensaje;
    }

    mostrarModal(modalGameOver);
}

// Reinicio de partida
function reiniciarPartidaActual() {
    var nombre = obtenerNombreJugador();

    if (!nombre) {
        var nombreInput = inputNombreJugador.value;
        nombreInput = nombreInput ? nombreInput.trim() : '';

        if (!validarNombreJugador(nombreInput)) {
            mostrarErrorNombre('Ingresá un nombre válido para reiniciar la partida.');
            inputNombreJugador.focus();
            return;
        }

        nombre = nombreInput;
    }

    limpiarErrorNombre();
    iniciarNuevoJuego(nombre);
    actualizarDatosEnPantalla();
    reproducirSecuencia();
}
