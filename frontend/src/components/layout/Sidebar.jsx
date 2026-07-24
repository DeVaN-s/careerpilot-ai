import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  FileText,
  FileSignature,
  MessageSquare,
  Route,
  Sparkles,
  Brain,
  BadgeCheck,
  Moon,
  Sun,
  X
} from "lucide-react";


const menu = [

  {
    name:"Dashboard",
    icon:LayoutDashboard,
    path:"/"
  },

  {
    name:"Resume Analyzer",
    icon:FileText,
    path:"/resume"
  },

  {
    name:"Cover Letter",
    icon:FileSignature,
    path:"/cover-letter"
  },

  {
    name:"Interview Coach",
    icon:MessageSquare,
    path:"/interview"
  },

  {
    name:"Career Roadmap",
    icon:Route,
    path:"/roadmap"
  },

  {
    name:"Bullet Enhancer",
    icon:Sparkles,
    path:"/bullet"
  },

  {
    name:"Skills Extractor",
    icon:BadgeCheck,
    path:"/skills"
  },

  {
    name:"AI Chat",
    icon:Brain,
    path:"/chat"
  }

];



export default function Sidebar({

  open,
  setOpen

}) {


const location = useLocation();



const [dark,setDark] = useState(()=>{

return localStorage.getItem("theme")==="dark";

});





useEffect(()=>{


if(dark){

document.documentElement.classList.add("dark");

}

else{

document.documentElement.classList.remove("dark");

}


},[dark]);







const toggleTheme = ()=>{


const newTheme=!dark;


setDark(newTheme);


localStorage.setItem(
"theme",
newTheme ? "dark":"light"
);


};







return (

<>





{/* Mobile Overlay */}

{

open && (

<div

onClick={()=>setOpen(false)}

className="
fixed
inset-0
bg-black/50
z-40
md:hidden
"

/>

)

}









<aside


className={`

fixed

top-0
left-0

w-72
h-screen

bg-white
dark:bg-slate-900

text-slate-900
dark:text-white

shadow-xl

flex
flex-col

z-50

transition-transform
duration-300


${

open

?

"translate-x-0"

:

"-translate-x-full"

}


md:translate-x-0

`}


>





{/* Header */}


<div className="

p-6

border-b

border-slate-200

dark:border-slate-700

flex

justify-between

items-start

">





<div>


<h1 className="text-2xl font-bold">

CareerPilot AI

</h1>


<p className="
text-sm
mt-1
text-slate-500
dark:text-slate-400
">

AI Career Assistant

</p>


</div>







<button

onClick={()=>setOpen(false)}

className="
md:hidden
"

>

<X size={24}/>

</button>





</div>









{/* Navigation */}


<nav className="

flex-1

p-4

overflow-y-auto

">


{

menu.map((item)=>{


const Icon=item.icon;


const active =
location.pathname===item.path;



return (


<Link


key={item.path}


to={item.path}


onClick={()=>setOpen(false)}



className={`

flex

items-center

gap-3

px-4

py-3

rounded-xl

mb-2


transition-all


${

active

?

"bg-blue-600 text-white"

:

"hover:bg-slate-200 dark:hover:bg-slate-800"

}

`}


>


<Icon size={20}/>


<span>

{item.name}

</span>


</Link>


);


})

}



</nav>









{/* Bottom */}


<div className="

p-5

border-t

border-slate-200

dark:border-slate-700

text-sm

text-slate-500

dark:text-slate-400

">






<button


onClick={toggleTheme}



className="

flex

items-center

gap-3

text-slate-900

dark:text-white

hover:text-blue-500

"


>




{

dark

?

<Sun size={18}/>

:

<Moon size={18}/>

}





{

dark

?

"Light Mode"

:

"Dark Mode"

}



</button>







<p className="mt-4">

CareerPilot AI by Team SkyGen

</p>





</div>







</aside>


</>


);


}