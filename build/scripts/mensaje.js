
// Esto sirve para poder hacer las funciones de los botones
// desde el html y asi poder poner el texto en el input


function obtenertexto() {

    let msge = document.getElementById('input').value;

    let port = chrome.runtime.connect({ name: "safePortInput" });

    port.postMessage({ msge });

}

let boton = document.getElementById('boton');

boton.addEventListener("click", obtenertexto, false);




