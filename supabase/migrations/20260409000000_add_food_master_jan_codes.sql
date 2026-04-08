create table food_master_jan_codes (
  jan_code text primary key,
  food_master_id uuid not null references food_masters(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index idx_food_master_jan_codes_food_master_id on food_master_jan_codes (food_master_id);
