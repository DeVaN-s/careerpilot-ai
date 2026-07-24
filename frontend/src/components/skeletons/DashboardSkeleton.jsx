import Skeleton from "../ui/Skeleton";


export default function DashboardSkeleton(){

return (

<div className="
p-4
sm:p-6
md:p-8
space-y-8
">


{/* Title */}

<div>

<Skeleton
className="h-10 w-72"
/>

<Skeleton
className="h-4 w-96 mt-3"
/>

</div>





{/* Stats */}

<div className="
grid
grid-cols-2
md:grid-cols-3
xl:grid-cols-5
gap-4
">


{
Array.from({
length:5
}).map((_,index)=>(

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

<Skeleton
className="h-10 w-16"
/>

<Skeleton
className="h-4 w-24 mt-4"
/>


</div>

))
}


</div>







{/* Cards */}

<div className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-6
">


{
Array.from({
length:6
}).map((_,index)=>(

<div

key={index}

className="
bg-white
dark:bg-slate-900
rounded-xl
shadow
p-6
"

>


<Skeleton
className="h-10 w-10"
/>


<Skeleton
className="h-6 w-40 mt-5"
/>


<Skeleton
className="h-4 w-full mt-4"
/>


</div>


))
}


</div>


</div>

);

}