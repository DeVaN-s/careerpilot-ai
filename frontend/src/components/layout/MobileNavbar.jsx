import { Menu } from "lucide-react";


export default function MobileNavbar({setOpen}){


return (

<header className="
md:hidden
flex
items-center
justify-between
p-4
bg-white
dark:bg-slate-900
shadow
">


<h1 className="
font-bold
text-xl
dark:text-white
">

CareerPilot AI

</h1>



<button

onClick={()=>setOpen(true)}

className="
dark:text-white
"

>

<Menu/>

</button>


</header>

);


}