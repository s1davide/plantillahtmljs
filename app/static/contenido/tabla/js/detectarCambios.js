class ObservadorMutaciones{
    constructor(elemento, funcion){
        this.elementoMutacion = elemento;
        this.funcionEjecutar = funcion;
    }
    crearMutacion() {                
        var targetNode = this.elementoMutacion;
        var funcion = this.funcionEjecutar
        var config = { childList: true };
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {                    
                    funcion();                    
                }
            }
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }   
}

