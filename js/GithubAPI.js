var API_BASE_URL = "https://api.github.com";
var USERNAME = "crissn8";
var PASSWORD = "1234cris";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});
$("#button_get_repositorio").click(function(e) {
	e.preventDefault();
	getRepositorio($("#repository_name").val());
});

$("#button_list_repositorio").click(function(e) {
	e.preventDefault();
	ListarRepositorio();
});

$("#button_crear_repo").click(function(e){
	e.preventDefault();
	
	var newRepo = new Object();
	newRepo.name = $("#nombre_repositorio").val();
	newRepo.description = $("#description_new").val();
	newRepo.homepage = "https://github.com";
	
	createRepo(newRepo);
});

$("#button_Edit").click(function(e) {
	e.preventDefault();
	EditarRepo($("#respositorio_editar").val());
});

$("#button_editar_repo").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#nombre_editado").val()
	newRepo.description = $("#descripcion_editada").val()
	
	UpdateRepo(newRepo);
});

$("#button_deleteRepo").click(function(e){
	e.preventDefault();
	
	if($('#Repositorio_del').val() ==""){
		$('<div class="alert alert-info">Error! Inserta el nombre del Repositorio</div>').appendTo($("#Repositorio_del"));
	}else{
		BorrarRepo($("#Repositorio_del").val());
	
	}
});

$("#button_pagRepo").click(function(e){
	e.preventDefault();
	
	if($('#page').val() =="" || $('#per_page').val() ==""){
		$('<div class="alert alert-info">Error! Inserta un número </div>').appendTo($("#pag_repositorio"));
	}else{
		pagRepo($("#page").val(),$("#per_page").val() )
	
}

});	

	
function getRepositorio(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;

				$("#get_repo_result").text('');
				$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#get_repo_result'));
				$('<p>').appendTo($('#get_repo_result'));	
				$('<strong> Full_name: </strong> ' + repo.full_name + '<br>').appendTo($('#get_repo_result'));
				$('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
	});


}

function ListarRepositorio() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
	$("#get_repositorios").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
			var repositorios = data;
				
			$.each(repositorios, function(i,v){
				var repo = v;

				$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#get_repositorios'));
				$('<p>').appendTo($('#get_repositorios'));	
				$('<strong> Full_name: </strong> ' + repo.full_name + '<br>').appendTo($('#get_repositorios'));
				$('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#get_repositorios'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#get_repositorios'));
				$('</p>').appendTo($('#get_repositorios'));
				});

		}).fail(function() {
		$("#get_repositorios").text("No repositories.");
	});


}

function createRepo(repositorio) {
	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repositorio);

	$("#crate_repo").text('');
 
	$.ajax({
        url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#crate_repo"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#crate_repo"));
	});
}
function EditarRepo(repository_name) {

	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#update_repositorio").text('');
	
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		
				var repo = data;
				

				$("#update_repositorio").text('');
				$("#nombre_editado").val(repo.name);
				$("#descripcion_editada").val(repo.description);

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_repositorio"));
	});

}

function UpdateRepo(repositorio){

var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repositorio.name;
	var data = JSON.stringify(repositorio);

	$("#update_repositorio").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_repositorio"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_repositorio"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_repositorio"));
	});

}

function BorrarRepo(id_repo) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + id_repo;
	$("#borrar_repo").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType: 'json',
		}).done(function (data, status, jqxhr) {
			$('<div class="alert alert-success"> <strong>Ok!</strong> Repositorio borrado!!</div>').appendTo($("#borrar_repo"));
		}).fail(function (jqXHR, textStatus) {
			$('<div class="alert alert-danger"> <strong>Oh!</strong> no se ha podido borrar! </div>').appendTo($("#borrar_repo"));
		
	});
		
		
}

function pagRepo(page, per_page){

	var url = API_BASE_URL + '/users/' + USERNAME + '/repos?page=' + page + '&per_page=' + per_page;
	console.log(url);
	$("#pag_repositorio").text('');
	
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		
				var repositorio = data;
							
			$.each(repositorio, function(i,v){
				var repo = v;
				
				$('<p>').appendTo($('#pag_repositorio'));	
				$('<h4> ' + repo.name + '</h4>').appendTo($('#pag_repositorio'));
				$('<strong> ID: ' + repo.id + '</h4>').appendTo($('#pag_repositorio'));
				$('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#pag_repositorio'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#pag_repositorio'));
				$('</p>').appendTo($('#pag_repositorio'));
				});

		}).fail(function() {
		$("#pag_repositorio").text("No hay repositorios.");
	});

}