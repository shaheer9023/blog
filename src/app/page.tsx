import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BlogType = {
  _id: string;
  title: string;
  description: string;
  image: string; // Image should be an object, not a string
};

const getData = async () => {
  const revalidate = 60;
  const result = await client.fetch(`*[_type == "blog"]`, { revalidate });
  return result;
};

export default async function Home() {
  const blogs = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog: BlogType) => (
          <article key={blog._id} className="bg-red-600 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="mt-4">{blog.description}</p>
            {blog.image && (
              <Image
                src={urlFor(blog.image).url()}
                alt={blog.title}
                className="mt-6 w-full rounded-lg"
                width={500}
                height={300}
              />
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

