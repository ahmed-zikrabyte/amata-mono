import EditBlogClient from "../../../../../components/blogs/edit-blog-page";


export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.blogId;

  return <EditBlogClient id={id} />;
}
/* eslint-disable @typescript-eslint/no-explicit-any */

