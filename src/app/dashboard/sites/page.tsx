import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getSiteData } from "@/app/actions/site.action";
import { EmptyState } from "@/components/dashboard/EmpyState";
import Defaultimage from "../../../../public/assets/images/default.png";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = async () => {
  const siteData = await getSiteData();
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>

      {siteData === undefined || siteData?.length === 0 ? (
        <EmptyState
          title="You dont have any Sites created"
          description="You currently dont have any Sites. Please create some so that you can
see them right here!"
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {siteData?.map((item, index) => (
            <Card key={item.id} className="flex flex-col justify-between h-full">
              <Image
                src={item.imageUrl ?? Defaultimage}
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
      )}
    </>
  );
};

export default Page;
