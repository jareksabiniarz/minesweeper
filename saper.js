var n = 81; 			// number of tiles
var k = 12; 			// number of bombs
var click_qty = 0;		// counter of disarms
var countdown = n-k; 	// counter of disarms without kaboom
	
function restart()		//tiles locating
{
	click_qty=0;
	document.getElementById("counter").innerHTML=(countdown+" fields without bomb");
	var m = n;							// counter for draw
	var	bomb_index = new Array(k);		// array with size equal to number of bombs
	var draw = new Array(m);			// array for drawing indexes
	
/*drawing indexes for armed tiles*/
	for (i=0; i<m; i++) 				// filling array by indexes 0,1,2...n-1
	{
		draw[i] = i;
	}
	for (var i=0; i<k; i++) 			// drawing k indexes of bombed tiles
	{	
		var r = Math.round(Math.random()*(m-1)); // random index between 0 and 80, this is m-1
		bomb_index[i]=draw[r];		//adding drawed number to array
		draw[r] = draw[m-1]; 		//to avoid redundation the last element from array replaces just drawed element
		m--;						//and is removed from the last position
	}
		
/*filling the game field by tiles with and without bombs*/
	var field_squares="";				//empty element
	for(i=0; i<n; i++)
	{	if(bomb_index[0]==i||bomb_index[1]==i||bomb_index[2]==i||bomb_index[3]==i||bomb_index[4]==i||bomb_index[5]==i||bomb_index[6]==i||bomb_index[7]==i||bomb_index[8]==i||bomb_index[9]==i||bomb_index[10]==i||bomb_index[11]==i)	//if i is the bomb tile index
		{
			field_squares=field_squares+'<div class="square_bomb" id="k_n'+i+'" onclick="explosion(this.id)" onmousedown="which_button(event, this.id)"></div>'; //manufacturing of divs
		}
		else					//if i is not bombed tile
		{
			field_squares=field_squares+'<div class="square_empty" id="k_n'+i+'" onclick="bomb_closeness(this.id)" onmousedown="which_button(event, this.id)"></div>';
		}
	}
	document.getElementById("field").innerHTML = field_squares; 
	
}

/*when you explode*/
function explosion(clicked_id)				
{
	alert("Ka-boom!"); 
	document.getElementById(clicked_id).className ="square_exploded"; // adding class to clicked tile
	setTimeout(function() {restart()}, 1000);			//delay of restart
}
	
/*counting how many bombs coincide to clicked tile*/	
function bomb_closeness(current_id)
{
	if(document.getElementById(current_id).innerHTML=="")
	{
		document.getElementById(current_id).className="square_disarmed";
		click_qty++;
		document.getElementById("counter").innerHTML=(countdown-click_qty+" fields without bomb");
		var calc_id = Number(current_id.slice(3));  //removing thre fisrt signs from id, this is k_n
		var bomb_counter = 0;
		var id_1 = calc_id-10;		
		var id_2 = calc_id-9;		//variables storing indexes of 8 nearest fields
		var id_3 = calc_id-8;
		var id_4 = calc_id-1;
		var id_5 = calc_id+1;
		var id_6 = calc_id+8;
		var id_7 = calc_id+9;
		var id_8 = calc_id+10;
		
		var neighbors_index = [id_1, id_2, id_3, id_4, id_5, id_6, id_7, id_8]; //variables as array
		
		for(i=0; i<8; i++)	//increasing bomb counter
		{
			var loop_id = neighbors_index[i]; //variable receiving ids of neighbours
			
			if (loop_id > 80 || loop_id < 0) {continue}; 		//to avoid non-existing tiles when we are near edge and there are no neighbours
			if (calc_id%9==0 && i==0) {continue};
			if (calc_id%9==0 && i==3) {continue};
			if (calc_id%9==0 && i==5) {continue}; 				
			if (calc_id%9==8 && i==2) {continue};
			if (calc_id%9==8 && i==4) {continue};
			if (calc_id%9==8 && i==7) {continue}; 				
			if(document.getElementById("k_n"+loop_id).classList.contains("square_bomb")) bomb_counter++;
		}

		document.getElementById(current_id).innerHTML=bomb_counter;
	}
	
/*win*/

	if (click_qty==countdown) {alert("You won!")};
}

function which_button(event, clicked_id) 
{
	var e_btn = event.button;
	var element=document.getElementById(clicked_id);
	if (e_btn == 1 && element.classList.contains("square_checked")) {element.classList.remove("square_checked")}
	else if (e_btn == 1) {element.classList.add("square_checked")};				
}
	
	
	
	
	
	
	
	
	
	
	