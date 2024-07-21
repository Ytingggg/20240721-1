<?php
//require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/../../config/pdo-connect.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if(! empty($id)) {
  # $id 不是空的 (不是 0)
  $sql = "DELETE FROM product WHERE id =$id";
  $pdo->query($sql);
}

# $_SERVER['HTTP_REFERER'], 人從哪裡來

$comeFrom = 'product-menu.php'; # 預設值
if(! empty($_SERVER['HTTP_REFERER'])){
  $comeFrom = $_SERVER['HTTP_REFERER'];
}

header('Location: '. $comeFrom);
  