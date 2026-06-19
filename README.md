Eric Lopez - Software Engineer Portfolio

Personal portfolio website built to showcase my software engineering projects, technical skills, and professional experience.

Live at: freneklopez.dev

🚀 Features

Modern UI/UX: Dark-themed, fully responsive design built with Tailwind CSS.

Serverless Contact Form: Integrated with a custom AWS backend (API Gateway + Lambda + Go) to securely route messages directly to Telegram or Email.

Optimized Assets: Leverages Next.js native <Image> component and static file serving for maximum performance and zero layout shifts.

SEO Ready: Configured with Next.js App Router metadata for optimal search engine visibility.

🛠️ Tech Stack

Frontend Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Backend Integration: AWS API Gateway, AWS Lambda, Go

Deployment & CI/CD: Vercel

🏗️ Architecture Note: Forms Nexus

The contact form in this portfolio does not rely on generic third-party email services (like EmailJS). Instead, it communicates directly with Forms Nexus, a custom serverless architecture.
Payloads are validated on the client side and dispatched to an AWS API Gateway, where a Go-based Lambda function processes the request and routes it to the designated channel.

💻 Local Development

Clone the repository:

git clone [https://github.com/FrenekLopez/freneklopez-dev.git](https://github.com/FrenekLopez/freneklopez-dev.git)
cd freneklopez-dev


Install dependencies:

npm install


Set up environment variables:
Create a .env.local file in the root directory and add your AWS API endpoint:

NEXT_PUBLIC_API_URL=your_aws_api_gateway_url_here


Run the development server:

npm run dev


Open http://localhost:3000 with your browser to see the result.

📫 Contact

GitHub: @FrenekLopez

Website: freneklopez.dev

Designed and built by Eric Lopez.