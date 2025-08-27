"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface GeneralSaleFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function GeneralSaleForm({ data, onUpdate, onNext, onPrevious }: GeneralSaleFormProps) {
  const addChannel = () => {
    const newChannel = {
      channel: "",
      openDate: "",
      openTime: "",
      closeDate: "",
      closeTime: "",
      expiryMinutes: 30,
      limitPerTransaction: 4,
      limitPerIdCard: "ไม่สามารถซื้อซ้ำได้ในรอบเดียวกัน แต่สามารถซื้อได้ในรอบอื่นคนละ 4 ใบต่อรอบ",
    }
    onUpdate({
      generalSaleChannels: [...(data.generalSaleChannels || []), newChannel],
    })
  }

  const removeChannel = (index: number) => {
    const updatedChannels = data.generalSaleChannels?.filter((_, i) => i !== index) || []
    onUpdate({ generalSaleChannels: updatedChannels })
  }

  const updateChannel = (index: number, field: string, value: string | number) => {
    const updatedChannels =
      data.generalSaleChannels?.map((channel, i) => (i === index ? { ...channel, [field]: value } : channel)) || []
    onUpdate({ generalSaleChannels: updatedChannels })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            ช่องทางการขาย รอบจำหน่ายบัตรทั่วไป (General Sale)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sales Channels */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">ช่องทางที่เปิดขาย</Label>
              <Button onClick={addChannel} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มช่องทาง
              </Button>
            </div>

            {data.generalSaleChannels?.map((channel, index) => (
              <Card key={index} className="border-l-4 border-l-accent">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">ช่องทาง {index + 1}</h4>
                    <Button
                      onClick={() => removeChannel(index)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>ช่องทาง</Label>
                      <Select value={channel.channel} onValueChange={(value) => updateChannel(index, "channel", value)}>
                        <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                          <SelectValue placeholder="เลือกช่องทาง" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web All ticket">Web All ticket</SelectItem>
                          <SelectItem value="7-11 store">7-11 store</SelectItem>
                          <SelectItem value="Event date">Event date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>วันที่เปิดจำหน่าย</Label>
                      <Input
                        type="date"
                        value={channel.openDate}
                        onChange={(e) => updateChannel(index, "openDate", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>

                    <div>
                      <Label>เวลาเปิดจำหน่าย</Label>
                      <Input
                        type="time"
                        value={channel.openTime}
                        onChange={(e) => updateChannel(index, "openTime", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>

                    <div>
                      <Label>วันที่ปิดจำหน่าย</Label>
                      <Input
                        type="date"
                        value={channel.closeDate}
                        onChange={(e) => updateChannel(index, "closeDate", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>

                    <div>
                      <Label>เวลาปิดจำหน่าย</Label>
                      <Input
                        type="time"
                        value={channel.closeTime}
                        onChange={(e) => updateChannel(index, "closeTime", e.target.value)}
                        className="border-2 border-gray-800 focus:border-gray-900"
                      />
                    </div>

                    <div>
                      <Label>เวลาบัตรหมดอายุ (นาที)</Label>
                      <Input
                        type="number"
                        value={channel.expiryMinutes}
                        onChange={(e) => updateChannel(index, "expiryMinutes", Number.parseInt(e.target.value) || 0)}
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <Label>จำกัดจำนวนต่อครั้ง</Label>
                      <Input
                        type="number"
                        value={channel.limitPerTransaction}
                        onChange={(e) =>
                          updateChannel(index, "limitPerTransaction", Number.parseInt(e.target.value) || 0)
                        }
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>จำนวนจำกัด/บัตรประชาชน</Label>
                      <Textarea
                        value={channel.limitPerIdCard}
                        onChange={(e) => updateChannel(index, "limitPerIdCard", e.target.value)}
                        placeholder="ระบุเงื่อนไขการซื้อต่อบัตรประชาชน"
                        rows={2}
                        className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sale Timing Summary */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">สรุปเวลาการขาย</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>วันและเวลาเปิดขายบัตร BEUS MEMBERSHIP</Label>
                  <Input
                    value={data.membershipOpenDateTime}
                    onChange={(e) => onUpdate({ membershipOpenDateTime: e.target.value })}
                    placeholder="14 February 2025 18:00"
                    className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label>วันและเวลาเปิดขายบัตร (General)</Label>
                  <Input
                    value={data.generalOpenDateTime}
                    onChange={(e) => onUpdate({ generalOpenDateTime: e.target.value })}
                    placeholder="15 February 2025 10:00"
                    className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label>ปิดขายบัตร BEUS MEMBERSHIP</Label>
                  <Input
                    value={data.membershipCloseDateTime}
                    onChange={(e) => onUpdate({ membershipCloseDateTime: e.target.value })}
                    placeholder="14 February 2025 22:00"
                    className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label>ปิดขายบัตร (General)</Label>
                  <Input
                    value={data.generalCloseDateTime}
                    onChange={(e) => onUpdate({ generalCloseDateTime: e.target.value })}
                    placeholder="13 March 2025 23:59"
                    className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label>เปิดขายบัตรหน้างานแสดง</Label>
                <Select value={data.venueTicketSales} onValueChange={(value) => onUpdate({ venueTicketSales: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue placeholder="เลือกตัวเลือก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">YES</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onPrevious} variant="outline">
          <ChevronLeft className="w-4 h-4 mr-2" />
          ย้อนกลับ
        </Button>
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
          ถัดไป
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
