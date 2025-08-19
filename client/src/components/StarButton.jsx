import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const  StarButton = ({ snippetId }) => {
  const user = useSelector((state) => state.user);

  const [isStarred, setIsStarred] = useState([]);
    const [starCount, setStarCount] = useState(0);
    
    const fetchStarCount = async () => {
      try {
        const response = await axios.get(`/api/v1/snippet/star/${snippetId}`);
        setStarCount(response.data.starCount);
      } catch (error) {
        console.log("Error fetching star count:", error);
      }
    };

    const fetchIsStarred = async () => {
      if (!user?.isAuthenticated) return;
      try {
        const response = await axios.get(`/api/v1/snippet/user/${user?.id}/starred`);
        setIsStarred(response.data.isStarred);
      } catch (error) {
        console.log("Error checking if snippet is starred:", error);
      }
    };


    useEffect(() => {
      fetchIsStarred();
      fetchStarCount();
    }, [snippetId]);

  const handleStar = async () => {
    if (!user?.isAuthenticated) return;
    await axios.post(`/api/v1/snippet/star`, { snippetId, userId: user?.id });
  };

  return (
    <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
    transition-all duration-200 ${
      isStarred.includes(snippetId)
        ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
        : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
    }`}
      onClick={handleStar}
    >
      <Star
        className={`w-4 h-4 ${
          isStarred.includes(snippetId) ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isStarred.includes(snippetId) ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        {starCount}
      </span>
    </button>
  );
}

export default StarButton;
