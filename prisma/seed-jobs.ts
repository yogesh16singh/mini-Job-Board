import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
const jobs=[
    {
        title: "Frontend Developer (FTE)",
        description: 
          "We are looking for a skilled Frontend Developer with expertise in React.js, Next.js, and Tailwind CSS. " +
          "You will be responsible for developing interactive web applications with a focus on performance and user experience. " +
          "The ideal candidate should have a strong understanding of JavaScript, component-based architecture, and responsive design.",
        salaryRange: "10-15 LPA",
        category: "Software Development",
        company: "TechCorp",
        location: "Bangalore, India",
      },
      {
        title: "Backend Developer (FTE)",
        description: 
          "We are seeking a highly skilled Backend Developer with experience in Node.js, PostgreSQL, and serverless architectures. " +
          "Your responsibilities will include developing robust APIs, managing databases, and ensuring system scalability. " +
          "Experience with microservices, authentication mechanisms, and cloud platforms like AWS is a plus.",
        salaryRange: "12-18 LPA",
        category: "Software Development",
        company: "CodeBase Inc.",
        location: "Hyderabad, India",
      },
      {
        title: "Software Engineer Intern",
        description: 
          "Join our fast-growing startup as a Software Engineer Intern and work alongside experienced developers on exciting real-world projects. " +
          "This internship is ideal for candidates with a strong foundation in JavaScript, React.js, and backend development. " +
          "You will gain hands-on experience in full-stack development and have the opportunity to contribute to production-ready applications.",
        salaryRange: "25,000 - 50,000 INR per month",
        category: "Software Development",
        company: "StartupX",
        location: "Remote",
      },
      {
        title: "UI/UX Designer (FTE)",
        description: 
          "We are looking for a talented UI/UX Designer to create visually appealing and user-friendly interfaces. " +
          "The role involves designing wireframes, prototypes, and high-fidelity visuals for web and mobile applications. " +
          "Proficiency in tools like Figma, Adobe XD, and Sketch is required. Prior experience working with development teams is a plus.",
        salaryRange: "8-12 LPA",
        category: "Design",
        company: "Creative Studio",
        location: "Mumbai, India",
      },
      {
        title: "Data Analyst Intern",
        description: 
          "We are hiring a Data Analyst Intern to assist in data collection, visualization, and reporting. " +
          "You will work with large datasets, analyze trends, and create dashboards to support business decisions. " +
          "Proficiency in SQL, Microsoft Excel, and Power BI is preferred. This role is ideal for candidates passionate about data-driven insights.",
        salaryRange: "20,000 - 40,000 INR per month",
        category: "Data Analytics",
        company: "DataInsight",
        location: "Delhi, India",
      },
    ]
async function main() {
   await prisma.job.createMany({
    data:jobs,
    skipDuplicates:true
   })
   console.log("Jobs created successfully.")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });