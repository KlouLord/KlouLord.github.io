$(document).ready(function() {
//obtenemos el valor de los input

$('#adicionar').click(function() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var cedula = document.getElementById("cedula").value;
  var i = 1; //contador para asignar id al boton que borrara la fila
  var fila = '<tr id="row' + i + '"><td>' + nombre + '</td><td>' + apellido + '</td><td>' + cedula + '</td><td><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove">Quitar</button></td></tr>'; //esto seria lo que contendria la fila

  i++;

  $('#mytable tr:first').after(fila);
    $("#adicionados").text(""); //esta instruccion limpia el div adicioandos para que no se vayan acumulando
    var nFilas = $("#mytable tr").length;
    $("#adicionados").append(nFilas - 1);
    //le resto 1 para no contar la fila del header
    document.getElementById("apellido").value ="";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").focus();
  });
$(document).on('click', '.btn_remove', function() {
  var button_id = $(this).attr("id");
    //cuando da click obtenemos el id del boton
    $('#row' + button_id + '').remove(); //borra la fila
    //limpia el para que vuelva a contar las filas de la tabla
    $("#adicionados").text("");
    var nFilas = $("#mytable tr").length;
    $("#adicionados").append(nFilas - 1);
  });
});
var tableToExcel = (function() {
     var uri = 'data:application/vnd.ms-excel;base64,',
       template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
       base64 = function(s) {
         return window.btoa(unescape(encodeURIComponent(s)))
       },
       format = function(s, c) {
         return s.replace(/{(\w+)}/g, function(m, p) {
           return c[p];
         })
       }
     return function(table, name) {
       if (!table.nodeType) table = document.getElementById(table)
       var ctx = {
         worksheet: name || 'Worksheet',
         table: table.innerHTML
       }
       window.location.href = uri + base64(format(template, ctx))
     }
   })()