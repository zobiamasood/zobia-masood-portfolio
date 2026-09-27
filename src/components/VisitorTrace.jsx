import { useEffect, useState } from "react";
import { PenLine, X, Loader2 } from "lucide-react";
import { EditorialDoodles } from "./Doodles";
import { supabase } from "../lib/supabase";

function VisitorTrace() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    message: "",
    role: "",
  });

  // Fetch shared guestbook entries from Supabase
  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("traces")
        .select("id, name, role, message, created_at")
        .order("created_at", { ascending: false })
        .limit(12);

      if (fetchError) {
        console.error("Error loading traces:", fetchError);
        setError("The guestbook could not be loaded right now.");
      } else {
        setEntries(data || []);
      }

      setIsLoading(false);
    };

    fetchEntries();
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    const name = form.name.trim() || "A visitor";
    const message = form.message.trim();
    const role = form.role.trim();

    if (!message) return;

    setIsSubmitting(true);
    setError("");

    const { data, error: insertError } = await supabase
      .from("traces")
      .insert([
        {
          name,
          role,
          message,
        },
      ])
      .select("id, name, role, message, created_at")
      .single();

    if (insertError) {
      console.error("Error saving trace:", insertError);
      setError("Your trace could not be saved. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Add the new entry immediately to the top
    setEntries((currentEntries) => [data, ...currentEntries].slice(0, 12));

    setForm({
      name: "",
      message: "",
      role: "",
    });

    setIsOpen(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setError("");
    }
  };

  return (
    <section
      id="trace"
      className="relative overflow-hidden bg-[#E9EEE6] px-6 py-24 lg:px-10 lg:py-32"
    >
      <EditorialDoodles className="-right-12 top-12 hidden h-44 w-64 opacity-70 lg:block" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-kicker">LITTLE TRACE</span>

            <h2 className="mt-4 display-title">
              Leave a little
              <br />
              <em>trace.</em>
            </h2>

            <p className="mt-5 max-w-md leading-7 text-[#607789]">
              If you enjoyed your little tour around my world, leave a thought
              behind.
            </p>

            {/* Noticeable Guestbook CTA */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-7 inline-flex items-center gap-3 border border-[#0F3D3E] bg-[#0F3D3E] px-5 py-3 font-sans text-sm text-white shadow-[5px_5px_0_#C6A15B] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_#C6A15B] focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:ring-offset-2"
            >
              <PenLine
                size={17}
                className="transition-transform duration-300 group-hover:-rotate-12"
              />
              Leave a Little Trace
            </button>
          </div>

          <div className="trace-counter">
            <strong>{entries.length || "—"}</strong>
            <span>Little traces left</span>
            <small>
              A shared guestbook — your note can be seen by future visitors.
            </small>
          </div>
        </div>

        <div className="mt-12 border-t border-[#A8B5A2] pt-8">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center gap-2 py-8 text-sm text-[#607789]">
              <Loader2 size={17} className="animate-spin" />
              Loading little traces...
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && !isOpen && (
            <p className="py-5 text-sm text-[#8B5E5E]">{error}</p>
          )}

          {/* Guestbook entries */}
          {!isLoading && !error && entries.length > 0 && (
            <div className="grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry, index) => (
                <article
                  data-trace-entry
                  className="journal-card transition duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[12px_16px_0_rgba(15,61,62,.12)]"
                  style={{
                    transform: `rotate(${index % 2 ? 1.5 : -1}deg)`,
                  }}
                  key={entry.id}
                >
                  <p>&ldquo;{entry.message}&rdquo;</p>

                  <footer>
                    - {entry.name}
                    {entry.role ? `, ${entry.role}` : ""}

                    <time
                      className="mt-1 block text-[.65rem]"
                      dateTime={entry.created_at}
                    >
                      {new Date(entry.created_at).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </footer>
                </article>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && entries.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-[#607789]">
                No little traces yet. Be the first to leave one.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Guestbook Modal */}
      {isOpen && (
        <div
          className="modal-backdrop trace-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trace-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <form
            className="guestbook-form trace-modal-form"
            onSubmit={submit}
          >
            <button
              type="button"
              className="modal-close relative z-20 cursor-pointer pointer-events-auto"
              onClick={closeModal}
              aria-label="Close guestbook"
              disabled={isSubmitting}
            >
              <X size={20} />
            </button>

            <span className="section-kicker">A SMALL NOTE</span>

            <h3
              id="trace-modal-title"
              className="mt-3 text-3xl text-[#0F3D3E]"
            >
              Leave a little trace.
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#607789]">
              Leave a thought, kind word, or little note for whoever visits
              after you.
            </p>

            <input
              aria-label="Name"
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              disabled={isSubmitting}
            />

            <input
              aria-label="Role / Profession"
              placeholder="e.g. Developer, Designer, Student"
              value={form.role}
              onChange={(event) =>
                setForm({
                  ...form,
                  role: event.target.value,
                })
              }
              disabled={isSubmitting}
            />

            <textarea
              aria-label="Note"
              required
              rows="4"
              placeholder="Leave a little note..."
              value={form.message}
              onChange={(event) =>
                setForm({
                  ...form,
                  message: event.target.value,
                })
              }
              disabled={isSubmitting}
            />

            {error && (
              <p className="mt-3 text-sm text-[#8B5E5E]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-7 inline-flex items-center gap-3 border border-[#0F3D3E] bg-[#0F3D3E] px-5 py-3 font-sans text-sm text-white shadow-[5px_5px_0_#C6A15B] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_#C6A15B] focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Leaving your trace...
                </>
              ) : (
                <>
                  <PenLine size={16} />
                  Leave a Trace
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default VisitorTrace;
