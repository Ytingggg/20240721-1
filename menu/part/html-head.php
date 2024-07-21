<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>餐廳後台管理系統</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      height: 100vh;
      /* 設置 body 高度為視窗高度的 100% */
      background: dimgrey;
    }

    .body{
      height: 100vh;
      width: 80%;
    }

    .title {
      color: white;
    }

    .sidebar {
      width: 180px;
      background-color: #333;
      padding-left: 20px;
      color: #fff;
      /* 讓側欄高度佔滿 body 的高度 */
      overflow-y: auto;
      /* 若內容超出側欄高度，提供滾動條 */
      font-size: 24px;
    }

    .sidebar h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .sidebar ul {
      list-style-type: none;
      padding: 0;
    }

    .sidebar li {
      margin-bottom: 10px;
    }

    .sidebar a {
      text-decoration: none;
      color: #fff;
      font-size: 18px;
    }

    .content {
      background-color: white;
      padding-left: 10px;
      border-radius: 10px;
      overflow: auto;
      width: 80%;
      height: 80vh;
      margin-bottom: 20px;
      margin-top: 50px;
    }

    .content h3 {
      margin-bottom: 0;
    }

    .sidebar li i {
      margin-right: 10px;
      /* 調整圖標與文字之間的間距 */
    }

    .member-field {
      background-color: white;
      height: 25vh;
      width: 130vh;
      padding: 10px;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 5px;
      border-radius: 10px;
    }

    .member-field-two {
      background-color: white;
      height: 50vh;
      width: 130vh;
      padding: 10px;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 5px;
      border-radius: 10px;
      overflow: auto;
    }

    .table-field{
      background-color: white;
      margin-left: 50px;
      margin-top: 10px;
      margin-bottom: 5px;
      border-radius: 10px;
      height: 50vh;
    }
    .member-field button {
      margin-right: 10px;
    }

    .member-field button:hover {
      margin-right: 10px;
      background-color: lightblue;
      cursor: pointer;
    }

    .member-field p {
      margin-block: 0;
    }

    .table-data,
    th,
    td {
      border: 1px solid black;
      /* 设置表格、表头和单元格的边框样式 */
      border-collapse: collapse;
    }

    .member-table {
      background-color: #fff;
      width: 130vh;
      height: 60vh;
      padding: 10px;
      border-radius: 10px;
      margin: auto;
      margin-top: 10px;
      overflow: auto;
    }

    /* .table-data {
      table-layout: fixed;
       使用固定布局 
    } */
    .table-data{
  margin-top: 5px;
  width: 800px;
  margin-left: auto; /* 將左邊外邊距設置為 auto */
  margin-right: auto; /* 將右邊外邊距設置為 auto */
}

    .table-data tr:hover {
      background-color: rgb(129, 117, 117);
    }

    .table-data th,
    .table-data td {
      padding: 3px;
      border: 1px solid black;
      text-align: center;
    }

    #search {
      display: flex;
      flex-direction: column;
    }

    .search-form {
      display: flex;
      align-items: center;
    }

    .search-form label {
      margin-right: 10px;
    }
    .table-content{
      width: 80%;
      height: 50%;
      background-color: white;
    }


    .content h3,
    .content p {
      animation: fadeInOut 2s ease-in-out;
    }

    @keyframes fadeInOut {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    /* 側欄列 hover 效果 */
    .sidebar li:hover {
      background-color: #555;
    }

    .logo-title{
      font-size: 24px;
    }

    .table-field-mini{
      background-color: white;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 20px;
      border-radius: 10px;
      height: 21.5rem;
      width: 130vh;
      padding: 10px;
      overflow-x: hidden;
      
    }

    .article-content{
      background-color: white;
      padding-left: 10px;
      border-radius: 10px;
      overflow: auto;
      width: 100%;
      height: 45vh;
      margin-bottom: 20px;
    }
    .article-table{
      background-color: white;
      padding-left: 10px;
      border-radius: 10px;
      overflow: auto;
      width: 100%;
      height: 40vh;
      margin-bottom: 20px;
    }
    .article-form{
      width: 800px;
    }

    .center-form {
  display: flex;
  justify-content: center;
  margin-left: auto; /* 將左邊外邊距設置為 auto */
  margin-right: auto; /* 將右邊外邊距設置為 auto */
  width: 110vh;
}
  </style>

</head>

<body>