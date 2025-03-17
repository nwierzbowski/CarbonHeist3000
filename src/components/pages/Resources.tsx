import { useState } from "react";
import Header from "../general/Header";
import { resources } from "../../data/resources";

export default function Resources() {
  const [search, setSearch] = useState("");

  // Filter resources based on search input
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header> Resource Library</Header>
      <p className="text-gray-700 mb-6">
        Discover practical tips and resources to live a more eco-friendly life.
      </p>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a resource..."
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
      />

      {/* Resource List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="p-4 bg-white border border-gray-200 rounded-md shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-green-700 mb-2">
                {resource.title}
              </h2>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Learn More
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No resources found. Try searching for something else!
          </p>
        )}
      </div>
    </div>
  );
}
