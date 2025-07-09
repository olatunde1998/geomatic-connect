import generateOgImage from "@/app/components/opengraph-image/og-generator";

// Image metadata
export const alt = "About Geomatic Connect";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return generateOgImage("home", {
    title: "Geomatic Connect",
    description:
      "Register, Make Request and got accepted into your desired company!",
  });
}
