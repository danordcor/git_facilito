jQuery(document).ready(function() {
		$('select').material_select();
		$(".button-collapse").sideNav();
	if(window.openDatabase){
    db=openDatabase('mispass','0,1','parcial_1',5*1024*2014)

    }else{
      alert("no");
    };
    db.transaction(function(t){
    t.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT,usuario VARCHAR(30),pass VARCHAR(30), descripcion VARCHAR(50) )");
    },function(er){
	 console.log(er.message);
    },function(){
	
    });
	var tabla = ["<table class='striped' border='1' id='tblTabla' width='100%' ><thead><tr><th>USUARIO</th><th>PASS</th><th>DESCRIPCION</th></tr></thead><tbody>"];
	
		db.transaction(function(t){
		t.executeSql("SELECT * FROM usuarios",[],function(tx, datos){
        var regs = datos.rows.length;
        for(var i=0;i<regs;i++){
            tabla.push("<tr style='display: table-row;'><td>"+datos.rows.item(i).usuario+"</td><td>"+datos.rows.item(i).pass+"</td><td>"+datos.rows.item(i).descripcion+"</td></tr>");
        }
            if (datos.rows.length==0){
                tabla.push("<tr style='display: table-row;'><td></td><td>No se encontraron Registros</td></tr>");
            }
                tabla.push("</tbody><tfoot><tr><td colspan='3'> Listado de Usuarios.</td></tr></tfoot></table>");
                  $('#resultados_seleccion').html(tabla.join(' '));
         });//executeSqlfin

		},function(err){
			alert(err.message);
		});

	$('#reg').click(function () {

				var usuario = $('#usuario').val();
				var pass = $('#pass').val();
				var descripcion = $('#descripcion').val();
                alert("se añadira usuario: "+usuario+" contraseña: "+pass);

				if(usuario!=="" && pass!=="" && descripcion!==""  ) {
						db.transaction(function(t){
						t.executeSql("INSERT INTO usuarios (usuario,pass,descripcion) VALUES(?,?,?)",
							[usuario,pass,descripcion]);
					},function(err){
						alert(err.message);
					},function(){
						console.log("agregado corectamnte");
					});
				}else{
					alert("Se Nesecita ingresar todos los datos")
				}
});
	
});




