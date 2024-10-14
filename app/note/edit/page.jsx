import NoteEditor from "@/components/NoteEditor";

export default async function Editpage() {
  return <NoteEditor note={null} intialTitle="Untitled" intialBody={""} />;
}
