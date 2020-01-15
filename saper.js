var n = 81; // liczba pól
var k = 12; // liczba bomb
var click_qty = 0; // licznik kliknięć
var countdown = n-k; // liczba klknięć bez trafienia bomby
	
function restart()				// funkcja rozmieszczająca kafelki pola
{
	click_qty=0;
	document.getElementById("counter").innerHTML=(countdown+" pól do końca");
	var m = n;							// licznik tylko do losowania
	var	bomb_index = new Array(k);		// utworzenie tablicy do przechowania indeksów bomb o rozmiarze równym liczbie bomb
	var draw = new Array(m);			// utworzenie tablicy z której losujemy indeksy o rozmiarze liczby pól
	
/*losowanie pól z bombami*/
	for (i=0; i<m; i++) 				// wypełnianie tablicy draw liczbami 0,1,2...n-1
	{
		draw[i] = i;
	}
	for (var i=0; i<k; i++) 				// losowanie k indeksów bomb
	{	
		var r = Math.round(Math.random()*(m-1)); // tworzenie losowego indeksu pomiędzy 0 i 80 czyli m-1
		bomb_index[i]=draw[r];		//uzupełnianie tablicy indeksów bomb o wylosowaną liczbę
		draw[r] = draw[m-1]; // przeniesienia ostatniego elementu do miejsca z którego wylosowano, żeby nie było powtórzeń
		m--;					//wywalenie ostatniego elementu tablicy
	}
		
/*uzupełnianie pola klockami z bombami i bez*/
	var field_squares="";			//pusty element
	for(i=0; i<n; i++)
	{	if(bomb_index.includes(i))	//jeżeli i jest indeksem pola z bombą
		{
			field_squares=field_squares+'<div class="square_bomb" id="k_n'+i+'" onclick="explosion(this.id)" onmousedown="which_button(event, this.id)"></div>'; //tworzenie w pętli divów
		}
		else					//jeżeli i nie jest indeksem pola z bombą
		{
			field_squares=field_squares+'<div class="square_empty" id="k_n'+i+'" onclick="bomb_closeness(this.id)" onmousedown="which_button(event, this.id)"></div>';
		}
	}
	
/*uzupełnienie pola klockami*/
	document.getElementById("field").innerHTML = field_squares; // wyświetlanie divów w polu
	
}

/*co sie stanie gdy trafi się na bombę*/
function explosion(clicked_id)				
{
	alert("Trafiłeś na bombę!"); 
	document.getElementById(clicked_id).className ="square_exploded"; // przypisanie klikniętemu elementowi klasy
	setTimeout(function() {restart()}, 1000);			//opóźnienie restartu
}
	
/*funkcja licząca ile obok jest bomb i dla klocków bez bomb*/	
function bomb_closeness(current_id)
{
	if(document.getElementById(current_id).innerHTML=="")
	{
		document.getElementById(current_id).className="square_disarmed";
		click_qty++;
		document.getElementById("counter").innerHTML=(countdown-click_qty+" pól do końca");
		var calc_id = Number(current_id.slice(3));  //wyciecie z id trzech pierwszych znaków, czyli k_n
		var bomb_counter = 0;
		var id_1 = calc_id-10;		
		var id_2 = calc_id-9;		//utworzenie zmiennych przechowujących id 8 sąsiednich pól
		var id_3 = calc_id-8;
		var id_4 = calc_id-1;
		var id_5 = calc_id+1;
		var id_6 = calc_id+8;
		var id_7 = calc_id+9;
		var id_8 = calc_id+10;
		
		var neighbors_index = [id_1, id_2, id_3, id_4, id_5, id_6, id_7, id_8]; //stablicowanie zmiennych 
		
		for(i=0; i<8; i++)	//pętla do zwiększania licznika bomb
		{
			var loop_id = neighbors_index[i]; //zmienna przyjmująca kolejno wartości id sąsiednich pól do klikniętego
			
			if (loop_id > 80 || loop_id < 0) {continue}; //żeby nie łapało nieistniejących id za krawędziami pola
			if (calc_id%9==0 && i==0) {continue};
			if (calc_id%9==0 && i==3) {continue};
			if (calc_id%9==0 && i==5) {continue}; // żeby dla elementu przy lewej krawędzi nie brało pod uwagę bomb przy prawej krawędzi
			if (calc_id%9==8 && i==2) {continue};
			if (calc_id%9==8 && i==4) {continue};
			if (calc_id%9==8 && i==7) {continue}; // żeby dla elementu przy prawej krawędzi nie brało pod uwagę bomb przy lewej krawędzi
			if(document.getElementById("k_n"+loop_id).classList.contains("square_bomb")) bomb_counter++;
		}

		document.getElementById(current_id).innerHTML=bomb_counter;
	}
	
/*wygrana*/

	if (click_qty==countdown) {alert("Wygrałeś! Gratulacje!")};
}

function which_button(event, clicked_id) 
{
	var e_btn = event.button;
	var element=document.getElementById(clicked_id);
	if (e_btn == 1 && element.classList.contains("square_checked")) {element.classList.remove("square_checked")}
	else if (e_btn == 1) {element.classList.add("square_checked")};				
}
	
	
	
	
	
	
	
	
	
	
	