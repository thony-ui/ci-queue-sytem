import * as z from "zod";

const postCIWebHookSchema = z.object({
  repoUrl: z.string().url(),
  branch: z.string().optional(),
});

export type TPostCIWebHookInput = z.infer<typeof postCIWebHookSchema>;

export const postCIWebHookValidator = (repoUrl: string, branch: string) => {
  try {
    const parsed = postCIWebHookSchema.parse({ repoUrl, branch });
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw new Error("Unknown error");
  }
};
