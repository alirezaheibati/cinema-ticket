import supabase from "@/config/supabase-config";

export async function getAdminStats() {
  const [users, movies, shows, theaters] = await Promise.all([
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    supabase.from("movies").select("*", { count: "exact", head: true }),
    supabase.from("shows").select("*", { count: "exact", head: true }),
    supabase.from("theaters").select("*", { count: "exact", head: true }),
  ]);
  return {
    usersCount: users.count,
    moviesCount: movies.count,
    showsCount: shows.count,
    theatersCount: theaters.count,
  };
}
