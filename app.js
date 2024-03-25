/* Enero 9 del 2023 Reto Javascript */

/* Selectores */
let floor = document.querySelector('#select_floor');
let aprovechables = document.querySelector('#aprovechables');
let organicos = document.querySelector('#organicos');
let no_aprovechables = document.querySelector('#no_aprovechables');
let btnOpenModal = document.querySelector('#btnOpenModal');
let cantidad = document.querySelector('#cantidad');
let agregar = document.querySelector('#btnSubmit');
let body = document.getElementsByTagName('body');

/* Variables */

let selectorCanecas = 0; //1 ->aprovechables 2->organicos 3->no aprovechables
let seleccionPiso = ["piso3", "piso4", "piso5"]; // 3-> piso 3 / 4-> piso 4 / 5-> piso 5 
/* Crear elemento p para desplegar información */
const parrafo = document.createElement('p');

/* ------------------------------------------Style------------------------------ */
organicos.style.color = "white";
no_aprovechables.style.color = "white";

/* Organizar como se va a ver el parrafo */
parrafo.style.fontSize = "50px";
parrafo.style.textAlign = "center"; 
parrafo.style.marginTop = "50px";
parrafo.style.color = "white";


/* ---------------------------------Eventos------------------------------------ */
/* Escoge el piso de riwi */
floor.addEventListener('input',(e)=>{
    console.log(e.target.value);
    
    switch(e.target.value){
        case "3":
            /* Piso 3 */
            aprovechables.children[0].textContent = `${lugar[0].piso3[0]}/500`;
            organicos.children[0].textContent = `${lugar[0].piso3[1]}/500`;
            no_aprovechables.children[0].textContent = `${lugar[0].piso3[2]}/500`; 
            console.log("piso 3");
            console.log("Piso3", lugar[0]);
            pintarPiso(lugar[0].piso3);
            break;
        case "4":
            /* Piso 4 */
            aprovechables.children[0].textContent = `${lugar[1].piso4[0]}/500`;
            organicos.children[0].textContent = `${lugar[1].piso4[1]}/500`;
            no_aprovechables.children[0].textContent = `${lugar[1].piso4[2]}/500`; 
            console.log("piso 4");
            console.log("Piso4", lugar[1]);
            pintarPiso(lugar[1].piso4);
            break;
        case "5":
            /* Piso 5 */
            aprovechables.children[0].textContent = `${lugar[2].piso5[0]}/500`;
            organicos.children[0].textContent = `${lugar[2].piso5[1]}/500`;
            no_aprovechables.children[0].textContent = `${lugar[2].piso5[2]}/500`; 
            console.log("piso 5");
            console.log("Piso5", lugar[2]);
            pintarPiso(lugar[2].piso5);
            break;
    }
    
});

/* Escoge caneca aprovechables */
aprovechables.addEventListener('click',()=>{
    console.log("Ha escogido aprovechables");
    selectorCanecas = 0;
    btnOpenModal.click();
});

/* Escoge caneca organicos */
organicos.addEventListener('click',()=>{
    console.log("Ha escogido organicos");
    selectorCanecas = 1;
    btnOpenModal.click();
});

/* Escoge caneca no aprovechables */
no_aprovechables.addEventListener('click',()=>{
    console.log("Ha escogido no aprovechables");
    selectorCanecas = 2;
    btnOpenModal.click();
});

agregar.addEventListener('click',(e)=>{
    let numCantidad = JSON.parse(cantidad.value);
    let numPiso = JSON.parse(floor.value);
    let acumulador = 0;
    

    switch(numPiso){
        case 3:
            acumulador = lugar[(numPiso-3)].piso3[selectorCanecas] + numCantidad;
            if(acumulador <= 500){
                lugar[(numPiso-3)].piso3[selectorCanecas] = (lugar[(numPiso-3)].piso3[selectorCanecas]) + numCantidad;

                aprovechables.children[0].textContent = `${lugar[0].piso3[0]}/500`;
                organicos.children[0].textContent = `${lugar[0].piso3[1]}/500`;
                no_aprovechables.children[0].textContent = `${lugar[0].piso3[2]}/500`; 

            }else{
                alert("ha desbordado la caneca, por favor agregue menos basura");
            }

            pintarPiso(lugar[0].piso3);

            break;
        case 4:
            acumulador = lugar[(numPiso-3)].piso4[selectorCanecas] + numCantidad;
            if(acumulador <= 500){
                lugar[(numPiso-3)].piso4[selectorCanecas] = (lugar[(numPiso-3)].piso4[selectorCanecas]) + numCantidad;

                aprovechables.children[0].textContent = `${lugar[1].piso4[0]}/500`;
                organicos.children[0].textContent = `${lugar[1].piso4[1]}/500`;
                no_aprovechables.children[0].textContent = `${lugar[1].piso4[2]}/500`;
            }else{
                alert("ha desbordado la caneca, por favor agregue menos basura");
            }

            pintarPiso(lugar[1].piso4);

            break;
        case 5:
            acumulador = lugar[(numPiso-3)].piso5[selectorCanecas] + numCantidad;
            if(acumulador <= 500){
                lugar[(numPiso-3)].piso5[selectorCanecas] = (lugar[(numPiso-3)].piso5[selectorCanecas]) + numCantidad;

                aprovechables.children[0].textContent = `${lugar[2].piso5[0]}/500`;
                organicos.children[0].textContent = `${lugar[2].piso5[1]}/500`;
                no_aprovechables.children[0].textContent = `${lugar[2].piso5[2]}/500`;
            }else{
                alert("ha desbordado la caneca, por favor agregue menos basura");
            }

            pintarPiso(lugar[2].piso5);

            break;
            
    }

    /* Guardar en el local storage */
    localStorage.setItem('pisosRiwi',JSON.stringify(lugar));
    console.log(lugar);
})

/* DOM para recuperar del local storage */

document.addEventListener('DOMContentLoaded',()=>{

    /* utilizar el localstore por si recarga la página */    
    /* Esta condición es necesaria para que cuando no hay nada en arrayCards no se iguale del localStore el array a Nulo */
    if (localStorage.getItem('pisosRiwi') !== null) {
        lugar = JSON.parse(localStorage.getItem('pisosRiwi'));
        console.log(lugar);
    };
    
    /* En algunos navegadores al resetear no va al piso 3 asi que se va a poner el piso 3 por defecto, con el siguiente código se hace así*/
    document.getElementById("select_floor").selectedIndex = 0;

       /* Cuando se resetea la página, el piso por defecto es el piso3, es por esto que solo hay que pintar por primera vez el piso 3 */
       /* ya que el evento piso, pinta el valor de las canecas */
       aprovechables.children[0].textContent = `${lugar[0].piso3[0]}/500`;
       organicos.children[0].textContent = `${lugar[0].piso3[1]}/500`;
       no_aprovechables.children[0].textContent = `${lugar[0].piso3[2]}/500`;
    
    
    pintarPiso(lugar[0].piso3);

});

/* ----------------------------------------------------------Fin Eventos----------------------------------------- */

/* basuresos separados por  */
/* ["caneca aprovechable", "Caneca organicos","Caneca no aprovechables"] */
let lugar = [
    {
        piso3: [0,0,0]
    },
    {
        piso4: [0,0,0]
    },
    {
        piso5: [0,0,0]
    },
]

function pintarPiso(arreglo){
    let acumulador = arreglo[0] + arreglo[1] + arreglo[2];
    console.log("Este es el valor del acumulador" ,acumulador);

    if((acumulador / 15) < 25){
        console.log("No amigo del ambiente");
        parrafo.textContent = "No amigo del ambiente";
        document.body.style.background = "red";
    }else if((acumulador / 15) <= 50 ){
        console.log("Normal");
        parrafo.textContent = "Normal";
        document.body.style.background = "orange";
    }else{
        console.log("Amigable con el medio ambiente");
        parrafo.textContent = "Amigable con el medio ambiente";
        document.body.style.background = "green";
    }
    document.querySelector('div').appendChild(parrafo);

}



