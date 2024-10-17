"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async (e) => {
    const fileInput = e.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.log("No file selected");
      return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();

      startTransition(() => router.push(`/note/${data.uid}`));
      startTransition(() => router.refresh());
    } catch (error) {
      console.log("Error: something went wrong");
    }
    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <form method="post" encType="multipart/form-data">
      <div
        className="edit-button--solid"
        style={{ textAlign: "center", margin: "16px", borderRadius: "8px" }}
      >
        <label htmlFor="file" style={{ cursor: "pointer", width: "100%" }}>
          Upload Markdown
        </label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          onChange={onChange}
          accept=".md"
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        />
      </div>
    </form>
  );
}
