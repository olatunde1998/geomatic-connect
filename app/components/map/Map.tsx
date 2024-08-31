export default function Map() {
  // what to be passed in title(name of the company), address: magodo, lagos or alausa, ikeja,
  // q=Alausa,%20Ikeja,%20Lagos%20state.+(Lispendens)
  // q=magodo%20lagos+(Tezza%20)

  return (
    <div className="sm:w-full lg:w-full rounded-md border-[1.3px] border-blue-300">
      <iframe
        style={{ width: "100%", height: "609px", margin: "0", padding: "0" }}
        frameBorder="0"
        scrolling="no"
        src="https://maps.google.com/maps?hl=en&amp;q=Alausa,%20Ikeja,%20Lagos%20state.+(Lispendens)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        // src="https://maps.google.com/maps?hl=en&amp;q=magodo%20lagos+(Tezza%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
}
