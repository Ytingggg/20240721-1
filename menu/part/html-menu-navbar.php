<!-- 主要內容區域 -->

<div class="container">
    <div class="row justify-content-center pt-2"> 
        <div class="title mb-5">
  <h3>菜單管理</h3>
  </div>
  <hr>
  
  <div class="member-field mb-3">
    <a href="../products/product-menu.php" class="btn btn-outline-dark">單點</a>
    <a href="../combo_meals/combo_meal-menu.php" class="btn btn-outline-dark">合菜</a>
    <a href="../bentos/bento-menu.php" class="btn btn-outline-dark">便當</a>
    <a href="../desserts/dessert-menu.php" class="btn btn-outline-dark">甜點</a>
    <a href="../liquors/liquor-menu.php" class="btn btn-outline-dark">酒類</a>
    <a href="../drinks/drink-menu.php" class="btn btn-outline-dark">飲品</a>
    <hr />

    <div class="member-form container">
      <div class="row">
        <div class="col-10 ">
          <form method="post" action="" id="search">
            <div class="search-form mb-2">
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
            <div class="search-form">
              <input type="text" class="form-control me-3" id="inquire" name="inquire" placeholder="請輸入品項名稱" />
              <button id="search" type="submit" class="btn btn-outline-dark" style="white-space: nowrap">查詢品項</button>
            </div>
          </form>
        </div>
        <div class="col-2 d-flex align-items-end">
          <a href="<?= $table ?>-add.php" class="btn btn-outline-dark" style="white-space: nowrap">新增品項</a>
        </div>
      </div>
    </div>
  </div>