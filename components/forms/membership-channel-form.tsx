"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface MembershipChannelFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function MembershipChannelForm({ data, onUpdate, onNext, onPrevious }: MembershipChannelFormProps) {
  const [channels, setChannels] = useState(
    data.membershipChannels.length > 0
      ? data.membershipChannels
      : [
          {
            channel: "Web All ticket",
            openDate: "2025-02-14",
            openTime: "18:00",
            closeDate: "2025-02-14",
            closeTime: "22:00",
            expiryMinutes: 30,
            limitPerTransaction: 1,
            limitPerIdCard: "ไม่สามารถซื้อซ้ำได้ในรอบเดียวกัน แต่สามารถซื้อได้ในรอบอื่นคนละ 1 ใบต่อรอบ",
          },
        ],
  )

  const addChannel = () => {
    setChannels([
      ...channels,
      {
        channel: "",
        openDate: "",
        openTime: "",
        closeDate: "",
        closeTime: "",
        expiryMinutes: 30,
        limitPerTransaction: 1,
        limitPerIdCard: "",
      },
    ])
  }

  const removeChannel = (index: number) => {
    const updated = channels.filter((_, i) => i !== index)
    setChannels(updated)
    onUpdate({ membershipChannels: updated })
  }

  const updateChannel = (index: number, field: string, value: string | number) => {
    const updated = channels.map((channel, i) => (i === index ? { ...channel, [field]: value } : channel))
    setChannels(updated)
    onUpdate({ membershipChannels: updated })
  }

  const handleNext = () => {
    onUpdate({ membershipChannels: channels })
    onNext()
  }

  const channelOptions = ["Web All ticket", "7-11 store", "Event date", "Counter Service", "Mobile App", "Call Center"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">ช่องทางการขาย BEUS MEMBERSHIP</CardTitle>
          <p className="text-sm text-muted-foreground">ข้อมูลมาวันที่ 12/02/68 - กำหนดช่องทางการขายและข้อจำกัดต่างๆ</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">ช่องทางที่เปิดขาย</h3>
              <p className="text-sm text-muted-foreground">จำนวน {channels.length} ช่องทาง</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addChannel}>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มช่องทาง
            </Button>
          </div>

          <div className="space-y-4">
            {channels.map((channel, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">ช่องทางที่ {index + 1}</Badge>
                    {channels.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeChannel(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ช่องทางการขาย</Label>
                      <Select value={channel.channel} onValueChange={(value) => updateChannel(index, "channel", value)}>
                        <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                          <SelectValue placeholder="เลือกช่องทาง" />
                        </SelectTrigger>
                        <SelectContent>
                          {channelOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>เวลาบัตรหมดอายุ (นาที)</Label>
                      <Input
                        type="number"
                        value={channel.expiryMinutes}
                        onChange={(e) => updateChannel(index, "expiryMinutes", Number.parseInt(e.target.value) || 0)}
                        placeholder="30"
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>วัน/เวลา ที่เปิดจำหน่าย</Label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={channel.openDate}
                          onChange={(e) => updateChannel(index, "openDate", e.target.value)}
                          className="border-2 border-gray-800 focus:border-gray-900"
                        />
                        <Input
                          type="time"
                          value={channel.openTime}
                          onChange={(e) => updateChannel(index, "openTime", e.target.value)}
                          className="border-2 border-gray-800 focus:border-gray-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>วัน/เวลา ที่ปิดจำหน่าย</Label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={channel.closeDate}
                          onChange={(e) => updateChannel(index, "closeDate", e.target.value)}
                          className="border-2 border-gray-800 focus:border-gray-900"
                        />
                        <Input
                          type="time"
                          value={channel.closeTime}
                          onChange={(e) => updateChannel(index, "closeTime", e.target.value)}
                          className="border-2 border-gray-800 focus:border-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>จำกัดจำนวนต่อครั้ง</Label>
                      <Input
                        type="number"
                        value={channel.limitPerTransaction}
                        onChange={(e) =>
                          updateChannel(index, "limitPerTransaction", Number.parseInt(e.target.value) || 0)
                        }
                        placeholder="1"
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                      <p className="text-xs text-muted-foreground">1 ครั้งซื้อได้กี่ใบ</p>
                    </div>
                    <div className="space-y-2">
                      <Label>จำนวนจำกัด/บัตรประชาชน</Label>
                      <Input
                        value={channel.limitPerIdCard}
                        onChange={(e) => updateChannel(index, "limitPerIdCard", e.target.value)}
                        placeholder="1 ID Card ซื้อได้กี่ใบ"
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                      <p className="text-xs text-muted-foreground">ข้อจำกัดต่อบัตรประชาชน</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">ข้อมูลสำคัญ</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• ช่องทางการขายจะเปิดใช้งานตามเวลาที่กำหนด</li>
              <li>• บัตรจะหมดอายุตามเวลาที่กำหนดหลังจากการจอง</li>
              <li>• ข้อจำกัดการซื้อจะถูกตรวจสอบตามบัตรประชาชน</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="w-4 h-4" />
          ย้อนกลับ
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          ถัดไป
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
