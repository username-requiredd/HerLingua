import { useRouter } from "next/router";
import Link from "next/link";


export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isCompleted, setIsCompleted] = useState(false);
  
  if (!id || !lessonsData[id]) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <Link href="/" className="text-xl font-bold">
              DeutschLernen
            </Link>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-center">
            <p className="text-xl">Loading lesson...</p>
          </div>
        </main>
      </div>
    );
  }
  
  const lesson = lessonsData[id];
  
  const markAsCompleted = () => {
    setIsCompleted(true);
    // In a real app, you would save this to a database
    alert('Lesson marked as completed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{lesson.title} - Learn German</title>
      </Head>
      
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            DeutschLernen
          </Link>
          <div>
            <Link href="/dashboard" className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-gray-500">{lesson.module}</p>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-lg mb-6">{lesson.description}</p>
            
            <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe 
                src={`https://www.youtube.com/embed/${lesson.videoId}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-96"
              ></iframe>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={markAsCompleted}
                className={`px-4 py-2 rounded ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={isCompleted}
              >
                {isCompleted ? 'Completed!' : 'Mark as Completed'}
              </button>
              
              <div className="flex space-x-4">
                <Link href={`/lessons/${parseInt(id) - 1}`} className={`${parseInt(id) <= 1 ? 'pointer-events-none opacity-50' : ''} px-4 py-2 bg-gray-200 rounded hover:bg-gray-300`}>
                  Previous Lesson
                </Link>
                <Link href={`/lessons/${parseInt(id) + 1}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Next Lesson
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Practice Exercises</h2>
            <p className="mb-6">Try to identify the correct article for these common nouns:</p>
            
            <div className="space-y-4">
              <div className="p-3 border rounded">
                <p className="font-medium">1. Which article is used with "Haus" (house)?</p>
                <div className="mt-2 space-x-4">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">der</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">die</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100 bg-green-100">das</button>
                </div>
              </div>
              
              <div className="p-3 border rounded">
                <p className="font-medium">2. Which article is used with "Frau" (woman)?</p>
                <div className="mt-2 space-x-4">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">der</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100 bg-green-100">die</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">das</button>
                </div>
              </div>
              
              <div className="p-3 border rounded">
                <p className="font-medium">3. Which article is used with "Mann" (man)?</p>
                <div className="mt-2 space-x-4">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100 bg-green-100">der</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">die</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">das</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}