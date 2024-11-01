"use client";

import { BookmarkCheck, Bookmark } from "lucide-react";
import React from "react";

const BookmarkIcon = ({ isSaved, size, onSaved, label = "" }) => {
  const islabeled = label !== "";
  return (
    <button
      className={`w-min items-center gap-2 text-gray-600 ${
        islabeled ? "flex hover:bg-gray-100 bg-gray-200 rounded-lg p-2" : ""
      }`}
      onClick={onSaved}
    >
      {isSaved ? <BookmarkCheck size={size} /> : <Bookmark size={size} />}
      {islabeled && <span className="ml-2 w-max">{label}</span>}
    </button>
  );
};

export default BookmarkIcon;
