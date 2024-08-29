"use client";
import { infoModalState } from "@/atoms/infoModalAtom";
import { db, storage } from "@/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

function HorizontalLine() {
  return <hr className="col-span-5 mt-4 mb-3 border-t-1 border-gray-300" />;
}
function OptionHeader({ option }: { option: string }) {
  return <h2 className="col-span-1 text-md font-bold">{option}</h2>;
}
function InputField({
  id,
  type,
  placeholder = "",
  span = 2,
}: {
  id: string;
  type: string;
  placeholder?: string;
  span?: number;
}) {
  return (
    <input
      name={id}
      type={type}
      className={`input focus:outline-none input-bordered col-span-${span} mx-2`}
      placeholder={placeholder}
    />
  );
}

function cancelDataChange({
  router,
  e,
}: {
  router: AppRouterInstance;
  e: { preventDefault: () => void };
}) {
  e.preventDefault();
  router.back();
}

function NewUser() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useRecoilState(infoModalState);

  const filePickerRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<
    string | ArrayBuffer | null
  >(null);

  const addImageToPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitDataChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);


    const formData = new FormData(e.currentTarget);
    const dataToChange = Object.fromEntries(formData.entries());

    // Get all the values that are not empty
    const filteredDataToChange = Object.fromEntries(
      Object.entries(dataToChange).filter(([key, value]) => value !== "")
    );

    // Update the user data in the database
    await updateDoc(doc(db, "users", session?.user.id as string), {
      ...filteredDataToChange,
    });

    // Update the session data
    const entries = Object.entries(filteredDataToChange);
    const filteredArray = entries.filter(([key, value]) => key !== "image");

    await update(...filteredArray);

    // } else {
    //   // Handle empty values here
    //   setLoading(false);
    //   return router.push(origin);
    // }

    if (selectedFile) {
      // Upload the image to firebase storage with the user ID
      const imageRef = ref(storage, `users/${session?.user.id}/image`);

      // Get the image URL from firebase storage and update the user image
      await uploadString(imageRef, selectedFile as string, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "users", session?.user.id as string), {
            image: downloadURL,
          });
        }
      );

      // Update the session data
      await update({ image: selectedFile });

      // Redirect to the homepage with a success message
      setOpen(true);
      router.push("/?success=true&message=Your profile has been updated!");
    }

    // Reset the loading state and selected file
    setLoading(false);
    setSelectedFile(null);

    router.push("/");
  };

  const deleteUserData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    // Delete the user image from firebase storage if it exists
    if (session?.user?.image) {
      const imageRef = ref(storage, `users/${session?.user.id}/image`);

      console.log(imageRef);

      await uploadString(imageRef, selectedFile as string, "data_url").then(
        async (snapshot) => {
          await deleteObject(imageRef)
            .then(() => {
              console.log("Image deleted successfully!");
            })
            .catch((error) => {
              console.error("Error removing image: ", error);
            });
        }
      );
    }

    // Delete the user data from the database
    await deleteDoc(doc(db, "users", session?.user.id as string));

    // Redirect to the homepage with a success message
    setOpen(true);
    router.push("/?success=true&message=Your profile has been deleted!");

    // Reset the loading state and selected file
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <div className="bg-slate-400 text-base-content">
      <div className="flex mx-auto items-center min-h-screen justify-center max-w-3xl sm:max-w-xl">
        <div className="card static shadow-lg border-4 border-white bg-base-200">
          <div className="card-body pt-12 pb-8 px-8 md:w-[40rem] w-[30rem] relative z-10">
            {/* Top with banner, image and links */}

            <div className="bg-base-300 absolute w-full left-0 top-0 h-[25%] max-h-[6rem] rounded-t-xl -z-10 hidden md:inline-flex"></div>
            <div className="flex justify-between">
              <Image
                className="rounded-full shadow-lg shadow-black/15 z-10 border-4 p-[1.5px] border-base-200"
                src={session?.user?.image as string}
                width={120}
                height={120}
                alt=""
              />
              <div className="grid grid-flow-col md:mt-[4rem] space-x-2">
                <button className="profilebtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                  </svg>
                  Copy link
                </button>
                <button className="profilebtn">View profile</button>
              </div>
            </div>

            {/* Name and email */}

            <h2 className="absolute top-28 right-8 md:static card-title text-2xl font-bold">
              {session?.user?.name}
            </h2>
            <p className="absolute top-36 right-8 md:static text-gray-500 -mt-1 mb-4">{session?.user?.email}</p>

            {/* Input Fields */}

            <form onSubmit={submitDataChange} className="grid grid-cols-5">
              {/* First and Last name */}
              <HorizontalLine />
              <OptionHeader option="Name" />
              <InputField
                id="name"
                type="text"
                placeholder={session?.user?.name as string}
                span={4}
              />

              {/* Email address */}
              <HorizontalLine />
              <OptionHeader option="Email" />
              <InputField
                id="email"
                type="email"
                placeholder={session?.user?.email as string}
                span={4}
              />

              {/* Username
              <HorizontalLine />
              <OptionHeader option="Username" />
              <div className="join mx-2 col-span-4">
                <input
                  type="text"
                  className="input text-sm text-gray-500 left-[1%] right-[1%] input-bordered focus:outline-none text-end select-none bg-base-200 join-item"
                  value="https://acbud.jobsie.me/"
                  readOnly
                />
                <input
                  name="name"
                  type="text"
                  placeholder={session?.user?.name as string}
                  className="input input-bordered w-full focus:outline-none join-item"
                />
              </div> */}

              {/* Profile photo */}
              <HorizontalLine />
              <OptionHeader option="Profile photo" />
              <div className="col-span-4 grid grid-cols-4 items-center">
                <div className="col-span-1 ml-2 justify-center items-center">
                  {selectedFile ? (
                    <Image
                      className="rounded-full w-20 h-20 object-cover mx-auto border-2 border-gray-500"
                      src={selectedFile.toString()}
                      width={80}
                      height={80}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="rounded-full w-20 h-20 object-cover mx-auto border-2 border-gray-500"
                      src={session?.user?.image as string}
                      width={80}
                      height={80}
                      alt=""
                    />
                  )}
                </div>

                <input
                  type="file"
                  ref={filePickerRef}
                  onChange={addImageToPreview}
                  className="file-input file-input-sm col-span-3 mx-2"
                />
              </div>

              <div className="card-actions col-span-5 grid grid-cols-2 mt-4">
                <button
                  onClick={(e) => deleteUserData(e)}
                  className="profilebtn bg-error/10 border-0 hover:bg-error hover:text-error-content text-error w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete user
                </button>
                <div className="flex justify-end pr-2 gap-4">
                  <button
                    className="profilebtn"
                    onClick={(e) => cancelDataChange({ router, e })}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="profilebtn bg-black text-white hover:bg-black hover:text-white"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
