import { movieGenres } from "@/constants";

export default function mapGenre(movieGenre: string): string {
  const findedGenre = movieGenres.find((genre) => genre.genreEn === movieGenre);
  return findedGenre ? findedGenre.genreFa : "نامشخص";
}
