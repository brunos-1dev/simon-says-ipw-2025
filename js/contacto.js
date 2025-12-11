'use strict';

// Variables globales de UI (Contacto)
var formularioContacto;
var inputContactoNombre;
var inputContactoEmail;
var inputContactoMensaje;
var errorContacto;
var destinatarioCorreo = 'brunog.soria@gmail.com';

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', function () {
    formularioContacto = document.getElementById('formulario-contacto');
    inputContactoNombre = document.getElementById('contacto-nombre');
    inputContactoEmail = document.getElementById('contacto-email');
    inputContactoMensaje = document.getElementById('contacto-mensaje');
    errorContacto = document.getElementById('error-contacto');

    if (formularioContacto) {
        formularioContacto.addEventListener('submit', manejarSubmitContacto);
    }
});

// Manejo del submit
function manejarSubmitContacto(evento) {
    evento.preventDefault();

    var nombre = obtenerValorInput(inputContactoNombre);
    var email = obtenerValorInput(inputContactoEmail);
    var mensaje = obtenerValorInput(inputContactoMensaje);
    var mensajesError = [];

    if (!validarNombreContacto(nombre)) {
        mensajesError.push('El nombre solo puede contener caracteres alfanuméricos y espacios.');
    }

    if (!validarEmailContacto(email)) {
        mensajesError.push('Ingresá un correo electrónico válido.');
    }

    if (!validarMensajeContacto(mensaje)) {
        mensajesError.push('El mensaje debe tener más de 5 caracteres.');
    }

    if (mensajesError.length > 0) {
        mostrarErrorContacto(mensajesError.join(' '));
        return;
    }

    limpiarErrorContacto();
    enviarMailto(nombre, email, mensaje);
}

// Funciones de validación
function obtenerValorInput(input) {
    if (!input) {
        return '';
    }

    var valor = input.value;
    if (!valor) {
        return '';
    }

    return valor.trim();
}

function validarNombreContacto(nombre) {
    if (!nombre || nombre.length < 1) {
        return false;
    }

    var patron = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]+$/;
    return patron.test(nombre);
}

function validarEmailContacto(email) {
    if (!email) {
        return false;
    }

    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}

function validarMensajeContacto(mensaje) {
    if (!mensaje) {
        return false;
    }

    return mensaje.length > 5;
}

// Manejo de errores en UI
function mostrarErrorContacto(mensaje) {
    if (errorContacto) {
        errorContacto.textContent = mensaje;
    }
}

function limpiarErrorContacto() {
    mostrarErrorContacto('');
}

// Construcción del mailto
function enviarMailto(nombre, email, mensaje) {
    var asunto = 'Consulta sobre el juego Simon Says';
    var cuerpo = 'Nombre: ' + nombre +
        '\nCorreo: ' + email +
        '\n\nMensaje:\n' + mensaje;

    var enlaceMailto = 'mailto:' + destinatarioCorreo +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);
    console.log('MAILTO generado:', enlaceMailto);
    window.location.href = enlaceMailto;
}
