
export default function LeftContainer() {
  return (
    <div className="relative w-full hidden md:w-1/2 md:block">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url(/images/image2.jpg)] bg-center bg-no-repeat bg-cover"></div>

      {/* =====Overlay with color and opacity==== */}
      <div className="absolute inset-0 bg-[#F1F4EA] opacity-80"></div>

      {/* ====Content==== */}
      <section className="h-screen">
        <p className="relative h-full text-[#1F4D36] text-4xl text-center flex justify-center items-center">
          Geomatic Connect
        </p>
      </section>
    </div>
  );
}

