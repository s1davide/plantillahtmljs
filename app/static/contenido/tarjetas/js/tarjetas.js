var archivos = {'local': null, 'URL': null};
function iniciaModal(){
    $('#modalTarjetas').modal('show')
}
let anchoTarjetas = 250;
let espacioEntreColumnas = 30;
let espacioEntreFilas = 30;
let contenedorTarjetas = document.querySelector('.contenedorTarjetas');

organizaElementos();
contenedorTarjetas.style.gridAutoRows = "minmax("+anchoTarjetas+"px, auto)";
contenedorTarjetas.style.gridColumnGap =espacioEntreColumnas+"px";
contenedorTarjetas.style.gridRowGap = espacioEntreFilas+"px";

visualViewport.onresize =  ()=>{
    organizaElementos();
}

function organizaElementos(params) {    
    let valorComparacion;
    let cantidadColumnas;    
    let cantidadElementos;
    cantidadElementos = document.querySelectorAll('.tarjetaPersonalizada').length;
    valorComparacion = anchoTarjetas+ espacioEntreColumnas +20+64;
    cantidadColumnas = Math.round(window.innerWidth/valorComparacion);    
    if(cantidadElementos<cantidadColumnas){
        cantidadColumnas = cantidadElementos;
    }    
    contenedorTarjetas.style.gridTemplateColumns = "repeat("+ cantidadColumnas+", "+anchoTarjetas+"px)";    
}

function validaURL(url, callback, timeout, tipo) {    
        timeout = timeout || 5000;
        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function() {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, false, tipo);
            }
        };
        img.onload = function() {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, true, tipo);
            }
        };
        img.src = url;
        timer = setTimeout(function() {
            timedOut = true;
            callback(url, "timeout");
        }, timeout);     
}
function record(url, result, tipo) {      
    let elemento = document.querySelector('#validaImagen') ;
    let elementoMuestra = document.querySelector('#muestraImagen') 
    let optionLocal =document.querySelector('#imagenLocal');
    let optionURL =document.querySelector('#imagenURL');
    elemento.style.fontWeight = "Bold";
    if(result && tipo=='local'){
        archivos.local = url;
        elemento.style.color = "green";
        elemento.innerHTML =  "Archivo Válido";       
        elementoMuestra.style.backgroundImage = "url("+ url+")"    
        optionLocal.click()            
        
    }
    else if(!result && tipo=='local'){
        archivos.local = null;
        elemento.style.color = "red";
        elemento.innerHTML =  "Archivo Inválido";       
        elementoMuestra.style.backgroundImage = ""       
        elementoMuestra.style.backgroundColor= "#e2dede";        
        optionLocal.click()
        
    }
    else if(result && tipo=='URL'){
        archivos.URL = url;
        elemento.style.color = "green";
        elemento.innerHTML =  "URL Válida";       
        elementoMuestra.style.backgroundImage = "url("+ url+")"        
        optionURL.click()        
        
    }
    else {
        archivos.URL = null;
        elemento.style.color = "red";
        elemento.innerHTML =  "URL Inválida";       
        elementoMuestra.style.backgroundImage = ""       
        elementoMuestra.style.backgroundColor= "#e2dede";   
        optionURL.click()     
        
    }
}   
function opcionImagen(params) {            
    validaURL(archivos[params],record, null,params)
}

function seleccionArchivo(params) {       
    let objURL = URL.createObjectURL(params);
    validaURL(objURL, record, null,"local");
    document.querySelector('#archivo').value = "";
 }

function soltarArchivo(params) {    
    let elemento = document.querySelector('#validaImagen') ;
    let elementoMuestra = document.querySelector('#muestraImagen')         
    params.preventDefault();
    let archivo = params.dataTransfer.files[0];    
    let objURL = URL.createObjectURL(archivo);
    validaURL(objURL, record, null,"local");
}
function dragOver(params) {
    params.preventDefault();
}
function agregaTarjeta(params) {
    let tarjeta = document.querySelector(".plantillaTarjeta").cloneNode(true);
    let opcionSeleccionada = document.querySelector('input[name=radioImage]:checked').value;
    let mensajeImagen = document.querySelector('#validaImagen');
    let previaImagen = document.querySelector('#muestraImagen');
    let tituloTarjeta = document.querySelector('#inputTitulo');
    let contenidoTarjeta = document.querySelector('#contenidoTarjeta');
    
    if(archivos[opcionSeleccionada]==null){
        console.log(archivos[opcionSeleccionada])
        let duracionAnimacion = 200;
        mensajeImagen.innerHTML ="No ha seleccionado una imagen válida";
        mensajeImagen.style.fontWeight ="bold";
        mensajeImagen.style.color= "red";
        mensajeImagen.style.animationDuration = duracionAnimacion +'ms';
        mensajeImagen.style.transition = duracionAnimacion +'ms';
        mensajeImagen.style.animationName = 'temblor';
        setTimeout(() => {
            mensajeImagen.style.animationName = '';
        }, duracionAnimacion);

    }
    else{
        tarjeta.style.display= "block";
        tarjeta.className = "card tarjetaPersonalizada";
        tarjeta.querySelector('.card-title').innerHTML = tituloTarjeta.value;
        tarjeta.querySelector('.card-text').innerHTML = contenidoTarjeta.value;
        tarjeta.querySelector('img').src = archivos[opcionSeleccionada];
        document.querySelector('.contenedorTarjetas').appendChild(tarjeta)    
        tituloTarjeta.value ="";                   
        contenidoTarjeta.value="";
        $('#modalTarjetas').modal('hide')
        archivos.URL =null;
        archivos.local =null;
        mensajeImagen.innerHTML = "";
        previaImagen.style.backgroundImage= "";        
        organizaElementos();
    }
    
}



