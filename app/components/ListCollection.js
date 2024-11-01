"use client";

import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import React from "react";

const ListCollection = ({
  collection,
  page,
  onAddPageToCollection,
  onRemovePageToCollection,
}) => {
  const isCollectionEmpty = collection.length === 0;
  const isCollectionAddedAlready = (collectionId, currentPageId) => {
    return collection.some(
      (item) =>
        item.id == collectionId &&
        item.pages &&
        item.pages.includes(currentPageId)
    );
  };

  return (
    <div className="w-full my-3 grid grid-cols-2 gap-4">
      {!isCollectionEmpty &&
        collection.map((item) => (
          <React.Fragment key={item.id}>
            <div className="text-left pr-4 self-center">
              <p>{item.name}</p>
            </div>
            <div className="text-right pl-4">
              {isCollectionAddedAlready(item.id, page.id) ? (
                <MinusCircleIcon
                  size={30}
                  className="cursor-pointer float-end"
                  onClick={() => onRemovePageToCollection(item.id, page.id)}
                />
              ) : (
                <PlusCircleIcon
                  size={30}
                  className="cursor-pointer float-end"
                  onClick={() => onAddPageToCollection(item.id, page.id)}
                />
              )}
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default ListCollection;
