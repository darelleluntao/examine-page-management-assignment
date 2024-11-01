"use client";

import ListCollection from "./components/ListCollection";
import NewCollection from "./components/NewCollection";
import BookmarkIcon from "./components/common/BookmarkIcon";
import GetUpdatesSwitch from "./components/common/GetUpdatesSwitch";
import PageSheet from "./components/common/PageSheet";
import React from "react";
import { useState } from "react";

const page = {
  id: 1,
  title: "Creatine",
  description:
    "Creatine is among the most well-studied and effective supplements for improving exercise performance.",
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPageSaved, setIsPageSaved] = useState(false);
  const [collection, setCollection] = useState([]);
  const [getUpdates, setGetUpdates] = useState(true);

  function handlePageSaved() {
    setIsPageSaved((prev) => {
      const newIsPageSaved = !prev;
      if (!newIsPageSaved) {
        setGetUpdates(false);
      } else {
        setGetUpdates(true);
      }
      return newIsPageSaved;
    });
    setIsOpen((prev) => !prev);
  }

  function handlePageSavedAlready() {
    setIsOpen((prev) => !prev);
  }

  function handleAddCollection(collectionName) {
    const collectionCount = collection?.length == 0 ? 1 : collection.length + 1;
    const newCollection = {
      id: collectionCount,
      name: collectionName,
      pages: [],
    };
    setCollection((prev) => [...prev, newCollection]);
  }

  function handleAddPageToCollection(collectionId, pageId) {
    setCollection((prev) => {
      return prev.map((item) => {
        if (item.id === collectionId) {
          return {
            ...item,
            pages: [...item.pages, pageId],
          };
        }
        return item;
      });
    });
  }

  function handleRemovePageToCollection(collectionId, pageId) {
    setCollection((prev) => {
      return prev.map((item) => {
        if (item.id === collectionId) {
          return {
            ...item,
            pages: item.pages.filter((p) => p !== pageId),
          };
        }
        return item;
      });
    });
  }

  function handleGetUpdates() {
    setGetUpdates((prev) => !prev);
  }

  return (
    <main className="container flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto max-w-6xl px-4 py-6 ">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-grow pr-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3 leading-tight">
                {page.title}
              </h1>
              <p className="text-base text-gray-600 max-w-2xl">
                {page.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {isPageSaved ? (
                <div className="group relative">
                  <BookmarkIcon
                    isSaved={isPageSaved}
                    size={32}
                    onSaved={handlePageSavedAlready}
                    label="Page Saved"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Saved
                  </span>
                </div>
              ) : (
                <div className="group relative">
                  <BookmarkIcon
                    isSaved={isPageSaved}
                    size={32}
                    onSaved={handlePageSaved}
                    label="Save Page"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Save
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PageSheet
        title={`Saved page - ${page.title}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="w-full grid grid-cols-2 gap-y-8 py-8">
          <div className="text-left pr-4 self-center">Saved</div>
          <div className="text-right -pr-10">
            <BookmarkIcon
              isSaved={isPageSaved}
              size={30}
              onSaved={handlePageSaved}
            />
          </div>
          <div className="text-left pr-4 self-center">Get Updates</div>
          <div className="text-right">
            <GetUpdatesSwitch
              isChecked={getUpdates}
              onGetUpdate={handleGetUpdates}
            />
          </div>
          <div className="text-left pr-4 text-xl">Collections</div>
          <div className="text-right">
            <NewCollection
              label="New Collection"
              onAddCollection={handleAddCollection}
            />
          </div>
        </div>

        {collection.length > 0 ? (
          <ListCollection
            collection={collection}
            page={page}
            onAddPageToCollection={handleAddPageToCollection}
            onRemovePageToCollection={handleRemovePageToCollection}
          />
        ) : (
          <div className="text-center w-full p-4 mt-4 col-span-2">
            <p>You don't have any collection yet.</p>
            <p>Add one by clicking &quot;New Collection&quot; </p>
          </div>
        )}
      </PageSheet>
    </main>
  );
}
