import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <section className="glass w-full max-w-md rounded-4xl p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/5">
          <span className="text-lg font-semibold">
            EW
          </span>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
          EWU · Fall 2026
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
          You&apos;re offline
        </h1>

        <p className="mx-auto mt-3 max-w-72.5 text-sm leading-6 text-neutral-500">
          The connection is unavailable right now.
          Your saved academic app can still be
          opened when its resources are cached.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.97]"
        >
          Open app
        </Link>
      </section>
    </main>
  );
}