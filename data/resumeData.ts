import { TimelineItem, ProjectItem } from "@/types";

// APPLICATION PRESENTATION DATA
// Static content matrix decoupled from layout and styling layers

export const experienceData: TimelineItem[] = [
  {
    id: "exp-1",
    role: "Backend Software Developer Trainee",
    company: "Freelance & Independent Architecture",
    period: "Recent - Present",
    description: "Specializing in backend software development and cloud architecture leveraging Go (Golang). Engineered automated provisioning workflows on AWS utilizing Infrastructure as Code (IaC) principles. Successfully designed and documented robust, scalable endpoints ensuring seamless API integration.",
  },
  {
    id: "exp-2",
    role: "Cloud Infrastructure Specialist",
    company: "Open Source / Independent Projects",
    period: "Ongoing",
    description: "Programmed cloud infrastructure via AWS CDK v2 and CloudFormation. Orchestrated CI/CD pipelines through GitHub Actions and optimized application performance using Docker containerization. Applied advanced design patterns across distributed systems.",
  }
];

export const educationData: TimelineItem[] = [
  {
    id: "edu-1",
    role: "Computer Systems Engineering",
    company: "UTEL University",
    period: "Expected 2026",
    description: "In progress / Final phase of degree completion. Focused on advanced logical thinking, strong problem-solving capabilities, and scalable software architecture.",
  },
  {
    id: "edu-2",
    role: "Computer Technician",
    company: "CECYTE",
    period: "2010 - 2014",
    description: "Graduated. Acquired solid foundational knowledge in computer systems, hardware troubleshooting, and basic programming logic.",
  }
];

export const developmentSkills = [
  "Go (Golang)", "Gin Web Framework", "AWS CloudFormation", 
  "AWS CDK v2", "AWS Lambda", "Amazon API Gateway", 
  "Amazon DynamoDB", "Docker", "Docker Compose", "TypeScript", "Next.js"
];

export const developmentTools = [
  "Git & GitHub", "GitHub Actions (CI/CD)", "Postman (API Testing)", 
  "VS Code", "Terminal / Linux", "Figma"
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    number: "01",
    title: "Forms Nexus Service",
    description: "A high-performance serverless API built with Go designed to operate as an asynchronous notification router. Programmed cloud infrastructure via IaC using AWS CDK v2, deploying Lambda (ARM64), API Gateway, and DynamoDB. Integrated Telegram Bot API and Amazon SES.",
    tech: ["Go", "AWS CDK v2", "Lambda", "DynamoDB"],
    githubUrl: "https://github.com"
  },
  {
    id: "proj-2",
    number: "02",
    title: "Umami Cloud Go",
    description: "Spearheaded the architecture design and infrastructure development of a backend REST API built with Go (Gin). Engineered automated provisioning workflows on AWS utilizing CloudFormation. Orchestrated CI/CD pipelines through GitHub Actions and Docker.",
    tech: ["Go", "Gin", "CloudFormation", "Docker"],
    githubUrl: "https://github.com"
  },
  {
    id: "proj-3",
    number: "03",
    title: "Serverless Developer Portfolio",
    description: "Modern, highly-optimized developer portfolio built with Next.js, React, and Tailwind CSS. Features advanced Framer Motion animations and integrates directly with an AWS serverless backend (API Gateway & Lambda) for secure contact form processing.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Serverless"],
    githubUrl: "https://github.com"
  }
];
