import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Database Management System",
    description: "A comprehensive platform for students understand about DBMS and learn from all the resources.",
    image: "https://media-hosting.imagekit.io//7559543cc42c4c7a/Screenshot%202024-12-24%20at%2010.56.20%E2%80%AFPM.png?Expires=1735234107&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=H9PAjOsmBwoDTATlHWUcMYUCE5qZnRLcs9mOj5ebkH~E6wik3zmoSN11sO~DzzO1rLL5~qcS~8P~EPJocP7PFqHXeQ0F8K3n0J-2vKr4l08zJbuhvEaBEUY2YUxRpi1rPE~2wXkxksQDm1DMk9G27YGTzvMGi-Cl9s8lnU1rv5~LNH6QxNe9H-LX7tPzjZLI5avB-kESqnN3GzRWQKiAXUOA0O~N7XJcndXpFrPzpzkFJENpVFBI-hVLbkZdCKwFi58fSVH~0diTLX5T0o3VrgU9TUULwSC4Njz~DEJ5chqDztQQL3QlidYu7ciuQ0Uu58i1pzsNu5KdxgUmf9NT2w__",
    url: "https://dbms-website.vercel.app/",
    tags: ["HTML", "CSS", "Javascript", "SQLite","Django"]
  },
  {
    title: "Computer Networks",
    description: "A comprehensive platform for students understand about Computer Networks and learn from all the resources.",
    image: "https://media-hosting.imagekit.io//d1133ae4d67a4316/Screenshot%202024-12-24%20at%2011.01.56%E2%80%AFPM.png?Expires=1735234328&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=N2MZN5KzyA4RrLEGDFu0Xc4r700qmHuCmRYOtkqhEDNGD54Dyv52nOECLBoi1hbARpnV-mYYi1bND9V7TVIHvXUrfnKQ3ryHrf1y2L33x-Vd0fDACM9OOEBtxDjXVcFtpRhKPePHIBBz7R-Pcf~1VEmZroNaU-LwxWcLvBYFNlrhqE7-cQViqaGWycZzMcls7eGRJloNhH8UpS2lTTll7wXNGMoZv3YR8-U-NcKu57e2hJLfZFyqe1JfOQcjHwFTt~5EFK7S-Q-3B1ejMmgwxJiush1bW9mNBAKBvaxL1rRHper6JB-FAfpk3edRUsdIsnx~OTNzv3CEYHZYDW9IDw__",
    url: "https://lms.example.com",
    tags: ["React", "Typescript", "Tailwind CSS"]
  }
];

export default function Projects() {
  return (
    <div className="ml-56 flex-1 pt-12 px-8 bg-gray-50"> 
      <div className="max-w-[calc(100%-2rem)] mx-auto"> 
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500"
                >
                  <span>View Project</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
