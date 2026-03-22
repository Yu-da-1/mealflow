-- ============================================================
-- Recipe seed data (35 recipes)
-- ============================================================
-- recipe_match_key 凡例:
--   egg, milk, tofu, chicken_thigh, chicken_breast, pork_belly,
--   pork_loin, ground_pork, ground_beef, salmon, tuna,
--   spinach, bean_sprouts, cabbage, onion, carrot, potato,
--   tomato, green_onion, ginger, garlic, mushroom, eggplant,
--   bell_pepper, broccoli, lettuce, cucumber, radish, corn,
--   rice, udon, soba, pasta, bread, natto
-- ============================================================

DO $$
DECLARE
  r1  uuid := gen_random_uuid();
  r2  uuid := gen_random_uuid();
  r3  uuid := gen_random_uuid();
  r4  uuid := gen_random_uuid();
  r5  uuid := gen_random_uuid();
  r6  uuid := gen_random_uuid();
  r7  uuid := gen_random_uuid();
  r8  uuid := gen_random_uuid();
  r9  uuid := gen_random_uuid();
  r10 uuid := gen_random_uuid();
  r11 uuid := gen_random_uuid();
  r12 uuid := gen_random_uuid();
  r13 uuid := gen_random_uuid();
  r14 uuid := gen_random_uuid();
  r15 uuid := gen_random_uuid();
  r16 uuid := gen_random_uuid();
  r17 uuid := gen_random_uuid();
  r18 uuid := gen_random_uuid();
  r19 uuid := gen_random_uuid();
  r20 uuid := gen_random_uuid();
  r21 uuid := gen_random_uuid();
  r22 uuid := gen_random_uuid();
  r23 uuid := gen_random_uuid();
  r24 uuid := gen_random_uuid();
  r25 uuid := gen_random_uuid();
  r26 uuid := gen_random_uuid();
  r27 uuid := gen_random_uuid();
  r28 uuid := gen_random_uuid();
  r29 uuid := gen_random_uuid();
  r30 uuid := gen_random_uuid();
  r31 uuid := gen_random_uuid();
  r32 uuid := gen_random_uuid();
  r33 uuid := gen_random_uuid();
  r34 uuid := gen_random_uuid();
  r35 uuid := gen_random_uuid();
BEGIN

-- ============================================================
-- recipes
-- ============================================================
INSERT INTO recipes (id, title, description, category, cooking_time_minutes, is_active) VALUES
  (r1,  '目玉焼き',                   '簡単に作れる定番の目玉焼き。',                         '卵料理',     5,  true),
  (r2,  'スクランブルエッグ',           'ふわふわのスクランブルエッグ。',                         '卵料理',     5,  true),
  (r3,  '卵とほうれん草の炒め',         '卵とほうれん草をさっと炒めた栄養満点の一品。',           '炒め物',     10, true),
  (r4,  '豆腐の味噌汁',               '定番の豆腐と油揚げの味噌汁。',                           '汁物',       10, true),
  (r5,  '麻婆豆腐',                   '豆腐とひき肉を使った本格麻婆豆腐。',                     '中華',       20, true),
  (r6,  '鶏のから揚げ',               'ジューシーな鶏もも肉のから揚げ。',                       '揚げ物',     25, true),
  (r7,  '親子丼',                     '鶏もも肉と卵でつくる親子丼。',                           '丼もの',     20, true),
  (r8,  '豚の生姜焼き',               '豚ロースと生姜で作る定番の生姜焼き。',                   '炒め物',     15, true),
  (r9,  'ほうれん草のお浸し',          'ほうれん草を茹でてめんつゆで和えたシンプルな一品。',     '和え物',     10, true),
  (r10, 'もやしの炒め',               'もやしをさっと炒めたヘルシーな副菜。',                   '炒め物',     5,  true),
  (r11, 'ポテトサラダ',               'じゃがいもとにんじんで作るポテトサラダ。',               'サラダ',     25, true),
  (r12, '肉じゃが',                   'じゃがいもと牛肉の定番煮物。',                           '煮物',       35, true),
  (r13, 'トマトと卵の中華炒め',        'トマトと卵を炒めた中華料理の定番。',                     '中華',       10, true),
  (r14, 'キャベツの味噌汁',           'キャベツと豆腐の具だくさん味噌汁。',                     '汁物',       10, true),
  (r15, 'ゴーヤチャンプルー',          '豆腐と卵を使ったゴーヤチャンプルー風炒め。',             '炒め物',     15, true),
  (r16, '野菜炒め',                   '玉ねぎ・にんじん・キャベツのシンプル野菜炒め。',         '炒め物',     10, true),
  (r17, 'オムレツ',                   'ふんわり卵のオムレツ。',                                 '卵料理',     10, true),
  (r18, '鮭の塩焼き',                 'シンプルに塩焼きにした鮭。',                             '焼き物',     15, true),
  (r19, 'きんぴらごぼう風にんじん',    'にんじんを使ったきんぴら風の炒め煮。',                   '副菜',       15, true),
  (r20, 'ほうれん草のバター炒め',      'ほうれん草をバターで炒めたシンプルな副菜。',             '炒め物',     5,  true),
  (r21, '豚キムチ炒め',               '豚バラとキムチを炒めた韓国風炒め物。',                   '韓国料理',   10, true),
  (r22, '卵焼き',                     '甘めの出汁巻き卵焼き。',                                 '卵料理',     10, true),
  (r23, 'しらすとほうれん草のパスタ',  'ほうれん草としらすを使った和風パスタ。',                 'パスタ',     20, true),
  (r24, '豆腐ハンバーグ',             '豆腐と豚ひき肉で作るヘルシーハンバーグ。',               '洋食',       25, true),
  (r25, '鶏胸肉のハーブ焼き',         '鶏胸肉をハーブで香ばしく焼いた一品。',                   '焼き物',     20, true),
  (r26, 'もやしと豚バラのポン酢和え',  'もやしと豚バラをさっと茹でてポン酢で和える。',           '和え物',     10, true),
  (r27, 'オニオンスープ',             '玉ねぎをじっくり炒めて作るオニオンスープ。',             'スープ',     30, true),
  (r28, 'ブロッコリーとベーコンの炒め','ブロッコリーをベーコンと炒めた副菜。',                   '炒め物',     10, true),
  (r29, 'なすとトマトの煮込み',        'なすとトマトを煮込んだ洋風の一品。',                     '煮物',       20, true),
  (r30, '納豆チャーハン',             '納豆を使ったパラパラチャーハン。',                       'ご飯もの',   10, true),
  (r31, '具だくさん豚汁',             '豚バラと野菜たっぷりの豚汁。',                           '汁物',       20, true),
  (r32, '鶏そぼろご飯',               '甘辛い鶏そぼろをのせたご飯。',                           '丼もの',     15, true),
  (r33, 'サーモンのムニエル',          '鮭をバターでソテーしたムニエル。',                       '洋食',       15, true),
  (r34, 'ニラ玉炒め',                 'ニラと卵のシンプルな炒め物。',                           '炒め物',     10, true),
  (r35, 'キャベツとひき肉の重ね煮',    'キャベツと豚ひき肉を重ねて蒸し煮にした一品。',           '煮物',       25, true);

-- ============================================================
-- recipe_ingredients
-- ============================================================
INSERT INTO recipe_ingredients (recipe_id, recipe_match_key, is_required) VALUES
  -- r1 目玉焼き
  (r1, 'egg', true),
  -- r2 スクランブルエッグ
  (r2, 'egg', true),
  (r2, 'milk', false),
  -- r3 卵とほうれん草の炒め
  (r3, 'egg', true),
  (r3, 'spinach', true),
  -- r4 豆腐の味噌汁
  (r4, 'tofu', true),
  -- r5 麻婆豆腐
  (r5, 'tofu', true),
  (r5, 'ground_pork', true),
  (r5, 'ginger', false),
  (r5, 'garlic', false),
  -- r6 鶏のから揚げ
  (r6, 'chicken_thigh', true),
  (r6, 'ginger', false),
  -- r7 親子丼
  (r7, 'chicken_thigh', true),
  (r7, 'egg', true),
  (r7, 'onion', true),
  -- r8 豚の生姜焼き
  (r8, 'pork_loin', true),
  (r8, 'ginger', false),
  -- r9 ほうれん草のお浸し
  (r9, 'spinach', true),
  -- r10 もやしの炒め
  (r10, 'bean_sprouts', true),
  -- r11 ポテトサラダ
  (r11, 'potato', true),
  (r11, 'carrot', true),
  (r11, 'onion', false),
  -- r12 肉じゃが
  (r12, 'potato', true),
  (r12, 'onion', true),
  (r12, 'carrot', true),
  (r12, 'ground_beef', true),
  -- r13 トマトと卵の中華炒め
  (r13, 'tomato', true),
  (r13, 'egg', true),
  -- r14 キャベツの味噌汁
  (r14, 'cabbage', true),
  (r14, 'tofu', false),
  -- r15 ゴーヤチャンプルー風
  (r15, 'tofu', true),
  (r15, 'egg', true),
  (r15, 'pork_belly', false),
  -- r16 野菜炒め
  (r16, 'onion', true),
  (r16, 'carrot', true),
  (r16, 'cabbage', true),
  -- r17 オムレツ
  (r17, 'egg', true),
  -- r18 鮭の塩焼き
  (r18, 'salmon', true),
  -- r19 きんぴら風にんじん
  (r19, 'carrot', true),
  -- r20 ほうれん草のバター炒め
  (r20, 'spinach', true),
  -- r21 豚キムチ炒め
  (r21, 'pork_belly', true),
  (r21, 'bean_sprouts', false),
  -- r22 卵焼き
  (r22, 'egg', true),
  -- r23 しらすとほうれん草のパスタ
  (r23, 'spinach', true),
  (r23, 'pasta', true),
  -- r24 豆腐ハンバーグ
  (r24, 'tofu', true),
  (r24, 'ground_pork', true),
  (r24, 'egg', false),
  -- r25 鶏胸肉のハーブ焼き
  (r25, 'chicken_breast', true),
  (r25, 'garlic', false),
  -- r26 もやしと豚バラのポン酢和え
  (r26, 'bean_sprouts', true),
  (r26, 'pork_belly', true),
  -- r27 オニオンスープ
  (r27, 'onion', true),
  -- r28 ブロッコリーとベーコンの炒め
  (r28, 'broccoli', true),
  -- r29 なすとトマトの煮込み
  (r29, 'eggplant', true),
  (r29, 'tomato', true),
  -- r30 納豆チャーハン
  (r30, 'natto', true),
  (r30, 'egg', true),
  (r30, 'green_onion', false),
  -- r31 具だくさん豚汁
  (r31, 'pork_belly', true),
  (r31, 'potato', true),
  (r31, 'carrot', true),
  (r31, 'onion', true),
  (r31, 'tofu', false),
  -- r32 鶏そぼろご飯
  (r32, 'ground_pork', true),
  (r32, 'egg', true),
  (r32, 'green_onion', false),
  -- r33 サーモンのムニエル
  (r33, 'salmon', true),
  -- r34 ニラ玉炒め
  (r34, 'egg', true),
  (r34, 'green_onion', true),
  -- r35 キャベツとひき肉の重ね煮
  (r35, 'cabbage', true),
  (r35, 'ground_pork', true);

END $$;
