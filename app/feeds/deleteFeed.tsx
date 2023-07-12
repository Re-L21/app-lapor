"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Feed = {
  id: number;
  username: string;
  loc: string;
  title: string;
  desc: string;
};

export default function DeleteFeed(feed: Feed) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(feedId: number) {
    console.log(feedId);
    setIsMutating(true);
    await fetch(`http://localhost:5000/feeds/${feedId}`, {
      method: "DELETE",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="transition delay-300 duration-300 ease-in-out btn btn-xs btn-error md:hidden group-hover:block hover:scale-110 "
        onClick={handleChange}
        type="button"
      >
        Delete
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Delete {feed.title} from {feed.username} ?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(feed.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading animate-spin">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
