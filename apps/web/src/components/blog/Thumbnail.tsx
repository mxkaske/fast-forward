import Link from "next/link";
import React, { FC } from "react";
import { format } from "date-fns";
import { Post } from "@/types/index";
import { Heading } from "@fast-forward/ui";
import Image from "next/image";

const Thumbnail: FC<Post> = ({
  slug,
  title,
  section,
  date,
  excerpt,
  coverImage,
}) => {
  return (
    <article className="group overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-indigo-500">
      <Link href={`/blog/${slug}`}>
        <a className="focus:outline-none flex">
          <div className="relative w-24 md:w-48">
            <Image
              src={coverImage}
              objectFit="cover"
              layout="fill"
              alt={`${slug}-image`}
              className="group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex-1 px-6 py-4">
            <div className="md:flex justify-between">
              <div className="max-w-xl">
                <Heading as="h3">{title}</Heading>
                <p className="text-sm text-indigo-500 dark:text-pink-500 font-semibold tracking-wide uppercase">
                  {section}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-gray-600 dark:text-gray-400 pb-1">
                  {format(new Date(date), "dd.MM.yyyy")}
                </p>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{excerpt}</p>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default Thumbnail;
