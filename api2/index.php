<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); 
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM client ";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE client_id  = :client_id ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':client_id', $path[3]);
            $stmt->execute();
            $client = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $client = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($client);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO client(client_id , client_name, projects_posted, payment_information, reviews, ratings) VALUES(null, :client_name, :projects_posted, :payment_information, :reviews, :ratings)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':client_name', $user->client_name);
        $stmt->bindParam(':projects_posted', $user->projects_posted);
        $stmt->bindParam(':payment_information', $user->payment_information);
        $stmt->bindParam(':reviews', $user->reviews);
        $stmt->bindParam(':ratings', $user->ratings);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE client SET client_name = :client_name, projects_posted = :projects_posted, payment_information = :payment_information, reviews = :reviews, ratings = :ratings WHERE client_id = :client_id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':client_id', $user->client_id);
        $stmt->bindParam(':client_name', $user->client_name);
        $stmt->bindParam(':projects_posted', $user->projects_posted);
        $stmt->bindParam(':payment_information', $user->payment_information);
        $stmt->bindParam(':reviews', $user->reviews);
        $stmt->bindParam(':ratings', $user->ratings);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM client WHERE client_id = :client_id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':client_id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
?>
