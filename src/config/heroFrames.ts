/** Higgsfield Kling v3.0 — indoor-to-outdoor garden journey */
export const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FJ3n0OmCnDlMWQjqwUZH0EwXfI/hf_20260620_065442_51b03fb4-5ddc-476b-a829-f4d59488a34a.mp4";

export const HERO_FRAME_COUNT = 361;
export const HERO_FRAME_PATH = (index: number) =>
  `/frames/frame_${String(index).padStart(4, "0")}.jpg`;
export const HAS_HERO_FRAMES = HERO_FRAME_COUNT > 0;
export const HAS_HERO_VIDEO = Boolean(HERO_VIDEO_URL);