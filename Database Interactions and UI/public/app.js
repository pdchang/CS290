////Philip Chang - Week 9 - Database interactions and UI -- client sisde stuff

//add
document.getElementById("add").addEventListener("click", function(event){
  var req = new XMLHttpRequest();
  var route = "/insert";
  var payload = "name=" + document.getElementById("name").value + "&reps=" + document.getElementById("reps").value + "&weight=" + document.getElementById("weight").value + "&date=" + document.getElementById("date").value + "&lbs=" + document.getElementById("lbs").value;

  req.open("GET",route + "?" + payload, true);
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);

      var table = document.getElementById("table");
      var newRow = document.createElement("tr");


      var name = document.createElement("td");
      var reps = document.createElement("td");
      var weight = document.createElement("td");
      var date = document.createElement("td");
      var lbs = document.createElement("td");

      name.innerHTML = document.getElementById("name").value;
      table.appendChild(newRow).appendChild(name);

      reps.innerHTML = document.getElementById("reps").value;
      table.appendChild(newRow).appendChild(reps);

      weight.innerHTML = document.getElementById("weight").value;
      table.appendChild(newRow).appendChild(weight);

      date.innerHTML = document.getElementById("date").value;
      table.appendChild(newRow).appendChild(date);

      lbs.innerHTML = document.getElementById("lbs").value;
      table.appendChild(newRow).appendChild(lbs);

      var edit = document.createElement("td");
      var length = response.results.length - 1;
      console.log(length);
      var id = response.results[length].id;
      console.log(id);

      newRow.setAttribute("id", id + "row");

      var newform = document.createElement("form");
      newform.setAttribute("method", "get");
      newform.setAttribute("action", "./edit");
      var newInput = document.createElement("input");
      newInput.setAttribute("type", "hidden");
      newInput.setAttribute("name", "id");
      newInput.setAttribute("value", id) ;
      newform.appendChild(newInput);
      var button1 = document.createElement("button");
      button1.setAttribute("type", "submit");
      button1.textContent = "Edit";
      newform.appendChild(button1);
      edit.appendChild(newform);
      table.appendChild(newRow).appendChild(edit);

      var remove = document.createElement("td");


      var newform1 = document.createElement("form");
      newform1.setAttribute("method", "get");
      newform1.setAttribute("action", "./delete");
      var newInput1 = document.createElement("input");
      newInput1.setAttribute("type", "hidden");
      newInput1.setAttribute("name", "id");
      newInput1.setAttribute("value", id);
      newform1.appendChild(newInput1);
      var button2 = document.createElement("button");
      button2.setAttribute("type", "submit");
      button2.setAttribute("onClick", "deleteRow(id)")
      button2.textContent = "Delete";
      newform1.appendChild(button2);
      remove.appendChild(newform1);
      table.appendChild(newRow).appendChild(remove);



		}
		else {
	    	console.log('Error in network request: " + req.statusText');
		}

	});
	req.send(route + "?" + payload);
	event.preventDefault();
});

function deleteRow(id){

  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id="+ id, false);
  req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      loadtable(response);
    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  })
  req.send(null);
  event.preventDefault();

  //window.location.reload()
  //var table = document.getElementById("stuff");
/*  for (var i = 1; i < table.rows.length;i++){
    if ((i + "row") == document.getElementsByName(id + "row")){
      table.deleteRow(i);
    }
  }*/
}

function loadtable(response){
   var table = "<table><tr><th>Name</th><th>Reps</th><th>Weight</th><th>Date</th><th>lbs</th><th></th><th></th></tr>";
   for(var i=0; i < response.length; i++)
   {
        table += "<tr>";
        table += "<td>"+response[i].name   +"</td>";
	      table += "<td>"+response[i].reps   +"</td>";
        table += "<td>"+response[i].weight +"</td>";
        table += "<td>"+response[i].date   +"</td>";
        table += "<td>"+response[i].lbs    +"</td>";
	table += "<td><input type='button' name='id' value='Edit' onclick='window.location.href=\"/edit?id="+response[i].id+"\"'></td>";
	table += "<td><input type='button' name='id' value='Delete' onclick='deleteRow("+response[i].id+")'></td>";
        table += "</tr>";
   }
   table += "</table>";
   console.log(table);
   document.getElementById("stuff").innerHTML = table;
};
