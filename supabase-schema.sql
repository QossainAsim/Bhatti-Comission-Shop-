create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  phone text,
  email text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists parts (
  id uuid primary key default gen_random_uuid(),
  part_number text not null unique,
  name text not null,
  category text not null,
  brand text,
  purchase_price numeric(12, 2) not null default 0,
  selling_price numeric(12, 2) not null default 0,
  stock integer not null default 0,
  reorder_level integer not null default 0,
  supplier text,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  part_number text not null,
  part_name text not null,
  quantity integer not null,
  purchase_price numeric(12, 2) not null default 0,
  selling_price numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  profit numeric(12, 2) not null default 0,
  customer text not null,
  sold_by text,
  created_at timestamptz not null default now()
);

insert into categories (name)
values
  ('Wheat'),
  ('Rice'),
  ('Cotton'),
  ('Maize'),
  ('Fertilizer'),
  ('Seeds'),
  ('Other Material')
on conflict (name) do nothing;

alter table categories disable row level security;
alter table suppliers disable row level security;
alter table parts disable row level security;
alter table sales disable row level security;
