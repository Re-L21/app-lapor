"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Feed = {
  id: number;
  username: string;
  loc: string;
  title: string;
  desc: string;
};

export default function UpdateFeed(feed: Feed) {
  const [username, setUserName] = useState(feed.username);
  const [loc, setLoc] = useState(feed.loc);
  const [title, setTitle] = useState(feed.title);
  const [desc, setDesc] = useState(feed.desc);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/feeds/${feed.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        loc: loc,
        title: title,
        desc: desc,
      }),
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
        className="transition delay-300 duration-300 ease-in-out btn btn-xs btn-info md:hidden group-hover:block hover:scale-110 "
        onClick={handleChange}
      >
        Edit
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {feed.username}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Location</label>
              <input
                type="text"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Location"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Title of the post"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Description of the post"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading animate-spin">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
