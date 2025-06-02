// Asignar eventos cuando se carga la página
window.onload = function () {
    var boton_guardar = document.getElementById("boton_Enviar");
    if (boton_guardar) {
        boton_guardar.addEventListener('click', guardar_datos);
    }
};

// === FUNCIONES PRINCIPALES ===

function validar_formulario() {
    // Obtener elementos del formulario
    var inputNombre = document.getElementById('inputNombre');
    var inputEmail = document.getElementById('inputEmail');
    var inputRut = document.getElementById("inputRut");
    var inputContrasena = document.getElementById('inputContrasena');
    var inputRepetirContrasena = document.getElementById('inputRepetirContrasena');
    var inputFechaNac = document.getElementById('fecha_inicio');
    var inputCV = document.getElementById('formFile');

    // Limpiar clases anteriores
    limpiarValidaciones([
        inputNombre,
        inputEmail,
        inputRut,
        inputContrasena,
        inputRepetirContrasena,
        inputFechaNac,
        inputCV
    ]);

    // Validar Nombre Completo
    if (inputNombre.value.trim() === "" || !validar_nombre_completo(inputNombre.value.trim())) {
        inputNombre.classList.add('is-invalid');
    }

    // Validar Email
    if (inputEmail.value.trim() === "" || !validar_email(inputEmail.value.trim())) {
        inputEmail.classList.add('is-invalid');
    }

    // Validar Rut
    if (inputRut.value.trim() === "" || !validaRut(inputRut.value.trim())) {
        inputRut.classList.add('is-invalid');
    }

    // Validar Fecha de Nacimiento (solo si se ingresó algo)
    if (!es_fecha_valida(inputFechaNac.value.trim())) {
        inputFechaNac.classList.add('is-invalid');
    }

    // Validar Curriculum Vitae (opcional, pero tipo sí se valida si hay archivo)
    if (!validar_tipo_archivo(inputCV)) {
        inputCV.classList.add('is-invalid');
    }

    // Validar Contraseña
    if (inputContrasena.value.trim() === "" || !validar_contrasena_segura(inputContrasena.value.trim())) {
        inputContrasena.classList.add('is-invalid');
    }

    // Validar Repetir Contraseña
    if (inputRepetirContrasena.value.trim() === "" || inputContrasena.value.trim() !== inputRepetirContrasena.value.trim()) {
        inputRepetirContrasena.classList.add('is-invalid');
    }
}

function guardar_datos() {
    validar_formulario(); // Ejecutar validaciones

    const invalidos = document.querySelectorAll('.is-invalid');
    if (invalidos.length > 0) {
        return; // Si hay errores, no continuar
    }

    alert("Datos enviados correctamente.");
}

function limpiar_formulario() {
    var inputNombre = document.getElementById('inputNombre');
    var inputEmail = document.getElementById('inputEmail');
    var inputRut = document.getElementById("inputRut");
    var inputContrasena = document.getElementById('inputContrasena');
    var inputRepetirContrasena = document.getElementById('inputRepetirContrasena');
    var inputFechaNac = document.getElementById('fecha_inicio');
    var inputCV = document.getElementById('formFile');

    inputNombre.value = "";
    inputEmail.value = "";
    inputRut.value = "";
    inputContrasena.value = "";
    inputRepetirContrasena.value = "";
    inputFechaNac.value = "";
    inputCV.value = ""; // Reiniciar archivo (por seguridad no puedes asignar vacío a un path)

    limpiarValidaciones([
        inputNombre,
        inputEmail,
        inputRut,
        inputContrasena,
        inputRepetirContrasena,
        inputFechaNac,
        inputCV
    ]);
}

// === FUNCIONES AUXILIARES ===

function limpiarValidaciones(inputs) {
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
}

function validar_nombre_completo(nombre) {
    return nombre.trim().split(/\s+/).length >= 2;
}

function validar_email(email) {
    return /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/.test(email);
}

function validar_contrasena_segura(contrasena) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,12}$/.test(contrasena);
}

function es_fecha_valida(fecha) {
    if (!fecha) return true;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) return false;

    const fechaJS = new Date(fecha);
    return fechaJS.toString() !== "Invalid Date" &&
           !isNaN(fechaJS.getTime()) &&
           fechaJS.toISOString().slice(0,10) === fecha;
}

function validar_tipo_archivo(inputFile) {
    const archivo = inputFile.files[0];
    if (!archivo) return true;

    const nombreArchivo = archivo.name.toLowerCase();
    return nombreArchivo.endsWith('.pdf') || nombreArchivo.endsWith('.docx');
}

function validaRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;

    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];

    if (digv == 'K') digv = 'k';
    return (dv(rut) == digv);
}

function dv(dig_ver) {
    var M = 0, S = 1;
    for (; dig_ver; dig_ver = Math.floor(dig_ver / 10))
        S = (S + dig_ver % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}