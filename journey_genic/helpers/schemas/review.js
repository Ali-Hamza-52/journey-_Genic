import { z } from "zod";

const reviewSchema = z.object({
    rating: z.number().optional(),
    comment: z.string().nonempty("Review cannot be empty").min(3, "Review message minimum three characters"),
    userId: z.string(),
    productId: z.string(),
});

export default reviewSchema;