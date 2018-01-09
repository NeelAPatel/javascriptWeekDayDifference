//For Adobe PDF

// get the End and Start date values
var dateEnd = this.getField("End Date").value;
var dateStart = this.getField("Start Date").value;

// clear  displayed result | event = current field in adobe pdf
event.value = "";

// convert date strings to objects
var oEnd = util.scand("m/d/yyyy H:MM:SS", dateEnd + " 0:00:00");
var oStart =util.scand("m/d/yyyy H:MM:SS", dateStart + " 0:00:00");

// convert into days since epoch date
var nEnd = Math.floor(Number(oEnd) / (1000 * 60 * 60 * 24));
var nStart = Math.floor(Number(oStart) / (1000 * 60 * 60 * 24));

/*
	nEnd and nStart allow us to compare the two dates to make sure that End date is 
	ALWAYS after start date
*/

if ( nEnd >= nStart){
	// compute number of days only if there are values for both dates
	if(dateEnd != "" & dateStart != '') {

		//technically i dont need to do this again.. 
		// convert date strings to objects
		var oEnd = util.scand("m/d/yyyy H:MM:SS", dateEnd + " 0:00:00");
		var oStart =util.scand("m/d/yyyy H:MM:SS", dateStart + " 0:00:00");
		
		// convert into days since epoch date
		var nEnd = Math.floor(Number(oEnd) / (1000 * 60 * 60 * 24));
		var nStart = Math.floor(Number(oStart) / (1000 * 60 * 60 * 24));
		
		
		//This gives us the TOTAL DAYS that occur from Start to End, inclusive of end date.
		var totalDays = nEnd - nStart + 1;


		//Calculating # of Weekdays
		var counter = 1;
		var weekDays = 0;
		var d = new Date(this.getField("Start Date").value);
		for (counter = 1; counter <= totalDays ; counter++){
			var dayNum = -1;
			if (!isNaN(d.getDay())){	
				switch (d.getDay())
				{
					case 0: 
						dayNum = 0; //Sun
					break;
					case 1: 
						dayNum = 1; //Mon
					break;
					case 2: 
						dayNum = 2; //Tue
					break;
					case 3: 
						dayNum = 3; //Wed
					break;
					case 4: 
						dayNum = 4; //Thurs
					break;
					case 5: 
						dayNum = 5; //Fri
					break;
					case 6: 
						dayNum = 6; //Sat
					break;
					default:
						dayNum = -1; // we don't have a valid day
				}
			}
			else
			{
				dayNum = -1; invalid
			}    

			if (dayNum > 0 && dayNum < 6)
			{
				weekDays = weekDays+1;
			}

			d.setDate(d.getDate() + 1);
		}

		event.value = weekDays;
	}
}
else
{
	event.value = 'Invalid dates';
}