<?php
require __DIR__ . '/../../config/pdo-connect.php';

$sql = "SELECT * FROM combo_meal";

$stmt = $pdo->query($sql); # 執行 sql 取得代理物件

$rows = $stmt->fetchAll();  # 透過代理物件, 提取剩下的資料

//echo json_encode($rows);

$table = "combo_meal";

?>

<?php include __DIR__ . '/../../part/html-head.php' ?>
<?php include __DIR__ . '/../../part/html-admin-forMenu.php' ?>
<?php include __DIR__ . '/../../part/html-menu-navbar.php' ?>
<div class="member-field-two">
  <table class="table-data">
    <thead>
      <tr>
        <th><i class="fa-solid fa-trash"></i></th>
        <th>編號</th>
        <th>合菜菜名</th>
        <th>合菜價錢</th>
        <th>圖片</th>
        <th><i class="fa-solid fa-pen-to-square"></i></th>
      </tr>
    </thead>
  
    <tbody>
      <?php foreach ($rows as $r) : ?>
        <tr>
          <td>
            <a href="javascript: deleteOne(<?= $r['id'] ?>)">
              <i class="fa-solid fa-trash"></i>
            </a>
          </td>
          <td><?= $r['id'] ?></td>
          <td><?= $r['name'] ?></td>
          <td><?= $r['price'] ?></td>
          <td><?= $r['image'] ?></td>
          <td>
            <a href="combo_meal-edit.php?id=<?= $r['id'] ?>">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
          </td>
        </tr>
      <?php endforeach ?>
    </tbody>
  
  </table>
  </div>

  <!-- 這裡放下方白白表格內容 -->


<?php include __DIR__ . '../../search.php' ?>

<?php include __DIR__ . '/../../part/html-script.php' ?>

<script>
  const deleteOne = id => {
    if (confirm(`是否要刪除編號為 ${id} 的資料?`)) {
      location.href = `combo_meal-delete.php?id=${id}`;
    }
  }
</script>
<?php include __DIR__ . '/../../part/html-footer.php' ?>