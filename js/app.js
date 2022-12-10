// crear los años
const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max -11;
const nac = document.querySelector('#marca');
const basic = document.querySelector('.basic');
const complete = document.querySelector('.complete');
const UTV = 5000;
const UTClass = 1000;
const finalDiv = document.querySelector('#resultado');
const cotizador = document.querySelector('#buttonSend');
const formCotizar = document.querySelector('#cotizar-seguro');


eventsListeners();

function eventsListeners () {
    cotizador.addEventListener('click', sendingInfo);
}

yearCreator();

function yearCreator() {
    for(let i = max; i >  min; i--) {
        const option =  document.createElement('option');
        option.value = i;
        option.innerText = i;
        document.querySelector('#year').appendChild(option);
    }
}

function Seguro(anio, cotizacion, clase) {
    this.anio = anio;
    this.cotizacion = cotizacion;
    this.clase = clase;
}


function TipoSeguro(nacionalidad, anio, cotizacion, clase) {
    Seguro.call(this, anio, cotizacion, clase);
    this.nacionalidad = nacionalidad;
}


//OBJECTS
let ensurance = null;


nac.addEventListener('change', ()=> {

    if(nac.value == "1") {
        ensurance = new TipoSeguro("Americano", 2022, (UTV + 2150), "Basic");
        console.log(ensurance);
    } else if (nac.value == "2") {            
        ensurance = new TipoSeguro("Asiatico", 2022 ,(UTV + 1100), "Basic");
    } else if (nac.value == "3") {
        ensurance = new TipoSeguro("Europeo", 2022, (UTV + 3340), "Basic");
    }
    ensurance.ensuranceType();
    removeError();
});


TipoSeguro.prototype.ensuranceType = function() {
    
    complete.addEventListener("change", ()=> {
        ensurance.clase = "Complete";
        ensurance.cotizacion = ensurance.cotizacion + (UTClass * 0.16);
    });

    basic.addEventListener("change", ()=> {
        ensurance.clase = "Basic";
        ensurance.cotizacion = ensurance.cotizacion - (UTClass * 0.16);
    });
    console.log(ensurance);
}

TipoSeguro.prototype.ensuranceYear = function() {
    newYear = document.querySelector('#year');
    newYear.addEventListener('change', ()=> {
        ensurance.anio = newYear.value;
    })
    for(let i = max; i >  min; i--){
        if(i >= 2019 && i == ensurance.anio) {
            let yearCost = i * 0.45;
            ensurance.cotizacion = ensurance.cotizacion + yearCost;
        }else if(i < 2019 && i >= 2016 && i == ensurance.anio) {
            let yearCost2 = i * 0.25;
            ensurance.cotizacion = ensurance.cotizacion + yearCost2;
        } else if (i < 2016 && i == ensurance.anio) {
            let yearCost3 = i * 0.15;
            ensurance.cotizacion = ensurance.cotizacion + yearCost3;
        }
    }

}

/* Function sends info and puts green box ------------------------------------------------------*/
function sendingInfo (e) {
    e.preventDefault();
    ensurance.ensuranceYear();
    if (nac.value == 0) {
        return error();
    }
    cotizador.style.display = "none";
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'flex';

    const enviado = document.createElement('div');
    const sendedP = document.createElement('p');
    const sendedP2 = document.createElement('p');
    sendedP.innerText = "Tu cotizacion"
    sendedP.classList = "header"; 
    sendedP2.innerHTML = "Marca: " + ensurance.nacionalidad + "<br>" + "Año: " + ensurance.anio + "<br>" +  "Tipo: " + ensurance.clase + "<br>" + "Precio final: $" + ensurance.cotizacion;
    enviado.append(sendedP);
    enviado.append(sendedP2);

         // Hide Spinner y show 'sent'
         setTimeout( () => {
            spinner.style.display = 'none';
            finalDiv.append(enviado);
  
            setTimeout(() =>  {
                enviado.remove();
                formCotizar.reset();
                resetApp();
           }, 7000);
      }, 2000);
}

function error() {
    if (document.querySelector('.error')) {
        return null;
    } else {
        const error = document.createElement('div');
        error.classList = 'error';
        error.innerText = "Faltan seleccionar Marca";
        formCotizar.append(error);
    }
}

function resetApp () {
    cotizador.style.display = "block";
    removeError();
}

function removeError() {
    if(document.querySelector('.error')){
        document.querySelector('.error').remove();
    } 
}
