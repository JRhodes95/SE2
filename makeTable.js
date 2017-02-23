$(document).ready(populateTable(), popUserData());

function populateTable() {
    
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
       heading[1] = "Barcode";
       heading[2] = "Strength (mg)";
       heading[3] = "Tablets per day";
       heading[4] = "Daily dosage (mg)";
       heading[5] = "Weekly dosage (mg)";
       
       for(i=0; i<heading.length; i++){
           
           var heading_i = document.createElement('th');
           heading_i.appendChild(document.createTextNode(heading[i]));
           tableHead.appendChild(heading_i);
       }
       
       
       for (i=0; i<profileLength; i++){
           
           var medication_i = medProfile[i];
           
           var calcStrength = medication_i["strength"];
           var calcTabs = medication_i["tabsperday"];
           var calcDaily = calcTabs * calcStrength;
           var calcWeekly = calcDaily * 7;
           
           var medicationName = document.createTextNode(medication_i["medication"]);
           var medicationBarcode = document.createTextNode(medication_i["barcode"]);
           var medicationStrength = document.createTextNode(medication_i["strength"]);
           var medicationTabs = document.createTextNode(medication_i["tabsperday"]);
           var medicationDaily = document.createTextNode(calcDaily);
           var medicationWeekly = document.createTextNode(calcWeekly);
           
           var rowArray = new Array();
           rowArray[0] = medicationName;
           rowArray[1] = medicationBarcode;
           rowArray[2] = medicationStrength;
           rowArray[3] = medicationTabs;
           rowArray[4] = medicationDaily;
           rowArray[5] = medicationWeekly;
           
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