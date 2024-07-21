export const API_SERVER = 'http://localhost:3001'

//取得單點菜單資料
export const MENU_ONE = `${API_SERVER}/menu/product`

//取得合菜菜單資料
export const MENU_COMBO = `${API_SERVER}/menu/combo_meal`

//便當
export const MENU_BENTO = `${API_SERVER}/menu/bento`

//飲料
export const MENU_DRINK = `${API_SERVER}/menu/drink`
//酒
export const MENU_LIQUOR = `${API_SERVER}/menu/liquor`
//甜點
export const MENU_DESSERT = `${API_SERVER}/menu/dessert`

//查詢折價卷資料(會員資料查詢自己的折價卷) `${API_SERVER}/history/:pk` method: GET !!!!先暫時用pk 正常是取的session
export const COUPONS_HISTORY = `${API_SERVER}/coupons/history`

//查詢折價卷資料---(訂單要查詢他的折價卷)
//${API_SERVER}/historyCar/:pk` method: GET !!!!先暫時用pk 正常是取的session
export const COUPONS_CAR = `${API_SERVER}/coupons/historyCar`

//使用折價卷 (訂單結帳) put ->這個有問題先等等 7/10
export const COUPONS_USE = `${API_SERVER}/edit`

//送出折價卷 post
