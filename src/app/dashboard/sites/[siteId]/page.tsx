import { deletePost } from "@/app/actions/post.action";
import { getSingleSiteData } from "@/app/actions/site.action";
import { EmptyState } from "@/components/dashboard/EmpyState";
import EditPost from "@/components/layout/EditPost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, PlusCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const SiteDetails = async ({ params }: { params: { siteId: string } }) => {
  const { siteId } = params;
  const siteData = await getSingleSiteData(siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary" className="hover:bg-primary hover:text-white">
          <Link href={`/blog/${siteData?.subdirectory}`}>
            <Book className="size-4 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="secondary" className="hover:bg-primary hover:text-white">
          <Link href={`/dashboard/sites/${siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      {siteData?.posts === undefined || siteData.posts.length === 0 ? (
        <EmptyState
          title="You dont have any Articles created"
          description="You currently dont have any articles. please create some so that you can see them right here"
          buttonText="Create Article"
          href={`/dashboard/sites/${siteId}/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Manage your Articles in a simple and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {siteData?.posts?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        width={64}
                        height={64}
                        alt="Article Cover Image"
                        className="size-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500"
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-end">
                      <EditPost item ={item} siteId={siteId?.toString()}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </>
  );
};

export default SiteDetails;
