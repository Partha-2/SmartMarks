-- Create a table for bookmarks
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  url text not null,
  title text not null
);

-- Set up Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Create policy to allow users to see only their own bookmarks
create policy "Users can view their own bookmarks"
  on bookmarks for select
  using ( auth.uid() = user_id );

-- Create policy to allow users to insert their own bookmarks
create policy "Users can insert their own bookmarks"
  on bookmarks for insert
  with check ( auth.uid() = user_id );

-- Create policy to allow users to delete their own bookmarks
create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using ( auth.uid() = user_id );

-- Enable Realtime for the bookmarks table
alter publication supabase_realtime add table bookmarks;
