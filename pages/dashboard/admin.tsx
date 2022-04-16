export default function Dashboard() {
  return (
    <>
      <div className="bg-white flex flex-col font-Montserrat ">
        <div className="w-full h-32 bg-[#008E89] px-20 ">
          <div className="flex flex-row justify-between py-5">
            <div className="flex flex-row justify-center items-center  space-x-2">
              <img src="/images/ghlalogo.png" className="w-14 " />
              <p className="text-white text-xl">GHLA</p>
            </div>

            <p className="cursor-pointer  text-center px-5 bg-white text-[#008E89]">
              Register
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
