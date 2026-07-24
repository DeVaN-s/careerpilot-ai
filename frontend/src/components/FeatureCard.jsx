export default function FeatureCard({ title, description }) {

  return (

    <div className="
      bg-white
      dark:bg-slate-900
      rounded-xl
      shadow-lg
      p-6
      hover:shadow-xl
      transition
    ">


      <h2 className="
        text-2xl
        font-semibold
        text-blue-600
      ">

        {title}

      </h2>



      <p className="
        mt-3
        text-gray-600
        dark:text-gray-300
      ">

        {description}

      </p>


    </div>

  );

}