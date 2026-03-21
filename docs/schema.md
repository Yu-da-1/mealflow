# DBスキーマ

## food_masters

```sql
create table food_masters (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  category text not null,
  subcategory text,
  recipe_match_key text not null,
  parent_recipe_match_key text,
  default_expiry_type text not null check (default_expiry_type in ('best_before', 'use_by')),
  default_expiry_days integer not null check (default_expiry_days >= 0),
  aliases jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_food_masters_display_name on food_masters (display_name);
create index idx_food_masters_recipe_match_key on food_masters (recipe_match_key);
```

## inventory_lots

```sql
create table inventory_lots (
  id uuid primary key default gen_random_uuid(),
  food_master_id uuid not null references food_masters(id),
  quantity integer not null check (quantity >= 0),
  purchased_at date not null,
  expiry_date date,
  expiry_type text not null check (expiry_type in ('best_before', 'use_by')),
  expiry_source text not null check (expiry_source in ('estimated', 'manual')),
  status text not null check (status in ('active', 'consumed', 'discarded')) default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_inventory_lots_food_master_id on inventory_lots (food_master_id);
create index idx_inventory_lots_expiry_date on inventory_lots (expiry_date);
create index idx_inventory_lots_status on inventory_lots (status);
```

## recipes

```sql
create table recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  cooking_time_minutes integer,
  instructions text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## recipe_ingredients

```sql
create table recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  recipe_match_key text not null,
  is_required boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_recipe_ingredients_recipe_id on recipe_ingredients (recipe_id);
create index idx_recipe_ingredients_recipe_match_key on recipe_ingredients (recipe_match_key);
```

## recipe_recommendation_logs

```sql
create table recipe_recommendation_logs (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  recommended_on date not null,
  created_at timestamptz not null default now()
);

create index idx_recipe_recommendation_logs_recipe_id on recipe_recommendation_logs (recipe_id);
create index idx_recipe_recommendation_logs_recommended_on on recipe_recommendation_logs (recommended_on);
```