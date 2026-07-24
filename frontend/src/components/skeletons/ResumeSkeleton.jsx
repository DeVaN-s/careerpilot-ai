import Skeleton from "../ui/Skeleton";


export default function ResumeSkeleton(){

return (

<div
className="
min-h-screen
p-4
md:p-8
bg-slate-100
dark:bg-slate-950
space-y-6
"
>


{/* Header */}

<div>

<Skeleton className="h-10 w-80"/>

<Skeleton
className="
h-4
w-96
mt-3
"
/>

</div>





{/* Upload Section */}

<div
className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
"
>


<Skeleton className="h-7 w-48"/>


<Skeleton
className="
h-48
w-full
mt-6
"
/>


<Skeleton
className="
h-32
w-full
mt-5
"
/>


<Skeleton
className="
h-12
w-44
mt-5
"
/>


</div>





{/* Result Cards */}

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"
>


{
Array.from({length:3}).map((_,i)=>(

<div
key={i}
className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
"
>

<Skeleton className="h-8 w-40"/>

<Skeleton
className="
h-20
w-20
mt-5
"
/>


</div>

))
}


</div>



</div>

);

}