document.addEventListener('DOMContentLoaded',() =>{
	let sub = document.getElementsByClassName('btn');
	let form = sub[0].parentElement;
	let main = form.parentElement;
	var url = "superheroes.php";
	var dta;
	//console.log(sub);

	sub[0].addEventListener('click', () => {
		let alias = document.getElementById("alias").value;
		let myText = document.createTextNode('');
		let ans = document.createElement('div');
		var check = 0;
		ans.id = 'result';
		alias = sanitizeString(alias);
		
		fetch("superheroes.php" ).then(response => {
					if (response.ok) {
						return response.text()
					} 
					else {
						return Promise.reject('something went wrong!')
					}
				})
				.then(data => {
					
					data = data.split('brk');
					if( alias  != ""){
			let ar = data[1].split(":::");
			for (i in ar){
				if (ar[i].includes(alias)){
					let ar2 = ar[i].split("//");
					console.log(ar2);
					var hder2 = document.createElement('h2');
					hder2.innerHTML = ar2[1];
					var hder3 = document.createElement('h3');
					hder3.innerHTML = "A.K.A "+ar2[0];
					var bio = document.createTextNode(ar2[2]);
					check=1;
				}
			}
			if (check == 1){
				ans.appendChild(hder2);
				ans.appendChild(hder3);
				ans.appendChild(bio);
				
			}
			else{
				var nada = document.createTextNode("SUPERHERO NOT FOUND");
				ans.appendChild(nada);
			}
			
		}
		else{
			let myText = document.createTextNode('' +data[0].replace( /(<([^>]+)>)/ig,'').split("  "));
					console.log(myText);
					ans.appendChild(myText);
		}
					//alert (data);
				})
				.catch(error => console.log('There was an error: ' + error));
		
		
			
		
		
		main.appendChild(ans);
    });
	
	function sanitizeString(str){
		str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim," ");
		console.log(str)
		return str;
	}
		

	function handleForm(event) { event.preventDefault(); }
	form.addEventListener('submit', handleForm);

});

/*
	search.addEventListener('click',()=>{
		httpRequest.onreadystatechange = getXml;
        httpRequest.open('GET', url);
        httpRequest.send();
		const httpRequest = new XMLHttpRequest();
		
		var response = httpRequest.responseXML;
		alert(response);
	});

	function getXml() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
		  if (httpRequest.status === 200) {
			// Note that we use responseXML instead of responseText
			// when we are expecting XML data.
			var response = httpRequest.responseXML;
			var results = document.querySelector('#results');
			var people = response.getElementsByTagName('person');

			var list = document.createElement('ul');
			results.appendChild(list);
			for (var x = 0; x < people.length; x++) {
				var person = document.createElement('li');
				var text = document.createTextNode(people[x].children[0].childNodes[0].nodeValue);
				person.appendChild(text)
				list.appendChild(person);
			}
		  } else {
			alert('There was a problem with the request.');
		  }
		}
	}
	
	
	
	<?php foreach ($superheroes as $superhero): ?>
			if (a === $superhero['alias'] || a === $superhero['name']) {
				return $superhero;
			}
			
		<?php endforeach; ?>
*/

