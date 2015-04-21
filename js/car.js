var API_BASE_URL="http://localhost:8000/Car-api";
var num=1;
var element;
var resultado=document.getElementById("result");

var usernameCookie = getCookie("username");
var userpassCookie = getCookie("userpass");

console.log("nombre:"+usernameCookie+"password"+userpassCookie);
$.ajaxSetup
({
	headers: {'Authorization':"Basic"+ btoa(usernameCookie+':'+userpassCookie)}
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 


$("#panelholder").click(function (e)
{
	e.preventDefault();
	getPosicions(usernameCookie);
});



$("#get_last").click(function (e)
{
	e.preventDefault();
	getLast(usernameCookie);
});

$("#info-posicion1").click(function (e)
{
	e.preventDefault();
	
	element=document.getElementById("link-addM1").id;

	console.log("el elemento es:"+"#"+element);

	console.log("el valor element fuera de la funcion es" +element);




	getAction(element,1);

    

	 
});

$("#info-posicion2").click(function (e)
{
	e.preventDefault();
	
	element=document.getElementById("link-addM2").id;

	console.log("el elemento es:"+"#"+element);

	console.log("el valor element fuera de la funcion es" +element);




	getAction(element,2);

    

	 
});


$("#info-posicion3").click(function (e)
{
	e.preventDefault();
	
	element=document.getElementById("link-addM3").id;

	console.log("el elemento es:"+"#"+element);

	console.log("el valor element fuera de la funcion es" +element);




	getAction(element,3);

    

	 
});


$("#info-posicion4").click(function (e)
{
	e.preventDefault();
	
	element=document.getElementById("link-addM4").id;

	console.log("el elemento es:"+"#"+element);

	console.log("el valor element fuera de la funcion es" +element);




	getAction(element,4);

    

	 
});

$("#info-posicion5").click(function (e)
{
	e.preventDefault();
	
	element=document.getElementById("link-addM5").id;

	console.log("el elemento es:"+"#"+element);

	console.log("el valor element fuera de la funcion es" +element);




	getAction(element,5);

    

	 
});


 $("#get-opinions").click(function (e)
 {
 	e.preventDefault();
 	getopinions();
 	//document.getElementById("comments_result").style.display="block";

 });

 $("#update-opinion").click(function (e)
 {
 	e.preventDefault();
 	var newOpi=new Object();
 	var id=$("#InputID").val();
 	console.log(id);
 	newOpi.content=$("#Comment-Content").val();
 	window.alert($("#Comment-Content").val());
 	console.log(newOpi.content);

 	updateOpinion(newOpi,id);
 });

$("#show-input").click(function (e)
	{

 	setCookie('usernameCookie',' ',-1);
 	setCookie('userpassCookie',' ',-1);

 });

 $("#show-input").click(function (e)
 {

 	e.preventDefault();
 	document.getElementById('CommentUsername').style.display="block";
 	document.getElementById('CommentPrice').style.display="block";

 });

 $("#show-favoritos").click(function (e)
 {
 	e.preventDefault();
 	showfarotis();
 	//document.getElementById("comments_result").style.display="block";

 });


function showfarotis()
{
	$("#message-text").text('');
	var url= API_BASE_URL+'/favorito?username='+usernameCookie;
    $.ajax
    ({
    	url:url,
    	type:'GET',
    	crossDomain:true,
    	dataType:'json',
    }).done(function(data,status,jqxhr)
    {
   		var ops=data;
 		//console.log(pos);

        <!-- super importante pos.posiciones para poder pasar los datos -->

 		$.each(ops.favoritos,function(index,value)
 		{
 			//console.log("El valor de pos posiciones"+pos.posiciones)
 			var opins=value;
 			//console.log(value);
 			//console.log("El valor de value posiciones"+value.posiciones)

    	$('<h4> Descripcion:'+ value.descripcion+'    '+'<a href="#"><i class="fa fa-pencil-square-o"></i></a>'+'</h4>').appendTo($('#message-text'));
    	$('<p>').appendTo($('#message-text'));
    	$('<strong> Fecha:'+value.fecha+'</strong></br>').appendTo($('#message-text'));
    	$('<strong> Idfavorito:'+value.idfavorito+'</strong></br>').appendTo($('#message-text'));
    	$('<strong> Idposicion:'+value.idposicion+'</strong><br>').appendTo($('#message-text'));
    	$('</p>').appendTo($('#message-text'));
    	$('<li class="divider"></li>').appendTo($('#message-text'));
 		});

        //latlon=new google.maps.LatLng(lat,lon)
 		//var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here"});

    }).fail(function()
    {
    	alert("problemas");

    });
 }


 $("#post-opinion").click(function (e)
 {
 	e.preventDefault();
 	var newOpin=new Object();
 	    newOpin.id=$("#InputID").val();
 	    console.log(newOpin.id);
 	    newOpin.username=$("#InputUsername").val();
 	    console.log(newOpin.username);
 	    newOpin.content=$("#Comment-Content").val();
 	    console.log(newOpin.content);
 	    newOpin.price=$("#InputPrice").val();
 	    console.log(newOpin.price);

 	    postOpi(newOpin);

 });






function initialize() 
{
  mapholder=document.getElementById('mapholder')
	mapholder.style.height='600px';
	mapholder.style.width='600px';

	var myOptions=
	{
		zoom: 7,
        center: new google.maps.LatLng(41.385063900000,2.173403499999949400),
		mayTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	}

	var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
}



function getLast(name)
{
	var url= API_BASE_URL+'/posicion/last?username='+name;
	//console.log(url);


	//$("#last_result").text('');

    $.ajax
    ({
    	url:url,
    	type:'GET',
    	crossDomain:true,
    	dataType:'json',
    }).done(function(data,status,jqxhr)
    {
    	var pos=data;
    	//console.log(pos);
    	//console.log(pos.idposicion);

    	$("#panel1").text(pos.idposicion);
    	$('<h4> ID de la posicion:'+ pos.idposicion+'</h4>').appendTo($('#panel-idposicion'+i));
    	$('<p>').appendTo($('#panel-body'+i));
    	$('<strong> Latitude:'+pos.coordenadaX+'</strong></br>').appendTo($('#panel-coordenadasX'+i));
    	$('<strong> Longitude:'+pos.coordenadaY+'</strong></br>').appendTo($('#panel-coordenadasY'+i));
    	$('<strong> Descripcion:'+pos.descripcion+'</strong><br>').appendTo($('#panel-descripcion'+i));
    	$('<strong> Fecha:'+pos.fecha+'</strong></br>').appendTo($('#panel-fecha'+i));
    	$('</p>').appendTo($('#panel-body'+i));
    }).fail(function()
    {
    	$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($('#panel-body'+i));

    });
 }


window.document.getElementById('panelholder').addEventListener('load',getPosicions);

 function getPosicions(usernameCookie)
 {
 	var url=API_BASE_URL+'/posicion?username='+usernameCookie+'&'+'pag=1';
 	//console.log(url);

 	$.ajax
 	({
 		url:url,
 		type:'GET',
 		crossDomain:true,
 		dataType:'json',
 	}).done(function(data,status,jqxhr)
 	
 	{
 		var pos=data;
 		//console.log(pos);

        <!-- super importante pos.posiciones para poder pasar los datos -->

 		$.each(pos.posiciones,function(index,value)
 		{
 			//console.log("El valor de pos posiciones"+pos.posiciones)
 			var posi=value;
 			//console.log(value);
 			//console.log("El valor de value posiciones"+value.posiciones)

    	$('<h4> ID de la posicion:'+ value.idposicion+'</h4>').appendTo($('#panel-idposicion'+num));
    	//$('<p>').appendTo($('#panel-body'+num));
    	$('<strong> Latitude:'+value.coordenadaX+'</strong></br>').appendTo($('#panel-coordenadasX'+num));
    	$('<strong> Longitude:'+value.coordenadaY+'</strong></br>').appendTo($('#panel-coordenadasY'+num));
    	$('<strong> Descripcion:'+value.descripcion+'</strong><br>').appendTo($('#panel-descripcion'+num));
    	$('<strong> Fecha:'+value.fecha+'</strong></br>').appendTo($('#panel-fecha'+num));
    	//$('</p>').appendTo($('#panel-body'+num));
    	num=num+1;
 		});

        //latlon=new google.maps.LatLng(lat,lon)
 		//var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here"});

 	}).fail(function()
 	{
 		$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($("#posicion_result"));

 	});
 }




 function getAction(element,id)
 {

 	$("#"+element).click(function (e)	
    {
	 e.preventDefault();
	 
	 addMarker(id); // aqui paso el id de los panales

    });

 }


 function addMarker(id)
 {

 	//console.log("La coordenadaX es"+$("#panel-coordenadasX1").text());
 	//var element=document.getElementById("panel-coordenadasX1").id;
 	//console.log("La coordenadaX es:"+"#"+element);
 	var lati=$("#panel-coordenadasX"+id).text(); //Tiene que ser generica
    console.log("valor latitude:"+lati);
    var reslat=lati.split(":");
    console.log("valor split latitude:"+reslat);
    var splilat=reslat[1];
    console.log("valor split latitude:"+splilat);


    var longi=$("#panel-coordenadasY"+id).text(); //Tiene que ser generica
    console.log("valor longitude:"+longi);
    var reslong=longi.split(":");
    console.log("valor split longitude:"+reslong);
    var splilong=reslong[1];
    console.log("valor split longitude:"+splilong);

    lat=parseFloat(splilat);
    lon=parseFloat(splilong);
 	//lat=$("#panel-coordenadasX1").text());
    //lon=$("panel-coordenadasY1").text());
    latlon=new google.maps.LatLng(lat,lon);



    var myOptions=
	{
		zoom: 19,
        center: new google.maps.LatLng(lat,lon),
		mayTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	}

	var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);

    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here"});

 }


 function getopinions()
 {
 	$("#message-text2").text('');
 	var url=API_BASE_URL+'/opinion?username='+usernameCookie;
 	$.ajax
 	({
 		url:url,
 		type:'GET',
 		crossDomain:true,
 		dataType:'json',
 	}).done(function(data,status,jqxhr)
 	{
 		var ops=data;
 		//console.log(pos);

        <!-- super importante pos.posiciones para poder pasar los datos -->

 		$.each(ops.opiniones,function(index,value)
 		{
 			//console.log("El valor de pos posiciones"+pos.posiciones)
 			var opins=value;
 			//console.log(value);
 			//console.log("El valor de value posiciones"+value.posiciones)

    	$('<h4> Content:'+ value.content+'    '+'<a href="#comments-area"><i class="fa fa-pencil-square-o" data-dismiss="modal"></i></a>'+'</h4>').appendTo($('#message-text1'));
    	$('<p>').appendTo($('#message-text1'));
    	$('<strong> Fecha:'+value.fecha+'</strong></br>').appendTo($('#message-text1'));
    	$('<strong> Idopinion:'+value.idopinion+'</strong></br>').appendTo($('#message-text1'));
    	$('<strong> Idposicion:'+value.idposicion+'</strong><br>').appendTo($('#message-text1'));
    	$('</p>').appendTo($('#message-text1'));
    	$('<li class="divider"></li>').appendTo($('#message-text1'));
 		});

        //latlon=new google.maps.LatLng(lat,lon)
 		//var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here"});

 	}).fail(function()
 	{
 		$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($("#message-text"));

 	});
 }

 function updateOpinion(opinion,id)
 {
 	var url=API_BASE_URL+'/opinion/'+id;
 	var data=JSON.stringify(opinion);

 	$.ajax
 	({
 		
		headers: { 'Authorization': "Basic "+ btoa(usernameCookie+':'+userpassCookie)},
 		url:url,
 		type : 'PUT',
 		contentType: "application/vnd.Car.api.opinion+json",
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: 
		{
			404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Ha occurido un error</div>').appendTo($("#posicion_result"));}
		}

 	}).done(function(data,status,jqxhr)
 	{
 		alert("Datos actualizado");
 	}).fail(function() 
  	{
		alert("Ha ocurrido un error");
	});

 }

 function postOpi(opi)
 {
 	var url=API_BASE_URL+'/opinion';
 	var data=JSON.stringify(opi);
 	$.ajax
	({
		headers: { 'Authorization': "Basic "+ btoa(usernameCookie+':'+userpassCookie)},
		url : url,
		type : 'POST',
		contentType: "application/vnd.Car.api.opinion+json",
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) 
	{
		alert("Datos actualizado");
	}).fail(function()
	{
	    alert("Ha ocurrido un error");	
	});



 }






 google.maps.event.addDomListener(window, 'load', initialize);
































