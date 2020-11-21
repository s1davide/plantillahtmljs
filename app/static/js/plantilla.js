var tabla;
var edicion =false;
let fila;

let intervalo = setInterval(() => {
    try {
        cuerpoTabla =document.getElementById('cuerpoTabla')
        let observadorMutaciones = new ObservadorMutaciones(cuerpoTabla, eventoFilas);
        observadorMutaciones.crearMutacion();
        margen = document.querySelector('nav').clientHeight +15
        document.querySelector('#espacio').style = "margin-top: " + margen + "px"
        eventoFilas();    
        clearInterval(intervalo)    
    } catch (error) {}    
}, 100);

    $(document).ready( function () {
      tabla =$('#data_table').DataTable({
            //para cambiar el lenguaje a español
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast":"Último",
                    "sNext":"Siguiente",
                    "sPrevious": "Anterior"
                },
                "sProcessing":"Procesando...",
            }
        });
    });
    function agregarRegistro(){
      if(!edicion){
        id =document.getElementById("id").value
        nombre =document.getElementById("nombre").value
        apellido =document.getElementById("apellido").value
        ciudad =document.getElementById("ciudad").value
        pais =document.getElementById("pais").value

        if(!existe(id)){
          tabla.row.add([
          id, 
          nombre,
          apellido,
          ciudad,
          pais,
          ]).draw(false);
          limpiarCampos();
          alinearPrimerColumna();
          eventoFilas();
          document.getElementById("id").focus()
        }else{
          $('#notificacion').toast('show');
        }           
      }
    }
    function modificarRegistro(params) {
      id =document.getElementById("id").value
      nombre =document.getElementById("nombre").value
      apellido =document.getElementById("apellido").value
      ciudad =document.getElementById("ciudad").value
      pais =document.getElementById("pais").value
      comprobacion = !existe(id) || id==fila.children[0].innerHTML      
      if (id!="" && nombre!=""&&apellido!=""&&ciudad!=""&&pais&&comprobacion){
        tabla.row(fila).data([
            id, 
            nombre,
            apellido,
            ciudad,
            pais,
        ]).draw(false);
        limpiarCampos();
        desactivaModificar();
      }else {
        $('#notificacion').toast('show');
      }
    }
    
    function openModal(params) {
      if(window.innerWidth>575){
        let modal;
        let titulo;
        let rutaImagen;
        modal =$('#modalImagen');
        titulo = params.children[1].children[0].innerHTML;     
        rutaImagen = params.children[0].getAttribute('src');
        document.getElementById("tituloModal").innerHTML = titulo;
        modal.find('img')[0].setAttribute('src', rutaImagen);
        modal.modal('show');        
      }      
    }
    function openModalEdit(params) {  
        fila =params;        
        $('#modalTabla').modal('show');
    }
    function borrarFila(params) {
        tabla.row(fila).remove().draw(false);
        $('#modalTabla').modal('hide');
        eventoFilas();
    }
    function activaModificar(params) {
      $('#modalTabla').modal('hide');
        edicion =true;
        asignaValores();
        agregar = document.querySelector('#btnAgregar');
        elementos =  document.querySelectorAll('.animation');                  
        agregar.style.transform =  "translate(200px)";
        agregar.style.opacity ='0'; 
        Array.prototype.forEach.call(elementos,(el)=>{
          el.style.transform =  'translate(40px)';              
          el.classList.remove('btnOculto');
          el.removeAttribute('disabled');        
        })
        
        
    }
    
    function desactivaModificar(params) {
      edicion =false;
      agregar = document.querySelector('#btnAgregar');
      elementos =  document.querySelectorAll('.animation');    
      
      agregar.style.transform ='translate(-89px)';
      agregar.style.opacity = '1';        
      Array.prototype.forEach.call(elementos,(el)=>{
        el.style.transform = 'translate(-200px)';
        el.classList.add('btnOculto');
        el.setAttribute('disabled', '');
      })
      limpiarCampos();
    }    
    function asignaValores(params) {
      document.getElementById("id").value = fila.children[0].innerHTML
      document.getElementById("nombre").value = fila.children[1].innerHTML
      document.getElementById("apellido").value = fila.children[2].innerHTML
      document.getElementById("ciudad").value = fila.children[3].innerHTML
      document.getElementById("pais").value =fila.children[4].innerHTML
    }
    function alinearPrimerColumna(params) {      
      elemento = $('#cuerpoTabla').find('tr')
      Array.prototype.forEach.call(elemento, (el)=>{
        el.children[0].setAttribute('align', 'center')
      })      
    }
    function eventoFilas(params) {        
        $('#cuerpoTabla tr').each((index,item) =>{             
          if(item.children[0].className!="dataTables_empty")            
            item.onclick = ()=>{
              openModalEdit(item);                 
            }                                                   
            alinearPrimerColumna();  
        })
    }
    function existe(valorBuscado) {      
      existeRegistro= false;      
      Array.prototype.forEach.call(tabla.rows().data(),(el)=>{
        if(el[0]==valorBuscado){
            existeRegistro = true;
        }
      })        
      return existeRegistro;
    }
    function limpiarCampos(){
      document.getElementById("id").value = ""
      document.getElementById("nombre").value = ""
      document.getElementById("apellido").value = ""
      document.getElementById("ciudad").value = ""
      document.getElementById("pais").value =""
    }