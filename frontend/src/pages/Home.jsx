import {
  FileText,
  FileSignature,
  MessageSquare,
  Route,
  BadgeCheck,
  Brain
} from "lucide-react";


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getHistory } from "../utils/storage";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";


export default function Home() {


  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    const updateHistory = ()=>{


      setHistory(
        getHistory()
      );


      setTimeout(()=>{

        setLoading(false);

      },700);


    };



    updateHistory();



    window.addEventListener(
      "storageUpdated",
      updateHistory
    );



    return ()=>{

      window.removeEventListener(
        "storageUpdated",
        updateHistory
      );

    };


  },[]);





  const getCount=(type)=>{

    return history.filter(
      item=>item.type===type
    ).length;

  };





  const stats=[

    {
      title:"Resume Reviews",
      value:getCount("Resume Analysis")
    },

    {
      title:"AI Conversations",
      value:getCount("AI Chat")
    },

    {
      title:"Interview Sessions",
      value:getCount("Interview Session")
    },

    {
      title:"Documents Created",
      value:getCount("Cover Letter")
    },

    {
      title:"Skills Found",
      value:getCount("Skills Extraction")
    }

  ];






  const tools=[

    {
      title:"Resume Analyzer",
      icon:FileText,
      activity:`${getCount("Resume Analysis")} analyses completed`,
      description:"Analyze resumes and improve ATS performance."
    },


    {
      title:"Cover Letter",
      icon:FileSignature,
      activity:`${getCount("Cover Letter")} letters generated`,
      description:"Create professional job applications."
    },


    {
      title:"Interview Coach",
      icon:MessageSquare,
      activity:`${getCount("Interview Session")} sessions`,
      description:"Practice interviews with AI feedback."
    },


    {
      title:"Career Roadmap",
      icon:Route,
      activity:`${getCount("Career Roadmap")} roadmaps created`,
      description:"Build personalized learning paths."
    },


    {
      title:"Skills Extractor",
      icon:BadgeCheck,
      activity:`${getCount("Skills Extraction")} extractions`,
      description:"Find skills and career gaps."
    },


    {
      title:"AI Chat",
      icon:Brain,
      activity:`${getCount("AI Chat")} conversations`,
      description:"Get career guidance anytime."
    }

  ];






  if(loading){

    return <DashboardSkeleton/>;

  }







  return (

<div

className="
min-h-screen
p-4
sm:p-6
md:p-8
bg-slate-100
dark:bg-slate-950
text-slate-900
dark:text-white
"

>


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<h1 className="
text-3xl
sm:text-4xl
font-bold
">

CareerPilot AI Dashboard

</h1>


<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Track your AI career progress and activity.

</p>


</motion.div>






<div className="
grid
grid-cols-2
md:grid-cols-3
xl:grid-cols-5
gap-4
mt-8
">


{
stats.map((item,index)=>(

<div

key={index}

className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-5
"

>

<h2 className="
text-3xl
font-bold
text-blue-600
">

{item.value}

</h2>


<p className="
mt-2
text-sm
text-gray-500
dark:text-gray-400
">

{item.title}

</p>


</div>

))
}


</div>








<h2 className="
text-2xl
font-bold
mt-10
">

AI Career Tools

</h2>



<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Overview of your CareerPilot AI features.

</p>






<div className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-6
mt-5
">


{
tools.map((tool,index)=>{


const Icon=tool.icon;


return (

<motion.div

key={index}

initial={{
opacity:0,
y:15
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.05
}}

className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
"

>


<Icon
size={32}
className="text-blue-600"
/>



<h3 className="
text-xl
font-bold
mt-4
">

{tool.title}

</h3>



<p className="
mt-2
text-blue-600
font-medium
">

{tool.activity}

</p>



<p className="
mt-2
text-gray-500
dark:text-gray-400
">

{tool.description}

</p>


</motion.div>


);


})

}


</div>







<div className="
mt-10
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
">

Recent Activity

</h2>




{

history.length===0 ?


<p className="
mt-3
text-gray-500
dark:text-gray-400
">

No activity yet. Start using AI tools.

</p>



:


history
.slice()
.reverse()
.slice(0,5)
.map((item,index)=>(


<div

key={index}

className="
mt-4
border-b
border-slate-200
dark:border-slate-700
pb-3
"

>


<p className="font-medium">

{item.type}

</p>


<p className="
text-sm
text-gray-500
">

{item.date}

</p>


</div>


))


}



</div>







</div>

  );

}