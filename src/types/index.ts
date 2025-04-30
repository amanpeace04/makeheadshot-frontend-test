// File: src/types/index.ts

/**
 * Represents a single job/combo entry in the form.
 */
export interface Job {
  /** Unique combo identifier (e.g. "Formal Suit_Office"). */
  combo_id: string;

  /** Clothing selection for this combo. */
  clothing: string;

  /** Background selection for this combo. */
  background: string;

  /** Number of images to generate for this combo. */
  number_of_images: number;
}
