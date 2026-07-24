import FeatureCard from "./FeatureCard";


export default function Features() {

  const features = [

    {
      title:"Resume Analyzer",
      description:"Analyze your resume and get ATS-friendly suggestions.",
    },

    {
      title:"Cover Letter Generator",
      description:"Generate personalized cover letters in seconds.",
    },

    {
      title:"Interview Coach",
      description:"Practice interview questions with AI.",
    },

    {
      title:"Career Roadmap",
      description:"Get a personalized learning and career plan.",
    },

  ];



  return (

    <section className="
      max-w-7xl
      mx-auto
      px-6
      py-20
      bg-slate-100
      dark:bg-slate-950
      text-slate-900
      dark:text-white
    ">


      <h2 className="
        text-4xl
        font-bold
        text-center
        mb-12
      ">

        Features

      </h2>





      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">


        {
          features.map((feature)=>(

            <FeatureCard

              key={feature.title}

              title={feature.title}

              description={feature.description}

            />

          ))
        }



      </div>


    </section>

  );

}