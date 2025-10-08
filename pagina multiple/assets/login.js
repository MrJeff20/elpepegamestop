<!---#LOGICA DEL LOGIN----->
function logear(){
    let user =document.getElementById("usuario").value;
    let pass =document.getElementById("contraseña").value;

    if(user =="Juan"&&pass=="1"){

        window.location.href = 'index.html';
    }
    else{
        alert("Datos incorrectos, favor ingresar nuevamente.")
    }
}