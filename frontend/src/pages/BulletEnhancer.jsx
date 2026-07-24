import { useState, useEffect } from "react";
import { Sparkles, Wand2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import BulletEnhancerSkeleton from "../components/skeletons/BulletEnhancerSkeleton";
import { API_URL } from "../config/api";

export default function BulletEnhancer() {


const [bullet,setBullet] = useState("");
const [result,setResult] = useState("");

const [loading,setLoading] = useState(false);

const [initialLoading,setInitialLoading] = useState(true);





useEffect(()=>{


const timer=setTimeout(()=>{

setInitialLoading(false);

},1000);



return ()=>clearTimeout(timer);


},[]);








const enhanceBullet = async()=>{


if(!bullet){

alert("Enter a resume bullet point");

return;

}



setLoading(true);

setResult("");

const startTime=Date.now();



try{


const response = await fetch(
"/api/enhance-bullet",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

bullet

})

}

);



const data = await response.json();



setResult(

data.enhanced ||

"No response generated"

);



}


catch(error){

console.log(error);

setResult(
"Backend connection failed"
);

}



finally{


const elapsed =
Date.now()-startTime;


const minimumTime=1200;



if(elapsed < minimumTime){


await new Promise(resolve=>

setTimeout(

resolve,

minimumTime-elapsed

)

);


}



setLoading(false);


}



};






if(initialLoading){


return (

<div
className="
min-h-screen
p-4
sm:p-6
md:p-8
bg-slate-100
dark:bg-slate-950
"
>

<BulletEnhancerSkeleton/>

</div>

);


}







return (

<div className="
min-h-screen
p-4
sm:p-6
md:p-8
bg-slate-100
dark:bg-slate-950
text-slate-900
dark:text-white
">





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

AI Resume Bullet Enhancer

</h1>



<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Transform simple resume points into professional achievements.

</p>


</motion.div>








<motion.div

initial={{
opacity:0,
scale:0.95
}}

animate={{
opacity:1,
scale:1
}}


className="
max-w-4xl
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-4
sm:p-6
mt-8
"

>


<div className="
flex
items-center
gap-3
">


<Wand2 className="text-blue-600"/>


<h2 className="
text-lg
sm:text-xl
font-bold
">

Improve Bullet Point

</h2>


</div>







<textarea


className="
mt-5
w-full
min-h-[140px]
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
p-4
rounded-lg
resize-none
"

placeholder="Example: Developed a website using React"


value={bullet}


onChange={(e)=>setBullet(e.target.value)}


/>







<button

onClick={enhanceBullet}

disabled={loading}


className="
mt-5
bg-blue-600
hover:bg-blue-700
disabled:opacity-50
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
"

>


{

loading ?

<>

<Loader2
size={18}
className="animate-spin"
/>

Improving...

</>


:

<>

<Sparkles size={18}/>

Enhance

</>

}


</button>



</motion.div>








{

loading && (

<BulletEnhancerSkeleton/>

)

}








{

result && !loading && (

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
max-w-4xl
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-4
sm:p-6
mt-8
"

>


<h2 className="
text-xl
font-bold
">

Improved Version

</h2>




<div className="
mt-5
bg-slate-100
dark:bg-slate-800
rounded-lg
p-4
whitespace-pre-line
text-gray-700
dark:text-gray-300
">

{result}

</div>



</motion.div>

)

}




</div>


);


}