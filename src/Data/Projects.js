import studyVaultImage from "../assets/images/projects/StudyVault-ss.jpg";
import mealwiseImage from "../assets/images/projects/Mealwise-ss.jpeg";
import nebryxImage from "../assets/images/projects/nebryx-ss.jpeg";


const projects = [
  {
    id: 1,
    title: "StudyVault",
    category: "Featured Project",
    description:
      "A full-stack student study resource management platform where users can securely manage, organize, search and access their study resources.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: studyVaultImage,
    live: "https://study-vault-1k3ibn40l-zobiamasood.vercel.app/login",
    github: "https://github.com/zobiamasood/StudyVault",
    featured: true,
  },
  {
    id: 2,
    title: "MealWise",
    category: "React Project",
    description:
      "A modern meal planning application designed to help users discover, organize and plan meals through a clean and interactive interface.",
    tech: ["React.js", "JavaScript", "Tailwind CSS"],
    image: mealwiseImage,
    live: "https://mealwise-meal-planner.netlify.app/",
    github: "https://github.com/zobiamasood/MealWise-Meal-Planner",
  },
  {
    id: 3,
    title: "Nebryx Solutions",
    category: "Frontend Project",
    description:
      "A modern responsive landing page focused on clean visual presentation, structured layouts and an engaging user experience.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: nebryxImage,
    live: "https://nebryx-solution.netlify.app/",
    github: "https://github.com/zobiamasood/nebryx-space-landing-page",
  },
];

export default projects;