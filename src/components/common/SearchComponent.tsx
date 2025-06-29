import React, { useEffect, useRef, useState } from "react";
import {InputField} from "@components";
import { CommentSkeleton } from "@/components/skeletons/PostSkeleton";

const SearchComponent = ({ className }) => {
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const searchUsers = async (text) => {
    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("username", ">=", text),
      where("username", "<=", text + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = async (e) => {
    const text = e.target.value;
    setQueryText(text);
    if (text.trim() !== "") {
      setLoading(true);
      const data = await searchUsers(text);
      setResults(data);
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="h-full">
      <h2 className="px-4 mb-6 hidden md:flex">Search</h2>
      <div className="relative w-full">
        <InputField
          ref={inputRef}
          value={queryText}
          onChange={handleChange}
          placeholder="Search users..."
          className="w-full py-2 px-4 my-4 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <div
          className={`absolute top-full mt-1 left-0 w-full z-40 max-h-[300px] md:max-h-none overflow-y-auto ${className}`}
        >
          {loading && (
            <ul className="space-y-2 p-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
            </ul>
          )}

          {!loading && results.length > 0 && (
            <ul className="flex flex-col space-y-2 p-2">
              {results.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-700 rounded"
                >
                  <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="bg-black p-[2px] rounded-full">
                      <img
                        src={user.profilePic || "/fallback.jpg"}
                        alt={user.username}
                        className="w-10 h-10 aspect-square rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-400">{user.fullName}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
