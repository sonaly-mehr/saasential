import React from "react";
import { getData } from "../actions/site.action";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { EmptyState } from "@/components/dashboard/EmpyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImg from "../../../public/assets/images/default.png";

const DashboardIndexPage = async () => {
  const { articles, sites } = await getData();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between h-full">
              <Image
                src={item.imageUrl ?? DefaultImg}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader className="flex-1">
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any sites created"
          description="You currently dont have any Sites. Please create some so that you can see them right here."
          href="/dashboard/sites/new"
          buttonText="Create Site"
        />
      )}

      <h1 className="text-2xl pt-10 font-semibold mb-5">Recent Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {articles.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between h-full"
            >
              <Image
                src={item.image ?? DefaultImg}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader className="flex-1">
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}/edit/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any articles created"
          description="Your currently dont have any articles created. Please create some so that you can see them right here"
          buttonText="Create Article"
          href="/dashboard/sites"
        />
      )}
    </div>
  );
};

export default DashboardIndexPage;
