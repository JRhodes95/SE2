<?php


//add to the JSON file by name
function addByName(){
    //turn user profile into assoc array
    $medsJSON = file_get_contents("userData.json");
    
    $medsPHP = json_decode($medsJSON);
    $medComp = $_POST['medComp'];
    $medComp = $medComp ?:'Not entered';
    $medName = $_POST['medName'];
    $medStrength = $_POST['strength'];    
    $medTabs = $_POST['medTabs'];    
    $medPack = $_POST['medPack'];    
       
    
    
        
    $tempArray = array(
    "company" => $medComp,
    "medication" => $medName,
    "strength" => $medStrength,
    "barcode" => "Not entered",
    "notabs" => $medPack,
    "tabsperday" => $medTabs,
    );

        
    $newObject = (object) $tempArray;
    
    array_push($medsPHP->meds, $newObject);
    
    
    
    
    //recode to json
    $newMedsJSON = json_encode($medsPHP);
    
    
    //rewrite file
    file_put_contents("userData.json", $newMedsJSON);
    header("Location: medication.html");
    die();
}

//add to the JSON file by barcode
function addByBar(){
    
    //turn user profile into assoc array
    $medsJSON = file_get_contents("userData.json");

    $medsPHP = json_decode($medsJSON);

    $medBar = $_POST['medBar'];
    $medStrength = $_POST['strength'];
    $medTabs = $_POST['medTabs'];   

    $tempArray = array(
        "company" => "Barcode lookup",
        "medication" => "Barcode lookup",
        "strength" => $medStrength,
        "barcode" => $medBar,
        "tabsperday" => $medTabs,
        "notabs" => "Barcode lookup",
    );

    $newObject = (object) $tempArray;

    array_push($medsPHP->meds, $newObject);




    //recode to json
    $newMedsJSON = json_encode($medsPHP);


    //rewrite file
    file_put_contents("userData.json", $newMedsJSON);
    header("Location: medication.html");
    die();
}

//control statements-----------------------------

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    //Give the JSON
    $medsJSON = file_get_contents("userData.json");
    header('Content-Type: application/json');

    echo $medsJSON;

} else if($_SERVER['REQUEST_METHOD'] === 'POST'){

    if (isset($_POST['medName'])){

        addByName();  

    } else if (isset($_POST['medBar'])){

        addByBar();

    } else {

        echo "Error: No POST variable found.";
    }
} else {

    echo "Error: Please use either a GET or POST request.";
}

?>