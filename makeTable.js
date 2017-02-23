//function to populate the detailed table on medication.html
function populateTable() {
    
   $.getJSON("PMApi.php", function(json){
       
       var medProfile = json["meds"];
       var profileLength = medProfile.length;
       
       var medProfileDiv = document.getElementById("medProfileDivDetailed");
       var table = document.createElement("table");
       table.setAttribute("class","table");
       var tableHead = document.createElement("thead");
       var tableBody = document.createElement("tbody");
       
       var heading = new Array();
       heading[0] = "Medication";
       heading[1] = "Barcode";
       heading[2] = "Strength (mg)";
       heading[3] = "Tablets per day";
       heading[4] = "Weekly dosage (mg)";
       
       for(i=0; i<heading.length; i++){
           
           var heading_i = document.createElement('th');
           heading_i.appendChild(document.createTextNode(heading[i]));
           tableHead.appendChild(heading_i);
       }
       
       
       for (i=0; i<profileLength; i++){
           
           var medication_i = medProfile[i];
           var calcStrength = medication_i["strength"];
           var calcTabs = 4;
           var calcWeekly = dosage(calcStrength, calcTabs);
           
           var medicationName = document.createTextNode(medication_i["medication"]);
           var medicationBarcode = document.createTextNode(medication_i["barcode"]);
           var medicationStrength = document.createTextNode(medication_i["strength"]);
           var medicationTabs = document.createTextNode(calcTabs);
           var medicationWeekly = document.createTextNode(calcWeekly);
           
           var rowArray = new Array();
           rowArray[0] = medicationName;
           rowArray[1] = medicationBarcode;
           rowArray[2] = medicationStrength;
           rowArray[3] = medicationTabs;
           rowArray[4] = medicationWeekly;
           
           var row_i = document.createElement('tr');
           
           for (j=0; j<rowArray.length; j++) {
               
               var entry_j = document.createElement('td');
               entry_j.appendChild(rowArray[j]);
               row_i.appendChild(entry_j);
               
           }
           
           tableBody.appendChild(row_i);

           
       } 
       
       table.appendChild(tableHead);
       table.appendChild(tableBody);
       medProfileDiv.appendChild(table);
       
   })
}

//function to populate the user profile on index.html
function popUserData() {
    
    $.getJSON("PMApi.php", function(json){
    
        var user_nhsno = json["nhsno"];
        var user_name = json["name"];
        var user_dob = json["DOB"];
        var user_add1 = json["addLine1"];
        var user_add2 = json["addLine2"];
        var user_postcode = json["postcode"];
        var user_email = json["email"];
        var user_phone = json["phone"];
        
        var profile_div = document.getElementById("userProfile");
        
        var linebreak = document.createElement('br');
        
        var userName = document.createElement('h3');
        userName.appendChild(document.createTextNode(user_name));
        var userNHS = document.createElement('p');
        userNHS.appendChild(document.createTextNode("NHS number: " + user_nhsno));
        var userDOB = document.createElement('p');
        userDOB.appendChild(document.createTextNode("Date of Birth: " + user_dob));
        
        
        
        
        profile_div.appendChild(userName);
        profile_div.appendChild(linebreak);
        profile_div.appendChild(userNHS);
        profile_div.appendChild(linebreak);
        profile_div.appendChild(userDOB);
        profile_div.appendChild(linebreak);



    })
}

//function to populate the smaller table on index.html
function populateTableMin() {

    $.getJSON("PMApi.php", function(json){

        var medProfile = json["meds"];
        var profileLength = medProfile.length;

        var medProfileDiv = document.getElementById("medProfileDiv");
        var table = document.createElement("table");
        table.setAttribute("class","table");
        var tableHead = document.createElement("thead");
        var tableBody = document.createElement("tbody");

        var heading = new Array();
        heading[0] = "Medication";
        heading[1] = "Strength (mg)";
        heading[2] = "Tablets per day";
        

        for(i=0; i<heading.length; i++){

            var heading_i = document.createElement('th');
            heading_i.appendChild(document.createTextNode(heading[i]));
            tableHead.appendChild(heading_i);
        }


        for (i=0; i<profileLength; i++){

            var medication_i = medProfile[i];

            var medicationName = document.createTextNode(medication_i["medication"]);
            var medicationStrength = document.createTextNode(medication_i["strength"]);
            var medicationTabs = document.createTextNode(4);
            

            var rowArray = new Array();
            rowArray[0] = medicationName;
            rowArray[1] = medicationStrength;
            rowArray[2] = medicationTabs;

            var row_i = document.createElement('tr');

            for (j=0; j<rowArray.length; j++) {

                var entry_j = document.createElement('td');
                entry_j.appendChild(rowArray[j]);
                row_i.appendChild(entry_j);

            }

            tableBody.appendChild(row_i);


        } 

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        medProfileDiv.appendChild(table);

    })
}

//function to calculate weekly dosage from strenth and tabs per day
//function should also be unit tested on QUnit.html
function dosage(strength, tabsperday){
    
    var weekly_dose = (strength * tabsperday) * 7;
    
    return weekly_dose;
}