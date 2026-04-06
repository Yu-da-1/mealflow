-- ============================================================
-- Food master seed data (36 items, part 1 of 3)
-- ============================================================
INSERT INTO food_masters (display_name, category, subcategory, recipe_match_key, parent_recipe_match_key, default_expiry_type, default_expiry_days, aliases, is_active) VALUES
  ('卵',         '野菜',       NULL,       'egg',            NULL, 'best_before', 14,  '{}', true),
  ('牛乳',       '乳製品',     NULL,       'milk',           NULL, 'best_before',  7,  '{}', true),
  ('豆腐',       '大豆製品',   NULL,       'tofu',           NULL, 'use_by',       5,  '{}', true),
  ('鶏もも肉',   '肉類',       '鶏肉',     'chicken_thigh',  'chicken', 'use_by',       3,  '{}', true),
  ('鶏むね肉',   '肉類',       '鶏肉',     'chicken_breast', 'chicken', 'use_by',       3,  '{}', true),
  ('豚バラ肉',   '肉類',       '豚肉',     'pork_belly',     'pork',    'use_by',       3,  '{}', true),
  ('豚ロース',   '肉類',       '豚肉',     'pork_loin',      'pork',    'use_by',       3,  '{}', true),
  ('豚ひき肉',   '肉類',       '豚肉',     'ground_pork',    'pork',    'use_by',       3,  '{}', true),
  ('牛ひき肉',   '肉類',       '牛肉',     'ground_beef',    'beef',    'use_by',       3,  '{}', true),
  ('鮭',         '魚介類',     NULL,       'salmon',         'fish',    'use_by',       2,  '{}', true),
  ('まぐろ',     '魚介類',     NULL,       'tuna',           'fish',    'use_by',       2,  '{}', true),
  ('ほうれん草', '野菜',       '葉物',     'spinach',        NULL, 'best_before',  5,  '{}', true),
  ('もやし',     '野菜',       NULL,       'bean_sprouts',   NULL, 'use_by',       3,  '{}', true),
  ('キャベツ',   '野菜',       '葉物',     'cabbage',        NULL, 'best_before', 14,  '{}', true),
  ('玉ねぎ',     '野菜',       NULL,       'onion',          NULL, 'best_before', 30,  '{}', true),
  ('にんじん',   '野菜',       NULL,       'carrot',         NULL, 'best_before', 21,  '{}', true),
  ('じゃがいも', '野菜',       NULL,       'potato',         NULL, 'best_before', 30,  '{}', true),
  ('トマト',     '野菜',       NULL,       'tomato',         NULL, 'best_before',  7,  '{}', true),
  ('長ねぎ',     '野菜',       '葉物',     'green_onion',    NULL, 'best_before',  7,  '{}', true),
  ('しょうが',   '野菜',       '香味野菜', 'ginger',         NULL, 'best_before', 14,  '{}', true),
  ('にんにく',   '野菜',       '香味野菜', 'garlic',         NULL, 'best_before', 30,  '{}', true),
  ('しいたけ',   'きのこ',     NULL,       'mushroom',       NULL, 'best_before',  5,  '{}', true),
  ('なす',       '野菜',       NULL,       'eggplant',       NULL, 'best_before',  5,  '{}', true),
  ('ピーマン',   '野菜',       NULL,       'bell_pepper',    NULL, 'best_before',  7,  '{}', true),
  ('ブロッコリー','野菜',       NULL,       'broccoli',       NULL, 'best_before',  7,  '{}', true),
  ('レタス',     '野菜',       '葉物',     'lettuce',        NULL, 'best_before',  5,  '{}', true),
  ('きゅうり',   '野菜',       NULL,       'cucumber',       NULL, 'best_before',  5,  '{}', true),
  ('大根',       '野菜',       NULL,       'radish',         NULL, 'best_before', 14,  '{}', true),
  ('とうもろこし','野菜',       NULL,       'corn',           NULL, 'best_before',  3,  '{}', true),
  ('白米',       '穀類',       NULL,       'rice',           NULL, 'best_before', 365, '{}', true),
  ('うどん',     '麺類',       NULL,       'udon',           NULL, 'best_before',  3,  '{}', true),
  ('そば',       '麺類',       NULL,       'soba',           NULL, 'best_before',  3,  '{}', true),
  ('パスタ',     '麺類',       NULL,       'pasta',          NULL, 'best_before', 730, '{}', true),
  ('食パン',     'パン',       NULL,       'bread',          NULL, 'best_before',  5,  '{}', true),
  ('納豆',       '大豆製品',   NULL,       'natto',          NULL, 'best_before',  7,  '{}', true),
  ('豚こま切れ肉','肉類',      '豚肉',     'pork_bits',      'pork',    'use_by',       3,  '{}', true);

-- ============================================================
-- Food master seed data (additional 64 items → total 100, part 2 of 3)
-- ============================================================
INSERT INTO food_masters (display_name, category, subcategory, recipe_match_key, parent_recipe_match_key, default_expiry_type, default_expiry_days, aliases, is_active) VALUES
  -- 肉類追加
  ('鶏ひき肉',       '肉類',     '鶏肉',     'ground_chicken',       'chicken',  'use_by',       3,   '{}', true),
  -- 野菜類
  ('小松菜',         '野菜',     '葉物',     'komatsuna',            NULL,       'best_before',  5,   '{}', true),
  ('白菜',           '野菜',     '葉物',     'chinese_cabbage',      NULL,       'best_before',  14,  '{}', true),
  ('ごぼう',         '野菜',     NULL,       'burdock',              NULL,       'best_before',  14,  '{}', true),
  ('さつまいも',     '野菜',     NULL,       'sweet_potato',         NULL,       'best_before',  30,  '{}', true),
  ('かぼちゃ',       '野菜',     NULL,       'pumpkin',              NULL,       'best_before',  30,  '{}', true),
  ('アスパラガス',   '野菜',     NULL,       'asparagus',            NULL,       'best_before',  5,   '{}', true),
  ('豆苗',           '野菜',     '葉物',     'pea_sprouts',          NULL,       'best_before',  3,   '{}', true),
  ('水菜',           '野菜',     '葉物',     'mizuna',               NULL,       'best_before',  5,   '{}', true),
  ('チンゲン菜',     '野菜',     '葉物',     'bok_choy',             NULL,       'best_before',  5,   '{}', true),
  ('セロリ',         '野菜',     NULL,       'celery',               NULL,       'best_before',  14,  '{}', true),
  ('パプリカ',       '野菜',     NULL,       'paprika',              NULL,       'best_before',  7,   '{}', true),
  ('さやいんげん',   '野菜',     NULL,       'green_beans',          NULL,       'best_before',  5,   '{}', true),
  ('オクラ',         '野菜',     NULL,       'okra',                 NULL,       'best_before',  3,   '{}', true),
  ('ズッキーニ',     '野菜',     NULL,       'zucchini',             NULL,       'best_before',  7,   '{}', true),
  ('春菊',           '野菜',     '葉物',     'chrysanthemum_greens', NULL,       'best_before',  5,   '{}', true),
  ('れんこん',       '野菜',     NULL,       'lotus_root',           NULL,       'best_before',  7,   '{}', true),
  ('里芋',           '野菜',     NULL,       'taro',                 NULL,       'best_before',  14,  '{}', true),
  ('スナップえんどう','野菜',    NULL,       'snap_peas',            NULL,       'best_before',  5,   '{}', true),
  ('枝豆',           '野菜',     '豆類',     'edamame',              NULL,       'best_before',  3,   '{}', true),
  -- きのこ類
  ('えのき',         'きのこ',   NULL,       'enoki',                NULL,       'best_before',  5,   '{}', true),
  ('エリンギ',       'きのこ',   NULL,       'eringi',               NULL,       'best_before',  7,   '{}', true),
  ('まいたけ',       'きのこ',   NULL,       'maitake',              NULL,       'best_before',  5,   '{}', true),
  ('なめこ',         'きのこ',   NULL,       'nameko',               NULL,       'best_before',  3,   '{}', true),
  -- 魚介類
  ('あじ',           '魚介類',   NULL,       'aji',                  'fish',     'use_by',       2,   '{}', true),
  ('さば',           '魚介類',   NULL,       'mackerel',             'fish',     'use_by',       2,   '{}', true),
  ('いわし',         '魚介類',   NULL,       'sardine',              'fish',     'use_by',       2,   '{}', true),
  ('えび',           '魚介類',   NULL,       'shrimp',               NULL,       'use_by',       2,   '{}', true),
  ('ほたて',         '魚介類',   NULL,       'scallop',              NULL,       'use_by',       2,   '{}', true),
  ('あさり',         '魚介類',   NULL,       'clams',                NULL,       'use_by',       2,   '{}', true),
  ('たら',           '魚介類',   NULL,       'cod',                  'fish',     'use_by',       2,   '{}', true),
  ('ぶり',           '魚介類',   NULL,       'yellowtail',           'fish',     'use_by',       2,   '{}', true),
  ('いか',           '魚介類',   NULL,       'squid',                NULL,       'use_by',       2,   '{}', true),
  ('しらす',         '魚介類',   NULL,       'shirasu',              NULL,       'best_before',  3,   '{}', true),
  -- 乳製品
  ('バター',         '乳製品',   NULL,       'butter',               NULL,       'best_before',  30,  '{}', true),
  ('チーズ',         '乳製品',   NULL,       'cheese',               NULL,       'best_before',  14,  '{}', true),
  ('スライスチーズ', '乳製品',   NULL,       'sliced_cheese',        NULL,       'best_before',  21,  '{}', true),
  ('ヨーグルト',     '乳製品',   NULL,       'yogurt',               NULL,       'best_before',  14,  '{}', true),
  ('生クリーム',     '乳製品',   NULL,       'heavy_cream',          NULL,       'best_before',  7,   '{}', true),
  -- 大豆製品・加工食品
  ('豆乳',           '大豆製品', NULL,       'soy_milk',             NULL,       'best_before',  7,   '{}', true),
  ('厚揚げ',         '大豆製品', NULL,       'thick_fried_tofu',     NULL,       'use_by',       3,   '{}', true),
  ('油揚げ',         '大豆製品', NULL,       'aburaage',             NULL,       'best_before',  5,   '{}', true),
  ('高野豆腐',       '大豆製品', NULL,       'freeze_dried_tofu',    NULL,       'best_before',  365, '{}', true),
  ('ちくわ',         '加工食品', NULL,       'chikuwa',              NULL,       'best_before',  7,   '{}', true),
  ('さつま揚げ',     '加工食品', NULL,       'satsuma_age',          NULL,       'best_before',  5,   '{}', true),
  ('ハム',           '加工食品', NULL,       'ham',                  NULL,       'best_before',  7,   '{}', true),
  ('ベーコン',       '加工食品', NULL,       'bacon',                NULL,       'best_before',  7,   '{}', true),
  ('ウィンナー',     '加工食品', NULL,       'sausage',              NULL,       'best_before',  7,   '{}', true),
  ('こんにゃく',     '加工食品', NULL,       'konjac',               NULL,       'best_before',  7,   '{}', true),
  ('しらたき',       '加工食品', NULL,       'shirataki',            NULL,       'best_before',  7,   '{}', true),
  ('かまぼこ',       '加工食品', NULL,       'kamaboko',             NULL,       'best_before',  5,   '{}', true),
  -- 缶詰
  ('サバ缶',         '缶詰',     NULL,       'canned_mackerel',      NULL,       'best_before',  1095,'{}', true),
  ('ツナ缶',         '缶詰',     NULL,       'canned_tuna',          NULL,       'best_before',  1095,'{}', true),
  ('コーン缶',       '缶詰',     NULL,       'canned_corn',          NULL,       'best_before',  1095,'{}', true),
  ('トマト缶',       '缶詰',     NULL,       'canned_tomato',        NULL,       'best_before',  730, '{}', true),
  -- 豆類
  ('ミックスビーンズ','缶詰',    '豆類',     'mixed_beans',          NULL,       'best_before',  1095,'{}', true),
  ('ひよこ豆',       '缶詰',     '豆類',     'chickpeas',            NULL,       'best_before',  1095,'{}', true),
  ('大豆（水煮）',   '大豆製品', NULL,       'boiled_soybeans',      NULL,       'best_before',  5,   '{}', true),
  -- 麺類・主食
  ('中華麺',         '麺類',     NULL,       'chinese_noodles',      NULL,       'best_before',  3,   '{}', true),
  ('素麺',           '麺類',     NULL,       'somen',                NULL,       'best_before',  730, '{}', true),
  ('春雨',           '麺類',     NULL,       'glass_noodles',        NULL,       'best_before',  365, '{}', true),
  ('もち',           '穀類',     NULL,       'mochi',                NULL,       'best_before',  30,  '{}', true),
  -- 果物・その他
  ('レモン',         '果物',     NULL,       'lemon',                NULL,       'best_before',  14,  '{}', true),
  ('アボカド',       '果物',     NULL,       'avocado',              NULL,       'best_before',  3,   '{}', true);

-- ============================================================
-- Food master seed data (additional 200 items → total 300, part 3 of 3)
-- ============================================================
INSERT INTO food_masters (display_name, category, subcategory, recipe_match_key, parent_recipe_match_key, default_expiry_type, default_expiry_days, aliases, is_active) VALUES

  -- ▼ 調味料・ソース類 (35 items)
  ('醤油',               '調味料',   NULL,       'soy_sauce',            NULL,       'best_before',  540, '{}', true),
  ('薄口醤油',           '調味料',   NULL,       'light_soy_sauce',      NULL,       'best_before',  540, '{}', true),
  ('みそ（赤）',         '調味料',   NULL,       'red_miso',             'miso',     'best_before',  365, '{}', true),
  ('みそ（白）',         '調味料',   NULL,       'white_miso',           'miso',     'best_before',  365, '{}', true),
  ('合わせみそ',         '調味料',   NULL,       'blended_miso',         'miso',     'best_before',  365, '{}', true),
  ('みりん',             '調味料',   NULL,       'mirin',                NULL,       'best_before',  730, '{}', true),
  ('料理酒',             '調味料',   NULL,       'cooking_sake',         NULL,       'best_before',  365, '{}', true),
  ('酢',                 '調味料',   NULL,       'vinegar',              NULL,       'best_before',  730, '{}', true),
  ('砂糖',               '調味料',   NULL,       'sugar',                NULL,       'best_before',  1825,'{}', true),
  ('塩',                 '調味料',   NULL,       'salt',                 NULL,       'best_before',  1825,'{}', true),
  ('サラダ油',           '調味料',   '油',       'salad_oil',            'oil',      'best_before',  365, '{}', true),
  ('ごま油',             '調味料',   '油',       'sesame_oil',           'oil',      'best_before',  365, '{}', true),
  ('オリーブオイル',     '調味料',   '油',       'olive_oil',            'oil',      'best_before',  365, '{}', true),
  ('ポン酢',             '調味料',   NULL,       'ponzu',                NULL,       'best_before',  180, '{}', true),
  ('めんつゆ',           '調味料',   NULL,       'mentsuyu',             NULL,       'best_before',  365, '{}', true),
  ('マヨネーズ',         '調味料',   NULL,       'mayonnaise',           NULL,       'best_before',  270, '{}', true),
  ('ケチャップ',         '調味料',   NULL,       'ketchup',              NULL,       'best_before',  270, '{}', true),
  ('ウスターソース',     '調味料',   NULL,       'worcestershire_sauce', NULL,       'best_before',  365, '{}', true),
  ('中濃ソース',         '調味料',   NULL,       'tonkatsu_sauce',       NULL,       'best_before',  365, '{}', true),
  ('豆板醤',             '調味料',   NULL,       'doubanjiang',          NULL,       'best_before',  365, '{}', true),
  ('オイスターソース',   '調味料',   NULL,       'oyster_sauce',         NULL,       'best_before',  365, '{}', true),
  ('鶏がらスープの素',   '調味料',   NULL,       'chicken_stock_powder', NULL,       'best_before',  730, '{}', true),
  ('コンソメ（顆粒）',   '調味料',   NULL,       'consomme',             NULL,       'best_before',  730, '{}', true),
  ('和風だしの素',       '調味料',   NULL,       'dashi_powder',         NULL,       'best_before',  730, '{}', true),
  ('カレー粉',           '調味料',   'スパイス', 'curry_powder',         NULL,       'best_before',  730, '{}', true),
  ('カレールー',         '調味料',   NULL,       'curry_roux',           NULL,       'best_before',  730, '{}', true),
  ('白だし',             '調味料',   NULL,       'white_dashi',          NULL,       'best_before',  180, '{}', true),
  ('焼肉のタレ',         '調味料',   NULL,       'yakiniku_sauce',       NULL,       'best_before',  365, '{}', true),
  ('にんにくチューブ',   '調味料',   NULL,       'garlic_tube',          NULL,       'best_before',  90,  '{}', true),
  ('しょうがチューブ',   '調味料',   NULL,       'ginger_tube',          NULL,       'best_before',  90,  '{}', true),
  ('からし',             '調味料',   NULL,       'mustard',              NULL,       'best_before',  180, '{}', true),
  ('甜麺醤',             '調味料',   NULL,       'tian_mian_jiang',      NULL,       'best_before',  365, '{}', true),
  ('ナンプラー',         '調味料',   NULL,       'fish_sauce',           NULL,       'best_before',  730, '{}', true),
  ('塩麹',               '調味料',   NULL,       'shio_koji',            NULL,       'best_before',  180, '{}', true),
  ('ラー油',             '調味料',   '油',       'chili_oil',            'oil',      'best_before',  365, '{}', true),

  -- ▼ 乾物・粉類 (18 items)
  ('薄力粉',             '粉類',     NULL,       'cake_flour',           'flour',    'best_before',  365, '{}', true),
  ('強力粉',             '粉類',     NULL,       'bread_flour',          'flour',    'best_before',  365, '{}', true),
  ('片栗粉',             '粉類',     NULL,       'starch',               NULL,       'best_before',  730, '{}', true),
  ('コーンスターチ',     '粉類',     NULL,       'corn_starch',          NULL,       'best_before',  730, '{}', true),
  ('パン粉',             '粉類',     NULL,       'bread_crumbs',         NULL,       'best_before',  180, '{}', true),
  ('かつお節',           '乾物',     NULL,       'bonito_flakes',        NULL,       'best_before',  180, '{}', true),
  ('昆布',               '乾物',     '海藻',     'konbu',                NULL,       'best_before',  730, '{}', true),
  ('乾燥わかめ',         '乾物',     '海藻',     'dried_wakame',         NULL,       'best_before',  730, '{}', true),
  ('焼きのり',           '乾物',     '海藻',     'nori',                 NULL,       'best_before',  180, '{}', true),
  ('刻みのり',           '乾物',     '海藻',     'shredded_nori',        NULL,       'best_before',  90,  '{}', true),
  ('白ごま',             '乾物',     NULL,       'white_sesame',         'sesame',   'best_before',  365, '{}', true),
  ('黒ごま',             '乾物',     NULL,       'black_sesame',         'sesame',   'best_before',  365, '{}', true),
  ('練りごま',           '乾物',     NULL,       'sesame_paste',         'sesame',   'best_before',  365, '{}', true),
  ('干しシイタケ',       '乾物',     'きのこ',   'dried_shiitake',       NULL,       'best_before',  365, '{}', true),
  ('乾燥桜えび',         '乾物',     NULL,       'dried_sakura_shrimp',  NULL,       'best_before',  180, '{}', true),
  ('乾燥ひじき',         '乾物',     '海藻',     'dried_hijiki',         NULL,       'best_before',  730, '{}', true),
  ('切り干し大根',       '乾物',     NULL,       'dried_daikon',         NULL,       'best_before',  365, '{}', true),
  ('オートミール',       '穀類',     NULL,       'oatmeal',              NULL,       'best_before',  365, '{}', true),

  -- ▼ 牛肉追加 (5 items)
  ('牛ロース',           '肉類',     '牛肉',     'beef_loin',            'beef',     'use_by',       3,   '{}', true),
  ('牛バラ肉',           '肉類',     '牛肉',     'beef_belly',           'beef',     'use_by',       3,   '{}', true),
  ('牛もも肉',           '肉類',     '牛肉',     'beef_thigh',           'beef',     'use_by',       3,   '{}', true),
  ('牛肩ロース',         '肉類',     '牛肉',     'beef_shoulder',        'beef',     'use_by',       3,   '{}', true),
  ('牛すじ肉',           '肉類',     '牛肉',     'beef_tendon',          'beef',     'use_by',       3,   '{}', true),

  -- ▼ 鶏肉追加 (3 items)
  ('鶏ささみ',           '肉類',     '鶏肉',     'chicken_tender',       'chicken',  'use_by',       2,   '{}', true),
  ('手羽先',             '肉類',     '鶏肉',     'chicken_wing_tip',     'chicken',  'use_by',       3,   '{}', true),
  ('手羽元',             '肉類',     '鶏肉',     'chicken_wing',         'chicken',  'use_by',       3,   '{}', true),

  -- ▼ 豚肉追加 (3 items)
  ('豚しゃぶしゃぶ用',   '肉類',     '豚肉',     'pork_shabu',           'pork',     'use_by',       2,   '{}', true),
  ('豚肩ロース',         '肉類',     '豚肉',     'pork_shoulder',        'pork',     'use_by',       3,   '{}', true),
  ('豚スペアリブ',       '肉類',     '豚肉',     'pork_spare_ribs',      'pork',     'use_by',       3,   '{}', true),

  -- ▼ その他肉類 (6 items)
  ('ラム肉',             '肉類',     'ラム',     'lamb',                 NULL,       'use_by',       3,   '{}', true),
  ('鶏レバー',           '肉類',     '鶏肉',     'chicken_liver',        'chicken',  'use_by',       2,   '{}', true),
  ('豚レバー',           '肉類',     '豚肉',     'pork_liver',           'pork',     'use_by',       2,   '{}', true),
  ('砂肝',               '肉類',     '鶏肉',     'gizzard',              'chicken',  'use_by',       2,   '{}', true),
  ('牛タン',             '肉類',     '牛肉',     'beef_tongue',          'beef',     'use_by',       3,   '{}', true),
  ('鶏皮',               '肉類',     '鶏肉',     'chicken_skin',         'chicken',  'use_by',       2,   '{}', true),

  -- ▼ 魚介類追加 (14 items)
  ('たこ',               '魚介類',   NULL,       'octopus',              NULL,       'use_by',       2,   '{}', true),
  ('牡蠣',               '魚介類',   NULL,       'oyster',               NULL,       'use_by',       2,   '{}', true),
  ('はんぺん',           '加工食品', NULL,       'hanpen',               NULL,       'best_before',  7,   '{}', true),
  ('ししゃも',           '魚介類',   NULL,       'shishamo',             'fish',     'best_before',  5,   '{}', true),
  ('さわら',             '魚介類',   NULL,       'sawara',               'fish',     'use_by',       2,   '{}', true),
  ('ほっけ',             '魚介類',   NULL,       'hokke',                'fish',     'use_by',       2,   '{}', true),
  ('うなぎ（蒲焼き）',   '魚介類',   NULL,       'eel',                  NULL,       'best_before',  3,   '{}', true),
  ('鮭フレーク',         '加工食品', NULL,       'salmon_flakes',        NULL,       'best_before',  14,  '{}', true),
  ('鮭缶',               '缶詰',     NULL,       'canned_salmon',        NULL,       'best_before',  1095,'{}', true),
  ('あじの干物',         '魚介類',   NULL,       'dried_aji',            'fish',     'best_before',  5,   '{}', true),
  ('にしん',             '魚介類',   NULL,       'herring',              'fish',     'use_by',       2,   '{}', true),
  ('かに（むき身）',     '魚介類',   NULL,       'crab',                 NULL,       'use_by',       2,   '{}', true),
  ('かにかま',           '加工食品', NULL,       'fish_cake',            NULL,       'best_before',  7,   '{}', true),
  ('ホタルイカ',         '魚介類',   NULL,       'firefly_squid',        NULL,       'use_by',       2,   '{}', true),

  -- ▼ 乳製品追加 (6 items)
  ('粉チーズ',           '乳製品',   NULL,       'parmesan',             'cheese',   'best_before',  90,  '{}', true),
  ('クリームチーズ',     '乳製品',   NULL,       'cream_cheese',         'cheese',   'best_before',  14,  '{}', true),
  ('モッツァレラチーズ', '乳製品',   NULL,       'mozzarella',           'cheese',   'best_before',  7,   '{}', true),
  ('プロセスチーズ',     '乳製品',   NULL,       'processed_cheese',     'cheese',   'best_before',  21,  '{}', true),
  ('スキムミルク',       '乳製品',   NULL,       'skim_milk',            NULL,       'best_before',  365, '{}', true),
  ('コンデンスミルク',   '乳製品',   NULL,       'condensed_milk',       NULL,       'best_before',  365, '{}', true),

  -- ▼ 野菜追加（ハーブ含む）(22 items)
  ('にら',               '野菜',     '葉物',     'nira',                 NULL,       'best_before',  5,   '{}', true),
  ('長芋',               '野菜',     NULL,       'yam',                  NULL,       'best_before',  14,  '{}', true),
  ('カリフラワー',       '野菜',     NULL,       'cauliflower',          NULL,       'best_before',  7,   '{}', true),
  ('絹さや',             '野菜',     '豆類',     'snow_peas',            NULL,       'best_before',  5,   '{}', true),
  ('グリーンピース',     '野菜',     '豆類',     'green_peas',           NULL,       'best_before',  5,   '{}', true),
  ('大葉',               '野菜',     '香味野菜', 'shiso',                NULL,       'best_before',  5,   '{}', true),
  ('みつば',             '野菜',     '葉物',     'mitsuba',              NULL,       'best_before',  5,   '{}', true),
  ('バジル',             '野菜',     'ハーブ',   'basil',                NULL,       'best_before',  5,   '{}', true),
  ('パセリ',             '野菜',     'ハーブ',   'parsley',              NULL,       'best_before',  7,   '{}', true),
  ('プチトマト',         '野菜',     NULL,       'cherry_tomato',        NULL,       'best_before',  7,   '{}', true),
  ('かぶ',               '野菜',     NULL,       'turnip',               NULL,       'best_before',  7,   '{}', true),
  ('菜の花',             '野菜',     '葉物',     'rape_blossom',         NULL,       'best_before',  5,   '{}', true),
  ('ルッコラ',           '野菜',     '葉物',     'arugula',              NULL,       'best_before',  5,   '{}', true),
  ('かいわれ大根',       '野菜',     'スプラウト','daikon_sprouts',       NULL,       'best_before',  5,   '{}', true),
  ('鷹の爪',             '野菜',     '香味野菜', 'chili_pepper',         NULL,       'best_before',  30,  '{}', true),
  ('みょうが',           '野菜',     '香味野菜', 'myoga',                NULL,       'best_before',  7,   '{}', true),
  ('芽キャベツ',         '野菜',     NULL,       'brussel_sprouts',      NULL,       'best_before',  7,   '{}', true),
  ('万能ねぎ',           '野菜',     '葉物',     'thin_green_onion',     NULL,       'best_before',  7,   '{}', true),
  ('にんにくの芽',       '野菜',     '香味野菜', 'garlic_shoots',        NULL,       'best_before',  5,   '{}', true),
  ('サニーレタス',       '野菜',     '葉物',     'red_leaf_lettuce',     NULL,       'best_before',  5,   '{}', true),
  ('ゴーヤ',             '野菜',     NULL,       'bitter_melon',         NULL,       'best_before',  5,   '{}', true),
  ('ししとう',           '野菜',     NULL,       'shishito',             NULL,       'best_before',  5,   '{}', true),

  -- ▼ 果物 (12 items)
  ('りんご',             '果物',     NULL,       'apple',                NULL,       'best_before',  30,  '{}', true),
  ('バナナ',             '果物',     NULL,       'banana',               NULL,       'best_before',  7,   '{}', true),
  ('みかん',             '果物',     NULL,       'mandarin',             NULL,       'best_before',  14,  '{}', true),
  ('いちご',             '果物',     NULL,       'strawberry',           NULL,       'best_before',  5,   '{}', true),
  ('桃',                 '果物',     NULL,       'peach',                NULL,       'best_before',  5,   '{}', true),
  ('梨',                 '果物',     NULL,       'pear',                 NULL,       'best_before',  14,  '{}', true),
  ('ぶどう',             '果物',     NULL,       'grapes',               NULL,       'best_before',  7,   '{}', true),
  ('キウイ',             '果物',     NULL,       'kiwi',                 NULL,       'best_before',  7,   '{}', true),
  ('グレープフルーツ',   '果物',     NULL,       'grapefruit',           NULL,       'best_before',  14,  '{}', true),
  ('ブルーベリー',       '果物',     NULL,       'blueberry',            NULL,       'best_before',  5,   '{}', true),
  ('マンゴー',           '果物',     NULL,       'mango',                NULL,       'best_before',  5,   '{}', true),
  ('メロン',             '果物',     NULL,       'melon',                NULL,       'best_before',  5,   '{}', true),

  -- ▼ パン・穀類追加 (6 items)
  ('バゲット',           'パン',     NULL,       'baguette',             'bread',    'best_before',  3,   '{}', true),
  ('ロールパン',         'パン',     NULL,       'roll_bread',           'bread',    'best_before',  5,   '{}', true),
  ('玄米',               '穀類',     NULL,       'brown_rice',           'rice',     'best_before',  365, '{}', true),
  ('もち麦',             '穀類',     NULL,       'barley_rice',          NULL,       'best_before',  365, '{}', true),
  ('米粉',               '粉類',     NULL,       'rice_flour',           'flour',    'best_before',  365, '{}', true),
  ('十六穀米',           '穀類',     NULL,       'multigrain_rice',      'rice',     'best_before',  365, '{}', true),

  -- ▼ 冷凍食品 (8 items)
  ('冷凍コーン',         '冷凍食品', NULL,       'frozen_corn',          NULL,       'best_before',  365, '{}', true),
  ('冷凍枝豆',           '冷凍食品', NULL,       'frozen_edamame',       NULL,       'best_before',  365, '{}', true),
  ('冷凍ほうれん草',     '冷凍食品', NULL,       'frozen_spinach',       NULL,       'best_before',  365, '{}', true),
  ('冷凍餃子',           '冷凍食品', NULL,       'frozen_gyoza',         NULL,       'best_before',  180, '{}', true),
  ('冷凍うどん',         '冷凍食品', NULL,       'frozen_udon',          NULL,       'best_before',  180, '{}', true),
  ('冷凍シーフードミックス','冷凍食品',NULL,     'frozen_seafood_mix',   NULL,       'best_before',  365, '{}', true),
  ('冷凍えび',           '冷凍食品', NULL,       'frozen_shrimp',        NULL,       'best_before',  365, '{}', true),
  ('冷凍ブロッコリー',   '冷凍食品', NULL,       'frozen_broccoli',      NULL,       'best_before',  365, '{}', true),

  -- ▼ 保存食・惣菜系追加 (13 items)
  ('明太子',             '魚介類',   NULL,       'mentaiko',             NULL,       'use_by',       7,   '{}', true),
  ('たらこ',             '魚介類',   NULL,       'tarako',               NULL,       'use_by',       7,   '{}', true),
  ('梅干し',             '加工食品', NULL,       'umeboshi',             NULL,       'best_before',  365, '{}', true),
  ('キムチ',             '加工食品', NULL,       'kimchi',               NULL,       'best_before',  30,  '{}', true),
  ('ザーサイ',           '加工食品', NULL,       'zha_cai',              NULL,       'best_before',  180, '{}', true),
  ('メンマ',             '加工食品', NULL,       'menma',                NULL,       'best_before',  14,  '{}', true),
  ('筍（水煮）',         '缶詰',     NULL,       'bamboo_shoot',         NULL,       'best_before',  730, '{}', true),
  ('うに',               '魚介類',   NULL,       'sea_urchin',           NULL,       'use_by',       2,   '{}', true),
  ('いくら',             '魚介類',   NULL,       'salmon_roe',           NULL,       'use_by',       7,   '{}', true),
  ('塩辛',               '魚介類',   NULL,       'salted_squid',         NULL,       'best_before',  14,  '{}', true),
  ('焼き鳥缶',           '缶詰',     NULL,       'canned_yakitori',      NULL,       'best_before',  1095,'{}', true),
  ('デミグラスソース缶', '缶詰',     NULL,       'canned_demi_glace',    NULL,       'best_before',  1095,'{}', true),
  ('コーンビーフ缶',     '缶詰',     NULL,       'canned_corned_beef',   NULL,       'best_before',  1095,'{}', true),

  -- ▼ スパイス・乾燥ハーブ (13 items)
  ('黒こしょう',         'スパイス', NULL,       'black_pepper',         'pepper',   'best_before',  730, '{}', true),
  ('白こしょう',         'スパイス', NULL,       'white_pepper',         'pepper',   'best_before',  730, '{}', true),
  ('一味唐辛子',         'スパイス', NULL,       'ichimi',               NULL,       'best_before',  365, '{}', true),
  ('七味唐辛子',         'スパイス', NULL,       'shichimi',             NULL,       'best_before',  365, '{}', true),
  ('シナモン',           'スパイス', NULL,       'cinnamon',             NULL,       'best_before',  730, '{}', true),
  ('クミン',             'スパイス', NULL,       'cumin',                NULL,       'best_before',  730, '{}', true),
  ('ターメリック',       'スパイス', NULL,       'turmeric',             NULL,       'best_before',  730, '{}', true),
  ('ナツメグ',           'スパイス', NULL,       'nutmeg',               NULL,       'best_before',  730, '{}', true),
  ('ローリエ',           'スパイス', NULL,       'bay_leaf',             NULL,       'best_before',  730, '{}', true),
  ('乾燥バジル',         'スパイス', NULL,       'dried_basil',          NULL,       'best_before',  730, '{}', true),
  ('オレガノ',           'スパイス', NULL,       'oregano',              NULL,       'best_before',  730, '{}', true),
  ('ローズマリー',       'スパイス', NULL,       'rosemary',             NULL,       'best_before',  730, '{}', true),
  ('コリアンダー',       'スパイス', NULL,       'coriander',            NULL,       'best_before',  730, '{}', true),

  -- ▼ ナッツ・乾燥豆 (8 items)
  ('アーモンド',         'ナッツ',   NULL,       'almond',               'nut',      'best_before',  180, '{}', true),
  ('くるみ',             'ナッツ',   NULL,       'walnut',               'nut',      'best_before',  90,  '{}', true),
  ('ピーナッツ',         'ナッツ',   NULL,       'peanut',               'nut',      'best_before',  180, '{}', true),
  ('カシューナッツ',     'ナッツ',   NULL,       'cashew',               'nut',      'best_before',  180, '{}', true),
  ('黒豆',               '大豆製品', '豆類',     'black_bean',           NULL,       'best_before',  365, '{}', true),
  ('小豆',               '乾物',     '豆類',     'azuki',                NULL,       'best_before',  365, '{}', true),
  ('レンズ豆',           '乾物',     '豆類',     'lentil',               NULL,       'best_before',  730, '{}', true),
  ('ミックスナッツ',     'ナッツ',   NULL,       'mixed_nuts',           'nut',      'best_before',  180, '{}', true),

  -- ▼ 海藻・その他 (10 items)
  ('めかぶ',             '海藻',     NULL,       'mekabu',               NULL,       'use_by',       5,   '{}', true),
  ('塩昆布',             '乾物',     '海藻',     'salted_konbu',         NULL,       'best_before',  365, '{}', true),
  ('とろろ昆布',         '乾物',     '海藻',     'tororo_konbu',         NULL,       'best_before',  180, '{}', true),
  ('もずく',             '海藻',     NULL,       'mozuku',               NULL,       'use_by',       7,   '{}', true),
  ('岩のり',             '海藻',     NULL,       'iwa_nori',             NULL,       'best_before',  90,  '{}', true),
  ('わかめ（生）',       '海藻',     NULL,       'fresh_wakame',         NULL,       'use_by',       5,   '{}', true),
  ('甘酒',               '加工食品', NULL,       'amazake',              NULL,       'best_before',  14,  '{}', true),
  ('酒かす',             '調味料',   NULL,       'sake_lees',            NULL,       'best_before',  30,  '{}', true),
  ('粒マスタード',       '調味料',   NULL,       'grain_mustard',        NULL,       'best_before',  365, '{}', true),
  ('バルサミコ酢',       '調味料',   NULL,       'balsamic_vinegar',     NULL,       'best_before',  730, '{}', true),

  -- ▼ 製菓・製パン材料 (6 items)
  ('ベーキングパウダー', '製菓材料', NULL,       'baking_powder',        NULL,       'best_before',  180, '{}', true),
  ('重曹',               '製菓材料', NULL,       'baking_soda',          NULL,       'best_before',  365, '{}', true),
  ('ゼラチン',           '製菓材料', NULL,       'gelatin',              NULL,       'best_before',  730, '{}', true),
  ('寒天',               '製菓材料', NULL,       'agar',                 NULL,       'best_before',  730, '{}', true),
  ('バニラエッセンス',   '製菓材料', NULL,       'vanilla',              NULL,       'best_before',  730, '{}', true),
  ('ドライイースト',     '製菓材料', NULL,       'dry_yeast',            NULL,       'best_before',  180, '{}', true),

  -- ▼ 調理用酒・その他 (4 items)
  ('白ワイン',           '調味料',   NULL,       'white_wine',           NULL,       'best_before',  30,  '{}', true),
  ('赤ワイン',           '調味料',   NULL,       'red_wine',             NULL,       'best_before',  30,  '{}', true),
  ('みりん風調味料',     '調味料',   NULL,       'mirin_style',          NULL,       'best_before',  365, '{}', true),
  ('料理用ブランデー',   '調味料',   NULL,       'cooking_brandy',       NULL,       'best_before',  365, '{}', true),

  -- ▼ 追加（合計300件確保）(8 items)
  ('真鯛',               '魚介類',   NULL,       'sea_bream',            'fish',     'use_by',       2,   '{}', true),
  ('金目鯛',             '魚介類',   NULL,       'kinmedai',             'fish',     'use_by',       2,   '{}', true),
  ('わかさぎ',           '魚介類',   NULL,       'smelt',                'fish',     'use_by',       2,   '{}', true),
  ('クレソン',           '野菜',     '葉物',     'watercress',           NULL,       'best_before',  5,   '{}', true),
  ('セリ',               '野菜',     '葉物',     'seri',                 NULL,       'best_before',  5,   '{}', true),
  -- 天かす・揚げ玉は同一食品のため aliases に統合し1行で管理する
  ('天かす',             '加工食品', NULL,       'tenkasu',              NULL,       'best_before',  30,  '["揚げ玉"]', true),
  ('ピクルス',           '加工食品', NULL,       'pickles',              NULL,       'best_before',  30,  '{}', true),
  ('あんこ',             '加工食品', NULL,       'anko',                 NULL,       'best_before',  14,  '{}', true);

-- ============================================================
-- Recipe seed data (50 recipes)
-- ============================================================
-- recipe_match_key 凡例:
--   egg, milk, tofu, chicken_thigh, chicken_breast, pork_belly,
--   pork_loin, ground_pork, ground_beef, salmon, tuna,
--   spinach, bean_sprouts, cabbage, onion, carrot, potato,
--   tomato, green_onion, ginger, garlic, mushroom, eggplant,
--   bell_pepper, broccoli, lettuce, cucumber, radish, corn,
--   rice, udon, soba, pasta, bread, natto,
--   mackerel, shrimp, clams, yellowtail, cod,
--   bacon, sausage, chikuwa, ham,
--   enoki, eringi, maitake,
--   pumpkin, sweet_potato
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
  r36 uuid := gen_random_uuid();
  r37 uuid := gen_random_uuid();
  r38 uuid := gen_random_uuid();
  r39 uuid := gen_random_uuid();
  r40 uuid := gen_random_uuid();
  r41 uuid := gen_random_uuid();
  r42 uuid := gen_random_uuid();
  r43 uuid := gen_random_uuid();
  r44 uuid := gen_random_uuid();
  r45 uuid := gen_random_uuid();
  r46 uuid := gen_random_uuid();
  r47 uuid := gen_random_uuid();
  r48 uuid := gen_random_uuid();
  r49 uuid := gen_random_uuid();
  r50 uuid := gen_random_uuid();
BEGIN

-- ============================================================
-- recipes (既存 35件 + 新規 15件 = 合計 50件)
-- ============================================================
INSERT INTO recipes (id, title, description, category, cooking_time_minutes, instructions, is_active) VALUES
  (r1,  '目玉焼き',
        '簡単に作れる定番の目玉焼き。',
        '卵料理', 5,
        E'①フライパンに油を熱する。\n②卵を割り入れ、蓋をして好みの固さに焼く。\n③塩こしょうで味を調えて完成。',
        true),
  (r2,  'スクランブルエッグ',
        'ふわふわのスクランブルエッグ。',
        '卵料理', 5,
        E'①卵と牛乳を混ぜてよく溶く。\n②バターを溶かしたフライパンに卵液を流し入れる。\n③弱火でゆっくり混ぜながら半熟になったら火を止め、余熱で仕上げる。',
        true),
  (r3,  '卵とほうれん草の炒め',
        '卵とほうれん草をさっと炒めた栄養満点の一品。',
        '炒め物', 10,
        E'①ほうれん草を食べやすい長さに切る。\n②フライパンに油を熱し、ほうれん草を炒める。\n③溶き卵を回し入れてさっと炒め合わせ、醤油・塩で味を調える。',
        true),
  (r4,  '豆腐の味噌汁',
        '定番の豆腐と油揚げの味噌汁。',
        '汁物', 10,
        E'①豆腐を賽の目に切る。\n②だし汁を火にかけ豆腐を加えて温める。\n③味噌を溶き入れ、長ねぎをのせて完成。',
        true),
  (r5,  '麻婆豆腐',
        '豆腐とひき肉を使った本格麻婆豆腐。',
        '中華', 20,
        E'①豆腐を1.5cm角に切る。\n②フライパンにごま油を熱し、豆板醤・にんにく・しょうがを炒め、豚ひき肉を加えて炒める。\n③水・鶏がらスープ・醤油・砂糖を加えて煮立て、豆腐を加えて煮込む。\n④水溶き片栗粉でとろみをつけ、ごま油を回しかける。',
        true),
  (r6,  '鶏のから揚げ',
        'ジューシーな鶏もも肉のから揚げ。',
        '揚げ物', 25,
        E'①鶏もも肉を一口大に切り、醤油・みりん・しょうがで10分漬け込む。\n②片栗粉と薄力粉を合わせてまぶす。\n③180℃の油で4〜5分、きつね色になるまで揚げる。',
        true),
  (r7,  '親子丼',
        '鶏もも肉と卵でつくる親子丼。',
        '丼もの', 20,
        E'①鶏もも肉を一口大に切り、玉ねぎを薄切りにする。\n②だし・醤油・みりん・砂糖で鶏肉と玉ねぎを煮る。\n③溶き卵を回し入れ、半熟になったら火を止めてご飯の上にのせる。',
        true),
  (r8,  '豚の生姜焼き',
        '豚ロースと生姜で作る定番の生姜焼き。',
        '炒め物', 15,
        E'①豚ロースを薄切りにする。\n②醤油・みりん・砂糖・すりおろしたしょうがを混ぜてタレを作り、豚肉を漬け込む。\n③フライパンで両面を焼き、タレを絡めて照りよく仕上げる。',
        true),
  (r9,  'ほうれん草のお浸し',
        'ほうれん草を茹でてめんつゆで和えたシンプルな一品。',
        '和え物', 10,
        E'①ほうれん草を塩を入れた湯でさっと茹でる。\n②冷水にとって水気を絞り、食べやすい長さに切る。\n③めんつゆ・だしで和え、かつお節をのせて完成。',
        true),
  (r10, 'もやしの炒め',
        'もやしをさっと炒めたヘルシーな副菜。',
        '炒め物', 5,
        E'①フライパンに油を熱する。\n②もやしを強火でさっと炒める。\n③塩・こしょう・醤油少々で味を調え、好みでごま油を回しかける。',
        true),
  (r11, 'ポテトサラダ',
        'じゃがいもとにんじんで作るポテトサラダ。',
        'サラダ', 25,
        E'①じゃがいもとにんじんを茹でる。\n②じゃがいもをつぶし、にんじんを切る。玉ねぎはスライスして塩もみし水気を絞る。\n③マヨネーズ・塩こしょうで和えて完成。',
        true),
  (r12, '肉じゃが',
        'じゃがいもと牛肉の定番煮物。',
        '煮物', 35,
        E'①じゃがいも・にんじん・玉ねぎを一口大に切る。\n②牛ひき肉を炒めて野菜を加え、だし・醤油・みりん・砂糖を加えて蓋をして煮込む。\n③野菜が柔らかくなったら蓋を取り、煮汁を絡めて完成。',
        true),
  (r13, 'トマトと卵の中華炒め',
        'トマトと卵を炒めた中華料理の定番。',
        '中華', 10,
        E'①トマトをくし切り、卵を溶いて塩を加える。\n②油で溶き卵をふんわり炒めて取り出す。\n③トマトを炒め、卵を戻し入れ、塩・砂糖・鶏がらスープで味を調える。',
        true),
  (r14, 'キャベツの味噌汁',
        'キャベツと豆腐の具だくさん味噌汁。',
        '汁物', 10,
        E'①キャベツをざく切りにし、豆腐を賽の目に切る。\n②だし汁でキャベツを煮て、豆腐を加えて温める。\n③味噌を溶き入れて完成。',
        true),
  (r15, 'ゴーヤチャンプルー',
        '豆腐と卵を使ったゴーヤチャンプルー風炒め。',
        '炒め物', 15,
        E'①豆腐を水切りして食べやすく切る。豚バラを食べやすく切る。\n②フライパンで豚バラを炒め、豆腐を加えて焼き色をつける。\n③溶き卵を加えてさっと炒め合わせ、醤油・かつお節で仕上げる。',
        true),
  (r16, '野菜炒め',
        '玉ねぎ・にんじん・キャベツのシンプル野菜炒め。',
        '炒め物', 10,
        E'①玉ねぎ・にんじん・キャベツを食べやすく切る。\n②強火でにんじん・玉ねぎ・キャベツの順に炒める。\n③塩・こしょう・醤油で味を調えて完成。',
        true),
  (r17, 'オムレツ',
        'ふんわり卵のオムレツ。',
        '卵料理', 10,
        E'①卵を溶いて塩・こしょうを加える。\n②フライパンにバターを溶かし、卵液を流し込む。\n③外側を固め、内側を半熟に保ちながら楕円形に包んで完成。',
        true),
  (r18, '鮭の塩焼き',
        'シンプルに塩焼きにした鮭。',
        '焼き物', 15,
        E'①鮭に軽く塩を振り10分置いて水分をふき取る。\n②魚焼きグリルまたはフライパンで中火で両面を焼く。\n③皮がパリッとしたら完成。レモンを添えてもよい。',
        true),
  (r19, 'きんぴらごぼう風にんじん',
        'にんじんを使ったきんぴら風の炒め煮。',
        '副菜', 15,
        E'①にんじんを細切りにする。\n②ごま油で炒め、醤油・みりん・砂糖・酒で炒め煮にする。\n③水分が飛んだら最後に白ごまを振って完成。',
        true),
  (r20, 'ほうれん草のバター炒め',
        'ほうれん草をバターで炒めたシンプルな副菜。',
        '炒め物', 5,
        E'①ほうれん草を洗い、食べやすい長さに切る。\n②フライパンにバターを溶かし、ほうれん草を強火でさっと炒める。\n③塩・こしょうで味を調えて完成。',
        true),
  (r21, '豚キムチ炒め',
        '豚バラとキムチを炒めた韓国風炒め物。',
        '韓国料理', 10,
        E'①豚バラを食べやすく切る。\n②フライパンで豚バラを炒め、もやしを加えてさっと炒める。\n③醤油・ごま油で味を調え、お好みでキムチを加えて仕上げる。',
        true),
  (r22, '卵焼き',
        '甘めの出汁巻き卵焼き。',
        '卵料理', 10,
        E'①卵・だし・砂糖・醤油を混ぜる。\n②卵焼き器を油で温め、卵液を3回に分けて流し込み、手前から巻いていく。\n③巻き簾で形を整えて切り分ける。',
        true),
  (r23, 'しらすとほうれん草のパスタ',
        'ほうれん草としらすを使った和風パスタ。',
        'パスタ', 20,
        E'①パスタを規定時間より1分短く茹でる。\n②フライパンにオリーブ油・にんにくを熱し、ほうれん草を炒める。\n③パスタ・しらすを加え、バター・醤油で和えて完成。',
        true),
  (r24, '豆腐ハンバーグ',
        '豆腐と豚ひき肉で作るヘルシーハンバーグ。',
        '洋食', 25,
        E'①豆腐をキッチンペーパーで包み電子レンジで加熱して水切りする。\n②豆腐・豚ひき肉・溶き卵・塩こしょうを混ぜてこね、小判形に整える。\n③フライパンで両面を焼き、中まで火が通ったらポン酢やソースをかけて完成。',
        true),
  (r25, '鶏胸肉のハーブ焼き',
        '鶏胸肉をハーブで香ばしく焼いた一品。',
        '焼き物', 20,
        E'①鶏胸肉をそぎ切りにし、塩・こしょう・乾燥バジル・オレガノをすり込む。\n②オリーブ油を引いたフライパンで蓋をして中火で蒸し焼きにする。\n③両面に焼き色がついたら完成。レモン汁をかけてもよい。',
        true),
  (r26, 'もやしと豚バラのポン酢和え',
        'もやしと豚バラをさっと茹でてポン酢で和える。',
        '和え物', 10,
        E'①豚バラを食べやすく切り、沸騰したお湯でしゃぶしゃぶ状に茹でる。\n②もやしは電子レンジで1〜2分加熱して水気を切る。\n③ポン酢・ごま油で和えて、お好みでごまを振る。',
        true),
  (r27, 'オニオンスープ',
        '玉ねぎをじっくり炒めて作るオニオンスープ。',
        'スープ', 30,
        E'①玉ねぎを薄切りにする。\n②バターで玉ねぎをきつね色になるまで弱火でじっくり炒める（約20分）。\n③コンソメスープを加えて煮込み、塩こしょうで味を調える。',
        true),
  (r28, 'ブロッコリーとベーコンの炒め',
        'ブロッコリーをベーコンと炒めた副菜。',
        '炒め物', 10,
        E'①ブロッコリーを小房に分け、電子レンジで2分加熱する。\n②フライパンでベーコンを炒め、ブロッコリーを加えて炒め合わせる。\n③塩・こしょう・醤油少々で味を調えて完成。',
        true),
  (r29, 'なすとトマトの煮込み',
        'なすとトマトを煮込んだ洋風の一品。',
        '煮物', 20,
        E'①なすを乱切り、トマトをざく切りにする。\n②オリーブ油でなすを炒め、トマトを加える。\n③コンソメ・塩こしょうで煮込み、にんにくを加えて風味をつける。',
        true),
  (r30, '納豆チャーハン',
        '納豆を使ったパラパラチャーハン。',
        'ご飯もの', 10,
        E'①ご飯・溶き卵・長ねぎを用意する。\n②強火でご飯を炒め、溶き卵を加えてパラパラにする。\n③納豆・長ねぎを加えて炒め、醤油・塩こしょうで仕上げる。',
        true),
  (r31, '具だくさん豚汁',
        '豚バラと野菜たっぷりの豚汁。',
        '汁物', 20,
        E'①豚バラ・じゃがいも・にんじん・玉ねぎを食べやすく切る。\n②豚バラを炒め、野菜を加えてさらに炒める。\n③水を加えて煮込み、野菜が柔らかくなったら味噌を溶き入れる。',
        true),
  (r32, '鶏そぼろご飯',
        '甘辛い鶏そぼろをのせたご飯。',
        '丼もの', 15,
        E'①鶏ひき肉を醤油・みりん・砂糖・酒で炒り煮にする。\n②卵を溶いて砂糖・塩を加え、フライパンで炒り卵にする。\n③ご飯に肉そぼろと炒り卵を盛りつけ、長ねぎを散らす。',
        true),
  (r33, 'サーモンのムニエル',
        '鮭をバターでソテーしたムニエル。',
        '洋食', 15,
        E'①鮭に塩こしょうを振り、薄力粉を薄くはたく。\n②フライパンにバターを溶かし、鮭を中火で両面焼く。\n③焼き上がったらレモン汁をかけてさっぱりと仕上げる。',
        true),
  (r34, '長ねぎと卵の炒め',
        '長ねぎと卵のシンプルな炒め物。',
        '炒め物', 10,
        E'①長ねぎを斜め切りにする。\n②溶き卵をフライパンで半熟に炒め、取り出す。\n③長ねぎを炒め、卵を戻し入れて醤油・塩で味を調える。',
        true),
  (r35, 'キャベツとひき肉の重ね煮',
        'キャベツと豚ひき肉を重ねて蒸し煮にした一品。',
        '煮物', 25,
        E'①キャベツはざく切り、豚ひき肉に塩こしょうをする。\n②鍋にキャベツと豚ひき肉を交互に重ねる。\n③水・だし・醤油・みりんを加えて蓋をし、中火で15〜20分蒸し煮にする。',
        true),
  -- ============================================================
  -- 新規追加 15件（魚介 5・加工食品 4・きのこ 4・野菜 2）
  -- ============================================================
  -- 魚介類
  (r36, 'さばの味噌煮',
        'さばをじっくり味噌で煮込んだ定番の和食。',
        '煮物', 25,
        E'①さばを切り身にし、熱湯をかけて臭みを取る。\n②だし・醤油・みりん・砂糖・味噌・しょうがを合わせ、さばを入れて中火で煮る。\n③落とし蓋をして10〜15分煮含めて完成。',
        true),
  (r37, 'えびチリ',
        'プリプリのえびをチリソースで炒めた中華の定番。',
        '中華', 20,
        E'①えびの背わたを取り、塩・片栗粉で洗って水気をふく。\n②フライパンにごま油を熱し、にんにく・しょうが・豆板醤を炒め、えびを加えて炒める。\n③ケチャップ・砂糖・醤油・鶏がらスープを加えて絡め、水溶き片栗粉でとろみをつける。',
        true),
  (r38, 'あさりの酒蒸し',
        'あさりを日本酒で蒸したシンプルな一品。',
        '蒸し物', 10,
        E'①あさりを塩水で砂抜きし、殻をこすり合わせて洗う。\n②フライパンにあさり・酒・しょうがを入れて蓋をして中火で加熱する。\n③あさりの口が開いたら醤油少々を加えて長ねぎを散らして完成。',
        true),
  (r39, 'ぶりの照り焼き',
        'ぶりを甘辛いタレで焼いた照り焼き。',
        '焼き物', 20,
        E'①ぶりに塩を振って10分置き、水気をふく。\n②フライパンに油を熱してぶりを両面焼く。\n③醤油・みりん・砂糖・酒を合わせたタレを加え、照りが出るまで絡めて完成。',
        true),
  (r40, 'たらのホイル蒸し',
        'たらを野菜と一緒にホイルで蒸した淡白な一品。',
        '蒸し物', 20,
        E'①たらに塩こしょうを振る。えのきとバターを用意する。\n②アルミホイルにたら・えのき・バターをのせ、酒を振りかけてしっかり包む。\n③フライパンに水を少し入れて蓋をし、中火で12〜15分蒸す。',
        true),
  -- 加工食品
  (r41, 'ベーコンと野菜のスープ',
        'ベーコンと野菜を煮込んだ具だくさんスープ。',
        'スープ', 20,
        E'①ベーコン・玉ねぎ・にんじん・じゃがいもを食べやすく切る。\n②鍋にオリーブ油を熱してベーコンと野菜を炒める。\n③水とコンソメを加えて野菜が柔らかくなるまで煮込み、塩こしょうで味を調える。',
        true),
  (r42, 'ウィンナー炒め',
        'ウィンナーとキャベツをさっと炒めた簡単副菜。',
        '炒め物', 10,
        E'①ウィンナーに斜め切りの切り込みを入れる。キャベツをざく切りにする。\n②フライパンに油を熱し、ウィンナーを炒めて焼き色をつける。\n③キャベツを加えてさっと炒め、塩・こしょう・ケチャップで味を調える。',
        true),
  (r43, 'ちくわときゅうりの和え物',
        'ちくわときゅうりのさっぱり和え物。',
        '和え物', 5,
        E'①ちくわを斜め薄切りにする。きゅうりを薄切りにして塩もみし、水気を絞る。\n②マヨネーズ・醤油少々で和える。\n③お好みでごまを振って完成。',
        true),
  (r44, 'ハムと卵のオープンオムレツ',
        'ハムと卵で作るオープン式のオムレツ。',
        '卵料理', 15,
        E'①ハムを1cm角に切る。卵を溶いて塩こしょうを加える。\n②フライパンにバターを溶かし、ハムを炒めてから卵液を流し入れる。\n③ふたをして弱火で焼き、中央が固まったら完成。',
        true),
  -- きのこ類
  (r45, 'えのきのバター炒め',
        'えのきをバターでシンプルに炒めた副菜。',
        '炒め物', 8,
        E'①えのきの石づきを切り落とし、手でほぐす。\n②フライパンにバターを溶かし、えのきを中火で炒める。\n③醤油・こしょうで味を調え、お好みで長ねぎを散らす。',
        true),
  (r46, 'きのこパスタ',
        'しいたけ・えのきを使った和風きのこパスタ。',
        'パスタ', 20,
        E'①パスタを規定時間より1分短く茹でる。しいたけ・えのきを切る。\n②フライパンにオリーブ油・にんにくを熱し、きのこを炒める。\n③パスタを加え、バター・醤油・めんつゆで和えて完成。',
        true),
  (r47, 'まいたけの炊き込みご飯',
        'まいたけの香りが広がる炊き込みご飯。',
        'ご飯もの', 40,
        E'①まいたけを食べやすくほぐす。油揚げを細切りにする。\n②米をとぎ、醤油・みりん・酒・だしを合わせた調味液で炊く。\n③まいたけと油揚げをのせて炊き上げ、全体を混ぜ合わせる。',
        true),
  (r48, 'えのきと豆腐の味噌汁',
        'えのきと豆腐のやさしい味わいの味噌汁。',
        '汁物', 10,
        E'①えのきの石づきを切り、半分に切る。豆腐を賽の目に切る。\n②だし汁を火にかけえのきを煮る。豆腐を加えて温める。\n③味噌を溶き入れて完成。',
        true),
  -- 野菜
  (r49, 'かぼちゃのポタージュ',
        'かぼちゃの甘みたっぷりのクリーミーなスープ。',
        'スープ', 30,
        E'①かぼちゃを電子レンジで柔らかくし、皮を取り除く。玉ねぎを薄切りにしてバターで炒める。\n②かぼちゃ・玉ねぎ・牛乳をミキサーにかける。\n③鍋に移して温め、塩こしょうで味を調えて完成。',
        true),
  (r50, 'さつまいもの甘煮',
        'さつまいもをほっくり甘く煮た副菜。',
        '副菜', 25,
        E'①さつまいもを1.5cm厚の輪切りにし、水にさらす。\n②鍋にさつまいも・水・砂糖・みりん・塩を入れて中火で煮る。\n③柔らかくなったら醤油少々を加えて照りを出して完成。',
        true);

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
  (r23, 'shirasu', true),
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
  (r28, 'bacon', true),
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
  (r32, 'ground_chicken', true),
  (r32, 'egg', true),
  (r32, 'green_onion', false),
  -- r33 サーモンのムニエル
  (r33, 'salmon', true),
  -- r34 長ねぎと卵の炒め
  (r34, 'egg', true),
  (r34, 'green_onion', true),
  -- r35 キャベツとひき肉の重ね煮
  (r35, 'cabbage', true),
  (r35, 'ground_pork', true),
  -- r36 さばの味噌煮
  (r36, 'mackerel', true),
  (r36, 'ginger', false),
  -- r37 えびチリ
  (r37, 'shrimp', true),
  (r37, 'ginger', false),
  (r37, 'garlic', false),
  -- r38 あさりの酒蒸し
  (r38, 'clams', true),
  (r38, 'green_onion', false),
  -- r39 ぶりの照り焼き
  (r39, 'yellowtail', true),
  -- r40 たらのホイル蒸し
  (r40, 'cod', true),
  (r40, 'enoki', false),
  -- r41 ベーコンと野菜のスープ
  (r41, 'bacon', true),
  (r41, 'onion', true),
  (r41, 'carrot', true),
  (r41, 'potato', false),
  -- r42 ウィンナー炒め
  (r42, 'sausage', true),
  (r42, 'cabbage', true),
  -- r43 ちくわときゅうりの和え物
  (r43, 'chikuwa', true),
  (r43, 'cucumber', true),
  -- r44 ハムと卵のオープンオムレツ
  (r44, 'ham', true),
  (r44, 'egg', true),
  -- r45 えのきのバター炒め
  (r45, 'enoki', true),
  -- r46 きのこパスタ
  (r46, 'mushroom', true),
  (r46, 'enoki', false),
  (r46, 'pasta', true),
  -- r47 まいたけの炊き込みご飯
  (r47, 'maitake', true),
  (r47, 'rice', true),
  -- r48 えのきと豆腐の味噌汁
  (r48, 'enoki', true),
  (r48, 'tofu', true),
  -- r49 かぼちゃのポタージュ
  (r49, 'pumpkin', true),
  (r49, 'onion', true),
  (r49, 'milk', false),
  -- r50 さつまいもの甘煮
  (r50, 'sweet_potato', true);

END $$;
