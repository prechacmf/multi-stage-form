import { MultiStageTicketForm } from "@/components/multi-stage-ticket-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">ระบบจัดการการจำหน่ายบัตร</h1>
            <p className="text-muted-foreground">Ticket Sales Management System</p>
          </div>
          <MultiStageTicketForm />
        </div>
      </div>
    </main>
  )
}
