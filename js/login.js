var API_BASE_URL = "http://localhost:8000/Car-api";
var USERNAME;
var PASSWORD;

$("#login").click(function(e) {
	e.preventDefault();
	if($("#username_id").val() == "" || $("#password_id").val() == "")
	{
		if($("#username_id").val() == "")
		{
			document.getElementById('username_id').style.background='#F6B5B5';
			$('#username_id').attr('placeholder','Ponga un usuario');
		}
		if($("#password_id").val() == "")
		{
			document.getElementById('password_id').style.background='#F6B5B5';
			$('#password_id').attr('placeholder','Pon una contraseña');
		}
	}
	else
	{
		var login = new Object();
		login.username = $("#username_id").val();
		login.userpass = $("#password_id").val();
		getuserpass(login);
	}
});

function getuserpass(login)
{
	console.log(login);
	var url = API_BASE_URL + '/users/login';
	var data = JSON.stringify(login);

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/vnd.Car.api.user+json',
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		var inf = data;
				if(inf.loginSuccessful!= true){
				alert("Usuario y/o contraseña erróneo. Por favor intentelo de nuevo.");		
				}
				else{
					document.cookie = "username=" + $("#username_id").val();
					document.cookie = "userpass=" + $("#password_id").val();
					console.log(inf.loginSuccessful);
					window.location = "main.html"
					}

  	}).fail(function() {
		alert("Problemas de conectividad. Por favor intentelo de nuevo.");
	});
}

function CrearCuenta (user){
	var url = API_BASE_URL + '/users';
	var data = JSON.stringify(user);
	$.ajax({
		url : url,
		type : 'POST',
		contentType: "application/vnd.Car.api.user+json",
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		var inf = data;
		alert("Creado satisfactoriamente el usuario, tu nombre es:"+inf.username+" y tu pass es: "+inf.pass);			
  	}).fail(function() {
		alert("problemas");
	});
}



$("#registrarse_boton").click(function(e) {
	e.preventDefault();
	if( $("#password_nuevo_id").val() == "" || $("#password_nuevo_id2").val() == "" || $("#email_id").val() == "" || $("#email_id2").val() == "" || $("#username_nuevo_id").val() == "")
	{
		if($("#password_nuevo_id").val() == "")
			{
				document.getElementById('password_nuevo_id').style.background='#F6B5B5';
				$('#password_nuevo_id').attr('placeholder','RELLENE EL CAMPO');
			}
		if($("#password_nuevo_id2").val() == "")
			{
				document.getElementById('password_nuevo_id2').style.background='#F6B5B5';
				$('#password_nuevo_id2').attr('placeholder','RELLENE EL CAMPO');
			}
		if($("#email_id").val() == "")
			{
				document.getElementById('email_id').style.background='#F6B5B5';
				$('#email_id').attr('placeholder','RELLENE EL CAMPO');
			}
		if($("#email_id2").val() == "")
			{
				document.getElementById('email_id2').style.background='#F6B5B5';
				$('#email_id2').attr('placeholder','RELLENE EL CAMPO');
			}
		if($("#username_nuevo_id").val() == "")
			{
				document.getElementById('username_nuevo_id').style.background='#F6B5B5';
				$('#username_nuevo_id').attr('placeholder','RELLENE EL CAMPO');
			}
	}
	else{
	if( $("#password_nuevo_id").val() == $("#password_nuevo_id2").val() && $("#email_id").val() == $("#email_id2").val() )
	    {
			var crear = new Object();
			crear.username =  $("#username_nuevo_id").val();
			crear.userpass = $("#password_nuevo_id").val();
			crear.email = $("#email_id").val();			
			CrearCuenta(crear);		
	    }
	     else{
			alert("Los campos no coinciden");
	         }
	}
});