// A page with my Google Calendar.
// http://localhost:8080/cal
export default function Cal() {
  return (
    <div className="bg-red overflow-hidden w-full h-full">
      <div className="w-full h-full">
        <h1 className="w-full p-5 text-[20px] font-['Montserrat','Helvetica_Neue',Arial,sans-serif] text-center absolute pointer-events-none text-white whitespace-nowrap">
          Grant Timmerman's Calendar
        </h1>
        <div className="border-0 pt-[50px] w-full h-full">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;mode=WEEK&amp;wkst=1&amp;bgcolor=%23ea5f4e&amp;src=granttimmerman%40gmail.com&amp;color=%232952A3&amp;ctz=America%2FLos_Angeles&output=embed"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
