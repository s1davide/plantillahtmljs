import {pages, estilos, modoEdicion, elementoBase} from '../js/adminPaginas.js'
var vistaCargar= '';
window.addEventListener('hashchange', function name(params) {    
    manejaRuta();
    vistaActiva();
  });
window.addEventListener('load', function name(params) {  
    manejaRuta();
    cargaVistas();  
});
//================Estilos Extra =========================
let estilo= document.createElement('link')

for(let i = 0; i<estilos.length;i++){
  estilo.href = estilos[i];
  estilo.rel = "stylesheet";  
  document.head.appendChild(estilo);
}
//================Estilos Extra =========================


if(modoEdicion){  
  let meta1 =document.createElement('meta');
  let meta2 =document.createElement('meta');
  let meta3 =document.createElement('meta');
  meta1.setAttribute('http-equiv','cache-control');
  meta1.setAttribute('content','no-cache');
  meta2.setAttribute('http-equiv','expires');
  meta2.setAttribute('content','0');
  meta3.setAttribute('http-equiv','pragma');
  meta3.setAttribute('content','no-cache');
  document.head.appendChild(meta1);
  document.head.appendChild(meta2);
  document.head.appendChild(meta3);
}

function manejaRuta(params) {
  let localizacion = location.href
  let sharp = localizacion.indexOf('#')
  let rutaActual='';
  if(sharp>=0){
    rutaActual =  localizacion.substring(sharp+1, localizacion.length);   
  }
  else{
    location.hash =""
  }  
  if(pages[rutaActual]==null){    
      vistaCargar = pages[''];    
      location.hash =""  
  }
  else{
      vistaCargar = pages[rutaActual];
  }    
}

function cargaVistas(params) {  
  let cantidadPaginas = tamanoObjeto(pages);
  let indicePagina = 0;
  for (let vw in pages){       
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pages[vw]);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
    xhr.onload = (el) =>{      
      let contenido = document.createElement('div');
      let texto = el.target.response;      
      contenido.innerHTML = texto;
      contenido.style.display = 'none';
      contenido.setAttribute('rutacontenido', pages[vw] );      
      elementoBase.appendChild(contenido);      
      cargaScript(texto);       
      indicePagina++;     
      if(indicePagina==cantidadPaginas){
        vistaActiva();
      }
    }      
  }  
}
function tamanoObjeto(params) { 
  let tamanoObjeto=0; 
  for (let i in params){   
    tamanoObjeto++;
  }
  return tamanoObjeto;
}
function vistaActiva(params) {  
  let duracionAnimacionesMs = 200;
  let atributoContenido = "div[rutacontenido='"+ vistaCargar +"']";     
  let contenidoActivar= document.querySelector(atributoContenido); 
  Array.prototype.forEach.call(elementoBase.children,(c)=>{        
    c.style.animationName = 'desaparece';     
    setTimeout(() => {
      c.style.display = 'none';  
    }, duracionAnimacionesMs);
    
  }) 
  setTimeout(() => {
    contenidoActivar.style.opacity = '0';    
    contenidoActivar.style.display = 'block';    
    contenidoActivar.style.transition = duracionAnimacionesMs + "ms";
    contenidoActivar.style.animationFillMode ="forwards"
    contenidoActivar.style.animationDuration = duracionAnimacionesMs + "ms"; 
    contenidoActivar.style.animationName = 'aparece';   
    setTimeout(() => {
      contenidoActivar.style.animationName = '';   
      contenidoActivar.style.opacity = '1'; 
    }, duracionAnimacionesMs);
  }, duracionAnimacionesMs);   
  
}

function cargaScript(params) {  
  let html = document.createElement('html')
  html.innerHTML = params
  let scripts = html.querySelectorAll('script')    
  Array.prototype.forEach.call(scripts, (sc)=>{    
    if (sc.getAttribute('src')!=null){
      let script = document.createElement('script')      
      script.setAttribute('src', sc.getAttribute('src') )
      if(!existeScript(script)){
        document.head.appendChild(script)               
      }      
    }
  })
}
function existeScript(params) {
    let existe =false;
    let listaScripts =document.head.querySelectorAll('script');
    Array.prototype.forEach.call(listaScripts, (sc)=>{
      if(sc.getAttribute('src')==params.getAttribute('src')){
        existe =true;
      }
    })
    return existe;
}