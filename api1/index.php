<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); 
error_reporting(E_ALL);  // Report all PHP errors
ini_set('display_errors', 1);  //To display errors in PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM freelancer ";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE Freelancer_ID = :Freelancer_ID";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Freelancer_ID', $path[3]);
            $stmt->execute();
            $freelancer = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $freelancer = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($freelancer);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO freelancer(Freelancer_ID, name, Skills, Portfolio,Hourly_Rate,Reviews,Ratings) VALUES(null, :name, :Skills, :Portfolio,:Hourly_Rate,:Reviews,:Ratings)";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':Skills', $user->Skills);      
        $stmt->bindParam(':Portfolio', $user->Portfolio);

        $stmt->bindParam(':Hourly_Rate', $user->Hourly_Rate);
        $stmt->bindParam(':Reviews', $user->Reviews);      
        $stmt->bindParam(':Ratings', $user->Ratings);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE freelancer SET name= :name, Skills =:Skills, Portfolio =:Portfolio,Hourly_Rate =:Hourly_Rate,Reviews =:Reviews,Ratings =:Ratings WHERE Freelancer_ID = :Freelancer_ID";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':Freelancer_ID', $user->Freelancer_ID);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':Skills', $user->Skills);
        $stmt->bindParam(':Hourly_Rate', $user->Hourly_Rate);
        $stmt->bindParam(':Portfolio', $user->Portfolio);
        $stmt->bindParam(':Reviews', $user->Reviews);
        $stmt->bindParam(':Ratings', $user->Ratings);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM freelancer WHERE Freelancer_ID = :Freelancer_ID";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Freelancer_ID', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}