import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import {
  FileText,
  Copy,
  Download,
  Sparkles,
  LoaderCircle
} from "lucide-react";

import { motion } from "framer-motion";

import { saveHistory } from "../utils/storage";

import CoverLetterSkeleton from "../components/skeletons/CoverLetterSkeleton";



export default function CoverLetter() {


  // PAGE LOADING SKELETON
  const [pageLoading,setPageLoading] = useState(true);



  const [jobRole,setJobRole] = useState("");

  const [company,setCompany] = useState("");

  const [skills,setSkills] = useState("");



  const [result,setResult] = useState("");

  const [loading,setLoading] = useState(false);






  // SHOW SKELETON WHEN OPENING PAGE

  useEffect(()=>{


    const timer = setTimeout(()=>{


      setPageLoading(false);


    },1000);



    return ()=>clearTimeout(timer);



  },[]);










  const generateCoverLetter = async()=>{


    if(!jobRole || !company){


      alert("Enter job role and company");

      return;


    }



    if(loading) return;




    setLoading(true);

    setResult("");



    const startTime = Date.now();




    try{


      const response = await fetch(

        "/api/generate-cover-letter", 

        {


          method:"POST",


          headers:{


            "Content-Type":"application/json"


          },


          body:JSON.stringify({


            job_role:jobRole,


            company_name:company,


            skills:skills


          })


        }


      );





      const data = await response.json();





      const coverLetter =


        data.cover_letter ||


        data.message ||


        "No response generated";







      setResult(coverLetter);







      saveHistory(


        "Cover Letter",


        {


          job_role:jobRole,


          company_name:company,


          skills:skills,


          result:coverLetter


        }


      );





    }



    catch(error){


      console.log(error);



      setResult(

        "Backend connection failed"

      );



    }




    finally{



      const elapsed = Date.now() - startTime;



      const minimumTime = 1200;




      if(elapsed < minimumTime){



        await new Promise(resolve=>


          setTimeout(


            resolve,


            minimumTime - elapsed


          )


        );



      }





      setLoading(false);



    }



  };









  const copyText = ()=>{


    navigator.clipboard.writeText(result);


    alert("Copied");


  };









  const downloadText = ()=>{



    const blob = new Blob(


      [result],


      {


        type:"text/plain"


      }


    );




    const url = URL.createObjectURL(blob);




    const link = document.createElement("a");



    link.href=url;



    link.download="Cover_Letter.txt";



    link.click();




    URL.revokeObjectURL(url);



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


        <CoverLetterSkeleton />


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


<h1

className="
text-3xl
sm:text-4xl
font-bold
"

>

AI Cover Letter Generator

</h1>



<p

className="
mt-2
text-gray-500
dark:text-gray-400
"

>

Create professional personalized cover letters.

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



<div

className="
flex
items-center
gap-3
"

>


<Sparkles className="text-blue-600"/>


<h2 className="text-xl font-bold">

Generate Cover Letter

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

value={jobRole}

onChange={(e)=>setJobRole(e.target.value)}

/>







<input

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

placeholder="Company Name"

value={company}

onChange={(e)=>setCompany(e.target.value)}

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
resize-none
"

rows="5"

placeholder="Your skills and experience"

value={skills}

onChange={(e)=>setSkills(e.target.value)}

/>









<button


onClick={generateCoverLetter}

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

<LoaderCircle

size={18}

className="animate-spin"

/>


Generating...


</>


:

"Generate"

}


</button>




</div>









{/* AI GENERATION SKELETON */}

{

loading && (

<CoverLetterSkeleton />

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
mt-8
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-4
sm:p-6
"


>


<div

className="
flex
flex-col
sm:flex-row
sm:justify-between
gap-4
"

>


<h2

className="
text-xl
font-bold
flex
items-center
gap-2
"

>


<FileText/>


Generated Cover Letter


</h2>







<button


onClick={copyText}


className="
bg-gray-900
dark:bg-blue-600
text-white
px-4
py-2
rounded-lg
flex
items-center
gap-2
"

>


<Copy size={18}/>


Copy


</button>


</div>








<div

className="
mt-5
whitespace-pre-line
text-gray-700
dark:text-gray-300
"

>


{result}


</div>








<button


onClick={downloadText}


className="
mt-6
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
"

>


<Download size={18}/>


Download


</button>






</motion.div>


)


}




</div>


);


}