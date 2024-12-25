import { Book, FileText, Video, Database, Code, BookOpen, PenTool, TestTube, GraduationCap } from 'lucide-react'; 
import { useState } from 'react'; 

const resources = { 
  courseMaterials: [ 
    { title: "Data Structures & Algorithms", href: "/pdfs/dsa-materials.pdf", icon: Code, description: "In-depth materials for Data Structures and Algorithms." },  
    { title: "Database Management", href: "/pdfs/dbms-materials.pdf", icon: Database, description: "Learn about database management systems." },
    { title: "Operating Systems", href: "/pdfs/os-materials.pdf", icon: Book, description: "Fundamentals of Operating Systems." } 
  ], 
  studyResources: [ 
    { title: "Lecture Notes", href: "/pdfs/lecture-notes.pdf", icon: BookOpen, description: "Lecture notes for various courses." }, 
    { title: "Practice Problems", href: "/pdfs/practice-problems.pdf", icon: PenTool, description: "Practice problems to test your skills." }, 
    { title: "Video Tutorials", href: "https://example.com/tutorials", icon: Video, description: "Video tutorials for visual learners." },  
  ], 
  examPreparation: [ 
    { title: "Previous Year Papers", href: "/pdfs/previous-papers.pdf", icon: FileText, description: "Past year exam papers for practice." }, 
    { title: "Mock Tests", href: "/mock-tests", icon: TestTube, description: "Mock tests to simulate exam conditions." }, 
    { title: "Revision Notes", href: "/pdfs/revision-notes.pdf", icon: BookOpen, description: "Concise notes for quick revision." } 
  ], 
}; 

export default function Resources() { 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [downloadInProgress, setDownloadInProgress] = useState(null); 

  const filterResources = (resources) => { 
    return resources.filter((resource) => resource.title.toLowerCase().includes(searchQuery.toLowerCase())); 
  }; 

  const handleDownload = (resource) => { 
    setDownloadInProgress(resource.title); 
    setTimeout(() => { 
      setDownloadInProgress(null); 
      alert(`${resource.title} downloaded successfully!`); 
    }, 2000); // Simulating download time 
  }; 

  return ( <> 
    <style> {` 
      body { overflow-x: hidden; width: 100vw; margin: 0; background-color: white; } 
      .container { width: 150%; background-color: white; } 
      .search-input { max-width: 400px; width: 100%; } 
      .resource-card { flex-basis: calc(25% - 1rem); /* Adjusted for four items per row */ }  
    `} </style> 
    
    <div className="container mx-auto py-8 px-4 md:ml-[250px]"> 
      {/* Header Section */} 
      <div className="flex items-center gap-3 mb-8 mt-12"> 
        <BookOpen className="h-8 w-8 text-blue-600" /> 
        <h1 className="text-3xl font-bold text-gray-800">Educational Resources</h1> 
      </div> 

      {/* Search Bar */} 
      <div className="mb-4"> 
        <input type="text" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input p-2 border rounded-md" /> 
      </div> 

      {/* Course Materials Section */} 
      <div className="mb-6"> 
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Course Materials</h2> 
        
        <div className="flex flex-wrap gap-4 justify-start"> 
          {filterResources(resources.courseMaterials).map((resource) => ( 
            <div key={resource.title} className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow resource-card" > {/* Updated class name */}
              <h2 className="text-xl font-bold mb-4 text-gray-700">{resource.title}</h2> 
              <div className="space-y-3"> 
                <a href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors" aria-label={`Download ${resource.title}`} onClick={() => handleDownload(resource)} > 
                  <resource.icon className="h-5 w-5" /> {resource.title} </a> 

                <p className="text-sm text-gray-600">{resource.description}</p> 

                {downloadInProgress === resource.title && ( <div className="mt-2 text-sm text-gray-500">Downloading...</div> )} 

              </div> 
            </div> ))} 

        </div> 
        
      </div> 

      {/* Study Resources Section */}  
      <div className="mb-6">  
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Study Resources</h2>  
        
        <div className="flex flex-wrap gap-4 justify-start">  
          {filterResources(resources.studyResources).map((resource) => (  
            <div key={resource.title} className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow resource-card" > {/* Updated class name */}
              <h2 className="text-xl font-bold mb-4 text-gray-700">{resource.title}</h2>  
              <div className="space-y-3">  
                <a href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-600 hover:text-green-800 transition-colors" aria-label={`Access ${resource.title}`} >  
                  <resource.icon className="h-5 w-5" /> {resource.title}  
                </a>  
                <p className="text-sm text-gray-600">{resource.description}</p>  
                {downloadInProgress === resource.title && (  
                  <div className="mt-2 text-sm text-gray-500">Downloading...</div>  
                )}  
              </div>  
            </div> ))}  

        </div>  

      </div>  

      {/* Exam Preparation Section */}  
      <div className="mb-6">  
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Exam Preparation</h2>  
        
        <div className="flex flex-wrap gap-4 justify-start">  
          {filterResources(resources.examPreparation).map((resource) => (  
            <div key={resource.title} className="bg-orange-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow resource-card" > {/* Updated class name */}
              <h2 className="text-xl font-bold mb-4 text-gray-700">{resource.title}</h2>  
              <div className="space-y-3">  
                <a href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-orange-600 hover:text-orange-800 transition-colors" aria-label={`Prepare with ${resource.title}`} >  
                  <resource.icon className="h-5 w-5" /> {resource.title}...  
                </a>  
                <p className="text-sm text-gray-600">{resource.description}</p>  
                {downloadInProgress === resource.title && (  
                  <div className="mt-2 text-sm text-gray-500">Downloading...</div>  
                )}  
              </div>  
            </div> ))}  

        </div>  

      </div>  

    </div>
   </>);
}
