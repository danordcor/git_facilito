
	jQuery(document).ready(function() {
		$('select').material_select();
		$(".button-collapse").sideNav();
		$('#modificar').hide();
		var n;
		db=openDatabase('mispass','0,1','parcial_1',5*1024*2014)
		var tabla = ["<table  class='striped'><caption><h2>Usuarios Registrados</h2></caption><thead><tr><th>Usuario</th><th>Contraseña</th><th>Descripcion</th><th>Id</th></tr></thead><tbody>"];
		db.transaction(function(t){
			t.executeSql("SELECT * FROM usuarios",[],function(tx, datos){
				var regs = datos.rows.length;
				for(var i=0;i<regs;i++){
					tabla.push("<tr><td>"
						+datos.rows.item(i).usuario+"</td><td>"
						+datos.rows.item(i).pass+"</td><td>"
						+datos.rows.item(i).descripcion+"</td><td> <input class='with-gap' name='eliminar' type='radio' id='opcionM" + i + "' value='" + datos.rows.item(i).id + "'/><label for='opcionM" + i + "'></label></p></td></tr>" );		}
				tabla.push("</tbody></table>");
				$('#ver').html(tabla.join(' '));
			});
		});
		$('#boton_eliminar').on("click",function(event) {
			if($('input[name="eliminar"]:checked').val() != undefined){
		    n = $('input[name="eliminar"]:checked').val();
			db.transaction(function(t){
				t.executeSql("DELETE FROM usuarios WHERE id = ?",[n],function(){
					$('form').submit();
				});
			});
		}else{
			alert("Es necesesario seleccionar un usuario")
		}
		});
		$('#boton_modificar').click(function(event) {

			if($('input[name="eliminar"]:checked').val() != undefined){
			n = $('input[name="eliminar"]:checked').val();			
			$('form#form_consulta').hide();
			$('#modificar').show('slow/400/fast', function() {});			
			db.transaction(function(t){
				t.executeSql("SELECT * FROM usuarios WHERE id = ?",[n],function(tx, datos){
					var regs = datos.rows.length;
					if(regs) {
						$('#usuario').val(datos.rows.item(0).usuario);
						$('#pass').val(datos.rows.item(0).pass);
						$('#descripcion').val(datos.rows.item(0).descripcion);
					}
				});
			})
            }
		});
		$('#reg').click(function(event) {
			db.transaction(function(t){		
				var usuario = $('#usuario').val();
				var pass = $('#pass').val();
				var descripcion = $('#descripcion').val();						
				t.executeSql("UPDATE usuarios SET usuario=?, pass=?, descripcion=? WHERE id=?",[usuario,pass,descripcion,n],null,function(err){
						alert(err.message);
				});
				
			});
			$('form').submit();
		});
		
		$('#cancel').click(function(event){
           $('form').submit();
		});
	});