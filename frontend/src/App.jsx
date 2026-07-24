import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Layout from "./components/layout/Layout";


import Home from "./pages/Home";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CoverLetter from "./pages/CoverLetter";
import InterviewCoach from "./pages/InterviewCoach";
import CareerRoadmap from "./pages/CareerRoadmap";
import BulletEnhancer from "./pages/BulletEnhancer";
import SkillsExtractor from "./pages/SkillsExtractor";
import Chat from "./pages/Chat";



export default function App(){


  return (


    <BrowserRouter>


      <Layout>


        <Routes>


          <Route 
            path="/" 
            element={<Home/>}
          />


          <Route 
            path="/resume" 
            element={<ResumeAnalyzer/>}
          />


          <Route 
            path="/cover-letter" 
            element={<CoverLetter/>}
          />


          <Route 
            path="/interview" 
            element={<InterviewCoach/>}
          />


          <Route 
            path="/roadmap" 
            element={<CareerRoadmap/>}
          />


          <Route 
            path="/bullet" 
            element={<BulletEnhancer/>}
          />


          <Route 
            path="/skills" 
            element={<SkillsExtractor/>}
          />


          <Route 
            path="/chat" 
            element={<Chat/>}
          />


        </Routes>


      </Layout>


    </BrowserRouter>


  );

}