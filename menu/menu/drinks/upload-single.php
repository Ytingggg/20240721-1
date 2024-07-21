<?php

 //這個檔案是api

# 用來篩選檔案類型, 並決定副檔名
$extMap = [
  'image/jpeg' => '.jpg',
  'image/png' => '.png',
  'image/webp' => '.webp',
];

# 表單裡上傳 單一個檔案的欄位名稱
$fieldName = 'photosField';

# 放檔案的資料夾
$dir = __DIR__ . '/../../upload/'; //如果資料夾設定路徑不同就要改

if (
  !empty($_FILES) # 要有上傳的檔案
  and
  !empty($_FILES[$fieldName]) # 要有指定的欄位名稱
  and
  $_FILES[$fieldName]['error'] === 0 # 上傳過程沒有錯誤
  and
  !empty($extMap[$_FILES[$fieldName]['type']]) # 要有對應到 content-type
) {

  $filename = sha1($_FILES[$fieldName]['name'] . uniqid()); # 主檔名
  $ext = $extMap[$_FILES[$fieldName]['type']]; # 副檔名
  $file = $dir . $filename . $ext;

  if (move_uploaded_file($_FILES[$fieldName]['tmp_name'], $file)) {
    echo json_encode([
      'success' => true,
      'filename' => $filename . $ext
    ]);
    exit;
  }
}
header('Content-Type: application/json');
echo json_encode(['success' => false, 'filename' => $filename.$ext]);
