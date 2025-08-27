"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, ChevronLeft, Send } from "lucide-react"
import type { TicketFormData } from "../multi-stage-ticket-form"

interface PreviewFormProps {
  data: TicketFormData
  onEdit: (stageId: number) => void
  onSubmit: () => void
  onPrevious: () => void
}

export function PreviewForm({ data, onEdit, onSubmit, onPrevious }: PreviewFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">ตรวจสอบข้อมูลก่อนส่งมอบ</CardTitle>
          <p className="text-sm text-muted-foreground">กรุณาตรวจสอบข้อมูลทั้งหมดให้ถูกต้องก่อนส่งมอบ</p>
        </CardHeader>
      </Card>

      {/* Stage 1 Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">รายละเอียดการจำหน่ายบัตร</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Client No.</h4>
              <p>{data.clientNo}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Service</h4>
              <p>{data.service}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">ชื่อการแสดง</h4>
            <div className="space-y-1">
              <p>
                <span className="text-sm text-muted-foreground">EN:</span> {data.eventNameEn}
              </p>
              <p>
                <span className="text-sm text-muted-foreground">EN (Short):</span> {data.eventNameShortEn}
              </p>
              <p>
                <span className="text-sm text-muted-foreground">TH:</span> {data.eventNameTh}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">สถานที่แสดง</h4>
              <p>{data.venueEn}</p>
              <p className="text-sm text-muted-foreground">{data.venueTh}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">ประเภท</h4>
              <p>
                {data.eventType} - {data.ticketType}
              </p>
            </div>
          </div>

          {data.showDates.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">รอบการแสดง</h4>
                <div className="space-y-2">
                  {data.showDates.map((show, index) => (
                    <div key={index} className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{show.round}</Badge>
                      <span>{show.date}</span>
                      <span>แสดง: {show.showTime}</span>
                      <span>เปิดประตู: {show.doorTime}</span>
                      {show.notes && <span className="text-muted-foreground">({show.notes})</span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Stage 2 Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">ข้อมูลช่องทางการขาย</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground">สาขาอนุญาตขายบัตร</h4>
            <p>{data.authorizedBranches || "ไม่ได้ระบุ"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stage 3 Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">ช่องทางการขาย BEUS MEMBERSHIP</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent>
          {data.membershipChannels.length > 0 ? (
            <div className="space-y-4">
              {data.membershipChannels.map((channel, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">ช่องทางที่ {index + 1}</Badge>
                    <span className="font-medium">{channel.channel}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">เปิดขาย:</span> {channel.openDate} {channel.openTime}
                    </div>
                    <div>
                      <span className="text-muted-foreground">ปิดขาย:</span> {channel.closeDate} {channel.closeTime}
                    </div>
                    <div>
                      <span className="text-muted-foreground">หมดอายุ:</span> {channel.expiryMinutes} นาที
                    </div>
                    <div>
                      <span className="text-muted-foreground">จำกัดต่อครั้ง:</span> {channel.limitPerTransaction} ใบ
                    </div>
                    {channel.limitPerIdCard && (
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground">จำกัดต่อบัตรประชาชน:</span> {channel.limitPerIdCard}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">ไม่มีช่องทางการขายที่กำหนด</p>
          )}
        </CardContent>
      </Card>

      {/* Stage 4 Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">ช่องทางการขาย รอบจำหน่ายบัตรทั่วไป (General Sale)</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(4)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.generalSaleChannels && data.generalSaleChannels.length > 0 ? (
            <div className="space-y-4">
              {data.generalSaleChannels.map((channel, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">ช่องทางที่ {index + 1}</Badge>
                    <span className="font-medium">{channel.channel}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">เปิดขาย:</span> {channel.openDate} {channel.openTime}
                    </div>
                    <div>
                      <span className="text-muted-foreground">ปิดขาย:</span> {channel.closeDate} {channel.closeTime}
                    </div>
                    <div>
                      <span className="text-muted-foreground">หมดอายุ:</span> {channel.expiryMinutes} นาที
                    </div>
                    <div>
                      <span className="text-muted-foreground">จำกัดต่อครั้ง:</span> {channel.limitPerTransaction} ใบ
                    </div>
                    {channel.limitPerIdCard && (
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground">จำกัดต่อบัตรประชาชน:</span> {channel.limitPerIdCard}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">ไม่มีช่องทางการขายที่กำหนด</p>
          )}

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">สรุปเวลาการขาย</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">เปิดขาย BEUS MEMBERSHIP:</span>{" "}
                {data.membershipOpenDateTime || "ไม่ได้ระบุ"}
              </div>
              <div>
                <span className="text-muted-foreground">เปิดขาย General:</span> {data.generalOpenDateTime || "ไม่ได้ระบุ"}
              </div>
              <div>
                <span className="text-muted-foreground">ปิดขาย BEUS MEMBERSHIP:</span>{" "}
                {data.membershipCloseDateTime || "ไม่ได้ระบุ"}
              </div>
              <div>
                <span className="text-muted-foreground">ปิดขาย General:</span> {data.generalCloseDateTime || "ไม่ได้ระบุ"}
              </div>
              <div>
                <span className="text-muted-foreground">เปิดขายบัตรหน้างาน:</span> {data.venueTicketSales || "ไม่ได้ระบุ"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage 5 Preview - Ticket Collection */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">เงื่อนไขการรับบัตร</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(5)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">รับบัตรหน้างาน:</span> {data.venuePickup || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">สาขาอนุญาต Print Ticket:</span>{" "}
              {data.branchPrintTicket || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">พิมพ์บัตรที่ 7-Eleven:</span> {data.sevenElevenPrint || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">ใช้ส่วนลด:</span> {data.useDiscount || "ไม่ได้ระบุ"}
            </div>
          </div>

          {(data.sevenElevenStartDate || data.sevenElevenEndDate || data.showTimeOnTicket) && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">รายละเอียดการพิมพ์บัตร 7-Eleven</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {data.sevenElevenStartDate && (
                    <div>
                      <span className="text-muted-foreground">วันที่เริ่มต้น:</span> {data.sevenElevenStartDate}
                    </div>
                  )}
                  {data.sevenElevenEndDate && (
                    <div>
                      <span className="text-muted-foreground">วันที่สิ้นสุด:</span> {data.sevenElevenEndDate}
                    </div>
                  )}
                  {data.showTimeOnTicket && (
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground">เวลาแสดงที่พิมพ์บนบัตร:</span> {data.showTimeOnTicket}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {(data.postalDeadline || data.addressFormDeadline || data.addressEditDeadline) && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">การจัดส่งและที่อยู่</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {data.postalDeadline && (
                    <div>
                      <span className="text-muted-foreground">วันสิ้นสุดส่งไปรษณีย์:</span> {data.postalDeadline}
                    </div>
                  )}
                  {data.addressFormDeadline && (
                    <div>
                      <span className="text-muted-foreground">กรอกที่อยู่ถึงวันที่:</span> {data.addressFormDeadline}
                    </div>
                  )}
                  {data.addressEditDeadline && (
                    <div>
                      <span className="text-muted-foreground">แก้ไขที่อยู่ถึงวันที่:</span> {data.addressEditDeadline}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Stage 6 Preview - Fees */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">ค่าธรรมเนียม</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(6)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Issue Fee:</span> {data.issueFee}
                {data.issueFee === "มี" && ` (${data.issueFeeAmount} THB)`}
              </div>
              <div>
                <span className="text-muted-foreground">CS Fee:</span> {data.csFee}
              </div>
              <div>
                <span className="text-muted-foreground">Shipping Fee:</span> {data.shippingFee}
              </div>
            </div>

            {data.plasticCardFee && (
              <div>
                <span className="text-muted-foreground">ค่าบัตรพลาสติก:</span> {data.plasticCardFee}
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">ค่าธรรมเนียมการชำระเงิน</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">บัตรเครดิต:</span> {data.creditCardFee}
                  {data.creditCardFee === "มี" && ` (${data.creditCardFeeRate}%)`}
                </div>
                <div>
                  <span className="text-muted-foreground">TRUE MONEY:</span> {data.truemoneyFee}
                  {data.truemoneyFee === "มี" && ` (${data.truemoneyFeeRate}%)`}
                </div>
                <div>
                  <span className="text-muted-foreground">THAI QR:</span> {data.thaiQrFee}
                  {data.thaiQrFee === "มี" && ` (${data.thaiQrFeeRate}%)`}
                </div>
                <div>
                  <span className="text-muted-foreground">Alipay:</span> {data.alipayFee}
                  {data.alipayFee === "มี" && ` (${data.alipayFeeRate}%)`}
                </div>
                <div>
                  <span className="text-muted-foreground">Wechat:</span> {data.wechatFee}
                  {data.wechatFee === "มี" && ` (${data.wechatFeeRate}%)`}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">การตรวจสอบ Check Duplicate</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Channel:</span> {data.checkDuplicateChannel}
                </div>
                <div>
                  <span className="text-muted-foreground">Reserve Limit Type:</span> {data.checkReserveLimitType}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage 7 Preview - Promoter Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">รายละเอียดผู้จัด</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(7)}>
            <Edit className="w-4 h-4 mr-2" />
            แก้ไข
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">ชื่อผู้จัดคอนเสิร์ต:</span> {data.promoterName || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">Company Code:</span> {data.companyCode || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">ชื่อย่อ:</span> {data.promoterAbbreviation || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">เบอร์ติดต่อ:</span> {data.promoterPhone || "ไม่ได้ระบุ"}
            </div>
            <div>
              <span className="text-muted-foreground">Tax ID:</span> {data.promoterTaxId || "ไม่ได้ระบุ"}
            </div>
          </div>

          {data.promoterAddress && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">ที่อยู่ผู้จัด</h4>
                <p className="text-sm mt-1">{data.promoterAddress}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="w-4 h-4" />
          ย้อนกลับ
        </Button>
        <Button onClick={onSubmit} className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          ส่งมอบข้อมูล
        </Button>
      </div>
    </div>
  )
}
