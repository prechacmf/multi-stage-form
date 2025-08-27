"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface PromoterFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function PromoterForm({ data, onUpdate, onNext, onPrevious }: PromoterFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            รายละเอียดผู้จัด
            <span className="text-sm font-normal text-muted-foreground ml-2">(Promoter Details)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="promoterName">ชื่อผู้จัดคอนเสิร์ต</Label>
              <Input
                id="promoterName"
                value={data.promoterName}
                onChange={(e) => onUpdate({ promoterName: e.target.value })}
                placeholder="บริษัท ซันเรย์ มิวสิค จำกัด"
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyCode">Comp.Code (T+ตัวเลข 6 หลัก)</Label>
              <Input
                id="companyCode"
                value={data.companyCode}
                onChange={(e) => onUpdate({ companyCode: e.target.value })}
                placeholder="T000321"
                pattern="T\d{6}"
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promoterAbbreviation">ชื่อย่อภาษาอังกฤษผู้จัดฯ (3 ตัวอักษร)</Label>
              <Input
                id="promoterAbbreviation"
                value={data.promoterAbbreviation}
                onChange={(e) => onUpdate({ promoterAbbreviation: e.target.value.toUpperCase() })}
                placeholder="TDE"
                maxLength={3}
                pattern="[A-Z]{3}"
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promoterPhone">เบอร์ติดต่อ</Label>
              <Input
                id="promoterPhone"
                value={data.promoterPhone}
                onChange={(e) => onUpdate({ promoterPhone: e.target.value })}
                placeholder="0952296535"
                pattern="[0-9]{10}"
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="promoterAddress">ที่อยู่ผู้จัด</Label>
              <Textarea
                id="promoterAddress"
                value={data.promoterAddress}
                onChange={(e) => onUpdate({ promoterAddress: e.target.value })}
                placeholder="2034/106-107 ชั้น 24 อาคารอิตัลไทย ทาวเวอร์ ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310"
                rows={3}
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="promoterTaxId">หมายเลขสรรพากรผู้จัดฯ (Tax ID 13 หลัก)</Label>
              <Input
                id="promoterTaxId"
                value={data.promoterTaxId}
                onChange={(e) => onUpdate({ promoterTaxId: e.target.value })}
                placeholder="0105562207817"
                pattern="[0-9]{13}"
                maxLength={13}
                required
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">ข้อมูลสำคัญ</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Company Code ต้องขึ้นต้นด้วย "T" ตามด้วยตัวเลข 6 หลัก</li>
              <li>• ชื่อย่อภาษาอังกฤษต้องเป็นตัวพิมพ์ใหญ่ 3 ตัวอักษร</li>
              <li>• เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก</li>
              <li>• Tax ID ต้องเป็นตัวเลข 13 หลัก</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          ย้อนกลับ
        </Button>
        <Button type="submit">ถัดไป</Button>
      </div>
    </form>
  )
}
