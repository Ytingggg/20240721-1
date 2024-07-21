<?php require __DIR__ . '/config/pdo-connect.php' ?>
<?php include __DIR__ . '/part/html-head.php' ?>
<?php include __DIR__ . '../../../Topics/member_management/manage/manage-navbar.php' ?>

<div class="container">
<div class="row justify-content-center pt-2"> 
<div class="title mb-3">
        <h1>菜單管理</h1>
    </div>
    <hr>

  <div class="member-field mb-3">
    <a href="menu/products/product-menu.php" class="btn btn-outline-dark">單點</a>
    <a href="menu/combo_meals/combo_meal-menu.php" class="btn btn-outline-dark">合菜</a>
    <a href="menu/bentos/bento-menu.php" class="btn btn-outline-dark">便當</a>
    <a href="menu/desserts/dessert-menu.php" class="btn btn-outline-dark">甜點</a>
    <a href="menu/liquors/liquor-menu.php" class="btn btn-outline-dark">酒類</a>
    <a href="menu/drinks/drink-menu.php" class="btn btn-outline-dark">飲品</a>
    <hr />

    <div class="container">
      <div class="row">
        <div class="col-10">
          <form method="post" action="" id="search">
            <div class="search-form">
              <label for="table">搜尋 分類：</label>
              <select name="table" id="table">
                <option value="product">單點</option>
                <option value="combo_meal">合菜</option>
                <option value="bento">便當</option>
                <option value="dessert">甜點</option>
                <option value="liquor">酒類</option>
                <option value="drink">飲料</option>
              </select>
            </div>
            <div class="search-form mb-3">
              <input type="text" class="form-control me-3" id="inquire" name="inquire" placeholder="請輸入品項名稱" />
              <button id="search-submit" type="button" class="btn btn-outline-dark" style="white-space: nowrap">查詢品項</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.getElementById("search-submit").addEventListener("click", function() {
      document.getElementById("search").submit(); // 手动提交表单
    });
  </script>

  <?php
  // 如果提交表單
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // echo "<script>";
    // echo "document.querySelector('.member-table').remove();";
    // echo "</script>";

    $inquire = $_POST["inquire"];
    $table = $_POST["table"];

    $sql = "SELECT * FROM $table WHERE name LIKE :inquire";

    $stmt = $pdo->prepare($sql);

    $stmt->execute(['inquire' => "%$inquire%"]);

    // 當查詢到結果時
    if ($stmt->rowCount() > 0) {
      // 輸出查詢結果的表格
      echo "<div class='member-field'>
              <table class='table-data'>
              <thead>
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
        echo "<td><a href='menu/{$table}s/$table-edit.php?id=" . $row['id'] . "'>
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
        location.href = 'menu/{$table}s/{$table}-delete.php?id=' + id;
      }
    }
  </script>";
    } else {
      echo "<div class='member-table'>查無資料</div>";
    }
  }
  ?>

</div>

<?php include __DIR__ . '/part/html-script.php' ?>

<?php include __DIR__ . '/part/html-footer.php' ?>