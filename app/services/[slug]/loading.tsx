export default function ServiceDetailLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-44 animate-pulse rounded-3xl bg-[#C8A2C8]/25 dark:bg-[#2d2d2d]" />
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-2xl bg-[#C8A2C8]/20 dark:bg-[#2d2d2d]" />
          <div className="h-56 animate-pulse rounded-2xl bg-[#C8A2C8]/20 dark:bg-[#2d2d2d]" />
          <div className="h-52 animate-pulse rounded-2xl bg-[#C8A2C8]/20 dark:bg-[#2d2d2d]" />
        </div>
        <div className="h-36 animate-pulse rounded-2xl bg-[#C8A2C8]/20 dark:bg-[#2d2d2d]" />
      </div>
    </section>
  );
}

