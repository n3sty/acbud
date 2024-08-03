"use client";

import { modalState } from "@/atoms/modalAtom";
import React from "react";
import { useRecoilState } from "recoil";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = React.useRef<HTMLInputElement>(null);
  const captionRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const [loading, setLoading] = React.useState(false);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1) Create a post and add to firestore 'posts' collection
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user?.username,
      caption: captionRef.current?.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    // 2) Get the post ID for the newly created post
    console.log("New doc added with ID", docRef.id);

    // 3) Upload the image to firebase storage with the post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // 4) Get the image URL from firebase storage and update the original post with image
    if (selectedFile) {
      await uploadString(imageRef, selectedFile as string, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          });
        }
      );
    }

    // Reset the modal and states
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target) {
        setSelectedFile(readerEvent.target.result);
      }
    };
  };

  return (
    <Dialog
      open={open}
      as="div"
      onClose={() => setOpen(false)}
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <DialogBackdrop className="fixed inset-0 bg-black/35" />
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full space-y-4 text-base-content shadow-md border max-w-md rounded-xl bg-base-100 bg-opacity-60 p-6 backdrop-blur-md duration-300 ease-out data-[closed]:transform-[scale(50%)] data-[closed]:opacity-0"
          >
            {/* Dialog Title */}
            <DialogTitle as="h3" className="text-xl/10 font-black">
              Upload a photo
            </DialogTitle>

            {/* Camera Icon with File Input */}

            {selectedFile ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full object-contain cursor-pointer"
                src={selectedFile.toString()}
                onClick={() => filePickerRef.current?.click()}
                alt=""
              />
            ) : (
              <div
                onClick={() => filePickerRef.current?.click()}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary transition-all hover:bg-primary/80 cursor-pointer"
              >
                <CameraIcon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
            )}

            <input
              ref={filePickerRef}
              type="file"
              hidden
              onChange={(e) => addImageToPost(e)}
            />

            {/* Caption Input */}
            <div className="mt-2">
              <input
                className="input w-full"
                type="text"
                ref={captionRef}
                placeholder="Please enter a caption"
              />
            </div>

            {/* Upload Button */}
            <div>
              <div className="mt-4">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 bg-primary py-2 text-sm 
                font-medium text-primary-content hover:bg-primary/80 hover:text-white transition-all focus:outline-none sm:text-base data-[hover]:bg-gray-600 
                data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 disabled:text-base-content/50 disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  onClick={() => uploadPost()}
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
