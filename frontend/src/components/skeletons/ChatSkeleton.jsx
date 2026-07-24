export default function ChatSkeleton(){

return (

<div
className="
min-h-screen
p-4
sm:p-6
md:p-8
bg-slate-100
dark:bg-slate-950
space-y-6
animate-pulse
"
>


{/* Header */}

<div>

<div
className="
h-10
w-80
bg-slate-300
dark:bg-slate-700
rounded
"
/>


<div
className="
h-4
w-96
mt-3
bg-slate-300
dark:bg-slate-700
rounded
"
/>

</div>







{/* Chat Box */}

<div

className="
bg-white
dark:bg-slate-900
shadow
rounded-xl
p-6
max-w-5xl
"

>


<div
className="
h-[600px]
space-y-6
"
>


{/* AI bubble */}

<div className="
flex
gap-3
items-start
">


<div
className="
w-8
h-8
rounded-full
bg-slate-300
dark:bg-slate-700
"
/>


<div
className="
h-20
w-72
bg-slate-300
dark:bg-slate-700
rounded-xl
"
/>


</div>







{/* User bubble */}

<div className="
flex
justify-end
">


<div
className="
h-16
w-64
bg-slate-300
dark:bg-slate-700
rounded-xl
"
/>


</div>







<div className="
flex
gap-3
items-start
">


<div
className="
w-8
h-8
rounded-full
bg-slate-300
dark:bg-slate-700
"
/>


<div
className="
h-24
w-80
bg-slate-300
dark:bg-slate-700
rounded-xl
"
/>


</div>





</div>








{/* Input */}

<div
className="
mt-5
h-12
w-full
bg-slate-300
dark:bg-slate-700
rounded-lg
"
/>



</div>


</div>


);

}