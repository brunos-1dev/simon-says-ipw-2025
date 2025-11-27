'use strict';

// Variables globales del juego

var coloresDisponibles = ['verde', 'rojo', 'amarillo', 'azul'];
var secuenciaJuego = [];
var indiceJugador = 0;
var nombreJugador = '';
var nivelActual = 0;     
var puntajeActual = 0;  
var puedeJugar = false;  

// Funciones de lógica del juego

function iniciarNuevoJuego(nombre) {
    nombreJugador = nombre;
    secuenciaJuego = [];
    indiceJugador = 0;
    nivelActual = 0;
    puntajeActual = 0;
    puedeJugar = false;

    agregarNuevoColor();
}

function agregarNuevoColor() {
    var indiceAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
    var nuevoColor = coloresDisponibles[indiceAleatorio];

    secuenciaJuego.push(nuevoColor);
    nivelActual = secuenciaJuego.length;
    indiceJugador = 0;
    puedeJugar = false;
}

function comenzarTurnoJugador() {
    puedeJugar = true;
    indiceJugador = 0;
}

function registrarJugadaJugador(color) {
    if (!puedeJugar) {
        return {
            valido: false,
            tipo: 'no-permitido'
        };
    }

    var colorEsperado = secuenciaJuego[indiceJugador];

    if (color !== colorEsperado) {
        puedeJugar = false;

        return {
            valido: false,
            tipo: 'error',
            puntaje: puntajeActual,
            nivel: nivelActual
        };
    }

    puntajeActual += 1;
    indiceJugador += 1;

    if (indiceJugador === secuenciaJuego.length) {
        puedeJugar = false;

        return {
            valido: true,
            tipo: 'ronda-completa',
            puntaje: puntajeActual,
            nivel: nivelActual
        };
    }

    return {
        valido: true,
        tipo: 'continuar',
        puntaje: puntajeActual,
        nivel: nivelActual
    };
}

// Funciones de lectura del estado

function obtenerNombreJugador() {
    return nombreJugador;
}

function obtenerPuntajeActual() {
    return puntajeActual;
}

function obtenerNivelActual() {
    return nivelActual;
}

function obtenerSecuenciaJuego() {
    return secuenciaJuego.slice();
}

function juegoEstaActivo() {
    return puedeJugar;
}
