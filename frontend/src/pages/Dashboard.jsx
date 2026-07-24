import { motion } from "framer-motion";
import {
  FileText,
  FileSignature,
  MessageSquare,
  Route,
  Sparkles,
  BadgeCheck,
  Brain,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Link } from "react-router-dom";


const features = [
  {
    title:"Resume Analyzer",
    description:"Check ATS score and improve your resume.",
    icon:FileText,
    path:"/resume",
  },
  {
    title:"Cover Letter",
    description:"Generate professional cover letters.",
    icon:FileSignature,
    path:"/cover-letter",
  },
  {
    title:"Interview Coach",
    description:"Practice interviews with AI.",
    icon:MessageSquare,
    path:"/interview",
  },
  {
    title:"Career Roadmap",
    description:"Build your learning journey.",
    icon:Route,
    path:"/roadmap",
  },
  {
    title:"Bullet Enhancer",
    description:"Improve resume bullet points.",
    icon:Sparkles,
    path:"/bullet",
  },
  {
    title:"Skills Extractor",
    description:"Extract skills from resumes.",
    icon:BadgeCheck,
    path:"/skills",
  },
  {
    title:"AI Chat",
    description:"Ask career questions.",
    icon:Brain,
    path:"/chat",
  },
];


const atsData = [
  {name:"Resume", score:75},
  {name:"Skills", score:85},
  {name:"Experience", score:65},
  {name:"Projects", score:80},
];


const skillData = [
  {name:"Technical", value:60},
  {name:"Soft Skills", value:25},
  {name:"Tools", value:15},
];


export default function Dashboard(){

return (

<div className="
p-8 
min-h-screen 
bg-slate-100 
dark:bg-slate-950
transition-colors
">


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
>


<h1 className="
text-4xl 
font-bold 
text-slate-900 
dark:text-white
">

Welcome to CareerPilot AI

</h1>


<p className="
text-slate-500 
dark:text-slate-400 
mt-2
">

Your AI powered career improvement platform.

</p>


</motion.div>



<div className="grid md:grid-cols-4 gap-5 mt-8">

{
[
["Career Score","75%",TrendingUp,"text-blue-600"],
["Resume Checks","5",FileText,"text-green-600"],
["Skills Found","20+",BadgeCheck,"text-purple-600"],
["Assistant","AI",Brain,"text-orange-600"]

].map((item,index)=>{

const Icon=item[2];

return (

<div
key={index}
className="
bg-white 
dark:bg-slate-900
rounded-xl
shadow
p-5
transition
"
>

<Icon className={item[3]}/>


<h2 className="
text-3xl 
font-bold 
mt-3
text-slate-900
dark:text-white
">

{item[1]}

</h2>


<p className="
text-gray-500
dark:text-gray-400
">

{item[0]}

</p>


</div>

);

})

}

</div>



<div className="grid md:grid-cols-2 gap-8 mt-8">


<div className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
">

<h2 className="
font-bold 
text-xl 
mb-5
text-slate-900
dark:text-white
">

Career Analysis

</h2>


<ResponsiveContainer width="100%" height={300}>

<BarChart data={atsData}>


<XAxis 
dataKey="name"
stroke="currentColor"
/>

<YAxis
stroke="currentColor"
/>


<Tooltip
contentStyle={{
backgroundColor:"#0f172a",
borderRadius:"10px",
color:"#fff"
}}
/>


<Bar 
dataKey="score"
fill="#2563eb"
/>


</BarChart>


</ResponsiveContainer>


</div>




<div className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
">


<h2 className="
font-bold 
text-xl 
mb-5
text-slate-900
dark:text-white
">

Skill Distribution

</h2>



<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie
data={skillData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>


{
skillData.map((item,index)=>(

<Cell key={index}/>

))
}


</Pie>


<Tooltip
contentStyle={{
backgroundColor:"#0f172a",
borderRadius:"10px",
color:"#fff"
}}
/>


</PieChart>


</ResponsiveContainer>


</div>


</div>




<h2 className="
text-2xl
font-bold
mt-10
mb-5
text-slate-900
dark:text-white
">

AI Career Tools

</h2>



<div className="grid md:grid-cols-3 gap-6">


{
features.map((feature)=>{

const Icon=feature.icon;


return (

<motion.div

key={feature.title}

whileHover={{scale:1.03}}

className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
"

>


<Icon
size={35}
className="text-blue-600"
/>


<h3 className="
text-xl
font-bold
mt-4
text-slate-900
dark:text-white
">

{feature.title}

</h3>


<p className="
text-gray-500
dark:text-gray-400
mt-2
">

{feature.description}

</p>



<Link to={feature.path}>


<button

className="
mt-5
bg-slate-900
dark:bg-blue-600
text-white
px-5
py-2
rounded-lg
"

>

Open

</button>


</Link>


</motion.div>

);

})

}


</div>


</div>

);

}