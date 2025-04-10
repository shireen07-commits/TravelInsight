import { Link } from 'wouter';
import { ArrowRight, MapPin, Image, Globe, Heart, Compass } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Nav */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="h-7 w-7 text-blue-600" />
            <h1 className="text-xl font-bold">TravelVision</h1>
          </div>
          
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-blue-600">
                  Destinations
                </a>
              </li>
              <li>
                <Link href="/mood-board" className="text-gray-600 hover:text-blue-600">
                  Mood Boards
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
              </li>
            </ul>
          </nav>
          
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Next Adventure
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Plan, visualize, and share your dream travel destinations with our interactive mood boards and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mood-board">
                <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <span>Create a Mood Board</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Link>
              <a 
                href="#destinations" 
                className="px-6 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Explore Destinations
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Plan Your Journey, Your Way
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Destinations</h3>
              <p className="text-gray-600">
                Explore curated collections of stunning destinations around the world, with insider tips and hidden gems.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Mood Boards</h3>
              <p className="text-gray-600">
                Build personalized visual collections of travel inspiration with our drag-and-drop mood board creator.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-gray-600">
                Keep track of your favorite destinations and travel ideas for future adventures.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-16" id="destinations">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Destinations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Destination Cards */}
            <div className="rounded-lg overflow-hidden shadow-sm group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1568797629192-602b25860bd4?w=600&q=80" 
                  alt="Bali" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Southeast Asia</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  A tropical paradise with beautiful beaches, ancient temples, and lush rice terraces.
                </p>
                <Link href="/mood-board">
                  <a className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                    <span>Create a Mood Board</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-sm group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" 
                  alt="Paris" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">Paris, France</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Europe</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  The city of light offers iconic monuments, world-class museums, and charming neighborhoods.
                </p>
                <Link href="/mood-board">
                  <a className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                    <span>Create a Mood Board</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-sm group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555338386-7e74c4ae1c3c?w=600&q=80" 
                  alt="Kyoto" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">Kyoto, Japan</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>East Asia</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  Experience traditional Japanese culture with ancient temples, beautiful gardens, and tea ceremonies.
                </p>
                <Link href="/mood-board">
                  <a className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                    <span>Create a Mood Board</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="#" 
              className="px-6 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition inline-block"
            >
              View All Destinations
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Create a free account to save your mood boards, favorite destinations, and get personalized travel recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mood-board">
                <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <span>Start Creating Now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-bold">TravelVision</h3>
              </div>
              <p className="text-gray-400">
                Your personal travel inspiration and planning assistant.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mood Boards</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Travel Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} TravelVision. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}