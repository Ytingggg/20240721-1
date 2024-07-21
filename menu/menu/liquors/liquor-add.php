<?php
// require __DIR__. '/part/admin-required.php';

if (!isset($_SESSION)) {
  # 如果沒有設定 $_SESSION, 才啟動
  session_start();
}

$table = "liquor";

?>
<?php include __DIR__ . '/../../part/html-head.php' ?>
<?php include __DIR__ . '/../../part/html-admin-forMenu.php' ?>
<?php include __DIR__ . '/../../part/html-menu-navbar.php' ?>

<div class="table-field-mini">
  <div >
    <div class="row">

      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">新增便當菜單</h5>
            <form name="form1" onsubmit="sendData(event)">

              <div class="mb-3">
                <input type="text" class="form-control" id="item_id" name="item_id" value="6" hidden>
                <div class="form-text"></div>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">名稱</label>
                <input type="text" class="form-control" id="name" name="name">
                <div class="form-text"></div>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">價錢</label>
                <input type="text" class="form-control" id="price" name="price">
                <div class="form-text"></div>
              </div>

              <div class="mb-3">
                <button class="btn btn-warning" type="button" onclick="photosField.click()">上傳圖片</button>
                <input type="hidden" name="image" value=""> <!--收檔案位子的json-->
              </div>
              <button type="submit" class="btn btn-primary">新增</button>
            </form>
          </div>
        </div>
      </div>

      <!-- 這裡以下是畫面中預覽圖片 -->
      <div class="col-6">
        <div class="card" style="height:100%">
          <div class="card-body">
            <h5 class="card-title">預覽上傳照片</h5>

            <img id="photo_img" src="" alt="" width="100%" />
            <div id="photo_container">
              <!-- 上傳圖檔的表單 -->
              <form name="upload_form1" hidden>
                <input type="file" name="photosField" accept="image/*" />
              </form>
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">資料新增結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success" role="alert">
          資料新增成功
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續新增</button>
        <a href="liquor-menu.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>

</div>

<?php include __DIR__ . '/../../part/html-script.php' ?>

<script>
  const nameField = document.form1.name;
  const priceField = document.form1.price;

  const sendData = e => {
    e.preventDefault();

    // 回復沒有提示的狀態
    nameField.style.border = '1px solid #CCCC ';
    nameField.nextElementSibling.innerHTML = '';
    priceField.style.border = '1px solid #CCCC ';
    priceField.nextElementSibling.innerHTML = '';

    let isPass = true; // 有沒有通過檢查

    // TODO: 要做欄位資料檢查
    if (nameField.value.length <= 2) {
      isPass = false;
      // 跳提示用戶
      nameField.style.border = '1px solid red';
      nameField.nextElementSibling.innerHTML = '請填寫正確的產品名稱(最少3個字)';
    }

    if (priceField.value.length <= 2) {
      isPass = false;
      // 跳提示用戶
      priceField.style.border = '1px solid red';
      priceField.nextElementSibling.innerHTML = '請填寫正確的售價';
    }

    // 如果欄位資料都有通過檢查
    if (isPass) {
      const fd = new FormData(document.form1); // 建立一個只有資料的表單物件

      fetch('liquor-add-api.php', {
          method: 'POST',
          body: fd, // 預設的 Content-Type: multipart/form-data
        })
        .then(r => r.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            myModal.show();
          } else {
            console.log(`資料新增失敗`);
          }
        }).catch(ex => {
          console.log(`fetch() 發生錯誤, 回傳的 JSON 格式是錯的`);
          console.log(ex);
        })
    }
  }
  //以下為上傳圖檔

  const photosField = document.upload_form1.photosField;

  photosField.addEventListener("change", (event) => {
    const fd = new FormData(document.upload_form1);
    fetch("upload-single.php", {
        method: "POST",
        body: fd,
      })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          // 把取得的檔名放到第一個表單的隱藏欄位
          document.form1.image.value = result.filename;
          // 把圖秀出來
          photo_img.src = "../../upload/" + result.filename;

          //把圖檔名稱轉成json字串的格式 ，先放在格子中
          document.form1.image.value = JSON.stringify(document.form1.image.value);
        }
      });
  })
  const myModal = new bootstrap.Modal('#exampleModal');
</script>
<?php include __DIR__ . '/../../part/html-footer.php' ?>