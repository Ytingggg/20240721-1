<?php
// 如果提交表單
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  echo "<script>";
  echo "document.querySelector('.member-field-two').remove();";
  echo "</script>";
  
  $inquire = $_POST["inquire"];
  $table = $_POST["table"];

  $sql = "SELECT * FROM $table WHERE name LIKE :inquire";

  $stmt = $pdo->prepare($sql);

  $stmt->execute(['inquire' => "%$inquire%"]);

  // 當查詢到結果時
  if ($stmt->rowCount() > 0) {
    // 輸出查詢結果的表格
    echo "<div class='member-field-two'>
              <table class='table-data'>
              <thead>
              <h5>查詢後結果</h4>
                <tr>
                  <th><i class='fa-solid fa-trash'></i></th>
                  <th>編號</th>
                  <th>品名</th>
                  <th>價錢</th>
                  <th>圖片</th>
                  <th><i class='fa-solid fa-pen-to-square'></i></th>
                </tr>
              </thead>
              <tbody>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $id = $row["id"];
      echo "<tr>";
      echo '<td><a href="javascript: removeItem(' . $row["id"] . ')"><i class="fa-solid fa-trash"></i></a></td>';
      echo "<td>" . $row["id"] . "</td>";
      echo "<td>" . $row["name"] . "</td>";
      echo "<td>" . $row["price"] . "</td>";
      echo "<td>" . $row["image"] . "</td>";
      echo "<td><a href='../{$table}s/$table-edit.php?id=" . $row['id'] . "'>
            <i class='fa-solid fa-pen-to-square'></i>
            </a></td>";
      echo "</tr>";
    }

    echo "</tbody>
              </table>
              </div>";

    echo "<script>
    const removeItem = id => {
      if (confirm(`是否要刪除編號為 ${id} 的資料?`)) {
        location.href = '../{$table}s/{$table}-delete.php?id=' + id;
      }
    }
    
  </script>";
  } else {
    echo "<div class='member-field-two'>查無資料</div>";
  }
};

