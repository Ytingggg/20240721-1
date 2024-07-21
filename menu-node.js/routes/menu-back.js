//import 匯入
import express, { json } from "express"; //espress套件
import db from "../utils/connect-mysql.js"; //連線料庫
import upload from "./../utils/upload-imgs.js"; //處理圖片上傳的，中介寫在地2個未
import { render } from "ejs";

const menuBackRouter = express.Router();

// menuRouter - Top-level middlewares



// resfull api -> get- 取得顯示資料 /put - 修改現有數據 / post -新增數據 / delete - 刪除數據

menuBackRouter.get("/",async(req,res) => {
  res.json({res:"後臺菜單的主分頁"})
})

//查詢放這裡!!! 想要使用路徑變數+qiery string去搜尋
menuBackRouter.get("/:tablename", async (req, res) => {
  let keyword = req.query.keyword || "";
  let tablename = req.params.tablename;
  let where = 'WHERE 1';

  // 允許的表格名稱
  const allowedTables = ['product', 'bento', 'drink', 'liquor', 'dessert','combo_meal'];

  if (!allowedTables.includes(tablename)) {
    return res.status(400).json({ error: "Invalid table name" });
  }

  if (keyword) {
    // 假設你要搜尋某個特定的列名，例如 "name"
    let columnName = "name" ;
    where += ` AND ${columnName} LIKE ${db.escape(`%${keyword}%`)}`;
  }

  const sql = `SELECT * FROM ${tablename} ${where}`;

  try {
    const [result] = await db.query(sql);
    // res,render() ->之後要換得先寫好!!
    res.json(result);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





//單點 - 增刪改
//主分頁
menuBackRouter.get("/product",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `product` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})

//顯示修改畫面
menuBackRouter.get("/product/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/product");
  }
  const sql = `SELECT id, name, price, image FROM product WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/product");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})

//執行修改動作 -需使用sql語法! 我是功能!!
menuBackRouter.put("/product/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE product SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})


//執行add動作 -需使用sql語法! - 要上傳圖片!!
menuBackRouter.post("/product/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO product set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})

//執行DELETE動作 -需使用sql語法!
menuBackRouter.delete("/product/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM product WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }

})

//合菜 - 增刪改
menuBackRouter.get("/combo_meal/",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `combo_meal` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})
//add -會上傳片
menuBackRouter.post("/combo_meal/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO combo_meal set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})

//delete
menuBackRouter.delete("/combo_meal/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM combo_meal WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }
})
//edit
//看修改畫面
menuBackRouter.get("/combo_meal/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/combo_meal");
  }
  const sql = `SELECT id, name, price, image FROM combo_meal WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/combo_meal");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})
//執行修改功能 -可能會修改圖片
menuBackRouter.put("/combo_meal/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE combo_meal SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})

//便當 - 增刪改
menuBackRouter.get("/bento/",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `bento` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})
//add -會上傳片
menuBackRouter.post("/bento/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO bento set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})
//delete
menuBackRouter.delete("/bento/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM bento WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }
})
//edit
//看修改畫面
menuBackRouter.get("/bento/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/bento");
  }
  const sql = `SELECT id, name, price, image FROM bento WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/bento");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})
//執行修改功能 -可能會修改圖片
menuBackRouter.put("/bento/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE bento SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})
//飲料 - 增刪改
menuBackRouter.get("/drink",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `drink` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})
//add -會上傳片
menuBackRouter.post("/drink/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO drink set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})
//delete
menuBackRouter.delete("/drink/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM drink WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }
})
//edit
//看修改畫面
menuBackRouter.get("/drink/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/drink");
  }
  const sql = `SELECT id, name, price, image FROM drink WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/drink");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})
//執行修改功能 -可能會修改圖片
menuBackRouter.put("/drink/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE drink SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})
//甜點 - 增刪改
menuBackRouter.get("/dessert",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `dessert` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})
//add -會上傳片
menuBackRouter.post("/dessert/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO dessert set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})
//delete
menuBackRouter.delete("/dessert/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM dessert WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }
})
//edit
//看修改畫面
menuBackRouter.get("/dessert/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/dessert");
  }
  const sql = `SELECT id, name, price, image FROM dessert WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/dessert");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})
//執行修改功能 -可能會修改圖片
menuBackRouter.put("/dessert/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE dessert SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})
//酒類 - 增刪改
menuBackRouter.get("/liquor",async(req,res) => {
  const sql = "SELECT `id`, `name`, `price`, `image` FROM `liquor` WHERE 1";
  let [rows] = await db.query(sql);
  
  res.json(rows);
})
//add -會上傳片
menuBackRouter.post("/liquor/add",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };
  try{
  const sql = `INSERT INTO liquor set ?`;
  const data = {...req.body ,item_id : 2};
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const [result] = await db.query(sql,data);
  output.result = result;
  output.success = !!result.affectedRows
  }catch{
    output.error = ex;
  }
res.json(output)
})
//delete
menuBackRouter.delete("/liquor/:id",async(req,res) => {
  const output = {
    success: false,
    result:{},
  };
  let id = +req.params.id || 0 ;
  if(id){
    try{
    const sql = `DELETE FROM liquor WHERE id = ${id}` ;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows
  }catch(ex){
    output.error = ex;
    return res.json(output)
  }
    res.json(output);
  }
})
//edit
//看修改畫面
menuBackRouter.get("/liquor/edit/:id",async(req,res) => {
  let id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/menuBack/liquor");
  }
  const sql = `SELECT id, name, price, image FROM liquor WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (rows.length === 0) {
    return res.redirect("/menuBack/liquor");
  }
  //畫面出來之後要改這裡!!!res.render() 渲染出畫面!
  res.json(rows[0]);
})
//執行修改功能 -可能會修改圖片
menuBackRouter.put("/liquor/edit/:id",upload.single("image"),async(req,res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };
  let id = +req.params.id || 0;
  if (!id){
    return res.json({info:"沒有這個編號"})
  }
  const data = { ...req.body };
  if (req.file) {
    data.image = `"${req.file.filename}"`;
  }
  const sql = `UPDATE liquor SET name = ?, price = ?, image = ? WHERE id = ?`;
  const [result] = await db.query(sql, [data.name, data.price, data.image, id]);
  output.result = result;
  output.success = !!(result.affectedRows && result.changedRows);
  
  res.json({output,file:req.file});
})

//靜態內容
menuBackRouter.use(express.static("public"));

export default menuBackRouter; 