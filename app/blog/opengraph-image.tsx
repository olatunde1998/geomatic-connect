import generateOgImage from "@/app/components/opengraph-image/og-generator";

// Image metadata
export const alt = "Blog Posts";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return generateOgImage("blog", {
    title: "Blog Posts",
    description: "Explore latest articles about geomatics",
  });
}
