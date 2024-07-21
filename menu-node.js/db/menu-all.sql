-- 請選擇你要的資料庫使用
use  team_0628;
use mudanlow;

CREATE TABLE menu_items ( #菜單分類
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name varchar(50)
);

insert into menu_items(item_name)
values
('combo_meal'), -- 合菜
('one'), -- 單點
('drink'), -- 飲品
('liquor'), -- 酒水
('dessert'), -- 甜點
('bento'); -- 便當

CREATE TABLE `bento` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `bento`
--

INSERT INTO `bento` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(6, 1, '功夫雞便當', 200, '4.webp', '人氣商品'),
(6, 2, '蔥爆花枝便當', 200, '3.webp', '人氣商品'),
(6, 3, '香煎鮭魚便當', 200, '2.webp', NULL),
(6, 4, '辣炒豬肉便當', 200, '1.webp', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `bento`
--
ALTER TABLE `bento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bento`
--
ALTER TABLE `bento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `bento`
--
ALTER TABLE `bento`
  ADD CONSTRAINT `bento_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;

CREATE TABLE `combo_meal` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `combo_meal`
--

INSERT INTO `combo_meal` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(1, 1, '四人經典合菜', 4888, '\"8b1b89da1a8314400145cbb495f731caac609113.webp\"', NULL),
(1, 2, '六人經典合菜', 6888, '\"86a9b02d462155cd5397cb19e327e9236ab0348a.webp\"', NULL),
(1, 3, '八人經典合菜', 9388, '\"ba181e0e70d18726c6cfc6d898687ae414f450e7.webp\"', '人氣商品'),
(1, 4, '十人經典合菜', 11988, '\"3da35ba8b7513487ada6e6d2055cbee8e6d0b81f.webp\"', '人氣商品'),
(1, 5, '十二人經典合菜', 13988, '\"e92a62b945b9200c3722645fc6dd13db7efc5f12.webp\"', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `combo_meal`
--
ALTER TABLE `combo_meal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `combo_meal`
--
ALTER TABLE `combo_meal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `combo_meal`
--
ALTER TABLE `combo_meal`
  ADD CONSTRAINT `combo_meal_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;

CREATE TABLE `dessert` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `dessert`
--

INSERT INTO `dessert` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(5, 1, '原味千層蛋糕', 140, '\"8d2f63dcbebed68cdc277ba6424d8b8f9c78329c.webp\"', '招牌甜點'),
(5, 2, '抹茶千層蛋糕', 160, '\"ba0e9c43b3d5eb336262a83dc9b466e066a4053d.webp\"', NULL),
(5, 3, '焦糖伯爵蛋糕', 160, '\"4819d93b9420e8113332562418f270c7c8c12a98.webp\"', NULL),
(5, 4, '經典提拉米蘇', 180, '\"6cdad2e0221d9a7249c647aa1cbe9d8fbc9e7ad4.webp\"', '人氣商品'),
(5, 5, '生巧克力蛋糕', 180, '\"b3e4eb359df6d187f991b901dd862e382c2c88c3.webp\"', NULL),
(5, 6, '一口泡芙', 180, '\"087879a0bbb5f9a2d168f766ef30154e8e95b6c6.webp\"', '人氣商品'),
(5, 7, '時令水果盤', 160, '\"97f3d3ca8da7472d2d8c978e43239fbca9cd257d.webp\"', '人氣商品');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `dessert`
--
ALTER TABLE `dessert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dessert`
--
ALTER TABLE `dessert`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `dessert`
--
ALTER TABLE `dessert`
  ADD CONSTRAINT `dessert_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;

CREATE TABLE `drink` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `drink`
--

INSERT INTO `drink` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(3, 1, '氣泡礦泉水', 120, '\"5e88f8ec1927d8f5fccef1f3475667fe23c6459e.webp\"', NULL),
(3, 2, '鮮榨時令果汁', 180, '\"a3398e17d51d136b0292bbf072e81249becb48b1.webp\"', '人氣商品'),
(3, 3, '特調奶茶', 120, '\"e662779083efde88df0e5bc25861f4e8820db718.webp\"', '人氣商品'),
(3, 4, '美式咖啡', 120, '\"cbbd8356aaab707d4bb3cdec9fc138e5db974251.webp\"', NULL),
(3, 5, '拿鐵咖啡', 120, '\"a4520c17a140d86e3d0d56bbdf70f55097cb6cf3.webp\"', '人氣商品'),
(3, 6, '熱伯爵茶', 120, '\"2f0ff7df2651f4d30cf35da04fd593d820a87ce3.webp\"', '人氣商品'),
(3, 7, '可口可樂', 40, '\"4afed9f0f036b0a5e19b9d000770a46e964729c3.webp\"', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `drink`
--
ALTER TABLE `drink`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `drink`
--
ALTER TABLE `drink`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `drink`
--
ALTER TABLE `drink`
  ADD CONSTRAINT `drink_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;

CREATE TABLE `liquor` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `liquor`
--

INSERT INTO `liquor` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(6, 1, '安柏夫人', 1300, '\"658e07c34e0ebf24035c42b447ac50b6cc067abc.webp\"', '人氣商品'),
(6, 2, '金牌台灣啤酒', 110, '\"a1784120bc0ff9c31259ff2ac6794a55edf77ffa.webp\"', NULL),
(6, 3, '金牌生啤酒18天', 150, '\"9d923ae431356566795b0bba5b82801118a7b8de.webp\"', '人氣商品'),
(6, 4, '百威', 110, '\"a03d56d72a433784ac32a1bd59a8f84db86e7892.webp\"', NULL),
(6, 5, '海尼根', 110, '\"827bf1063e6b0c56024701216756fb809d3cfa6d.webp\"', NULL),
(6, 6, '台風精釀啤酒', 200, '\"5f5de66808dfecd64b917b57069295a1c98946a7.webp\"', '人氣商品');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `liquor`
--
ALTER TABLE `liquor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `liquor`
--
ALTER TABLE `liquor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `liquor`
--
ALTER TABLE `liquor`
  ADD CONSTRAINT `liquor_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;

CREATE TABLE `one` (
  `item_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT '[]',
  `popularity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `one` (`item_id`, `id`, `name`, `price`, `image`, `popularity`) VALUES
(2, 1, '招牌功夫雞', 300, '\"2.webp\"', '招牌菜'),
(2, 2, '薄脆蝦笛稣', 320, '\"1.webp\"', '人氣商品'),
(2, 3, '菌菇檸檬蝦', 380, '\"d398461028081cb2be1e7e14a440826a64fadbbb.webp\"', NULL),
(2, 4, '當日季節時蔬', 240, '\"bc39c12aac8a8b399b478a9911d6370abbc6febc.webp\"', NULL),
(2, 5, '草蝦燴時蔬', 340, '\"50a76e74aa9d6db03e476e547051ad8d4481927f.webp\"', NULL),
(2, 6, '臘味雙寶炒飯', 280, '\"66d7d35aa14326d0b0c77aac8bff424fb9f84549.webp\"', NULL),
(2, 7, '本幫紅燒肉', 480, '\"2f5c61d72ff3e97e7a0087060cd99ff4e3c6661e.webp\"', '招牌菜'),
(2, 8, '川味剁椒草蝦', 820, '\"de50fc79dbc96cfadf8106cc9f238e4a899e24bb.webp\"', NULL),
(2, 9, '招牌脆皮豬五花', 780, '\"f7fe79a9e3f2e5ab4c44b9a01e925d754660ca31.webp\"', NULL),
(2, 10, '經典三杯雞', 680, '\"4757af6c38510f42c2a083f5724886ab86d20528.webp\"', NULL),
(2, 11, '經典酥炸蝦球', 620, '\"3c783a3aaf9c61148ea0b8e85a0eefe28a231ae9.webp\"', '人氣商品'),
(2, 12, '家常炒肉絲', 300, '\"816cec51efce545d2cc1eb69692f5c70b5b28da6.webp\"', NULL),
(2, 13, '宮保雞丁', 360, '\"4f494471688117e9d2bb515f0e9ba167f0c0c9ae.webp\"', '招牌菜'),
(2, 14, '乾鍋川味辣炒羊肉', 720, '\"82001735c499d34a64f302c463f74c657642b9c5.webp\"', NULL),
(2, 15, '避風塘炒大蝦', 820, '\"55c8b0d780c0bf992f87c526342dae68946d90a7.webp\"', '人氣商品'),
(2, 16, '冷菜三拼', 250, '\"750b86d25b30a34eedb40d0a8f4f5aa0b3df3b36.webp\"', NULL),
(2, 17, '招牌糖醋魚', 320, '\"e01b9fdc74ee882226004f0e9d71b8ce75d5580a.webp\"', '人氣商品'),
(2, 18, '麻辣擔擔醬熱豆花', 100, '\"8e018ea75a4b77df2b02a060bbe5f370fe76964f.webp\"', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product`
--
ALTER TABLE `one`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `one`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `product`
--
ALTER TABLE `one`
  ADD CONSTRAINT `one_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`);
COMMIT;