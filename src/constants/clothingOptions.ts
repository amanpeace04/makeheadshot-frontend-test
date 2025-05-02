// File: src/constants/clothingOptions.ts

export interface ClothingOption {
  id: string;
  label: string;
  src: string;
}

/**
 * A list of clothing options for users to select
 * after choosing a backdrop.
 * Make sure you place matching images under /public/images/clothing/
 */
export const clothingOptions: ClothingOption[] = [
  {
    id: "white_button_up_shirt",
    label: "White Button-Up Shirt",
    src: "/images/clothing/white_button_up_shirt.jpg",
  },
  {
    id: "dark_blue_tailored_suit",
    label: "Dark Blue Tailored Suit",
    src: "/images/clothing/dark_blue_tailored_suit.jpg",
  },
  {
    id: "black_turtleneck",
    label: "Black Turtleneck",
    src: "/images/clothing/black_turtleneck.jpg",
  },
  {
    id: "army_green_button_down_shirt",
    label: "Army Green Button-Down Shirt",
    src: "/images/clothing/army_green_button_down_shirt.jpg",
  },
  {
    id: "light_gray_half_zip_sweater",
    label: "Light Gray Half-Zip Sweater",
    src: "/images/clothing/light_gray_half_zip_sweater.jpg",
  },
  {
    id: "navy_crew_neck_sweater",
    label: "Navy Crew-Neck Sweater",
    src: "/images/clothing/navy_crew_neck_sweater.jpg",
  },
];
