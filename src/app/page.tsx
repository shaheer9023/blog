import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
// import { blogType } from '../sanity/schemaTypes/blog';

type BlogType = {
  _id: string;
  title: string;
  description: string;
  image: string; // Image should be an object, not a string
};

const getData = async () => { 
  const revalidate = 60;
  const result = await client.fetch(`*[_type == "blog"]`, { revalidate }); // Corrected the query syntax
  return result;
};

export default async function Home() {
  const blogs = await getData(); // Changed 'data' to 'blogs'
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogs.map((blog: BlogType) => (
        <div key={blog._id}>
          <h1 className="text-3xl font-bold underline">{blog.title}</h1>
          <p>{blog.description}</p>
          {blog.image && (
            <Image 
              src={urlFor(blog.image).url()} 
              alt={blog.title} 
              width={500} 
              height={300} 
            />
          )}
        </div>
      ))}
    </main>
  );
}
