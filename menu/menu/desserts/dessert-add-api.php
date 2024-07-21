<?php

require __DIR__ . '/../../config/pdo-connect.php';

header('Content-Type: application/json');

//echo json_encode($_POST); // 測試會不會正常的動

$output=[
  'success' => false, //是不是新增成功
  'bodyData' => $_POST, //檢查用
  'pk' => 0
];

// TODO: 要做欄位資料檢查


# preg_match() 使用 regular expression
# filter_var('bob@example.com', FILTER_VALIDATE_EMAIL) 檢查是不是 email 格式 
# mb_strlen() 回傳字串的長度, mb_ 表 multi-byte


$sql = "INSERT INTO `dessert` (`item_id`,`name`, `price`,`image`) VALUES (?, ?, ?, ?)";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['item_id'],
  $_POST['name'],
  $_POST['price'], 
  $_POST['image'], 
]);

$output['success']=!!$stmt->rowCount();
$output['pk'] = $pdo->lastInsertId(); # 取得最新新增資料的 primary key (通常是流水號)
echo json_encode($output);
