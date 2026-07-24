export default function SkillsExtractorSkeleton(){

return (

<div

className="
mt-8
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
animate-pulse
"

>


<div

className="
h-7
w-1/3
bg-slate-300
dark:bg-slate-700
rounded
"

/>



<div

className="
mt-6
grid
grid-cols-1
md:grid-cols-2
gap-5
"

>


{
[1,2,3,4,5,6].map((item)=>(

<div

key={item}

className="
bg-slate-100
dark:bg-slate-800
rounded-xl
p-5
"

>


<div

className="
h-5
w-1/2
bg-slate-300
dark:bg-slate-700
rounded
"

/>



<div

className="
mt-4
space-y-3
"

>

<div className="
h-4
bg-slate-300
dark:bg-slate-700
rounded
"/>


<div className="
h-4
w-3/4
bg-slate-300
dark:bg-slate-700
rounded
"/>


</div>


</div>

))

}


</div>



<div

className="
mt-6
h-24
bg-slate-300
dark:bg-slate-700
rounded-xl
"

/>


</div>

);

}