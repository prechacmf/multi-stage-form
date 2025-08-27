"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface SalesChannelFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function SalesChannelForm({ data, onUpdate, onNext, onPrevious }: SalesChannelFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">ข้อมูลช่องทางการขาย</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authorizedBranches">สาขาอนุญาตขายบัตร</Label>
              <Input
                id="authorizedBranches"
                value={data.authorizedBranches}
                onChange={(e) => onUpdate({ authorizedBranches: e.target.value })}
                placeholder="ทั่วประเทศ"
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
              <p className="text-sm text-muted-foreground">
                ระบุสาขาที่ได้รับอนุญาตให้จำหน่ายบัตร หรือระบุ "ทั่วประเทศ" หากอนุญาตทุกสาขา
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">ช่องทางการขายหลัก</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center p-4 bg-card rounded-lg border">
                  <div className="text-center">
                    <div className="font-medium">เว็บไซต์</div>
                    <div className="text-sm text-muted-foreground">Online Platform</div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-card rounded-lg border">
                  <div className="text-center">
                    <div className="font-medium">7-Eleven</div>
                    <div className="text-sm text-muted-foreground">Convenience Store</div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-card rounded-lg border">
                  <div className="text-center">
                    <div className="font-medium">จุดขาย</div>
                    <div className="text-sm text-muted-foreground">Physical Outlets</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>หมายเหตุเพิ่มเติม</Label>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ช่องทางการขายจะถูกเปิดใช้งานตามการตั้งค่าในขั้นตอนถัดไป สามารถกำหนดเวลาเปิด-ปิดการขาย และข้อจำกัดต่างๆ ได้
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="w-4 h-4" />
          ย้อนกลับ
        </Button>
        <Button onClick={onNext} className="flex items-center gap-2">
          ถัดไป
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
