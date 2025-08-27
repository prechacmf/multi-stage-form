"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface FeesFormProps {
  data: TicketFormData
  onUpdate: (data: Partial<TicketFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function FeesForm({ data, onUpdate, onNext, onPrevious }: FeesFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            ค่าธรรมเนียม
            <span className="text-sm font-normal text-muted-foreground ml-2">(Fees)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Issue Fee */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueFee">ค่าธรรมเนียมการขายต่อใบ (Issue Fee)</Label>
              <Select value={data.issueFee} onValueChange={(value) => onUpdate({ issueFee: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="มี">มี</SelectItem>
                  <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueFeeAmount">จำนวน (THB)</Label>
              <Input
                id="issueFeeAmount"
                value={data.issueFeeAmount}
                onChange={(e) => onUpdate({ issueFeeAmount: e.target.value })}
                placeholder="30"
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueFeePayedBy">ผู้รับภาระ</Label>
              <Select value={data.issueFeePayedBy} onValueChange={(value) => onUpdate({ issueFeePayedBy: value })}>
                <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                  <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Plastic Card Fee */}
          <div className="space-y-2">
            <Label htmlFor="plasticCardFee">ค่าบัตรพลาสติก</Label>
            <Input
              id="plasticCardFee"
              value={data.plasticCardFee}
              onChange={(e) => onUpdate({ plasticCardFee: e.target.value })}
              placeholder="ลูกค้ารับภาระค่าบัตรพลาสติกใบละ 20 บาท"
              className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* CS Fee */}
          <div className="space-y-2">
            <Label htmlFor="csFee">ค่าธรรมเนียมการขายต่อรายการ (CS Fee) *สำหรับ Merchandise</Label>
            <Select value={data.csFee} onValueChange={(value) => onUpdate({ csFee: value })}>
              <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="มี">มี</SelectItem>
                <SelectItem value="ไม่มี">ไม่มี</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Shipping Fee */}
          <div className="space-y-2">
            <Label htmlFor="shippingFee">ค่าธรรมเนียมการจัดส่ง</Label>
            <Select value={data.shippingFee} onValueChange={(value) => onUpdate({ shippingFee: value })}>
              <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="มี">มี</SelectItem>
                <SelectItem value="ไม่มี">ไม่มี</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Payment Method Fees */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ค่าธรรมเนียมการชำระเงิน</h3>

            {/* Credit Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ค่าธรรมเนียมบัตรเครดิต</Label>
                <Select value={data.creditCardFee} onValueChange={(value) => onUpdate({ creditCardFee: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="มี">มี</SelectItem>
                    <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>อัตรา (%)</Label>
                <Input
                  value={data.creditCardFeeRate}
                  onChange={(e) => onUpdate({ creditCardFeeRate: e.target.value })}
                  placeholder="3.25"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้รับภาระ</Label>
                <Select
                  value={data.creditCardFeePayedBy}
                  onValueChange={(value) => onUpdate({ creditCardFeePayedBy: value })}
                >
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                    <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* TRUE MONEY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>TRUE MONEY</Label>
                <Select value={data.truemoneyFee} onValueChange={(value) => onUpdate({ truemoneyFee: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="มี">มี</SelectItem>
                    <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>อัตรา (%)</Label>
                <Input
                  value={data.truemoneyFeeRate}
                  onChange={(e) => onUpdate({ truemoneyFeeRate: e.target.value })}
                  placeholder="3.00"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้รับภาระ</Label>
                <Select
                  value={data.truemoneyFeePayedBy}
                  onValueChange={(value) => onUpdate({ truemoneyFeePayedBy: value })}
                >
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                    <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* THAI QR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>THAI QR</Label>
                <Select value={data.thaiQrFee} onValueChange={(value) => onUpdate({ thaiQrFee: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="มี">มี</SelectItem>
                    <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>อัตรา (%)</Label>
                <Input
                  value={data.thaiQrFeeRate}
                  onChange={(e) => onUpdate({ thaiQrFeeRate: e.target.value })}
                  placeholder="1.50"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้รับภาระ</Label>
                <Select value={data.thaiQrFeePayedBy} onValueChange={(value) => onUpdate({ thaiQrFeePayedBy: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                    <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Alipay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Alipay</Label>
                <Select value={data.alipayFee} onValueChange={(value) => onUpdate({ alipayFee: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="มี">มี</SelectItem>
                    <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>อัตรา (%)</Label>
                <Input
                  value={data.alipayFeeRate}
                  onChange={(e) => onUpdate({ alipayFeeRate: e.target.value })}
                  placeholder="3.00"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้รับภาระ</Label>
                <Select value={data.alipayFeePayedBy} onValueChange={(value) => onUpdate({ alipayFeePayedBy: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                    <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Wechat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Wechat</Label>
                <Select value={data.wechatFee} onValueChange={(value) => onUpdate({ wechatFee: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="มี">มี</SelectItem>
                    <SelectItem value="ไม่มี">ไม่มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>อัตรา (%)</Label>
                <Input
                  value={data.wechatFeeRate}
                  onChange={(e) => onUpdate({ wechatFeeRate: e.target.value })}
                  placeholder="3.00"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้รับภาระ</Label>
                <Select value={data.wechatFeePayedBy} onValueChange={(value) => onUpdate({ wechatFeePayedBy: value })}>
                  <SelectTrigger className="border-2 border-gray-800 focus:border-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลูกค้า">ลูกค้า</SelectItem>
                    <SelectItem value="ผู้จัด">ผู้จัด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Check Duplicate Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ตรวจสอบ Check Duplicate</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ตรวจสอบ Check Duplicate CHANNEL</Label>
                <Input
                  value={data.checkDuplicateChannel}
                  onChange={(e) => onUpdate({ checkDuplicateChannel: e.target.value })}
                  placeholder="CHANNEL"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label>ตรวจสอบการจองประเภท (Check_reserve_limit_type)</Label>
                <Input
                  value={data.checkReserveLimitType}
                  onChange={(e) => onUpdate({ checkReserveLimitType: e.target.value })}
                  placeholder="WEB/POS"
                  className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>WEB/POS</Label>
              <Textarea
                value={data.webPosLimit}
                onChange={(e) => onUpdate({ webPosLimit: e.target.value })}
                placeholder="0: สามารถจองไม่มี limit"
                rows={2}
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label>WEB</Label>
              <Textarea
                value={data.webLimit}
                onChange={(e) => onUpdate({ webLimit: e.target.value })}
                placeholder="1: X ครั้ง /ID card /Event id Reserve,Confirm,Paid x =10"
                rows={2}
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label>WEB (รายละเอียดเพิ่มเติม)</Label>
              <Textarea
                value={data.webLimitDescription}
                onChange={(e) => onUpdate({ webLimitDescription: e.target.value })}
                placeholder="2 : ตรวจสอบ/ ID card/ Event ID ถ้ามีรายการ Status Reserve ,Confirm"
                rows={2}
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label>WEB/POS X</Label>
              <Textarea
                value={data.webPosXLimit}
                onChange={(e) => onUpdate({ webPosXLimit: e.target.value })}
                placeholder="3 : ตรวจสอบ X seat/ID ard /Event id ทุก status (Reserve,Confirm,Paid) X=10"
                rows={2}
                className="border-2 border-gray-800 focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>
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
