//import 匯入
import express from "express"; //express套件
import db from "../utils/connect-mysql.js"; //連線料庫
import moment from "moment-timezone";
import upload from "./../utils/upload-imgs.js";
import session from "express-session";
import mysql_session from "express-mysql-session";

const couponsRouter = express.Router();
const dateFormat = "YYYY-MM-DD";
const MysqlStore = mysql_session(session);
const sessionStore = new MysqlStore({}, db);

//前提登入才可以看--之後要打開現在有錯
// router top-level middleware

// couponsRouter.use((req, res, next) => {
//   if (req.session.admin) {
//     // 如果有登入就讓他通過
//     return next();
//   }
//   let path = req.url.split("?")[0]; // 只要路徑 (去掉 query string)
//   // 可通過的白名單
//   if (["/", "/api"].includes(path)) {
//     return next();
//   }
//   // res.status(403).send("<h1>無權訪問此頁面</h1>"); // 直接擋掉
//   res.redirect(`/login?u=${req.originalUrl}`); // 導到登入頁
// });

//7/12 還沒有製作!!!!*****

// restful api -> get- 取得顯示資料 /put - 修改現有數據 / post -新增數據 / delete - 刪除數據
//折價卷-增(送出折價卷時寫入資料表 - 總共有 4種卷 所以寫入的 api 要有四個!!或者用if判斷要送哪一個
//**************** 先做一個沒問題再做n個~!!
///之後要判斷他是哪一個會員 依照他得會員的變數寫入資料表--- 先寫死之後要記得改要得到session!!!!!
couponsRouter.post("/add", upload.none(), async (req, res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: {},
  };

  let tomorrow = moment().add(1, 'day').toDate();
  let nextMonth = moment().add(1, 'month').toDate();

  // 假設 m_id 是從 session 取得的會員ID
  let m_id = 16; // 測試用，之後要從 session 中取得

  const sql2 = `SELECT totalPrice FROM member_card WHERE member_profile_id = ?`;

  try {
    const [rows] = await db.query(sql2, [m_id]); // 使用會員ID查詢

    if (rows.length === 0) {
      res.status(404).json({ error: "Member not found" });
      return;
    }

    let accumulation = rows[0].totalPrice; // 假設 totalPrice 是一個數值
    let cs_id = 0;

    // 確認 accumulation 是數值並進行比較
    if (accumulation === 20000) {
      cs_id = 4;
    } else if (accumulation === 12000) {
      cs_id = 3;
    } else if (accumulation === 7000) {
      cs_id = 2;
    } else if (accumulation === 5000) {
      cs_id = 1;
    }

    const sql = `INSERT INTO coupons SET ?`;

    const data = {
      ...req.body,
      coupons_sentDate: tomorrow,
      coupons_maxAge: nextMonth,
      m_id: m_id, // 從 session 取得
      cs_id: cs_id,
    };

    const [result] = await db.query(sql, data);
    output.result = result;
    output.success = !!result.affectedRows;
  } catch (error) {
    console.error("Error executing SQL query:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
    return;
  }

  res.json({ output });
});

// 折價卷-查，查詢該會員有無折價卷
couponsRouter.get("/history/:id", async (req, res) => {
  const output = {
    success: false,
    result: [],
  };
  const member_id = req.params.id;
  // 假設會員ID從session中獲取，這裡寫死一個會員ID供測試用
  // const member_id = req.session.memberId || null;

  // 更新所有過期的折價券
  const sql2 = `UPDATE coupons SET over_maxAge = true WHERE coupons_maxAge < ?`;
  const currentDate = moment().format(dateFormat);

  try {
    await db.query(sql2, [currentDate]);

    const sql = `SELECT  user_id,\`name\`,coupons_sentDate,
coupons_maxAge,coupons_sample_price,coupons_explain,
car_id 
FROM coupons 
JOIN coupons_sample 
ON coupons.cs_id =  coupons_sample.cs_id
JOIN \`user\`  
ON user_id = \`user\`.id
WHERE user_id = 1
ORDER BY coupons_maxAge`;

    const [rows] = await db.query(sql, [member_id]);

    //將日期格式轉換成不是格林威治時間!!! 使用mySQL2取出資料時都會自動將時間格是更換成原生js的日期格式，所以需要使用套件進行轉換!
    rows.forEach((r)=>{
       r.coupons_sentDate = moment(r.coupons_sentDate).format(dateFormat);
       r.coupons_maxAge = moment(r.coupons_maxAge).format(dateFormat)
    })

    if (rows.length > 0) {
      output.success = true;
      output.result = rows;
    } else {
      output.message = "無任何折價卷!累積消費滿額5000即贈送折價卷500元";
    }
  } catch (error) {
    console.error("Error executing SQL query:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
    return;
  }

  res.json( output );
});

// 折價卷-查，查詢該會員有無折價卷 --給【訂單】的 如果coupons maxAge < moment()查詢的當天代表過期就不顯示於前端
couponsRouter.get("/historyCar/:id", async (req, res) => {
  const output = {
    success: false,
    result: [],
  };
  const member_id = req.params.id;
  // 假設會員ID從session中獲取，這裡寫死一個會員ID供測試用
  // const member_id = req.session.memberId || null;

  // 更新所有過期的折價券
  const sql2 = `UPDATE coupons SET over_maxAge = true WHERE coupons_maxAge < ?`;
  const currentDate = moment().format(dateFormat);

  try {
    await db.query(sql2, [currentDate]);

    
    const sql = `SELECT  user_id,\`name\`,coupons_sentDate,coupons_maxAge,coupons_sample_price,coupons_explain,car_id FROM coupons JOIN coupons_sample ON coupons.cs_id =  coupons_sample.cs_id JOIN \`user\`ON user_id = \`user\`.idWHERE user_id = 1AND coupons_maxAge > CURDATE()  AND (car_id IS NULL OR car_id = '') ORDER BY coupons_maxAge`;

    const [rows] = await db.query(sql, [member_id]);

    //將日期格式轉換成不是格林威治時間!!! 使用mySQL2取出資料時都會自動將時間格是更換成原生js的日期格式，所以需要使用套件進行轉換!
    rows.forEach((r)=>{
       r.coupons_sentDate = moment(r.coupons_sentDate).format(dateFormat);
       r.coupons_maxAge = moment(r.coupons_maxAge).format(dateFormat)
    })

    if (rows.length > 0) {
      output.success = true;
      output.result = rows;
    } else {
      output.message = "無任何折價卷!累積消費滿額5000即贈送折價卷500元";
    }
  } catch (error) {
    console.error("Error executing SQL query:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
    return;
  }

  res.json( output );
});

//折價卷-改 1.(不刪除)-過期時要修改狀態 -> 變成灰色不能點 -查詢時就要一起寫入狀態了!(好了) 2. 使用了所以要寫入訂單編號 -> 有訂單編號也要變成灰色不能點(say已用!!)
//這裡不用給使用者畫面!!!只是改資料庫的部分所以修改好要跳轉回去查看頁
//先暫時這樣
couponsRouter.put("/edit/:m_id/:carNumber/:cs_id", async (req, res) => {
  const output = {
    success: false,
    bodyData: req.body,
    result: null,
  };

  // 假設 id 先從路徑取 ，之後再從  session 取得的會員ID
  let m_id = +req.params.m_id || 0;
 // 從請求體中取得車牌號碼
 const car_id = +req.body.carNumber || 0;
  //假設 cs_id 先從路徑取得  ->這裡的是看他有哪一款的折價卷(折價卷款式4種!!)
  let cs_id = +req.params.cs_id || 0;

  try {
    // 更新優惠券的 car_id
    const sql2 = `UPDATE coupons SET car_id = ? WHERE m_id = ? AND cs_id =? `;
    const [result] = await db.query(sql2, [car_id, m_id, cs_id]);

    output.result = result;
    output.success = !!(result.affectedRows && result.changedRows);
  } catch (error) {
    console.error(error);
    output.error = error.message;
  }
  res.json({ output });
});

export default couponsRouter;
