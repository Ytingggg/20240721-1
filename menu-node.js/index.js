import express from "express";
import menuRouter from "./routes/menu.js"
import menuBackRouter from "./routes/menu-back.js"
import couponsRouter from "./routes/coupons.js";
import cors from "cors"; //跨來源資料共享


const app = express();

//** top level middleware */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));




app.get("/",(req,res) => {
  res.send("這裡是主頁，輸入路徑轉跳至其他的地方去!!")
});

//模組路由
//菜單
app.use("/menu",menuRouter)
app.use("/menuBack",menuBackRouter)

//折價卷
app.use("/coupons",couponsRouter)


//404

app.use((req, res) => {
  res.status(404).send("<h1>路徑 - 錯路了</h1>");
});

const port = process.env.WEB_PORT || 3002;
app.listen(port, () => {
  console.log(`伺服器啟動了, port: ${port}`);
});