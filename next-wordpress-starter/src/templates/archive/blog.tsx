// import { getData } from "@jambaree/next-wordpress";
// import Image from "next/image";

// export default async function PostArchive({ uri }) {
//   const { posts } = await getData({ variables: { uri }, query });

//   return (
//     <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
//       <div className="absolute inset-0">
//         <div className="h-1/3 bg-white sm:h-2/3" />
//       </div>
//       <div className="relative mx-auto max-w-7xl">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Posts Archive
//           </h2>
//           <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
//             libero labore natus atque, ducimus sed.
//           </p>
//         </div>
//         <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
//           {posts?.nodes?.map((post) => (
//             <div
//               key={post?.title}
//               className="flex flex-col overflow-hidden rounded-lg shadow-lg"
//             >
//               {post?.featuredImage?.node?.sourceUrl && (
//                 <div className="flex-shrink-0">
//                   <Image
//                     className="h-48 w-full object-cover"
//                     src={post?.featuredImage?.node?.sourceUrl}
//                     alt=""
//                   />
//                 </div>
//               )}
//               <div className="flex flex-1 flex-col justify-between bg-white p-6">
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-indigo-600 flex flex-col">
//                     {post?.categories?.nodes.map((category, index) => (
//                       <a
//                         key={index}
//                         href={category.uri}
//                         className="hover:underline"
//                       >
//                         {category.slug}
//                       </a>
//                     ))}
//                   </p>
//                   <a href={post.uri} className="mt-2 block">
//                     <p className="text-xl font-semibold text-gray-900">
//                       {post.title}
//                     </p>
//                     <p className="mt-3 text-base text-gray-500">
//                       {post.description}
//                     </p>
//                   </a>
//                 </div>
//                 <div className="mt-6 flex items-center">
//                   <div className="flex-shrink-0">
//                     <div>
//                       <span className="sr-only">{post.author.name}</span>
//                       {post?.author?.avatar?.url && (
//                         <Image
//                           className="h-10 w-10 rounded-full"
//                           src={post.author.avatar.url}
//                           alt=""
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-gray-900">
//                       {post.author.email}
//                     </p>
//                     <div className="flex space-x-1 text-sm text-gray-500">
//                       <time dateTime={post.date}>{post.date}</time>
//                       <span aria-hidden="true">&middot;</span>
//                       <span>Quick read</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const query = `
//   query PostsQuery {
//     posts {
//       nodes {
//         title
//         id
//         uri
//         slug
//         status
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         categories {
//           nodes {
//             slug
//             uri
//           }
//         }
//         date
//         content
//         author {
//           node {
//             email
//             avatar {
//               url
//             }
//           }
//         }
//       }
//     }
//   }`;
