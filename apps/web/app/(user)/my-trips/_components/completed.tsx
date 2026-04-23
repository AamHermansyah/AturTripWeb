import CardCompleted from './card-completed'

function Completed() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-extrabold tracking-tight">Perjalanan Selesai</h2>

      <div className="flex flex-col gap-3">
        <CardCompleted />
        <CardCompleted />
        <CardCompleted />
      </div>
    </div>
  )
}

export default Completed
