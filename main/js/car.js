var API_BASE_URL="http://localhost:8000/Car-api";
var name ="yifei";


var resultado=document.getElementById("result");


$("#posicion").click(function(e)
{
	e.preventDefault();
	getPosicion();
});




$("#post_posicion").click(function (e)
{
	e.preventDefault();

	var newposicion = new Object();

	newposicion.username="yifei";
	newposicion.coordenadaX=lat;
	newposicion.coordenadaY=lon;
	console.log(newposicion.coordenadaX);
	console.log(newposicion.coordenadaY);
	newposicion.descripcion="Esto es una prueba desde cliente web";
	createPosicion(newposicion);

});

$("#get_last").click(function (e)
{
	e.preventDefault();
	getLast(name);
});





function getPosicion()
{
	
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
	else
	{
		resultado.innerHTML="El navegador no soporta el Geolocalizacion";

	}

}

function showPosition(position)
{
	lat=position.coords.latitude;
	lon=position.coords.longitude;
	$("#coordenadasX").text(lat+",");
	$("#coordenadasY").text(lon);

	latlon=new google.maps.LatLng(lat,lon)
	mapholder=document.getElementById('mapholder')
	mapholder.style.height='500px';
	mapholder.style.width='500px';

	var myOptions=
	{
		center:latlon,zoom:14,
		mayTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	}

	var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
	var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here"});
}

function showError(error)
{
	switch(error.code)
	{
		case error.PERMISSION_DENIED:
		resultado.innerHTML="El usuario no ha aceptado la petition de Geolocalizacion"
		break;
		case error.POSITION_UNAVAILABLE:
		resultado.innerHTML="La localizacion no esta disponible"
		break;
		case error.TIMEOUT:
		resultado.innerHTML="La petition de Geolocalizacion no ha podido establecer por TIME OUT"
		break;
		case error.UNKNOW_ERROR:
		resultado.innerHTML="Ha ocurrido un error desconocido"
		break;

	}
}





function createPosicion(posicion)
{
	var url=API_BASE_URL+'/posicion';
	var data=JSON.stringify(posicion);

	$("#posicion_result").text('');

	$.ajax
	({

		url:url,
		type:'POST',
		contentType: "application/vnd.Car_api.posicion+json",
		crossDomain:true,
		dataType:'json',
		data:data,
	}).done(function(data,status,jqxhr)
	{
		$('<div class="alert alert-success"> <strong>Ok!</strong> Posicion enviado</div>').appendTo($("#posicion_result"));	
	}).fail(function()
	{
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($("#posicion_result"));	
	});
}



function getLast(name)
{
	var url= API_BASE_URL+'/posicion/last?username='+name;
	console.log(url);


	$("#last_result").text('');

    $.ajax
    ({
    	url:url,
    	type:'GET',
    	crossDomain:true,
    	dataType:'json',
    }).done(function(data,status,jqxhr)
    {
    	var pos=data;
    	console.log(pos);
    	console.log(pos.idposicion);
    	$('<h4> ID de la posicion:'+ pos.idposicion+'</h4>').appendTo($('#last_result'));
    	$('<p>').appendTo($('#last_result'));
    	$('<strong> Latitude:'+pos.coordenadaX+'</strong></br>').appendTo($('#last_result'));
    	$('<strong> Longitude:'+pos.coordenadaY+'</strong></br>').appendTo($('#last_result'));
    	$('<strong> Descripcion:'+pos.descripcion+'</strong><br>').appendTo($('#last_result'));
    	$('<strong> Fecha:'+pos.fecha+'</strong></br>').appendTo($('#last_result'));
    	$('</p>').appendTo($('#last_result'));
    }).fail(function()
    {
    	$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($("#last_result"));

    });
 }































