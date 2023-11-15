import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  price: z.number().int().min(1),
  description: z.string(),
  category: z.string(),
  image: z.string().url({
    message: "Poster must be a valid URL",
  }),
  rating: z.object({
    rate: z.number().int().min(1),
    count: z.number().int().min(1),
  }),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
