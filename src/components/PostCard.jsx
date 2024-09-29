import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // console.log($id, title, featuredImage);
  // console.log(appwriteService.getFilePreview(featuredImage));

  return (
   <div className="min-w-[300px]">
     <Link to={`/post/${$id}`} className="">
      <div className="w-full bg-gray-100 rounded-xl p-4  max-w-[300px] max-h-[400px]"> {/* Adjusted max height */}
        <div className="w-full h-[200px] mb-4 overflow-hidden flex justify-center items-center"> {/* Set explicit height and add flex for centering */}
          <img
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className="w-full h-full object-contain rounded-xl" // Use object-cover to prevent overflow and maintain aspect ratio
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
   </div>
  );
}

export default PostCard;
