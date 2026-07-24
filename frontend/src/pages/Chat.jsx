import { API_URL } from "../config/api";

import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  Send,
  Bot,
  User,
  Loader2
} from "lucide-react";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { saveHistory } from "../utils/storage";

import ChatSkeleton from "../components/skeletons/ChatSkeleton";


export default function Chat() {


  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);



  const chatBoxRef = useRef(null);

  const shouldAutoScroll = useRef(true);

  const frame = useRef(null);





  useEffect(() => {


    const timer = setTimeout(() => {

      setPageLoading(false);

    },700);



    return () => clearTimeout(timer);


  }, []);






  const checkScrollPosition = () => {


    if(!chatBoxRef.current)
      return;



    const box = chatBoxRef.current;


    const distance =

      box.scrollHeight -
      box.scrollTop -
      box.clientHeight;



    shouldAutoScroll.current =
      distance < 120;


  };





  useEffect(()=>{


    const box = chatBoxRef.current;


    if(!box)
      return;



    box.addEventListener(
      "scroll",
      checkScrollPosition
    );



    return ()=>{


      box.removeEventListener(
        "scroll",
        checkScrollPosition
      );


    };


  }, []);







  const scrollToBottom = () => {


    if(!chatBoxRef.current)
      return;



    chatBoxRef.current.scrollTo({

      top:
      chatBoxRef.current.scrollHeight,

      behavior:"smooth"

    });


  };





  const streamScroll = () => {


    if(
      !chatBoxRef.current ||
      !shouldAutoScroll.current
    )
      return;



    cancelAnimationFrame(frame.current);



    frame.current =
    requestAnimationFrame(()=>{


      const box =
      chatBoxRef.current;



      box.scrollTop =
      box.scrollHeight -
      box.clientHeight -
      60;



    });


  };






  const sendMessage = async()=>{


    if(!message.trim() || loading)
      return;



    const userMessage = message;



    setMessages(prev=>[

      ...prev,

      {

        role:"user",

        text:userMessage

      }

    ]);



    setMessage("");



    setTimeout(()=>{

      scrollToBottom();

    },100);



    setLoading(true);



    let aiText = "";
        try {


      const response = await fetch(

        "/api/career-chat",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },

          body:JSON.stringify({

            message:userMessage

          })

        }

      );




      const contentType =
      response.headers.get(
        "content-type"
      );




      if(

        contentType &&

        contentType.includes(
          "application/json"
        )

      ){


        const data =
        await response.json();



        aiText =

        data.message ||

        data.response ||

        data.answer ||

        "No response";



        setMessages(prev=>[

          ...prev,

          {

            role:"ai",

            text:aiText

          }

        ]);



      }




      else if(response.body){



        const reader =
        response.body.getReader();



        const decoder =
        new TextDecoder("utf-8");




        setMessages(prev=>[

          ...prev,

          {

            role:"ai",

            text:""

          }

        ]);





        while(true){


          const {

            done,

            value

          } = await reader.read();




          if(done)
            break;




          aiText += decoder.decode(

            value,

            {

              stream:true

            }

          );





          setMessages(prev=>{


            const updated =
            [...prev];



            updated[
              updated.length-1
            ] = {


              role:"ai",

              text:aiText


            };



            return updated;


          });





          streamScroll();



        }





        aiText += decoder.decode();



      }




      else{


        throw new Error(
          "No response"
        );


      }






      if(aiText.trim()){


        saveHistory(

          "AI Chat",

          {

            question:userMessage,

            answer:aiText

          }

        );


      }





    }


    catch(error){


      console.log(error);



      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:"Backend connection failed."

        }

      ]);



    }



    setLoading(false);


  };






  if(pageLoading){

    return <ChatSkeleton/>;

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

          CareerPilot AI Chat

        </h1>



        <p

          className="
          mt-2
          text-gray-500
          dark:text-gray-400
          "

        >

          Ask anything about careers, resumes, and interviews.

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
        max-w-5xl
        "

      >



        <div

          ref={chatBoxRef}

          className="
          h-[55vh]
          sm:h-[600px]
          overflow-y-auto
          overscroll-contain
          space-y-5
          pr-2
          pb-20
          "

        >


          {messages.map((msg,index)=>(

            <motion.div

              key={index}

              initial={{

                opacity:0,

                y:10

              }}

              animate={{

                opacity:1,

                y:0

              }}

              className={`

              flex

              gap-3

              items-start

              ${
                msg.role==="user"

                ?

                "justify-end"

                :

                "justify-start"

              }

              `}

            >
                            {msg.role==="ai" && (

                <Bot

                  size={24}

                  className="
                  text-blue-600
                  mt-1
                  shrink-0
                  "

                />

              )}





              <div

                className={`

                max-w-[85%]

                sm:max-w-xl

                p-4

                rounded-xl

                break-words


                ${
                  msg.role==="user"

                  ?

                  "bg-blue-600 text-white"

                  :

                  "bg-slate-100 dark:bg-slate-800"

                }

                `}

              >



                <ReactMarkdown

                  remarkPlugins={[remarkGfm]}

                  components={{


                    h1:({children})=>(

                      <h1 className="text-3xl font-bold mb-4">

                        {children}

                      </h1>

                    ),



                    h2:({children})=>(

                      <h2 className="text-2xl font-bold mt-5 mb-3">

                        {children}

                      </h2>

                    ),



                    h3:({children})=>(

                      <h3 className="text-xl font-bold mt-4 mb-2">

                        {children}

                      </h3>

                    ),



                    p:({children})=>(

                      <p className="mb-3 leading-7">

                        {children}

                      </p>

                    ),



                    ul:({children})=>(

                      <ul className="list-disc pl-6 my-3 space-y-2">

                        {children}

                      </ul>

                    ),



                    ol:({children})=>(

                      <ol className="list-decimal pl-6 my-3 space-y-2">

                        {children}

                      </ol>

                    ),



                    li:({children})=>(

                      <li className="leading-7">

                        {children}

                      </li>

                    ),



                    strong:({children})=>(

                      <strong className="
                      font-bold
                      text-blue-600
                      dark:text-blue-400
                      ">

                        {children}

                      </strong>

                    ),



                    code:({children})=>(

                      <code className="
                      bg-slate-200
                      dark:bg-slate-700
                      px-1
                      py-0.5
                      rounded
                      text-sm
                      ">

                        {children}

                      </code>

                    )


                  }}

                >

                  {msg.text}

                </ReactMarkdown>


              </div>





              {msg.role==="user" && (

                <User

                  size={24}

                  className="
                  text-gray-600
                  dark:text-gray-300
                  mt-1
                  shrink-0
                  "

                />

              )}



            </motion.div>

          ))}





          {loading && (

            <div

              className="
              flex
              items-center
              gap-2
              text-gray-500
              dark:text-gray-400
              "

            >

              <Loader2

                size={18}

                className="animate-spin"

              />

              AI generating...


            </div>

          )}



        </div>





        <div

          className="
          mt-5
          flex
          flex-col
          sm:flex-row
          gap-3
          "

        >



          <input

            className="
            flex-1
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            p-3
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "

            placeholder="Ask a career question..."

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

            onKeyDown={(e)=>{

              if(e.key==="Enter"){

                sendMessage();

              }

            }}

          />





          <button

            onClick={sendMessage}

            disabled={loading}


            className="
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-50
            text-white
            px-6
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            "

          >

            <Send size={18}/>

            Send


          </button>


        </div>



      </div>



    </div>


  );


}

