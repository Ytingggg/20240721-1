<?php
// require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/../../config/pdo-connect.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (empty($id)) {
  header('Location: liquor-menu.php');
  exit; # 結束 php 程式, die()
}

$sql = "SELECT * FROM liquor WHERE id=$id";
$row = $pdo->query($sql)->fetch();

# 如果沒有這個編號的資料, 轉向回列表頁
if (empty($row)) {
  header('Location: liquor-menu.php');
  exit; # 結束 php 程式, die()
}
/*
header('Content-Type: application/json');
echo json_encode($row);
exit;
*/

$table = "liquor";

?>
<?php include __DIR__ . '/../../part/html-head.php' ?>
<?php include __DIR__ . '/../../part/html-admin-forMenu.php' ?>
<?php include __DIR__ . '/../../part/html-menu-navbar.php' ?>

<style>
  .required {
    color: red;
  }

  .form-text {
    color: red;
  }
</style>

<div class="table-field-mini">
  <div>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">編輯資料</h5>
            <form name="form1" onsubmit="sendData(event)">

              <input type="hidden" name="id" value="<?= $row['id'] ?>">
              <div class="mb-3">
                <label for="id" class="form-label">編號</label>
                <input type="text" class="form-control" value="<?= $row['id'] ?>" disabled>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label"><span class="required">**</span> 酒類名稱</label>
                <input type="text" class="form-control" id="name" name="name" value="<?= $row['name'] ?>">
                <div class="form-text"></div>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label"><span class="required">**</span> 酒類售價</label>
                <input type="text" class="form-control" id="price" name="price" value="<?= $row['price'] ?>">
                <div class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">圖片</label>
                <input type="hidden" name="image" value="<?= empty($row['image']) ? '[]' :  $row['image'] ?>"> <!--收檔案位子的json-->
                <div class="form-text"></div>
              </div>
              <button type="button" class="btn btn-primary" onclick="photosField.click()">修改上傳圖片</button>
              <button type="submit" class="btn btn-primary">修改</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card" style="height:100%">
          <div class="card-body">
            <h5 class="card-title">預覽上傳照片</h5>
            <div id="old_photo_container">

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">資料修改結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success" role="alert">
          資料修改成功
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="liquor-menu.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel2">資料修改結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger" role="alert">
          資料沒有修改
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="liquor-menu.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>

<!-- 新的!!!上傳圖檔的表單 -->
<form name="upload_form1" hidden>
  <input type="file" name="photosField" accept="image/*" />
</form>

<?php include __DIR__ . '/../../part/html-script.php' ?>
<script>
  const nameField = document.form1.name;
  const priceField = document.form1.price;

  const sendData = e => {
    e.preventDefault();

    // 回復沒有提示的狀態
    nameField.style.border = '1px solid #CCCCCC';
    nameField.nextElementSibling.innerHTML = '';
    priceField.style.border = '1px solid #CCCCCC';
    priceField.nextElementSibling.innerHTML = '';

    let isPass = true; // 有沒有通過檢查

    // TODO: 要做欄位資料檢查
    if (nameField.value.length < 2) {
      isPass = false;
      // 跳提示用戶
      nameField.style.border = '1px solid red';
      nameField.nextElementSibling.innerHTML = '請輸入名稱';
    }

    if (priceField.value.length < 3) {
      isPass = false;
      priceField.style.border = '1px solid red';
      priceField.nextElementSibling.innerHTML = '請輸入售價';
    }


    // 如果欄位資料都有通過檢查
    if (isPass) {
      const fd = new FormData(document.form1); // 建立一個只有資料的表單物件

      fetch('liquor-edit-api.php', {
          method: 'POST',
          body: fd, // 預設的 Content-Type: multipart/form-data
        })
        .then(r => r.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            myModal.show();
          } else {
            myModal2.show();
          }
        }).catch(ex => {
          console.log(`fetch() 發生錯誤, 回傳的 JSON 格式是錯的`);
          console.log(ex);
        })
    }
  }

  const myModal = new bootstrap.Modal('#exampleModal');
  const myModal2 = new bootstrap.Modal('#exampleModal2');

  const photoTpl = (f) => `
  <div class="my-card">
    <img src="../../upload/${f}" alt="" height="290rem">
  </div>
  `;

  // php 把資料轉換成 JSON 變成 JS
  const row = <?= json_encode($row['image']) ?>;

  let photos = JSON.parse('[' + row + ']');



  const genPhotos = () => {
    let str = '';
    for (let p of photos) {
      str += photoTpl(p);
    }
    old_photo_container.innerHTML = str;

  };
  genPhotos();

  // 以下511改動的地方

  const photosField = document.upload_form1.elements[0];
  photosField.addEventListener("change", (event) => {
    const fd = new FormData(document.upload_form1);
    fetch("upload-single.php", {
        method: "POST",
        body: fd,
      })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          let photos = JSON.parse('[' + row + ']');
          genPhotos();
          // 把取得的檔名放到第一個表單的隱藏欄位
          document.form1.image.value = result.filename;
          // 把圖秀出來
          old_photo_container.innerHTML = `<div clas="my-card"><img src="../../upload/${result.filename}" height="290rem"></div>`;

          //把圖檔名稱轉成json字串的格式 ，先放在格子中
          document.form1.image.value = JSON.stringify(document.form1.image.value);


        }
      });

  });
</script>
<?php include __DIR__ . '/../../part/html-footer.php' ?>