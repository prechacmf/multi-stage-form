"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface TicketCollectionFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function TicketCollectionForm({ data, onUpdate, onNext, onPrevious }: TicketCollectionFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">เงื่อนไขการรับบัตร</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Venue Pickup */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">การรับบัตรหน้างาน</h3>
            <div>
              <Label>รับบัตรหน้างาน</Label>
              <Select value={data.venuePickup} onValueChange={(value) => onUpdate({ venuePickup: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือกตัวเลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">YES</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Branch Print Ticket */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">การพิมพ์บัตรที่สาขา</h3>
            <div>
              <Label>สาขาอนุญาต Print Ticket</Label>
              <Select value={data.branchPrintTicket} onValueChange={(value) => onUpdate({ branchPrintTicket: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue placeholder="เลือกตัวเลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="บางสาขา">บางสาขา</SelectItem>
                  <SelectItem value="ทุกสาขา">ทุกสาขา</SelectItem>
                  <SelectItem value="ไม่อนุญาต">ไม่อนุญาต</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 7-Eleven Print */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">การพิมพ์บัตรที่ 7-Eleven</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>พิมพ์บัตรได้ที่จุดพิมพ์บัตร 7-Eleven</Label>
                <Select value={data.sevenElevenPrint} onValueChange={(value) => onUpdate({ sevenElevenPrint: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue placeholder="เลือกตัวเลือก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">YES</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>วันที่เริ่มต้นพิมพ์บัตรได้ที่จุดพิมพ์บัตร 7-Eleven</Label>
                <Input
                  type="date"
                  value={data.sevenElevenStartDate}
                  onChange={(e) => onUpdate({ sevenElevenStartDate: e.target.value })}
                  className="border-2 border-gray-800 focus:border-gray-900"
                />
              </div>

              <div>
                <Label>วันที่สิ้นสุดพิมพ์บัตรได้ที่จุดพิมพ์บัตร 7-Eleven</Label>
                <Input
                  type="date"
                  value={data.sevenElevenEndDate}
                  onChange={(e) => onUpdate({ sevenElevenEndDate: e.target.value })}
                  className="border-2 border-gray-800 focus:border-gray-900"
                />
              </div>

              <div>
                <Label>เวลาแสดงที่พิมพ์บนบัตร</Label>
                <Input
                  value={data.showTimeOnTicket}
                  onChange={(e) => onUpdate({ showTimeOnTicket: e.target.value })}
                  placeholder="ตัวอย่าง: R1) 07/09/24 6:00 P.M."
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Postal and Address Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">การจัดส่งไปรษณีย์และการจัดการที่อยู่</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>วันที่สิ้นสุดการส่งไปรษณีย์</Label>
                <Input
                  type="date"
                  value={data.postalDeadline}
                  onChange={(e) => onUpdate({ postalDeadline: e.target.value })}
                  className="border-2 border-gray-800 focus:border-gray-900"
                />
                <p className="text-xs text-muted-foreground mt-1">(นับย้อนหลัง 15 วันจากวันแสดง)</p>
              </div>

              <div>
                <Label>ปุ่มเปิดให้เลือกกรอกที่อยู่บน WEB,POS ถึงวันที่</Label>
                <Input
                  type="datetime-local"
                  value={data.addressFormDeadline}
                  onChange={(e) => onUpdate({ addressFormDeadline: e.target.value })}
                  className="border-2 border-gray-800 focus:border-gray-900"
                />
              </div>

              <div>
                <Label>Link เปิดให้กรอกและแก้ไขที่อยู่ได้ถึงวันที่</Label>
                <Input
                  type="datetime-local"
                  value={data.addressEditDeadline}
                  onChange={(e) => onUpdate({ addressEditDeadline: e.target.value })}
                  className="border-2 border-gray-800 focus:border-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">ตัวเลือกเพิ่มเติม</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Gen Text File ส่งให้โรงพิมพ์</Label>
                <Select value={data.genTextFile} onValueChange={(value) => onUpdate({ genTextFile: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue placeholder="เลือกตัวเลือก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">YES</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>ใช้ส่วนลด</Label>
                <Select value={data.useDiscount} onValueChange={(value) => onUpdate({ useDiscount: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue placeholder="เลือกตัวเลือก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">YES</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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
