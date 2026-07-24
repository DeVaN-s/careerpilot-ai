import { useState,useEffect } from "react";
import {
  Upload,
  FileCheck,
  Download,
  CheckCircle,
  AlertCircle,
  LoaderCircle
} from "lucide-react";

import { motion } from "framer-motion";

import { saveHistory } from "../utils/storage";

import ResumeSkeleton from "../components/skeletons/ResumeSkeleton";



export default function ResumeAnalyzer(){


const [file,setFile]=useState(null);

const [jobDescription,setJobDescription]=useState("");

const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);

const [pageLoading,setPageLoading]=useState(true);





useEffect(()=>{


setTimeout(()=>{

setPageLoading(false);

},700);


},[]);






const analyzeResume=async()=>{


if(!file){

alert("Upload resume first");

return;

}



setLoading(true);



const formData=new FormData();



formData.append(
"file",
file
);



formData.append(
"job_description",
jobDescription
);





try{


const response=await fetch(

"/api/analyze-resume", 

{

method:"POST",

body:formData

}

);




const data=await response.json();



setResult(data);





saveHistory(

"Resume Analysis",

{

file_name:file.name,

job_description:jobDescription,

ats_score:data.ats_score,

matching_skills:data.matching_skills,

missing_skills:data.missing_skills,

strengths:data.strengths,

weaknesses:data.weaknesses,

suggestions:data.suggestions

}

);





}

catch(error){


console.log(error);

alert("Backend connection failed");


}



setLoading(false);


};






if(pageLoading){

return <ResumeSkeleton/>;

}








return (


<div

className="
min-h-screen
p-4
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
md:text-4xl
font-bold
">

AI Resume Analyzer

</h1>


<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Analyze your resume and improve ATS performance.

</p>


</motion.div>







<div

className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-4
md:p-6
mt-6
"

>


<div className="
flex
items-center
gap-3
">


<Upload
className="text-blue-600"
/>


<h2 className="
text-xl
font-bold
">

Upload Resume

</h2>


</div>








<input

id="resume"

type="file"

accept=".pdf"

hidden


onChange={(e)=>{


const selected=e.target.files[0];


if(

selected &&
selected.type!=="application/pdf"

){

alert("Only PDF files allowed");

return;

}


setFile(selected);


}}


/>





<label

htmlFor="resume"

className="
cursor-pointer
border-2
border-dashed
border-blue-400
rounded-xl
p-8
mt-5
flex
flex-col
items-center
justify-center
text-center
hover:bg-blue-50
dark:hover:bg-slate-800
transition
"

>


<Upload
size={35}
className="text-blue-600"
/>


<p className="mt-3">

{

file

?

file.name

:

"Click to upload PDF resume"

}


</p>


</label>








<textarea

rows="5"

placeholder="Paste job description"

value={jobDescription}

onChange={(e)=>setJobDescription(e.target.value)}


className="
mt-5
w-full
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
rounded-lg
p-4
"

/>







<button

onClick={analyzeResume}

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
gap-2
items-center
"


>


{

loading &&

<LoaderCircle
className="animate-spin"
/>

}



{

loading

?

"Analyzing..."

:

"Analyze Resume"

}



</button>





</div>









{result && (


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="mt-6"

>





<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">


<div className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
text-center
">


<FileCheck
className="
mx-auto
text-blue-600
"
/>



<h2 className="
text-5xl
font-bold
mt-4
">

{result.ats_score}%

</h2>


<p className="text-gray-500">

ATS Score

</p>


</div>







<div className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
">


<h3 className="font-bold text-lg">

Matching Skills

</h3>


<div className="
flex
flex-wrap
gap-2
mt-4
">


{

result.matching_skills?.map(

(skill,index)=>(

<span

key={index}

className="
bg-green-100
dark:bg-green-900
px-3
py-1
rounded-full
text-sm
"

>

{skill}

</span>

)

)

}


</div>


</div>







<div className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
">


<h3 className="font-bold text-lg">

Missing Skills

</h3>


<div className="
flex
flex-wrap
gap-2
mt-4
">


{

result.missing_skills?.map(

(skill,index)=>(

<span

key={index}

className="
bg-red-100
dark:bg-red-900
px-3
py-1
rounded-full
text-sm
"

>

{skill}

</span>

)

)

}


</div>


</div>


</div>







<div className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
mt-5
">


<h2 className="font-bold text-xl">

Strengths

</h2>


{

result.strengths?.map(

(item,index)=>(

<p

key={index}

className="
mt-3
flex
gap-2
"

>


<CheckCircle
className="text-green-600"
/>


{item}


</p>

)

)

}







<h2 className="font-bold text-xl mt-6">

Weaknesses

</h2>



{

result.weaknesses?.map(

(item,index)=>(

<p

key={index}

className="
mt-3
flex
gap-2
"

>


<AlertCircle
className="text-red-600"
/>


{item}


</p>

)

)

}








<h2 className="font-bold text-xl mt-6">

Suggestions

</h2>


{

result.suggestions?.map(

(item,index)=>(


<p
key={index}
className="mt-3"
>

• {item}

</p>


)

)

}








{

result.report &&

<a

href={
`/api/reports/${result.report}`
}

target="_blank"

rel="noreferrer"

>


<button

className="
mt-6
bg-green-600
text-white
px-6
py-3
rounded-lg
flex
gap-2
items-center
"

>


<Download size={20}/>

Download Report


</button>


</a>


}




</div>






</motion.div>


)}



</div>


);


}