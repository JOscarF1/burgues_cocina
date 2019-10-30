// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCZTfcGWvoLhtGWKm1JIxb-_wWCVipxiDo",
    authDomain: "reservacion-bc34e.firebaseapp.com",
    projectId: "reservacion-bc34e"
  });
  
  var db = firebase.firestore();

  //Capturar Fecha
  var dt = new Date();
	var month = dt.getMonth() + 1;
	var mes = "";
	if(month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9){
		mes = "0" + month;
	}else{
		mes = month;
	}
	var day = dt.getDate();
	var year = dt.getFullYear();
	var fecha_formato = year + "-" + mes + "-" + day
    console.log(fecha_formato);
    
    //Capturar hora
    var hora = dt.getHours();
	var minutos = dt.getMinutes();
	var segundos = dt.getSeconds();
	var hora_formato = hora + ":" + minutos + ":" + segundos;
	console.log(hora_formato);

  function ordenes(){
        var comida = document.getElementById('comida').value;
        var peso = document.getElementById('peso').value;
        var extra = document.getElementById('extra').value;
        var mesa = document.getElementById('mesa').value;
        var fecha =  document.getElementById('fecha').value;

        db.collection("Ordenes").add({
            comida: comida,
            peso: peso,
            extra: extra,
            hora: hora,
            mesa: mesa,
            fecha: fecha,
        })
        .then(function (docRef){
        console.log("Document weitten with ID: ", docRef.id);
            comida = document.getElementById('comida').value;
            peso = document.getElementById('peso').value;
            extra = document.getElementById('extra').value;
            hora = document.getElementById('hora').value;
            mesa = document.getElementById('mesa').value;
        })
        .catch(function(error){
            console.error("Error adding document: ", error);
        })
    
    }

  //Listar Órdenes
  /*
  var section = document.getElementById("panelitos");
  db.collection("Ordenes").onSnapshot((querySnapshot) => {
      section.innerHTML = "";
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().comida}`);
          section.innerHTML +=
          `
            <div class="col-md-4">
                <div class="panel panel-danger">
                    <div class="panel-heading"><b>${doc.data().mesa}</b>
                        <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
                    <div class="panel-body">
                        <p>Platillo: <b>${doc.data().comida}</b></p>
                        <p>Peso: <b>${doc.data().peso}</b></p>
                        <p>Extra: <b>${doc.data().extra}</b></p>
                        <center><button class="btn btn-md btn-warning" onclick="proceso('${doc.id}')">Proceso</button>
                        <button class="btn btn-md btn-success" my-5 > Listo </button></center>
                    </div>
                    <div class="panel-footer foot"><center><p>Tiempo: <b>${doc.data().hora}</b></p></center></div>
                </div>
          `
      });
});*/

//Cantidad de Ordenes
//contador global
var count = 0; //Contador de órdenes del día
var count1 = 0; //Contador de órdenes pendientes
var count2 = 0; //Contador de órdenes listas

//Ordenes del día
var cant_ordenes = document.getElementById("cant_ordenes");
db.collection("Ordenes").onSnapshot((querySnapshot) =>{
    cant_ordenes.innerHTML = "";
    count = 0;
    querySnapshot.forEach((doc) => {
        if(doc.data().fecha == fecha_formato){
            count = count + 1;
        }
        cant_ordenes.innerHTML = count;
    })
})

//Ordenes del día Pendientes
var cant_pendiente = document.getElementById("cant_pendiente");
db.collection("Ordenes").onSnapshot((querySnapshot) =>{
    cant_pendiente.innerHTML = "";
    count1 = 0;
    querySnapshot.forEach((doc) => {
        if(doc.data().fecha == fecha_formato){
            if(doc.data().estado == "pendiente"){
                count1 = count1 + 1;
            }
            
        }
        cant_pendiente.innerHTML = count1;
    })
})

//Ordenes del día Listas
var cant_cocinado = document.getElementById("cant_cocinado");
db.collection("Ordenes").onSnapshot((querySnapshot) =>{
    cant_cocinado.innerHTML = "";
    count2 = 0;
    querySnapshot.forEach((doc) => {
        if(doc.data().fecha == fecha_formato){
            if(doc.data().estado == "cocinado"){
                count2 = count2 + 1;
            }
            
        }
        cant_cocinado.innerHTML = count2;
    })
})


//Listar Ordenes
var ordenes_view = document.getElementById("panelitos");
var plat1 = "";
var plat2 = "";
var plat3 = "";
var plat4 = "";
var plat5 = "";
var cant_plat1 = "";
var cant_plat2 = "";
var cant_plat3 = "";
var cant_plat4 = "";
var cant_plat5 = "";
	db.collection("Ordenes").onSnapshot((querySnapshot) => {
		ordenes_view.innerHTML = "";
	    querySnapshot.forEach((doc) => {
	        if(doc.data().fecha == fecha_formato){
	        	if(doc.data().estado == "pendiente"){
	        		if(doc.data().platillo1 != ""){
	        			plat1 = doc.data().platillo1;
	        		}
	        		if(doc.data().cant_platillo1 != ""){
	        			cant_plat1 = "(" + doc.data().cant_platillo1 + ")";
	        		}
	        		if(doc.data().platillo2 != ""){
	        			plat2 = doc.data().platillo2;
	        		}
	        		if(doc.data().cant_platillo2 != ""){
	        			cant_plat2 = "(" + doc.data().cant_platillo2 + ")";
	        		}
	        		if(doc.data().platillo3 != ""){
	        			plat3 = doc.data().platillo3;
	        		}
	        		if(doc.data().cant_platillo3 != ""){
	        			cant_plat3 = "(" + doc.data().cant_platillo3 + ")";
	        		}
	        		if(doc.data().platillo4 != ""){
	        			plat4 = doc.data().platillo4;
	        		}
	        		if(doc.data().cant_platillo4 != ""){
	        			cant_plat4 = "(" + doc.data().cant_platillo4 + ")";
	        		}
	        		if(doc.data().platillo5 != ""){
	        			plat5 = doc.data().platillo5;
	        		}
	        		if(doc.data().cant_platillo5 != ""){
	        			cant_plat5 = "(" + doc.data().cant_platillo5 + ")";
	        		}
	        		ordenes_view.innerHTML +=`	
		    			<div class="col-md-4">
			                <div class="panel panel-danger">
			                    <div class="panel-heading"><b>${doc.data().mesa}</b>
			                        <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
			                    <div class="panel-body">
			                        <center><p style="font-size:18px; color: teal; text-decoration: underline teal;"><b>Orden</b></p></center>
			                        <p style="font-size:17px; color: black;"><b>${plat1} ${cant_plat1}</b></p>
			                        <p style="font-size:17px; color: black;"><b>${plat2} ${cant_plat2}</b></p>
			                        <p style="font-size:17px; color: black;"><b>${plat3} ${cant_plat3}</b></p>
			                        <p style="font-size:17px; color: black;"><b>${plat4} ${cant_plat4}</b></p>
                                    <p style="font-size:17px; color: black;"><b>${plat5} ${cant_plat5}</b></p>
                                    <center><p style="font-size:18px; color: teal; text-decoration: underline teal;"><b>Extra</b></p></center>
                                    <p style="font-size:17px; color: black;"><b>${doc.data().extra}</b></p>
			                    </div>
			                    <div class="panel-footer foot-process">
				                    <center>
                                        <p style="font-size:17px; color: red;"><b>${doc.data().hora}</b></p>
                                        <button type="button" class="btn btn-md btn-success" onclick="entregar_orden('${doc.id}')">Listo</button>
				                    </center>
								</div>
			                </div>
			            </div>
		    		`
	        	}
	        }
			plat1 = "";
			plat2 = "";
			plat3 = "";
			plat4 = "";
			plat5 = "";
			cant_plat1 = "";
			cant_plat2 = "";
			cant_plat3 = "";
			cant_plat4 = "";
			cant_plat5 = "";
	    });
	});

//---------------------------------------------------------------------------------------------------------------

//LISTA DE PRODUCTOS
function productos(){
    var nombre= document.getElementById('nombre').value;
    var cantidadI = document.getElementById('cantidadI').value;
    var restante = document.getElementById('restante').value;

    db.collection("Productos").add({
        nombre: nombre,
        cantidadI: cantidadI,
        restante: restante,
    })
    .then(function (docRef){
    console.log("Document weitten with ID: ", docRef.id);
        nombre = document.getElementById('nombre').value;
        cantidadI = document.getElementById('cantidadIl').value;
        restante = document.getElementById('restante').value;
    })
    .catch(function(error){
        console.error("Error adding document: ", error);
    })

}

//Listar Productos
/*
var tabla_productos = document.getElementById("tabla_productos");
db.collection("Productos").onSnapshot((querySnapshot) => {
    tabla_productos.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre_producto}`);
        document.getElementById('tabla_productos').innerHTML +=
        `
            <tr>
                <td><center><b>${doc.data().nombre}</b></center></td>
                <td><center>${doc.data().cantidadI}</center></td>
                <td><center><b>${doc.data().restante}</b></center></td>
                <td><center><button class="btn btn-md btn-danger" onclick="solicitar('${doc.id}')">Solicitar</button></center></td>
            </tr>
        `
    });
});
*/

//Borrar documentos
function eliminar(id){
    db.collection("Productos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Index



//-------------------CANTIDAD DE ORDENES----------------------------------------4


function entregar_orden(parametro_id){
	var washingtonRef = db.collection("Ordenes").doc(parametro_id);
   	return washingtonRef.update({
        estado: "cocinado",
	})
    .then(function () {
        alert("Datos Editados Exitosamente!!");
        console.log("Document successfully updated!");
        //console.log(id_modal);
        //location.reload();
        
    })
    .catch(function (error) {
                
        console.error("Error updating document: ", error);
    });
}