import { useState } from "react";
import { PenLine, X } from "lucide-react";
import { EditorialDoodles } from "./Doodles";

const STORAGE_KEY = "zobia-little-traces";

function VisitorTrace() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", message: "", role: "" });

  const submit = (event) => {
    event.preventDefault();
    if (!form.message.trim()) return;
    const entry = { ...form, name: form.name.trim() || "A visitor", message: form.message.trim(), createdAt: new Date().toISOString() };
    const nextEntries = [entry, ...entries].slice(0, 12);
    setEntries(nextEntries);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries)); } catch { /* A backend can replace device storage later. */ }
    setForm({ name: "", message: "", role: "" });
    setIsOpen(false);
  };

  return <section id="trace" className="relative overflow-hidden bg-[#E9EEE6] px-6 py-24 lg:px-10 lg:py-32">
    <EditorialDoodles className="-right-12 top-12 hidden h-44 w-64 opacity-70 lg:block" />
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div><span className="section-kicker">LITTLE TRACE</span><h2 className="mt-4 display-title">Leave a little<br /><em>trace.</em></h2><p className="mt-5 max-w-md leading-7 text-[#607789]">If you enjoyed your little tour around my world, leave a thought behind.</p></div>
        <div className="trace-counter"><strong>{entries.length || "—"}</strong><span>Little traces left</span><small>Saved on this device only. A shared guestbook can connect here later.</small></div>
      </div>
      <div className="mt-12 border-t border-[#A8B5A2] pt-8">
        <button type="button" onClick={() => setIsOpen(true)} className="group inline-flex items-center gap-2 text-[#0F3D3E] underline decoration-[#C6A15B] underline-offset-8 transition hover:text-[#607789]">Leave a little trace <PenLine size={16} className="transition-transform group-hover:-rotate-12" /></button>
        {entries.length > 0 && <div className="mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">{entries.map((entry, index) => <article data-trace-entry className="journal-card transition duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[12px_16px_0_rgba(15,61,62,.12)]" style={{ transform: `rotate(${index % 2 ? 1.5 : -1}deg)` }} key={`${entry.createdAt}-${index}`}><p>&ldquo;{entry.message}&rdquo;</p><footer>- {entry.name}{entry.role ? `, ${entry.role}` : ""}<time className="mt-1 block text-[.65rem]" dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleDateString()}</time></footer></article>)}</div>}
      </div>
    </div>
    {isOpen && <div className="modal-backdrop trace-modal-backdrop" role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}><form className="guestbook-form trace-modal-form" onSubmit={submit}><button type="button" className="modal-close relative z-20 cursor-pointer pointer-events-auto" onClick={() => setIsOpen(false)} aria-label="Close guestbook"><X size={20} /></button><span className="section-kicker">A SMALL NOTE</span><h3 className="mt-3 text-3xl text-[#0F3D3E]">Leave a little trace.</h3><input aria-label="Name" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><input aria-label="Role / Profession" placeholder="e.g. Developer, Designer, Student" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} /><textarea aria-label="Note" required rows="4" placeholder="Leave a little note..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /><button type="submit" className="mt-5 bg-[#0F3D3E] px-5 py-3 font-sans text-sm text-white transition hover:bg-[#C6A15B] hover:text-[#0F3D3E]">Leave a Trace</button></form></div>}
  </section>;
}

export default VisitorTrace;
