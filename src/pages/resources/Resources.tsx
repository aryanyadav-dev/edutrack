import { Book, FileText, Video, Database, Code, BookOpen, PenTool, TestTube, GraduationCap } from 'lucide-react';

const resources = {
  courseMaterials: [
    {
      title: "Data Structures & Algorithms",
      href: "/pdfs/dsa-materials.pdf",
      icon: Code
    },
    {
      title: "Web Development",
      href: "/pdfs/web-dev-materials.pdf",
      icon: FileText
    },
    {
      title: "Database Management",
      href: "/pdfs/dbms-materials.pdf",
      icon: Database
    },
  ],
  studyResources: [
    {
      title: "Lecture Notes",
      href: "/pdfs/lecture-notes.pdf",
      icon: BookOpen
    },
    {
      title: "Practice Problems",
      href: "/pdfs/practice-problems.pdf",
      icon: PenTool
    },
    {
      title: "Video Tutorials",
      href: "https://example.com/tutorials",
      icon: Video
    },
  ],
  examPreparation: [
    {
      title: "Previous Year Papers",
      href: "/pdfs/previous-papers.pdf",
      icon: FileText
    },
    {
      title: "Mock Tests",
      href: "/mock-tests",
      icon: TestTube
    },
    {
      title: "Study Guides",
      href: "/pdfs/study-guides.pdf",
      icon: GraduationCap
    },
  ],
};

export default function Resources() {
  return (
    <>
      {/* Apply overflow-x-hidden to body for preventing horizontal scroll */}
      <style>
        {`
          body {
            overflow-x: hidden;
          }
        `}
      </style>

      <div className="container mx-auto py-8 px-4 md:ml-[225px]">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Educational Resources</h1>
        </div>

        {/* Course Materials Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Course Materials</h2>
            <div className="space-y-3">
              {resources.courseMaterials.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`Download ${resource.title}`}
                  >
                    <Icon className="h-5 w-5" />
                    {resource.title}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Study Resources Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Study Resources</h2>
            <div className="space-y-3">
              {resources.studyResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`Access ${resource.title}`}
                  >
                    <Icon className="h-5 w-5" />
                    {resource.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Exam Preparation Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Exam Preparation</h2>
            <div className="space-y-3">
              {resources.examPreparation.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`Prepare with ${resource.title}`}
                  >
                    <Icon className="h-5 w-5" />
                    {resource.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
