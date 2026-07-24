import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";


export default function Layout({ children }) {


  const [open, setOpen] = useState(false);



  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        dark:bg-slate-950
      "
    >



      <Sidebar

        open={open}

        setOpen={setOpen}

      />






      {/* Mobile Top Header */}

      <header

        className="
          fixed
          top-0
          left-0
          right-0

          h-16

          bg-white
          dark:bg-slate-900

          shadow

          z-30

          flex
          items-center

          px-4

          md:hidden

        "

      >


        <button

          onClick={()=>setOpen(true)}

          className="
            bg-blue-600
            text-white

            p-2.5

            rounded-lg

          "

        >

          <Menu size={22}/>


        </button>



        <h1 className="
          ml-4
          font-bold
          text-lg
          text-slate-900
          dark:text-white
        ">

          CareerPilot AI

        </h1>


      </header>







      {/* Page Content */}

      <main

        className="
          md:ml-72

          min-h-screen

          pt-20

          md:pt-0

        "

      >

        {children}


      </main>





    </div>


  );

}