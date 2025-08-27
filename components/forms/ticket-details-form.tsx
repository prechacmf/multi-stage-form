"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ChevronRight } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface TicketDetailsFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
}

export function TicketDetailsForm({ data, onUpdate, onNext }: TicketDetailsFormProps) {
  const [showDates, setShowDates] = useState(
    data.showDates.length > 0
      ? data.showDates
      : [{ round: "R1", date: "2568-03-14", showTime: "17:00", doorTime: "16:00", notes: "" }],
  )

  const addShowDate = () => {
    const newRound = `R${showDates.length + 1}`
    setShowDates([...showDates, { round: newRound, date: "", showTime: "", doorTime: "", notes: "" }])
  }

  const removeShowDate = (index: number) => {
    const updated = showDates.filter((_, i) => i !== index)
    setShowDates(updated)
    onUpdate({ showDates: updated })
  }

  const updateShowDate = (index: number, field: string, value: string) => {
    const updated = showDates.map((date, i) => (i === index ? { ...date, [field]: value } : date))
    setShowDates(updated)
    onUpdate({ showDates: updated })
  }

  const handleNext = () => {
    onUpdate({ showDates })
    onNext()
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">รายละเอียดการจำหน่ายบัตร</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="clientNo" className="text-sm font-medium">
                Client No.
              </Label>
              <Input
                id="clientNo"
                value={data.clientNo}
                onChange={(e) => onUpdate({ clientNo: e.target.value })}
                placeholder="เช่น 810"
                disabled
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
              <p className="text-xs text-muted-foreground/60">ไม่ต้องแก้ข้อมูล</p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="service" className="text-sm font-medium">
                Service
              </Label>
              <Input
                id="service"
                value={data.service}
                onChange={(e) => onUpdate({ service: e.target.value })}
                placeholder="เช่น 01"
                disabled
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
              <p className="text-xs text-muted-foreground/60">ไม่ต้องแก้ข้อมูล</p>
            </div>
          </div>

          {/* Event Names */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="eventNameEn" className="text-sm font-medium">
                ชื่อเต็มการแสดง ENGLISH
              </Label>
              <Input
                id="eventNameEn"
                value={data.eventNameEn}
                onChange={(e) => onUpdate({ eventNameEn: e.target.value })}
                placeholder="เช่น BUS The 1st Concert LIGHT THE WORLD"
                maxLength={255}
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
              <p className="text-xs text-muted-foreground/60">ไม่เกิน 255 ตัวอักษรรวมเว้นวรรคด้วยแต่ไม่นับสระและวรรณยุกต์</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="eventNameShortEn" className="text-sm font-medium">
                ชื่อย่อการแสดง ENGLISH
              </Label>
              <Input
                id="eventNameShortEn"
                value={data.eventNameShortEn}
                onChange={(e) => onUpdate({ eventNameShortEn: e.target.value })}
                placeholder="เช่น BUS The 1st Concert"
                maxLength={50}
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
              <p className="text-xs text-muted-foreground/60">ไม่เกิน 50 ตัวอักษร (โชว์ในหน้า Web, Slip ประกัน)</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="eventNameTh" className="text-sm font-medium">
                ชื่อย่อการแสดง THAI
              </Label>
              <Textarea
                id="eventNameTh"
                value={data.eventNameTh}
                onChange={(e) => onUpdate({ eventNameTh: e.target.value })}
                placeholder="เช่น บัส เดอะเฟิร์ส คอนเสิร์ต"
                maxLength={50}
                rows={2}
                className="placeholder:text-muted-foreground/40 resize-none border-2 border-gray-800 focus:border-gray-900"
              />
              <p className="text-xs text-muted-foreground/60">ไม่เกิน 50 ตัวอักษร (โชว์ในหน้า POS, Slip ประกัน)</p>
            </div>
          </div>

          {/* Venue Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="venueEn" className="text-sm font-medium">
                สถานที่แสดง ENGLISH
              </Label>
              <Input
                id="venueEn"
                value={data.venueEn}
                onChange={(e) => onUpdate({ venueEn: e.target.value })}
                placeholder="เช่น Impact Arena Muang Thong Thani"
                maxLength={100}
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="venueTh" className="text-sm font-medium">
                สถานที่แสดง THAI
              </Label>
              <Input
                id="venueTh"
                value={data.venueTh}
                onChange={(e) => onUpdate({ venueTh: e.target.value })}
                placeholder="เช่น อิมแพ็คอารีน่า เมืองทองธานี"
                maxLength={100}
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
            </div>
          </div>

          {/* Show Dates */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">วันที่ และเวลาแสดง</Label>
              <Button type="button" variant="outline" size="sm" onClick={addShowDate} className="gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                เพิ่มรอบการแสดง
              </Button>
            </div>

            <div className="space-y-4">
              {showDates.map((showDate, index) => (
                <Card key={index} className="p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">รอบการแสดง</Label>
                      <Input
                        value={showDate.round}
                        onChange={(e) => updateShowDate(index, "round", e.target.value)}
                        placeholder="เช่น R1"
                        className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">วันแสดง</Label>
                      <Input
                        type="date"
                        value={showDate.date}
                        onChange={(e) => updateShowDate(index, "date", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">เวลาแสดง</Label>
                      <Input
                        type="time"
                        value={showDate.showTime}
                        onChange={(e) => updateShowDate(index, "showTime", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">เวลาประตูเปิด</Label>
                      <Input
                        type="time"
                        value={showDate.doorTime}
                        onChange={(e) => updateShowDate(index, "doorTime", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">หมายเหตุ</Label>
                      <div className="flex gap-2">
                        <Input
                          value={showDate.notes || ""}
                          onChange={(e) => updateShowDate(index, "notes", e.target.value)}
                          placeholder="หมายเหตุ (ถ้ามี)"
                          className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
                        />
                        {showDates.length > 1 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => removeShowDate(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Event and Ticket Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="eventType" className="text-sm font-medium">
                ประเภทการแสดง
              </Label>
              <Select value={data.eventType} onValueChange={(value) => onUpdate({ eventType: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือกประเภทการแสดง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONCERT">CONCERT</SelectItem>
                  <SelectItem value="THEATER">THEATER</SelectItem>
                  <SelectItem value="SPORT">SPORT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="ticketType" className="text-sm font-medium">
                ประเภทตั๋ว
              </Label>
              <Select value={data.ticketType} onValueChange={(value) => onUpdate({ ticketType: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือกประเภทตั๋ว" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIX SEAT FIX ZONE">FIX SEAT FIX ZONE</SelectItem>
                  <SelectItem value="STANDING">STANDING</SelectItem>
                  <SelectItem value="FESTIVAL">FESTIVAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="webCodeRequired" className="text-sm font-medium">
                WEB: เปิดจำหน่ายโดยกรอก Code
              </Label>
              <Select value={data.webCodeRequired} onValueChange={(value) => onUpdate({ webCodeRequired: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">YES</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="posCodeRequired" className="text-sm font-medium">
                POS: เปิดจำหน่ายโดยกรอก Code
              </Label>
              <Select value={data.posCodeRequired} onValueChange={(value) => onUpdate({ posCodeRequired: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">YES</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="ticketInsurance" className="text-sm font-medium">
                Ticket Protection Insurance
              </Label>
              <Input
                id="ticketInsurance"
                value={data.ticketInsurance}
                onChange={(e) => onUpdate({ ticketInsurance: e.target.value })}
                placeholder="เช่น 14027-114-240002382"
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="accidentInsurance" className="text-sm font-medium">
                ประกันภัยอุบัติเหตุ
              </Label>
              <Input
                id="accidentInsurance"
                value={data.accidentInsurance}
                onChange={(e) => onUpdate({ accidentInsurance: e.target.value })}
                placeholder="เช่น 14003-108-240001296"
                className="placeholder:text-muted-foreground/40 border-2 border-gray-800 focus:border-gray-900"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} className="flex items-center gap-2 px-6">
          ถัดไป
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
