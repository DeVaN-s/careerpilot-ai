import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import {
  MessageSquare,
  Send,
  Bot
} from "lucide-react";

import { motion } from "framer-motion";

import { saveHistory } from "../utils/storage";

import InterviewSkeleton from "../components/skeletons/InterviewSkeleton";



export default function InterviewCoach() {


const [pageLoading,setPageLoading] = useState(true);



const [role,setRole] = useState("");

const [question,setQuestion] = useState("");

const [answer,setAnswer] = useState("");

const [feedback,setFeedback] = useState("");

const [loading,setLoading] = useState(false);





useEffect(()=>{


const timer=setTimeout(()=>{


setPageLoading(false);


},1000);



return ()=>clearTimeout(timer);


},[]);







const getFeedback = async()=>{


if(!question || !answer){

alert("Enter question and answer");

return;

}



if(loading) return;



setLoading(true);

setFeedback("");



try{


const response = await fetch(

"/api/interview-coach", 

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

role,

question,

answer

})

}

);



const data = await response.json();



const aiFeedback =

data.feedback ||

"No feedback generated";



setFeedback(aiFeedback);





saveHistory(

"Interview Session",

{

role,

question,

answer,

feedback:aiFeedback

}

);



}



catch(error){


console.log(error);


setFeedback(

"Backend connection failed"

);


}



finally{


setLoading(false);


}



};






if(pageLoading){


return(

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

<InterviewSkeleton/>


</div>

);


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

AI Interview Coach

</h1>


<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Practice interviews and receive AI feedback.

</p>


</motion.div>







<div

className="
mt-8
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-4
sm:p-6
"

>


<div className="
flex
items-center
gap-3
">


<Bot className="text-blue-600"/>


<h2 className="
text-xl
font-bold
">

Interview Practice

</h2>


</div>







<input

className="
mt-5
w-full
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
p-3
rounded-lg
"

placeholder="Job Role"

value={role}

onChange={(e)=>setRole(e.target.value)}

/>






<textarea

className="
mt-4
w-full
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
p-3
rounded-lg
"

rows="4"

placeholder="Interview Question"

value={question}

onChange={(e)=>setQuestion(e.target.value)}

/>







<textarea

className="
mt-4
w-full
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
p-3
rounded-lg
"

rows="6"

placeholder="Your Answer"

value={answer}

onChange={(e)=>setAnswer(e.target.value)}

/>






<button

onClick={getFeedback}

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


<Send size={18}/>


{

loading
?
"Analyzing..."
:
"Get Feedback"

}


</button>



</div>









{

loading && (

<InterviewSkeleton/>

)

}








{

feedback && !loading && (

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
mt-8
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
"

>


<h2 className="
text-xl
font-bold
flex
gap-2
items-center
">

<MessageSquare/>

AI Feedback

</h2>



<p className="
mt-5
whitespace-pre-line
text-gray-700
dark:text-gray-300
">

{feedback}

</p>



</motion.div>

)


}



</div>


);


}