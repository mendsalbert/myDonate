import {
  UserIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
export default function Dashboard() {
  return (
    <>
      <div className="bg-white  font-Montserrat ">
        <div className="w-full  bg-[#008E89] px-36 ">
          <div className="flex flex-row justify-between py-5">
            <div className="flex flex-row justify-center items-center  space-x-2">
              <img src="/images/ghlalogo.png" className="w-14 " />
              <p className="text-white text-xl">GHLA</p>
            </div>
            {/* <p className="bg-white text-[#008E89]">Register</p> */}
          </div>

          <div className="grid grid-cols-3 text-center gap-7 py-16">
            <div className="bg-white shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-yellow-600 rounded-full p-3 ">
                <UserGroupIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">USERS</p>
              <p className=" text-2xl text-gray-600">5 Users added</p>
            </div>
            <div className="bg-white shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-green-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">BOOKS</p>
              <p className=" text-2xl text-gray-600">10 Books added</p>
            </div>
            <div className="bg-white shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-red-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">OVERDUE</p>
              <p className=" text-2xl text-gray-600">20 Books overdue</p>
            </div>
          </div>
        </div>
        <div className="w-full  bg-white px-36">fsdf</div>
      </div>
    </>
  );
}
