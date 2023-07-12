"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFeed() {
  const [username, setUsername] = useState("");
  const [loc, setLoc] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSumbit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/feeds", {
      method: "POST",
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

    setTitle("");
    setDesc("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="text-black btn w-full bg-blue-100 sticky transition transition ease-in-out delay-100 hover:scale-110 hover:bg-indigo-500 duration-300"
        onClick={handleChange}
      >
        Create New Post
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Post</h3>
          <form onSubmit={handleSumbit}>
            <div className="form-control">
              <label className="label font-bold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter your Username"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Location</label>
              <input
                type="text"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter the Location"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Title of your post"
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
                  Post
                </button>
              ) : (
                <button type="button" className="btn loading animate-spin">
                  Posting...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
