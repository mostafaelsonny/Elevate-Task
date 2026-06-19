export default function Header() {
  return (
    <header className="w-full px-4 pt-4">
      <div
        className="flex items-center justify-between px-6 py-3 rounded-2xl"
        style={{
          background: 'rgba(55, 75, 105, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <span className="text-white font-semibold text-base tracking-wide">
          Elevate
        </span>
        <span className="text-white font-semibold text-lg tracking-wide absolute left-1/2 -translate-x-1/2">
          Frontend Advanced Bootcamp Task
        </span>
        <span />
      </div>
    </header>
  )
}
